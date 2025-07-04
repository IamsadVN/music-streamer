import { Events } from "discord.js";
import Listener from "../listener.js";
import { Logger } from "../../utils/index.js";

export default class WarnEvent extends Listener<Events.Warn> {
    constructor() {
        super(Events.Warn);
    }

    public async execute(message: string): Promise<void> {
        Logger.bot.warn(message);
    }
}