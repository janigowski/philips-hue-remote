
import { writable, type Writable } from 'svelte/store';
export interface IRoomDTO {
    name: string
    id: string
    on: boolean
    colors: string[]
    brightness: number
    icon: string
}

// export interface IRoom {
//     name: string
//     id: string
//     on: Readable<boolean>
//     colors: Readable<string[]>
//     brightness: Readable<number>
//     icon: string
// }



interface RoomConfig {
    name: string;
    id: string;
    on: boolean;
    colors: string[];
    brightness: number;
    icon: string;
}

export class Room {
    public id: string;
    public name: Writable<string>;
    public on: Writable<boolean>;
    public colors: Writable<string[]>;
    public brightness: Writable<number>;
    public icon: Writable<string>;

    constructor(config: RoomConfig) {
        this.id = config.id
        this.name = writable(config.name);
        this.on = writable(config.on);
        this.colors = writable(config.colors);
        this.brightness = writable(config.brightness);
        this.icon = writable(config.icon);
    }
}