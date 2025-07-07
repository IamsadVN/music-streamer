import { APIUser, REST, RESTPostAPIApplicationCommandsResult, Routes, Locale } from "discord.js";
import { config } from "dotenv";
import { getCommands } from "./utils/loaders.js";
import i18next from "i18next";
import FsBackend, {FsBackendOptions} from "i18next-fs-backend";

config();

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
    if (error) return console.error(error);

    console.log(`Loaded translation for ${i18next.languages.join(", ")}`);
});


const applicationCommands = [];

for (const command of await getCommands()) {
    for (const data of command.applicationCommands) {
        applicationCommands.push(data)
    }
}

const rest = new REST().setToken(process.env.BOT_TOKEN!);

const user = (await rest.get(Routes.user())) as APIUser;

const commands = (await rest.put(Routes.applicationCommands(user.id), {
    body: applicationCommands
})) as RESTPostAPIApplicationCommandsResult[];

console.log(`Loaded ${commands.length} commands`);