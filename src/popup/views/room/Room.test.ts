import { fireEvent, render, screen } from "@testing-library/svelte";
import { afterAll, describe, expect, it, vi } from "vitest";
import Room from "./Room.svelte";
import Router, { push } from "svelte-spa-router";
import { readable } from "svelte/store";

const brightnessHandler = vi.fn()

describe('Room', () => {
    afterAll(() => {
        vi.resetModules();
    });


    vi.mock('../../app', async () => {
        return {
            app: {
                room(id: string) {
                    return {
                        name: readable('Living Room'),
                        scenes: readable([
                            {
                                name: 'Bright'
                            },
                            {
                                name: 'Relax'
                            }
                        ]),
                        lights: readable([
                            {
                                name: 'Sofa 1'
                            },
                            {
                                name: 'Sofa 2'
                            }
                        ]),
                        changeBrightness: brightnessHandler
                    }
                }
            }
        }
    })

    it('renders name, back button, scenes, toggle, brightnes slider and lights', async () => {

        render(Room)

        expect(screen.getByText('Living Room')).toBeInTheDocument()
        expect(screen.getByText('<')).toBeInTheDocument()
        expect(screen.getByTestId('on-toggle')).toBeInTheDocument()

        expect(screen.getByText('Bright')).toBeInTheDocument()
        expect(screen.getByText('Relax')).toBeInTheDocument()

        expect(screen.getByText('Sofa 1')).toBeInTheDocument()
        expect(screen.getByText('Sofa 2')).toBeInTheDocument()
    })

    it.todo('go back on back button click', async () => {
        render(Router, {
            props: {
                routes: {
                    '/': Room
                }
            }
        });


        push('/');
        // window.history.pushState({}, 'Home', '/home');
        // window.history.pushState({}, 'Room', '/room');
        // window.history.pushState({}, 'Room', '/room/qwerty-123');

        const button = screen.getByText('<')
        await fireEvent.click(button);

        expect(window.location.pathname).toBe('/');
        // expect(window.location.pathname).toBe('/home');
    })

    it('notifies about on toggle change', async () => {
        const { component } = render(Room)
        const toggle = screen.getByTestId('on-toggle')
        const handler = vi.fn()

        component.$on('toggle', handler)

        await fireEvent.click(toggle)
        const event = handler.mock.calls[0][0];

        expect(handler).toHaveBeenCalledTimes(1)
        expect(event.detail).toEqual({ checked: false })
    })

    it('notifies about brightness change', async () => {
        const { component } = render(Room)
        const slider = screen.getByTestId('brightness')

        component.$on('brightnessChange', brightnessHandler)

        await fireEvent.input(slider, {
            target: {
                value: 1
            }
        })
        const value = brightnessHandler.mock.calls[0][0];

        expect(brightnessHandler).toHaveBeenCalledTimes(1)
        expect(value).toEqual(1);
    })
})
