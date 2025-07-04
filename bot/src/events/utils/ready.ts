import { Client, Events } from "discord.js";
import Listener from "../listener.js";
import { Logger } from "../../utils/index.js";

export default class Ready extends Listener<Events.ClientReady> {
    constructor() {
        super(Events.ClientReady, true);
    }

    public async execute(client: Client<true>) {
        Logger.bot.info(`Logged with name ${client.user.username}`);

        client.user.setPresence({
            status: "dnd"
        });
        
    }
}