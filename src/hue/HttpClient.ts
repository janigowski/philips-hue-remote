// bridge.ts
import ky from 'ky'
import {
  GroupedLightResponseSchema,
  RoomsResponseSchema,
  type GroupedLightResponse,
  type RoomResponse
} from './schemas'
import { getErrorMessage } from './errors'
import { Room } from '../popup/interfaces'
import { z } from 'zod'

interface GroupedLightUpdate {
  on?: {
    on: boolean
  }
  dimming?: {
    brightness: number
  }
  color?: {
    xy: {
      x: number
      y: number
    }
  }
}

export class HttpClient {
  private ipAddress: string
  private appKey: string
  private client: typeof ky
  private groupedLights: GroupedLightResponse['data'] = []

  constructor (ipAddress: string, appKey: string) {
    this.ipAddress = ipAddress
    this.appKey = appKey
    this.client = ky.create({
      prefixUrl: `https://${this.ipAddress}/clip/v2/resource`,
      headers: {
        'hue-application-key': this.appKey
      },
      timeout: 10000
    })
  }

  private handleError (error: any) {
    const status = error.response?.status
    const { code, message } = getErrorMessage(status)
    return { code, message }
  }

  async fetchRooms (): Promise<RoomResponse[]> {
    try {
      const response = await this.client.get('room').json()
      const parsedData = RoomsResponseSchema.parse(response)

      return parsedData.data
    } catch (error) {
      throw this.handleError(error)
    }
  }

  async fetchLights (): Promise<unkown> {
    try {
      const response = await this.client.get('light').json()

      return response.data
    } catch (error) {
      if (error instanceof z.ZodError) {
        console.error('Lights Validation error:', error.errors)
      } else {
        throw this.handleError(error)
      }
    }
  }

  async fetchGroupedLights (): Promise<GroupedLightResponse[]> {
    try {
      const response = await this.client.get('grouped_light').json()
      const parsedData = GroupedLightResponseSchema.parse(response)

      return parsedData.data
    } catch (error) {
      if (error instanceof z.ZodError) {
        console.error('Grouped Lights Validation error:', error.errors)
      } else {
        throw this.handleError(error)
      }
    }
  }

  async updateGroupedLights (
    groupId: string,
    updateData: GroupedLightUpdate
  ): Promise<void> {
    try {
      await this.client.put(`grouped_light/${groupId}`, {
        json: updateData
      })
    } catch (error) {
      throw this.handleError(error)
    }
  }
}
