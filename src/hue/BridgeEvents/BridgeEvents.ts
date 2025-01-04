type EventType = 'update' | 'add' | 'delete' | 'error';
import { fetchEventSource } from '@microsoft/fetch-event-source';
import { parseBridgeEventPassthrough, parseBridgeEventStrict, type BridgeEventStream } from './schema';
import { z, ZodError } from 'zod';

export type OpenHandler = () => void
export type EventHandler = (messages: BridgeEventStream) => void
export type ErrorHandler = (error: BridgeError | BridgeNotAuthorized | BridgeUnknownEvent | Error) => void

export class BridgeError extends Error {
    constructor(message: string) {
        super()
        this.name = 'BridgeEventsError'
        this.message = message
    }
}

export class BridgeNotAuthorized extends Error {
    constructor() {
        super()
        this.name = 'BridgeNotAuthorized'
        this.message = 'Passed Philips Hue App key is incorrect'
    }
}

export class BridgeUnknownEvent extends Error {
    public errors: ZodError['errors']

    constructor(private zodError: ZodError, public origianlEvent: unknown) {
        super()
        this.name = 'BridgeUnknownEvent'
        this.message = `Event in unknown format: ${JSON.stringify(zodError)}`
        this.errors = zodError.errors
    }
}

function isErrorEvent(event: Event): event is ErrorEvent {
    return 'message' in event;
}

export class BridgeEvents {

    // @TODO: Allow to pass many handlers. Right now we might be surprised when
    // attaching new onMessage handler, the previous one stopped to working.
    private openHandler: OpenHandler = () => { }
    private eventHandler: EventHandler = () => { }
    private errorHandler: ErrorHandler = () => { }

    // @TODO: Dont use default appKey
    constructor(public host: string, public appKey = '') {
        this.onEvent(this.eventHandler)
    }

    get url(): string {
        return `https://${this.host}/eventstream/clip/v2`
    }

    public open() {
        fetchEventSource(this.url, {
            method: 'GET',
            headers: {
                'hue-application-key': this.appKey,
                'Accept': 'text/event-stream'
            },
            onmessage: (event) => {
                try {
                    if (!event.data) {
                        return;
                    }

                    const messages = JSON.parse(event.data);

                    if (messages) {
                        try {
                            const parsed = parseBridgeEventPassthrough(messages);
                            this.eventHandler(parsed);
                        } catch (error) {
                            if (error instanceof z.ZodError) {
                                throw new BridgeUnknownEvent(error, event)
                            } else {
                                throw error;
                            }
                        }
                    }
                } catch (e) {
                    throw e
                }
            },
            onopen: async (response) => {
                if (response.status === 200) {
                    this.openHandler()
                }

                if (response.status === 401) {
                    throw new BridgeNotAuthorized()
                }

            },
            onerror: (error) => {
                if (error instanceof BridgeNotAuthorized) {
                    this.errorHandler(error)
                    return
                }

                if (error instanceof BridgeUnknownEvent) {
                    this.errorHandler(error)
                    return
                }

                if (isErrorEvent(error) && typeof error.message === 'string') {
                    this.errorHandler(new BridgeError(error.message));
                } else {
                    this.errorHandler(new BridgeError('Unknown error'));
                }
            },
        });
    }

    onOpen(handler: OpenHandler) {
        this.openHandler = handler
    }

    onEvent(handler: EventHandler) {
        this.eventHandler = handler
    }

    onError(handler: ErrorHandler): void {
        this.errorHandler = handler
    }
}