// @TODO: To remove
import throttle from 'lodash/throttle'

export type DiscoveryResult = {
    ip: string
} | Error | PhilipsHueServiceError

export type CreateAppResult = {
    username: string
    clientkey: string
} | Error | PhilipsHueServiceError

export class PhilipsHueServiceError extends Error {
    public name = 'PhilipsHueServiceError'

    constructor(message: string) {
        super(message)
    }
}

export class ClientError extends Error {
    public name = 'ClientError'

    constructor(message: string) {
        super(message)
    }
}

const deskLampRid = "e7567411-fa96-4514-becf-af6c6d4b15bf"


type XYBrightness = { x: number, y: number, brightness: number };

/**
 * Moute about Philips Hue Limitations (look for "Limitations" chapter)
 * https://developers.meethue.com/develop/hue-api-v2/core-concepts/
 */
const safeLightUpdateIntervalMs = 100


export class PhilipsHueClient {
    private bridgeIpAddress: string = ''
    private appKey: string = ''
    private throttledLightUpdater

    constructor() {
        this.throttledLightUpdater = throttle(this.updateColorOnDeskLamp.bind(this), safeLightUpdateIntervalMs)
    }

    async discover(): Promise<DiscoveryResult> {
        try {
            const res = await fetch("https://discovery.meethue.com");

            if (res.ok) {
                const bridge = (await res.json())[0]

                return {
                    ip: bridge.internalipaddress
                }
            } else {
                return Error('Bridge not found')
            }
        } catch (error) {
            if (error instanceof Error) {
                return new PhilipsHueServiceError(error.message)
            }

            return Error('Unhandled Error')
        }
    }

    logItself(): void {
        console.log({
            bridgeIp: this.bridgeIpAddress,
            appKey: this.appKey,
        })
    }

    setBridgeIpAddress(bridgeIpAddress: string): void {
        this.bridgeIpAddress = bridgeIpAddress
    }

    setAppKey(appKey: string): void {
        this.appKey = appKey
    }

    ensureBridgeIsSet(): void | ClientError {
        if (!this.bridgeIpAddress) {
            throw new ClientError('Bridge IP address not set. Set it using .setBridgeIpAddress() method')
        }
    }

    async createApp(): Promise<CreateAppResult> {
        this.ensureBridgeIsSet()

        try {
            const res = await fetch(`https://${this.bridgeIpAddress}/api`, {
                body: JSON.stringify({ "devicetype": this.getInstanceName(), "generateclientkey": true }),
                method: 'POST'
            });

            if (res.ok) {
                const response = (await res.json())[0]

                if (response.success) {
                    return {
                        username: response.success.username,
                        clientkey: response.success.clientkey,
                    }

                }

                if (response.error) {
                    return new ClientError(response.error.description)
                }

            } else {
                return Error('Cant create App')
            }
        } catch (error) {
            if (error instanceof Error) {
                return new PhilipsHueServiceError(error.message)
            }

            return Error('Unhandled Error')
        }
    }

    getInstanceName() {
        return ("philips-hue-remote#" + chrome.runtime.id).substring(0, 40)
    }

    async getDevices() {
        this.ensureBridgeIsSet()

        try {
            const res = await fetch(`https://${this.bridgeIpAddress}/clip/v2/resource/device`, {
                headers: {
                    'hue-application-key': this.appKey
                }
            });

            if (res.ok) {
                const response = await res.json()

                console.log({ response })

                return response
            } else {
                return Error('Cant get devices')
            }
        } catch (error) {
            if (error instanceof Error) {
                return new PhilipsHueServiceError(error.message)
            }

            return Error('Unhandled Error')
        }

    }

