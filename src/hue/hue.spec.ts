import { describe, expect, test } from 'vitest'
import { PhilipsHueClient } from './client'
import { server } from '../mocks/node'
import { discoverySuccess } from './mocks'

describe('Philips Hue Client', () => {
    test('discover bridge', async () => {
        server.use(discoverySuccess)
        const client = new PhilipsHueClient()

        expect(await client.discover()).toEqual({ ip: '192.168.0.44' })
    })

})