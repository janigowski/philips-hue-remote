// schemas.ts
import { z } from 'zod'

export const RoomSchema = z.object({
  id: z.string(),
  id_v1: z.string(),
  children: z.array(
    z.object({
      rid: z.string(),
      rtype: z.string()
    })
  ),
  services: z.array(
    z.object({
      rid: z.string(),
      rtype: z.string()
    })
  ),
  metadata: z.object({
    name: z.string(),
    archetype: z.string()
  }),
  type: z.string()
})

export const RoomsResponseSchema = z.object({
  data: z.array(RoomSchema)
})

export type RoomResponse = z.infer<typeof RoomSchema>

// Schema for Error object
const ErrorSchema = z.object({
  description: z.string()
})

// Schema for owner object
const OwnerSchema = z.object({
  rid: z.string().regex(/^[0-9a-f]{8}-([0-9a-f]{4}-){3}[0-9a-f]{12}$/),
  rtype: z.enum([
    'device',
    'bridge_home',
    'room',
    'zone',
    'service_group',
    'light',
    'button',
    'relative_rotary',
    'temperature',
    'light_level',
    'motion',
    'camera_motion',
    'entertainment',
    'contact',
    'tamper',
    'grouped_light',
    'grouped_motion',
    'grouped_light_level',
    'device_power',
    'device_software_update',
    'zigbee_bridge_connectivity',
    'zigbee_connectivity',
    'zgp_connectivity',
    'remote_access',
    'bridge',
    'zigbee_device_discovery',
    'system_update',
    'homekit',
    'matter',
    'matter_fabric',
    'scene',
    'entertainment_configuration',
    'public_image',
    'auth_v1',
    'behavior_script',
    'behavior_instance',
    'geofence',
    'geofence_client',
    'geolocation',
    'smart_scene'
  ])
})

// Schema for on object
const OnSchema = z.object({
  on: z.boolean()
})

// Schema for dimming object
const DimmingSchema = z.object({
  brightness: z.number().max(100)
})

// Schema for alert object
const AlertSchema = z.object({
  action_values: z.array(z.string())
})

// Schema for signaling object
const SignalingSchema = z.object({
  signal_values: z.array(z.string())
})

// Schema for GroupedLightGet object
const GroupedLightSchema = z.object({
  type: z.literal('grouped_light'),
  id: z.string().regex(/^[0-9a-f]{8}-([0-9a-f]{4}-){3}[0-9a-f]{12}$/),
  owner: OwnerSchema,
  on: OnSchema.optional(),
  dimming: DimmingSchema.optional(),
  alert: AlertSchema.optional(),
  signaling: SignalingSchema.optional()
})

export const GroupedLightResponseSchema = z.object({
  errors: z.array(ErrorSchema),
  data: z.array(GroupedLightSchema)
})

export type GroupedLightResponse = z.infer<typeof GroupedLightSchema>

export const ErrorResponseSchema = z.object({
  errors: z.array(ErrorSchema),
  description: z.string()
})
export type ErrorResponse = z.infer<typeof ErrorResponseSchema>
