import type { Model } from '../../Model'
import type { BridgeEventHandler } from '../interfaces'
import type { BridgeEvent } from '../schema'
import {
  getColor,
  getColorTemperature,
  getDimming,
  getOn,
  isGroupedLight
} from '../schema'

export class GroupedLightEventHandler implements BridgeEventHandler {
  constructor (public model: Model) {}
  update (resource: BridgeEvent['data'][number]): void {
    console.log('Groupoed Light Handler', { resource })

    switch (resource.owner.rtype) {
      case 'room':
        const room = this.model.getRoom(resource.owner.rid)

        if (!room) {
          return
        }

        const dimming = getDimming(resource)

        if (dimming) {
          room.brightness.set(dimming.brightness)
        }

        const on = getOn(resource)

        if (on) {
          room.on.set(on.on)
        }
    }
  }

  add (): void {}

  delete (): void {}

  error (): void {}
}
