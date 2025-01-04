import { getErrorMessage } from './errors'
import { Room } from '../popup/interfaces'
import { Collection } from '../shared/Collection'
import { HttpClient } from './HttpClient'
import { Model } from './Model'
import { derived, get, readable, writable } from 'svelte/store'
import { BridgeEvents, BridgeUnknownEvent } from './BridgeEvents/BridgeEvents'
import { type Resource } from './BridgeEvents/schema'
import omit from 'lodash/omit'
import createDebug from 'debug'
import type { GroupedLightResponse, RoomResponse } from './schemas'
import { Mapper } from './Mapper'
import type { BridgeEventHandler } from './BridgeEvents/interfaces'
import { GroupedLightEventHandler } from './BridgeEvents/handlers/GroupedLight'
const debug = createDebug('philips-hue-remote:bridge')
/*
Goals:
- make usage of Philips Hue Developer Friendly
- hide implementations details of bridge
- implement and expose only methods used by the extension

Room:
    - toggle (get, set)
    - brightness (get, set)
    - color (get, set)

*/

export class BridgeController {
  private client: HttpClient
  private eventStream: BridgeEvents
  public model: Model

  constructor (ipAddress: string, appKey: string) {
    this.client = new HttpClient(ipAddress, appKey)
    this.eventStream = new BridgeEvents(ipAddress, appKey)
    this.model = new Model()

    this.attachEventStreamListeners()
  }

  async connect () {
    await this.fetchItems()
    this.eventStream.open()
  }

  get XXrooms () {
    return this.model.rooms
  }

  get lights () {
    return this.model.lights
  }

  private async fetchItems () {
    try {
      const promises = await Promise.all([
        this.client.fetchRooms(),
        this.client.fetchLights(),
        this.client.fetchGroupedLights()
      ])
      const [rooms, lights, groupedLights] = promises

      this.model.rooms.set(rooms.map(room => Mapper.mapRoom(room)))
      this.model.lights.set(lights)

      groupedLights.forEach(item => Mapper.mapGroupedLight(this.model, item))
    } catch (e) {
      console.error({ e })
      this.handleError(new Error("Can't fetch Bridge Items"))
    }
  }

  attachEventStreamListeners () {
    const eventHandlers: Partial<Record<Resource['type'], BridgeEventHandler>> =
      {
        grouped_light: new GroupedLightEventHandler(this.model)
      }
    this.eventStream.onOpen(() => {
      debug('BridgeEvents opened')
    })

    this.eventStream.onError(error => {
      if (error instanceof BridgeUnknownEvent) {
        debug('Unknown event.')
        console.table(error.errors)
        console.table(JSON.parse(error.origianlEvent.data))
        return
      }

      debug('BridgeEvents error:', error)
    })

    this.eventStream.onEvent(events => {
      debug('messages', events)

      events.forEach(event => {
        event.data.forEach(resource => {
          const handler = eventHandlers[resource.type]

          if (handler) {
            console.log('Invoking handler for ', resource)
            handler[event.type](resource)
          } else {
            debug('No Event handler for', event)
          }
        })
      })
    })
  }

  private handleError (error: any) {
    const status = error.response?.status
    const { code, message } = getErrorMessage(status)

    console.error('BridgeError', code, message, error)
    return { code, message }
  }
}

function omitBridgeEventProperties (event: unknown) {
  return omit(event, ['id', 'id_v1', 'owner', 'service_id', 'type'])
}
