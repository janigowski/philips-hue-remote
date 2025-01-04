import { http, HttpResponse } from 'msw'

export const discoverySuccess = http.get(
  'https://discovery.meethue.com',
  () => {
    return HttpResponse.json([
      {
        id: '991248eeee7d46fa',
        internalipaddress: '192.168.0.44',
        port: 443
      }
    ])
  }
)

export const rooms = {
  get: {
    success: http.get('https://192.168.0.1/clip/v2/resource/room', () => {
      return HttpResponse.json({
        errors: [],
        data: [
          {
            id: 'e55e5e2d-4a50-4122-8adf-020c8dc523e5',
            id_v1: '/groups/85',
            children: [
              {
                rid: 'e121cb22-7be1-4d72-8448-be43a55fb23c',
                rtype: 'device'
              },
              {
                rid: 'ecb5f52a-5e93-4fb1-aff1-a43d8e213678',
                rtype: 'device'
              }
            ],
            services: [
              {
                rid: 'a5cdb29e-3f6d-481f-8b31-f0386474cec2',
                rtype: 'grouped_light'
              }
            ],
            metadata: {
              name: 'Salon',
              archetype: 'living_room'
            },
            type: 'room'
          },
          {
            id: 'ff1a4d8c-6207-400a-8ec2-81df5c333ec5',
            id_v1: '/groups/82',
            children: [
              {
                rid: 'b2792e66-67d9-45a6-a8c4-36b3db001c98',
                rtype: 'device'
              },
              {
                rid: '565646af-dbb2-4656-82eb-ba4529a96a1d',
                rtype: 'device'
              }
            ],
            services: [
              {
                rid: '47738085-f811-483a-a4b7-675b213ccd09',
                rtype: 'grouped_light'
              }
            ],
            metadata: {
              name: 'Desk',
              archetype: 'office'
            },
            type: 'room'
          }
        ]
      })
    })
  }
}

