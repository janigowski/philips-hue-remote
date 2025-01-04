import { writable } from 'svelte/store'
import { PhilipsHueClient } from '../hue/client'
import createDebug from 'debug'
import { Collection } from '../shared/Collection'
import { BridgeController } from '../hue/Bridge'
import type { Room } from './interfaces'

export const hueClient = new PhilipsHueClient()

export type AppStatus = 'loading' | 'installed'

const debug = createDebug('philips-hue-remote:app')

class App {
  public status = writable<AppStatus>('loading')
  public rooms = new Collection<Room>()
  public bridge?: BridgeController

  constructor () {
    this.init()
  }

  async init () {
    debug('init')

    const [bridgeIp, appKey] = await Promise.all([
      this.getBridgeIp(),
      this.getAppKey()
    ])

    debug('bridge IP', bridgeIp)
    debug('app key', appKey)

    hueClient.setBridgeIpAddress(bridgeIp)
    hueClient.setAppKey(appKey)

    if (bridgeIp && appKey) {
      this.bridge = new BridgeController(bridgeIp, appKey)
      await this.bridge.connect()
      this.status.set('installed')
    }
  }

  async saveBridgeIp (ip: string): Promise<void> {
    hueClient.setBridgeIpAddress(ip)
    await chrome.storage.local.set({
      bridgeIp: ip
    })

    debug('bridge IP set:', ip)
  }

  async getBridgeIp (): Promise<string> {
    const result = await chrome.storage.local.get(['bridgeIp'])
    return result.bridgeIp
  }

  async saveAppKey (appKey: string): Promise<void> {
    hueClient.setAppKey(appKey)

    await chrome.storage.local.set({
      hueAppKey: appKey
    })

    debug('app key set:', appKey)
  }

  async getAppKey (): Promise<string> {
    const result = await chrome.storage.local.get(['hueAppKey'])

    return result.hueAppKey
  }
}

export const app = new App()
