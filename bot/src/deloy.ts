import { APIUser, REST, RESTPostAPIApplicationCommandsResult, Routes, SlashCommandBuilder } from "discord.js";
import { config } from "dotenv";
import { getCommands } from "./utils/loaders.js";

config();

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