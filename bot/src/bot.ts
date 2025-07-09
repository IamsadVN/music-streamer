import { Client, GatewayIntentBits, Locale } from "discord.js";
import { getCommands, getListeners } from "./utils/loaders.js";
import { botLogger } from "./utils/logger.js"; 
import CommandManager from "./managers/commandManager.js";
import i18next from "i18next";
import FsBackend, { FsBackendOptions } from "i18next-fs-backend";
import configEnv from "./config.js";

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
        await i18next.use(FsBackend).init<FsBackendOptions>({
            preload: [Locale.Vietnamese, Locale.EnglishUS],
            fallbackLng: [Locale.Vietnamese],
            supportedLngs: [Locale.Vietnamese, Locale.EnglishUS],

            load: "all",
            nonExplicitSupportedLngs: false,
            saveMissing: true,
            updateMissing: false,

            backend: {
                loadPath: "./locales/{{lng}}.json"
            }
        }, (error,t) => {
            if (error) return botLogger.error(error);

            botLogger.info(`Loaded translation for ${i18next.languages.join(", ")}`);
            botLogger.debug(`Some key: "${t("commands.ping.slash.description", { lng: "vi" })}", "${t("commands.ping.slash.description", {lng: "en-US"})}"`);
        });

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

        await this.login(configEnv.botToken!);
    }

}

const client = new MusicStreamer();

await client.init();

export default client;