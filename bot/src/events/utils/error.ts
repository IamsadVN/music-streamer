import Listener from "../listener.js";
import { botLogger } from "../../utils/logger.js";

export default class ErrorEvent extends Listener<"error"> {
    constructor() {
        super("error");
    }
    
    public async execute(error: Error): Promise<void> {
        botLogger.error(error);
    }
}