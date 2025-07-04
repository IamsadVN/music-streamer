import { Client, EmbedBuilder, GatewayIntentBits } from "discord.js";
import { config } from "dotenv";
import { getListeners, Logger } from "./utils/index.js";

config();

export class MusicStreamer<Ready extends boolean = boolean> extends Client<Ready> {
    constructor() {
        super({
            intents: [
                GatewayIntentBits.Guilds,
                GatewayIntentBits.GuildMessages,
                GatewayIntentBits.GuildMembers
            ]
        });
    }

    public async init() {
        for (const listener of await getListeners()) {
            listener.client = this as MusicStreamer<true>;

            const method = listener.once ? "once" : "on";

            this[method](listener.name, listener.execute!.bind(listener));

            
        }
        
        Logger.bot.info(`Loaded ${(await getListeners()).length} events`);

        await this.login(process.env.BOT_TOKEN!);
    }

}

const client = new MusicStreamer();

await client.init();