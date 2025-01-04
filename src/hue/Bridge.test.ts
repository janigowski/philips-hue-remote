import { describe, expect, test } from 'vitest'
import { server } from '../mocks/node'
import * as mocks from './mocks'
import { BridgeController } from './Bridge'
import { get } from 'svelte/store'
import { waitFor } from '@testing-library/svelte'
import { messagesStream } from './BridgeEvents/mock'
import type { Room } from '../popup/interfaces'

describe('Philips Hue Bridge', () => {
  describe('given bridge with rooms and lights', () => {
    describe('when bridge connects successfully', () => {
      test('then rooms and lights are mapped to reactive elements', async () => {
        server.use(
          mocks.rooms.get.success,
          mocks.light.get.success,
          mocks.groupedLights.get.success,
          messagesStream
        )

        const bridge = new BridgeController(
          '192.168.0.1',
          'qwerty-app-key-0987654321'
        )
        await bridge.connect()

        await waitFor(() => {
          const rooms = get(bridge.XXrooms)
          const lights = get(bridge.lights)
          const salon = rooms.find(room => get(room.name) === 'Salon') as Room

          expect(rooms).toHaveLength(2)
          expect(lights).toHaveLength(6)

          expect(salon.id).toBe('e55e5e2d-4a50-4122-8adf-020c8dc523e5')
          expect(get(salon.brightness)).toBe(100)
        })
      })
    })
  })
})