export const light = {
  get: {
    success: http.get('https://192.168.0.1/clip/v2/resource/light', () => {
      return HttpResponse.json({
        errors: [],
        data: [
          {
            id: '097bf185-d35e-4ffc-ade8-755338fcfd85',
            id_v1: '/lights/8',
            owner: {
              rid: 'e121cb22-7be1-4d72-8448-be43a55fb23c',
              rtype: 'device'
            },
            metadata: {
              name: 'Sofa 1',
              archetype: 'classic_bulb',
              function: 'mixed'
            },
            product_data: { function: 'mixed' },
            identify: {},
            service_id: 0,
            on: { on: false },
            dimming: { brightness: 79.84 },
            dimming_delta: {},
            color_temperature: {
              mirek: null,
              mirek_valid: false,
              mirek_schema: { mirek_minimum: 250, mirek_maximum: 454 }
            },
            color_temperature_delta: {},
            color: {
              xy: { x: 0.5121, y: 0.4371 },
              gamut: {
                red: { x: 0.0, y: 0.0 },
                green: { x: 0.0, y: 0.0 },
                blue: { x: 0.0, y: 0.0 }
              },
              gamut_type: 'other'
            },
            dynamics: {
              status: 'none',
              status_values: ['none'],
              speed: 0.0,
              speed_valid: false
            },
            alert: { action_values: ['breathe'] },
            signaling: { signal_values: ['no_signal', 'on_off'] },
            mode: 'normal',
            type: 'light'
          },
          {
            id: '13b9c31f-5fdb-4a0d-9ee4-cb93621d367a',
            id_v1: '/lights/3',
            owner: {
              rid: '565646af-dbb2-4656-82eb-ba4529a96a1d',
              rtype: 'device'
            },
            metadata: {
              name: 'Desk',
              archetype: 'flexible_lamp',
              function: 'mixed'
            },
            product_data: { function: 'mixed' },
            identify: {},
            service_id: 0,
            on: { on: true },
            dimming: { brightness: 100.0, min_dim_level: 1.0 },
            dimming_delta: {},
            color_temperature: {
              mirek: 343,
              mirek_valid: true,
              mirek_schema: { mirek_minimum: 153, mirek_maximum: 500 }
            },
            color_temperature_delta: {},
            color: {
              xy: { x: 0.4431, y: 0.4061 },
              gamut: {
                red: { x: 0.6915, y: 0.3083 },
                green: { x: 0.17, y: 0.7 },
                blue: { x: 0.1532, y: 0.0475 }
              },
              gamut_type: 'C'
            },
            dynamics: {
              status: 'none',
              status_values: ['none', 'dynamic_palette'],
              speed: 0.0,
              speed_valid: false
            },
            alert: { action_values: ['breathe'] },
            signaling: {
              signal_values: [
                'no_signal',
                'on_off',
                'on_off_color',
                'alternating'
              ]
            },
            mode: 'normal',
            effects: {
              status_values: [
                'no_effect',
                'candle',
                'fire',
                'prism',
                'sparkle',
                'opal',
                'glisten'
              ],
              status: 'no_effect',
              effect_values: [
                'no_effect',
                'candle',
                'fire',
                'prism',
                'sparkle',
                'opal',
                'glisten'
              ]
            },
            powerup: {
              preset: 'safety',
              configured: true,
              on: { mode: 'on', on: { on: true } },
              dimming: { mode: 'dimming', dimming: { brightness: 100.0 } },
              color: {
                mode: 'color_temperature',
                color_temperature: { mirek: 366 }
              }
            },
            type: 'light'
          },
          {
            id: '2f6e9529-e67e-4242-81c3-8a2b4f637cc0',
            id_v1: '/lights/9',
            owner: {
              rid: 'ecb5f52a-5e93-4fb1-aff1-a43d8e213678',
              rtype: 'device'
            },
            metadata: {
              name: 'Sofa 2',
              archetype: 'classic_bulb',
              function: 'mixed'
            },
            product_data: { function: 'mixed' },
            identify: {},
            service_id: 0,
            on: { on: false },
            dimming: { brightness: 79.84 },
            dimming_delta: {},
            color_temperature: {
              mirek: null,
              mirek_valid: false,
              mirek_schema: { mirek_minimum: 250, mirek_maximum: 454 }
            },
            color_temperature_delta: {},
            color: {
              xy: { x: 0.6696, y: 0.3237 },
              gamut: {
                red: { x: 0.0, y: 0.0 },
                green: { x: 0.0, y: 0.0 },
                blue: { x: 0.0, y: 0.0 }
              },
              gamut_type: 'other'
            },
            dynamics: {
              status: 'none',
              status_values: ['none'],
              speed: 0.0,
              speed_valid: false
            },
            alert: { action_values: ['breathe'] },
            signaling: { signal_values: ['no_signal', 'on_off'] },
            mode: 'normal',
            type: 'light'
          },
          {
            id: 'aa46dc94-0c70-46f2-a545-3c7b14dbed5e',
            id_v1: '/lights/2',
            owner: {
              rid: 'bbae9e25-15a7-4a77-98c8-cb7d850dbc2d',
              rtype: 'device'
            },
            metadata: {
              name: 'Ambient 2',
              archetype: 'flexible_lamp',
              function: 'mixed'
            },
            product_data: { function: 'mixed' },
            identify: {},
            service_id: 0,
            on: { on: false },
            dimming: { brightness: 79.84, min_dim_level: 1.0 },
            dimming_delta: {},
            color_temperature: {
              mirek: null,
              mirek_valid: false,
              mirek_schema: { mirek_minimum: 153, mirek_maximum: 500 }
            },
            color_temperature_delta: {},
            color: {
              xy: { x: 0.6153, y: 0.3655 },
              gamut: {
                red: { x: 0.6915, y: 0.3083 },
                green: { x: 0.17, y: 0.7 },
                blue: { x: 0.1532, y: 0.0475 }
              },
              gamut_type: 'C'
            },
            dynamics: {
              status: 'none',
              status_values: ['none', 'dynamic_palette'],
              speed: 0.0,
              speed_valid: false
            },
            alert: { action_values: ['breathe'] },
            signaling: {
              signal_values: [
                'no_signal',
                'on_off',
                'on_off_color',
                'alternating'
              ]
            },
            mode: 'normal',
            effects: {
              status_values: [
                'no_effect',
                'candle',
                'fire',
                'prism',
                'sparkle',
                'opal',
                'glisten'
              ],
              status: 'no_effect',
              effect_values: [
                'no_effect',
                'candle',
                'fire',
                'prism',
                'sparkle',
                'opal',
                'glisten'
              ]
            },
            powerup: {
              preset: 'safety',
              configured: true,
              on: { mode: 'on', on: { on: true } },
              dimming: { mode: 'dimming', dimming: { brightness: 100.0 } },
              color: {
                mode: 'color_temperature',
                color_temperature: { mirek: 366 }
              }
            },
            type: 'light'
          },
          {
            id: 'ace54bae-607c-4a8c-b7ec-cbd4e65b9337',
            id_v1: '/lights/10',
            owner: {
              rid: '2308d269-7d8c-4d94-baae-259945b36971',
              rtype: 'device'
            },
            metadata: {
              name: 'Extended color light 3',
              archetype: 'classic_bulb',
              function: 'mixed'
            },
            product_data: { function: 'mixed' },
            identify: {},
            service_id: 0,
            on: { on: false },
            dimming: { brightness: 36.36 },
            dimming_delta: {},
            color_temperature: {
              mirek: null,
              mirek_valid: false,
              mirek_schema: { mirek_minimum: 250, mirek_maximum: 454 }
            },
            color_temperature_delta: {},
            color: {
              xy: { x: 0.4426, y: 0.4058 },
              gamut: {
                red: { x: 0.0, y: 0.0 },
                green: { x: 0.0, y: 0.0 },
                blue: { x: 0.0, y: 0.0 }
              },
              gamut_type: 'other'
            },
            dynamics: {
              status: 'none',
              status_values: ['none'],
              speed: 0.0,
              speed_valid: false
            },
            alert: { action_values: ['breathe'] },
            signaling: { signal_values: ['no_signal', 'on_off'] },
            mode: 'normal',
            type: 'light'
          },
          {
            id: 'e7567411-fa96-4514-becf-af6c6d4b15bf',
            id_v1: '/lights/1',
            owner: {
              rid: 'b2792e66-67d9-45a6-a8c4-36b3db001c98',
              rtype: 'device'
            },
            metadata: {
              name: 'Ambient 1',
              archetype: 'flexible_lamp',
              function: 'mixed'
            },
            product_data: { function: 'mixed' },
            identify: {},
            service_id: 0,
            on: { on: true },
            dimming: { brightness: 100.0, min_dim_level: 1.0 },
            dimming_delta: {},
            color_temperature: {
              mirek: 343,
              mirek_valid: true,
              mirek_schema: { mirek_minimum: 153, mirek_maximum: 500 }
            },
            color_temperature_delta: {},
            color: {
              xy: { x: 0.4431, y: 0.4061 },
              gamut: {
                red: { x: 0.6915, y: 0.3083 },
                green: { x: 0.17, y: 0.7 },
                blue: { x: 0.1532, y: 0.0475 }
              },
              gamut_type: 'C'
            },
            dynamics: {
              status: 'none',
              status_values: ['none', 'dynamic_palette'],
              speed: 0.0,
              speed_valid: false
            },
            alert: { action_values: ['breathe'] },
            signaling: {
              signal_values: [
                'no_signal',
                'on_off',
                'on_off_color',
                'alternating'
              ]
            },
            mode: 'normal',
            effects: {
              status_values: [
                'no_effect',
                'candle',
                'fire',
                'prism',
                'sparkle',
                'opal',
                'glisten'
              ],
              status: 'no_effect',
              effect_values: [
                'no_effect',
                'candle',
                'fire',
                'prism',
                'sparkle',
                'opal',
                'glisten'
              ]
            },
            powerup: {
              preset: 'safety',
              configured: true,
              on: { mode: 'on', on: { on: true } },
              dimming: { mode: 'dimming', dimming: { brightness: 100.0 } },
              color: {
                mode: 'color_temperature',
                color_temperature: { mirek: 366 }
              }
            },
            type: 'light'
          }
        ]
      })
    })
  }
}

