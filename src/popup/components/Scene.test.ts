import { fireEvent, render, screen } from "@testing-library/svelte";
import { beforeEach, describe, expect, it, vi } from "vitest";
import Scene from "./Scene.svelte";

describe('Scene', () => {
    it('renders name and icon', () => {
        render(Scene, {
            props: {
                name: 'Living Room',
                icon: '💡'
            }
        })

        expect(screen.getByText('Living Room')).toBeInTheDocument()
        expect(screen.getByText('💡')).toBeInTheDocument()
    })


    it('notifies about click', async () => {
        const { component } = render(Scene, {
            props: {
                name: 'Kitchen'
            }
        })
        const handler = vi.fn()

        component.$on('click', handler)

        await fireEvent.click(screen.getByText('Kitchen'))
        const event = handler.mock.calls[0][0];

        expect(handler).toHaveBeenCalledTimes(1)
    })
})