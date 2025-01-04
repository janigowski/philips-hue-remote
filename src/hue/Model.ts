import { derived, get, writable } from 'svelte/store'
import { Room } from '../popup/interfaces'

interface PartialLightUpdate {
  on?: boolean
}
export class Model {
  public lights = writable([])
  public groupedLights = writable([])
  public rooms = writable<Room[]>([])

  constructor () {}

  getRoom (id: string): Room | undefined {
    const rooms = get(this.rooms)
    const room = rooms.find(room => room.id === id)

    return room
  }

  updateLight (id: string, data: PartialLightUpdate) {
    this.lights.update(lights => {
      // find light
      // merge new data into it
      return lights.map(light => {
        if (light.id === id) {
          light = {
            ...light,
            ...data
          }
        }

        return light
      })
    })
  }

  updateGroupedLight (id: string, data: PartialLightUpdate) {
    this.groupedLights.update(lights => {
      // find light
      // merge new data into it

      return lights.map(light => {
        if (light.id === id) {
          light = {
            ...light,
            ...data
          }

          console.log('grouped light change', light)
        }

        return light
      })
    })
  }
}