export const groupedLights = {
  get: {
    success: http.get(
      'https://192.168.0.1/clip/v2/resource/grouped_light',
      () => {
        return HttpResponse.json({
          errors: [],
          data: [
            {
              id: '47738085-f811-483a-a4b7-675b213ccd09',
              id_v1: '/groups/82',
              owner: {
                rid: 'ff1a4d8c-6207-400a-8ec2-81df5c333ec5',
                rtype: 'room'
              },
              on: {
                on: true
              },
              dimming: {
                brightness: 0.0
              },
              dimming_delta: {},
              color_temperature: {},
              color_temperature_delta: {},
              color: {},
              alert: {
                action_values: ['breathe']
              },
              signaling: {
                signal_values: [
                  'alternating',
                  'no_signal',
                  'on_off',
                  'on_off_color'
                ]
              },
              dynamics: {},
              type: 'grouped_light'
            },
            {
              id: 'a5cdb29e-3f6d-481f-8b31-f0386474cec2',
              id_v1: '/groups/85',
              owner: {
                rid: 'e55e5e2d-4a50-4122-8adf-020c8dc523e5',
                rtype: 'room'
              },
              on: {
                on: false
              },
              dimming: {
                brightness: 100.0
              },
              dimming_delta: {},
              color_temperature: {},
              color_temperature_delta: {},
              color: {},
              alert: {
                action_values: ['breathe']
              },
              signaling: {
                signal_values: ['no_signal', 'on_off']
              },
              dynamics: {},
              type: 'grouped_light'
            }
          ]
        })
      }
    )
  }
}
