import { z } from 'zod';

const ownerSchema = z.object({
    rid: z.string(),
    rtype: z.enum(['device', 'bridge', 'bridge_home', 'room', 'zone']),
});

const metadataSchema = z.object({
    name: z.string().optional(),
    archetype: z.string().optional(),
}).optional();

const dimmingSchema = z.object({
    brightness: z.number().min(0).max(100),
});

const onSchema = z.object({
    on: z.boolean(),
});

const colorSchema = z.object({
    xy: z.object({
        x: z.number(),
        y: z.number(),
    }),
});

const colorTemperatureSchema = z.object({
    mirek: z.number().min(153).max(500),
});

const baseResourceSchema = z.object({
    id: z.string(),
    id_v1: z.string().optional(),
    owner: ownerSchema,
    metadata: metadataSchema.optional(),
});

const lightSchema = baseResourceSchema.extend({
    type: z.literal('light'),
    on: onSchema.optional(),
    dimming: dimmingSchema.optional(),
    color: colorSchema.optional(),
    color_temperature: colorTemperatureSchema.optional(),
    service_id: z.number().optional(),
});


// @TODO: How to test it?
const groupedLightSchema = baseResourceSchema.extend({
    type: z.literal('grouped_light'),
    on: onSchema.optional(),
    dimming: dimmingSchema.optional(),
});

const otherResourceSchema = baseResourceSchema.extend({
    type: z.enum([
        'room', 'zone', 'bridge_home', 'device', 'bridge', 'device_power',
        'zigbee_connectivity', 'zgp_connectivity', 'light_level', 'relative_rotary',
        'behavior_script', 'behavior_instance', 'geofence', 'geofence_client',
        'entertainment_configuration', 'entertainment', 'scene'
    ]),
});

const resourceSchema = z.discriminatedUnion('type', [
    lightSchema,
    groupedLightSchema,
    otherResourceSchema,
]);

const bridgeEventSchema = z.object({
    creationtime: z.string().datetime(),
    data: z.array(resourceSchema),
    id: z.string(),
    type: z.enum(['update', 'add', 'delete', 'error']),
});

const bridgeEventStreamSchema = z.array(bridgeEventSchema);

export type BridgeEvent = z.infer<typeof bridgeEventSchema>;
export type BridgeEventStream = z.infer<typeof bridgeEventStreamSchema>;
export type Resource = z.infer<typeof resourceSchema>;

export const parseBridgeEvent = (data: unknown): BridgeEventStream => {
    return bridgeEventStreamSchema.parse(data);
};

export const parseBridgeEventStrict = (data: unknown): BridgeEventStream => {
    return z.array(bridgeEventSchema.strict()).parse(data);
};

export const parseBridgeEventPassthrough = (data: unknown): BridgeEventStream => {
    return z.array(bridgeEventSchema.passthrough()).parse(data);
};

// Type guard functions
export const isLight = (resource: Resource): resource is z.infer<typeof lightSchema> =>
    resource.type === 'light';

export const isGroupedLight = (resource: Resource): resource is z.infer<typeof groupedLightSchema> =>
    resource.type === 'grouped_light';

// Helper functions to safely access properties
export const getDimming = (resource: Resource) => {
    if (isLight(resource) || isGroupedLight(resource)) {
        return resource.dimming;
    }
    return undefined;
};

export const getOn = (resource: Resource) => {
    if (isLight(resource) || isGroupedLight(resource)) {
        return resource.on;
    }
    return undefined;
};

export const getColor = (resource: Resource) => {
    if (isLight(resource)) {
        return resource.color;
    }
    return undefined;
};

export const getColorTemperature = (resource: Resource) => {
    if (isLight(resource)) {
        return resource.color_temperature;
    }
    return undefined;
};
