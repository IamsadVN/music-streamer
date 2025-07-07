import { Guild } from "discord.js";
import Listener from "../listener.js";
import { botLogger } from "../../utils/logger.js";
import { guildLocaleCodeDelete } from "../../database/index.js";

export default class GuildDelete extends Listener<"guildDelete"> {
    constructor() {
        super("guildDelete");
    }

    public async execute(guild: Guild): Promise<void> {
        botLogger.debug(`Left a guild name ${guild.name} (ID: ${guild.id})`);

        await guildLocaleCodeDelete(guild.id);
    }
}