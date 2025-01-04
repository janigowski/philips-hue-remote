import { fireEvent, render, screen } from '@testing-library/svelte'
import { describe, expect, it } from 'vitest'
// import Home from "./Home.svelte";

class Room {
  constructor (public name: string, public on: boolean) {}

  async toggleOn () {
    console.log('toggle on looool')

    /*
        #1 Using hueClient here might be intuitive, but will require to
        pass hueClient as dependency for each Room object.
        Is that a problem?
        Is this a responsibility of a Room to make requests of such a client?
  
  
        hueClient.setGroupedLights(rid)
  
        #2 Use App/EventBus/Controller
        This solution might forward toggling room higher in the strcture.
        Ex. App can decide to:
          - request hueClient toggle light
          - set Room property -> Which updates UI by reactivity
        
        This way Room became storage for On/Off and Brightness.
  
        */
  }
}

describe.skip('Home', () => {
  describe('Rooms', () => {
    it('renders loader', async () => {
      render(Home, {
        props: {
          rooms: {
            data: [],
            loaded: false
          }
        }
      })

      expect(screen.getByText('Loading rooms...')).toBeInTheDocument()
    })

    it.skip('renders rooms', async () => {
      render(Home, {
        props: {
          rooms: {
            data: [new Room('Salon', false)],
            loaded: true
          }
        }
      })

      expect(screen.getByText('Rooms')).toBeInTheDocument()
      expect(screen.getByText('Salon')).toBeInTheDocument()

      const toggle = screen.getByTestId('on-toggle')
      await fireEvent.click(toggle)
    })
  })
})
