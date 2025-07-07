import Listener from "../listener.js";
import { botLogger } from "../../utils/logger.js";

export default class WarnEvent extends Listener<"warn"> {
    constructor() {
        super("warn");
    }

    public async execute(message: string): Promise<void> {
        botLogger.warn(message);
    }
}