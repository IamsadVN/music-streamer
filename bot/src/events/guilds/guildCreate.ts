import { Guild } from "discord.js";
import Listener from "../listener.js";
import { botLogger } from "../../utils/logger.js";
import { guildLocaleCodeWrite } from "../../database/index.js";

export default class GuildCreate extends Listener<"guildCreate"> {
    constructor() {
        super("guildCreate");
    }

    public async execute(guild: Guild): Promise<void> {
        botLogger.debug(`Joined a guild name ${guild.name} (ID: ${guild.id})`);

        await guildLocaleCodeWrite(guild.id, guild.preferredLocale);
    }
}