import { ClientEvents } from "discord.js";
import { MusicStreamer } from "../bot.js";

type EventKey = keyof ClientEvents;

export default abstract class Listener<EventName extends EventKey = EventKey> {
    public once: boolean;
    public name: EventName
    public client!: MusicStreamer<true>

    constructor(name: EventName, once: boolean = false) {
        this.name = name
        this.once = once;
    }
    
    public async execute?(...args: ClientEvents[EventName]): Promise<void>
}