    async turnOffDeskLamp() {


        this.ensureBridgeIsSet()

        try {
            const res = await fetch(`https://${this.bridgeIpAddress}/clip/v2/resource/light/${deskLampRid}`, {
                headers: {
                    'hue-application-key': this.appKey
                },
                method: 'PUT',
                body: JSON.stringify({ "on": { "on": false } })
            });

            if (res.ok) {
                const response = await res.json()

                console.log({ response })
            } else {
                return Error('Cant get devices')
            }
        } catch (error) {
            if (error instanceof Error) {
                return new PhilipsHueServiceError(error.message)
            }

            return Error('Unhandled Error')
        }
    }

    async turnOnDeskLamp() {
        this.ensureBridgeIsSet()

        try {
            const res = await fetch(`https://${this.bridgeIpAddress}/clip/v2/resource/light/${deskLampRid}`, {
                headers: {
                    'hue-application-key': this.appKey
                },
                method: 'PUT',
                body: JSON.stringify({ "on": { "on": true } })
            });

            if (res.ok) {
                const response = await res.json()

                console.log({ response })
            } else {
                return Error('Cant get devices')
            }
        } catch (error) {
            if (error instanceof Error) {
                return new PhilipsHueServiceError(error.message)
            }

            return Error('Unhandled Error')
        }
    }

    async setColorOnDeskLamp(red: number, green: number, blue: number) {
        this.throttledLightUpdater(red, green, blue)
    }

    async updateColorOnDeskLamp(red: number, green: number, blue: number) {
        this.ensureBridgeIsSet()

        try {
            const { x, y, brightness } = PhilipsHueClient.rgbToXyBrightness(red, green, blue)

            const res = await fetch(`https://${this.bridgeIpAddress}/clip/v2/resource/light/${deskLampRid}`, {
                headers: {
                    'hue-application-key': this.appKey
                },
                method: 'PUT',
                body: JSON.stringify({
                    "color": {
                        "xy": {
                            x, y
                        }
                    },
                    "dimming": { brightness: 100 },
                    "on": { "on": true }
                })
            });

            if (res.ok) {
                const response = await res.json()
            } else {
                return Error('Cant get devices')
            }
        } catch (error) {
            if (error instanceof Error) {
                return new PhilipsHueServiceError(error.message)
            }

            return Error('Unhandled Error')
        }
    }

    static rgbToXyBrightness(red: number, green: number, blue: number): XYBrightness {
        // 1. Normalize the RGB values to the range [0, 1]
        let r = red / 255;
        let g = green / 255;
        let b = blue / 255;

        // 2. Apply gamma correction
        r = (r > 0.04045) ? Math.pow((r + 0.055) / (1.0 + 0.055), 2.4) : (r / 12.92);
        g = (g > 0.04045) ? Math.pow((g + 0.055) / (1.0 + 0.055), 2.4) : (g / 12.92);
        b = (b > 0.04045) ? Math.pow((b + 0.055) / (1.0 + 0.055), 2.4) : (b / 12.92);

        // 3. Convert to XYZ using the Wide RGB D65 conversion formula
        const X = r * 0.4124 + g * 0.3576 + b * 0.1805;
        const Y = r * 0.2126 + g * 0.7152 + b * 0.0722;
        const Z = r * 0.0193 + g * 0.1192 + b * 0.9505;

        // 4. Calculate the xy values from the XYZ values
        const sum = X + Y + Z;
        const x = X / sum;
        const y = Y / sum;
        const brightness = Y;

        // 5 & 6. Check if the xy value is within the color gamut
        // Assuming a placeholder for checking if the point is in the gamut
        // and finding the closest point if not in the gamut.
        // Implement your own color gamut check and correction logic here if needed.
        const isInGamut = (x: number, y: number) => true; // Placeholder function
        const closestGamutPoint = (x: number, y: number) => ({ x, y }); // Placeholder function

        let finalX = x;
        let finalY = y;

        if (!isInGamut(x, y)) {
            const closestPoint = closestGamutPoint(x, y);
            finalX = closestPoint.x;
            finalY = closestPoint.y;
        }

        // 7. Use the Y value of XYZ as brightness
        return { x: finalX, y: finalY, brightness };
    }

}