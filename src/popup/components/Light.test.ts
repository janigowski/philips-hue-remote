import { fireEvent, render, screen } from "@testing-library/svelte";
import { describe, expect, it, vi } from "vitest";
import Light from "./Light.svelte";

describe('Light', () => {
    it('renders name, icon and toggle', () => {
        render(Light, {
            props: {
                name: 'Sofa 1',
                icon: '🛋️'
            }
        })

        expect(screen.getByText('Sofa 1')).toBeInTheDocument()
        expect(screen.getByText('🛋️')).toBeInTheDocument()
        expect(screen.getByTestId('on-toggle')).toBeInTheDocument()
    })


    it('notifies about on toggle change', async () => {
        const { component } = render(Light, {
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
})