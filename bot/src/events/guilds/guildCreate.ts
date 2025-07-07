import { Guild } from "discord.js";
import Listener from "../listener.js";
import { botLogger } from "../../utils/logger.js";

export default class GuildCreate extends Listener<"guildCreate"> {
    constructor() {
        super("guildCreate");
    }

    public async execute(guild: Guild): Promise<void> {
        // botLogger.info(`Đã vào guild ${guild.name} (ID: ${guild.id})`)
    }
}