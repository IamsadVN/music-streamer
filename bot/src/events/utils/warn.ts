import { Events } from "discord.js";
import Listener from "../listener.js";
import { botLogger } from "../../utils/logger.js";

export default class WarnEvent extends Listener<Events.Warn> {
    constructor() {
        super(Events.Warn);
    }

    public async execute(message: string): Promise<void> {
        botLogger.warn(message);
    }
}