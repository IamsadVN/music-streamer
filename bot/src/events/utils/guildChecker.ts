import { Client } from "discord.js";
import Listener from "../listener.js";
import { guildLocaleCodeGet, guildLocaleCodeWrite } from "../../database/index.js";

export default class GuildChecker extends Listener<"ready"> {
    constructor() {
        super("ready",true);
    }

    public async execute(client: Client<true>): Promise<void> {
        const { guilds } = client;

        guilds.cache.forEach(async (guild) => {
            const localCode = await guildLocaleCodeGet(guild.id);

            if (localCode.length === 0) {
                await guildLocaleCodeWrite(guild.id, guild.preferredLocale);
            }
        })
    }
}