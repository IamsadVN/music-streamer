import { ActivityType, Client } from "discord.js";
import Listener from "../listener.js";
import { botLogger } from "../../utils/logger.js";

export default class Ready extends Listener<"ready"> {
    constructor() {
        super("ready", true);
    }

    public async execute(client: Client<true>) {
        botLogger.info(`Logged with name ${client.user.username}`);

        client.user.setActivity({
            name: "Nhìn cái gì, nghe nhạc không?",
            type: ActivityType.Listening
        })
    }
}