import { derived, get, writable, type Readable } from "svelte/store";

export class Collection<T> {
    private _items = writable<T[]>([])

    constructor(items?: T[]) {
        if (items) {
            items.forEach(item => this.add(item));
        }
    }

    add(item: T): void {
        this._items.update(items => {
            items.push(item)
            return items
        })
    }

    replace(items: T[]): void {
        this._items.update(_ => {
            return items
        })
    }

    remove(item: T): void {
        this._items.update(items => {
            return items.filter(i => i !== item)
        })
    }

    ofId(id: unknown): T | undefined {
        return get(this._items).find(item => item.id === id)
    }

    get items(): Readable<T[]> {
        return derived(this._items, $items => $items)
    }
}