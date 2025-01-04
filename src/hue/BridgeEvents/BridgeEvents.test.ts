import { describe, expect, it, vitest, vi } from "vitest";
import { BridgeEvents, BridgeUnknownEvent } from "./BridgeEvents";
import { server } from "../../mocks/node";
import { connectionSuccess, emitSSE, messagesStream, nonExistingHost, unknownMessage, turnOnLightEvent, emptyEvent, groupedLightEvent } from "./mock";

describe('BridgeEvents', () => {
    it('creates Event Stream URL', () => {
        server.use(connectionSuccess)
        const bridgeEvents = new BridgeEvents('192.168.0.1');
        expect(bridgeEvents.url).toEqual('https://192.168.0.1/eventstream/clip/v2')
    })

    it('connects with correct app key', () => new Promise<void>(resolve => {
        server.use(connectionSuccess)

        const bridgeEvents = new BridgeEvents('192.168.0.1', 'success-app-key')
        bridgeEvents.onOpen(() => {
            resolve()
        })

        bridgeEvents.open()
    }))

    it('errors to connect with incorrect app key', () => new Promise<void>(resolve => {
        server.use(connectionSuccess)

        const bridgeEvents = new BridgeEvents('192.168.0.1', 'wrong-app-key')
        bridgeEvents.onError(error => {
            expect(error.message).toEqual('Passed Philips Hue App key is incorrect')
            resolve()
        })

        bridgeEvents.open()
    }))

    it('errors to connect with non-existing host', () => new Promise<void>(resolve => {
        server.use(nonExistingHost)

        const bridgeEvents = new BridgeEvents('non-existing-remote.com', 'success-app-key')
        bridgeEvents.onError(error => {
            expect(error.message).toEqual('Failed to fetch')
            resolve()
        })

        bridgeEvents.open()
    }))

    it('errors on unknown message format', () => new Promise<void>(resolve => {
        server.use(messagesStream)

        const bridgeEvents = new BridgeEvents('192.168.0.1', 'success-app-key');
        bridgeEvents.onError(error => {
            expect(error).toBeInstanceOf(BridgeUnknownEvent)

            if (error instanceof BridgeUnknownEvent) {
                expect(error.message).toContain('Event in unknown format:')
                expect(error.errors).toHaveLength(1)
                expect(error.errors[0].message).toBe('Expected array, received object')
                resolve();
            }
        })

        bridgeEvents.open()

        // @TODO: Do I need to change this?
        setTimeout(() => {
            emitSSE(unknownMessage());
        }, 100)
    }))

    it('do nothing on empty message', () => new Promise<void>(resolve => {
        server.use(messagesStream)
        const errorHandler = vi.fn()
        const eventHandler = vi.fn()

        const bridgeEvents = new BridgeEvents('192.168.0.1', 'success-app-key');
        bridgeEvents.onError(errorHandler)
        bridgeEvents.onEvent(eventHandler)

        bridgeEvents.open()

        // @TODO: Do I need to change this?
        setTimeout(() => {
            emitSSE(emptyEvent(), false);

            // @TODO: I dont know better way to test it. It works. Leaving until I learn how to improve it.
            setTimeout(() => {
                expect(errorHandler).not.toHaveBeenCalled()
                expect(eventHandler).not.toHaveBeenCalled()
                resolve()
            }, 50)
        }, 50)
    }))

    it('notifies about correct events', () => new Promise<void>(resolve => {
        server.use(messagesStream)

        const bridgeEvents = new BridgeEvents('192.168.0.1', 'success-app-key');
        bridgeEvents.onEvent(messages => {
            expect(messages).toHaveLength(1);
            expect(messages[0].data[0].on.on).toBeTruthy()
            resolve();
        })

        bridgeEvents.open()

        // @TODO: Do I need to change this?
        setTimeout(() => {
            emitSSE(turnOnLightEvent());
        }, 100)
    }))

    it('notifies about correct GroupedLight events', () => new Promise<void>(resolve => {
        /* @TODO: Failure of this test can be hard to understand since there
        will be no error message other than timeout.
        */
        server.use(messagesStream)

        const bridgeEvents = new BridgeEvents('192.168.0.1', 'success-app-key');
        bridgeEvents.onEvent(messages => {
            expect(messages).toHaveLength(2);
            expect(messages[1].data).toHaveLength(4);
            resolve();
        })

        bridgeEvents.open()

        // @TODO: Do I need to change this?
        setTimeout(() => {
            emitSSE(groupedLightEvent());
        }, 100)
    }))
});