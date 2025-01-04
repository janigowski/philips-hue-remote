import { fireEvent, render, screen } from "@testing-library/svelte";
import { beforeEach, describe, expect, it, vi } from "vitest";
import ListItem from "./ListItem.svelte";

describe('ListItem', () => {
    it('renders name, on toggle and icon', () => {
        render(ListItem, {
            props: {
                name: 'Desk Lightbulb',
                icon: '💡'
            }
        })

        expect(screen.getByText('Desk Lightbulb')).toBeInTheDocument()
        expect(screen.getByTestId('on-toggle')).toBeInTheDocument()
        expect(screen.getByText('💡')).toBeInTheDocument()
    })

    it('brightness slider', () => {
        render(ListItem, {
            props: {
                name: 'Desk Lightbulb',
                icon: '💡'
            }
        })

        const slider = screen.getByTestId('brightness')
        expect(slider).toBeInTheDocument()
        expect(slider).toHaveAttribute('min', '0')
        expect(slider).toHaveAttribute('max', '100')
        expect(slider).toHaveAttribute('step', '0.001')
    })

    it('notifies about on toggle change', async () => {
        const { component } = render(ListItem, {
            props: {
                on: true
            }
        })
        const toggle = screen.getByTestId('on-toggle')
        const handler = vi.fn()

        component.$on('toggle', handler)

        await fireEvent.click(toggle)
        const event = handler.mock.calls[0][0];

        expect(handler).toHaveBeenCalledTimes(1)
        expect(event.detail).toEqual({ checked: false })
    })

    it('notifies about brightness change', async () => {
        const { component } = render(ListItem, {
            props: {
                brightness: 0.5
            }
        })
        const slider = screen.getByTestId('brightness')
        const handler = vi.fn()

        component.$on('brightnessChange', handler)

        await fireEvent.input(slider, {
            target: {
                value: 1
            }
        })
        const event = handler.mock.calls[0][0];

        expect(handler).toHaveBeenCalledTimes(1)
        expect(event.detail).toEqual({ value: 1 });
    })
})