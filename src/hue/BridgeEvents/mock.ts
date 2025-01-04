import { http, HttpResponse } from "msw";
let sseClients = [];

const encoder = new TextEncoder();

export const simpleStream = http.get('https://192.168.0.1/eventstream/clip/v2', () => {
    const stream = new ReadableStream({
        start(controller) {
            controller.enqueue(
                encoder.encode(
                    `event:some-event\ndata:some data\n\n`
                )
            );
            controller.close();
        },
    });

    return new HttpResponse(stream, {
        headers: {
            "Content-Type": "text/event-stream",
        }
    })
});

export const connectionSuccess = http.get('https://192.168.0.1/eventstream/clip/v2', ({ request }) => {
    const appKey = request.headers.get('hue-application-key')

    if (appKey === 'success-app-key') {
        return new HttpResponse('', {
            headers: {
                "Content-Type": "text/event-stream",
            }
        })
    } else {
        return new HttpResponse('No App Key Passed', {
            status: 401
        })
    }
});

export const messagesStream = http.get('https://192.168.0.1/eventstream/clip/v2', ({ request }) => {
    const stream = new ReadableStream({
        start(controller) {
            sseClients.push(controller);

        },
        cancel() {
            sseClients = sseClients.filter(client => client !== controller);
        },
    });

    return new HttpResponse(stream, {
        headers: {
            'Content-Type': 'text/event-stream',
            'Cache-Control': 'no-cache',
            'Connection': 'keep-alive',
        },
    });
});

export const emitSSE = (event: unknown, stringify = true) => {
    const data =
        `id: ${new Date().getTime()}
data: ${stringify ? JSON.stringify(event) : event}\n\n`;

    sseClients.forEach(controller => {
        controller.enqueue(encoder.encode(data));
    });
};

export const nonExistingHost = http.get('https://non-existing-remote.com/eventstream/clip/v2', () => {
    return HttpResponse.error()
});


export function unknownMessage() {
    const message = {
        id: 44,
        description: 'Unknown Message',
        format: 'Not the one you expect'
    };

    return message
}

export function emptyEvent() {
    return '';
}

export function turnOnLightEvent() {
    const event = [{ "creationtime": "2021-10-18T17:04:55Z", "data": [{ "id": "e706416a-8c92-46ef-8589-3453f3235b13", "on": { "on": true }, "owner": { "rid": "3f4ac4e9-d67a-4dbd-8a16-5ea7e373f281", "rtype": "device" }, "type": "light" }], "id": "9de116fc-5fd2-4b74-8414-0f30cb2cbe04", "type": "update" }]

    return event
}

export function groupedLightEvent() {
    return [
        {
            "creationtime": "2024-07-24T13:04:19Z",
            "data": [
                {
                    "id": "e7567411-fa96-4514-becf-af6c6d4b15bf",
                    "id_v1": "/lights/1",
                    "owner": {
                        "rid": "b2792e66-67d9-45a6-a8c4-36b3db001c98",
                        "rtype": "device"
                    },
                    "type": "light",
                    "dimming": {
                        "brightness": 75.89
                    },
                    "service_id": 0
                },
                {
                    "id": "13b9c31f-5fdb-4a0d-9ee4-cb93621d367a",
                    "id_v1": "/lights/3",
                    "owner": {
                        "rid": "565646af-dbb2-4656-82eb-ba4529a96a1d",
                        "rtype": "device"
                    },
                    "type": "light",
                    "dimming": {
                        "brightness": 75.89
                    },
                    "service_id": 0
                }
            ],
            "id": "4c77da58-ff97-43b6-b7b7-966ded7dc32e",
            "type": "update"
        },
        {
            "creationtime": "2024-07-24T13:04:19Z",
            "data": [
                {
                    "id": "036ba6c2-6495-4563-9b3e-3aa3d62f2e9e",
                    "id_v1": "/groups/0",
                    "owner": {
                        "rid": "b4197ed6-286d-4b03-b175-15aa85d9aabc",
                        "rtype": "bridge_home"
                    },
                    "type": "grouped_light",
                    "dimming": {
                        "brightness": 75.89
                    }
                },
                {
                    "id": "47738085-f811-483a-a4b7-675b213ccd09",
                    "id_v1": "/groups/82",
                    "owner": {
                        "rid": "ff1a4d8c-6207-400a-8ec2-81df5c333ec5",
                        "rtype": "room"
                    },
                    "type": "grouped_light",
                    "dimming": {
                        "brightness": 75.89
                    }
                },
                {
                    "id": "82426897-8a9f-4a97-9111-51d59866ab83",
                    "id_v1": "/groups/86",
                    "owner": {
                        "rid": "a2a61b05-eb87-4818-97e0-377594d7dc63",
                        "rtype": "zone"
                    },
                    "type": "grouped_light",
                    "dimming": {
                        "brightness": 75.89
                    }
                },
                {
                    "id": "9f235d52-04b5-41cc-aa63-f9144aa18db2",
                    "id_v1": "/groups/84",
                    "owner": {
                        "rid": "25ac7fa7-533e-47c7-836b-1742a4dd9503",
                        "rtype": "zone"
                    },
                    "type": "grouped_light",
                    "dimming": {
                        "brightness": 75.89
                    }
                }
            ],
            "id": "0d770e96-bfa4-458e-aba4-884cc5f2de14",
            "type": "update"
        }
    ]
}