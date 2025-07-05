import { Client, Events } from "discord.js";
import Listener from "../listener.js";
import { botLogger } from "../../utils/logger.js";

export default class Ready extends Listener<Events.ClientReady> {
    constructor() {
        super(Events.ClientReady, true);
    }

    public async execute(client: Client<true>) {
        botLogger.info(`Logged with name ${client.user.username}`);

        client.user.setPresence({
            status: "dnd"
        });
        
    }
}