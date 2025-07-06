import { Client, GatewayIntentBits } from "discord.js";
import { getCommands, getListeners } from "./utils/loaders.js";
import { botLogger } from "./utils/logger.js"; 
import CommandManager from "./managers/commandManager.js";

export class MusicStreamer<Ready extends boolean = boolean> extends Client<Ready> {
    public commands: CommandManager;

    constructor() {
        super({
            intents: [
                GatewayIntentBits.Guilds,
                GatewayIntentBits.GuildMessages,
                GatewayIntentBits.GuildMembers
            ]
        });

        this.commands = new CommandManager(this as MusicStreamer<true>);
    }

    public async init() {
        const listeners = await getListeners();

        for (const listener of listeners) {
            listener.client = this as MusicStreamer<true>;

            const method = listener.once ? "once" : "on";

            this[method](listener.name, listener.execute!.bind(listener)); 
        }
        
        botLogger.info(`Loaded ${listeners.length} events`);

        for (const command of await getCommands()) {
            this.commands.add(command);
        }

        await this.login(process.env.BOT_TOKEN!);
    }

}

const client = new MusicStreamer();

await client.init();