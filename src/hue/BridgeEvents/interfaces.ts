import type { BridgeEvent } from './schema'

export interface BridgeEventHandler {
  update(resource: BridgeEvent['data'][number]): void
  add(): void
  delete(): void
  error(): void
}
