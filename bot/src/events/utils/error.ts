import { Events } from "discord.js";
import Listener from "../listener.js";
import { botLogger } from "../../utils/logger.js";

export default class ErrorEvent extends Listener<Events.Error> {
    constructor() {
        super(Events.Error);
    }
    
    public async execute(error: Error): Promise<void> {
        botLogger.error(error);
    }
}