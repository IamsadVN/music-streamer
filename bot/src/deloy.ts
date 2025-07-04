import { APIUser, REST, RESTPostAPIApplicationCommandsResult, Routes, SlashCommandBuilder } from "discord.js";
import { config } from "dotenv";

config();

const pingCommand = new SlashCommandBuilder()
    .setName("ping")
    .setDescription("Kiểm tra xem bot bao nhiêu ping")
    .toJSON()

const avatarCommand = new SlashCommandBuilder()
    .setName("avatar")
    .setDescription("Xem Avatar của ai đó")
    .addUserOption(option => 
        option.setName("user")
            .setRequired(false)
            .setDescription("Chọn avatar mà bạn muốn")
    )
    .toJSON()

const userSubcommand = new SlashCommandBuilder()
    .setName("user")
    .setDescription("Các lệnh con")
    .addSubcommand(
        subcommand => subcommand
            .setName("avatar")
            .setDescription("Lấy avatar của người dùng")
            .addUserOption(
                option => option
                    .setName("user")
                    .setDescription("Lấy avatar của người được chỉ định")
            )
    )
    .addSubcommand(
        subcommand => subcommand
            .setName("banner")
            .setDescription("Lấy banner của người dùng")
            .addUserOption(
                option => option
                    .setName("user")
                    .setDescription("Lấy banner của người được chỉ định")
            )
    )

const applicationCommands = [
    pingCommand,
    avatarCommand,
    userSubcommand
];

const rest = new REST().setToken(process.env.BOT_TOKEN!);

const user = (await rest.get(Routes.user())) as APIUser;

const commands = (await rest.put(Routes.applicationCommands(user.id), {
    body: applicationCommands
})) as RESTPostAPIApplicationCommandsResult[];

console.log(`Loaded ${commands.length} commands`);