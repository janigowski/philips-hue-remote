import { describe, expect, it } from 'vitest';
import { render } from '@testing-library/svelte';
import Menu from './Menu.svelte';

describe('Menu', () => {
    it('renders items', () => {
        const { getByText } = render(Menu);
        expect(getByText('Link Bridge')).toBeInTheDocument();
        expect(getByText('Remote')).toBeInTheDocument();
        expect(getByText('Settings')).toBeInTheDocument();
    });
});
