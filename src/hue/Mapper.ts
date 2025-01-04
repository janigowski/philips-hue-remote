import { get } from 'lodash'
import type { GroupedLightResponse, RoomResponse } from './schemas'
import { Room } from '../popup/interfaces'
import type { Model } from './Model'

export class Mapper {
  static mapRoom (data: RoomResponse): Room {
    return new Room({
      name: data.metadata.name,
      id: data.id,
      on: false,
      colors: [],
      brightness: 0,
      icon: data.metadata.archetype
    })
  }

  static mapGroupedLight (model: Model, response: GroupedLightResponse): void {
    if (response.owner.rtype === 'room') {
      const room = model.getRoom(response.owner.rid)

      if (room) {
        room.brightness.set(response.dimming?.brightness)
      }
    }
  }
}
