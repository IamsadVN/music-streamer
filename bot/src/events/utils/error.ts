import { Events } from "discord.js";
import Listener from "../listener.js";
import { Logger } from "../../utils/index.js";

export default class ErrorEvent extends Listener<Events.Error> {
    constructor() {
        super(Events.Error);
    }
    
    public async execute(error: Error): Promise<void> {
        Logger.error(error);
    }
}