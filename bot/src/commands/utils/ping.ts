import { ChatInputCommandInteraction, EmbedBuilder, SlashCommandBuilder } from "discord.js";
import Command from "../command.js";

export default class extends Command {
    public constructor() {
        super("ping");

        this.applicationCommands.push(
            new SlashCommandBuilder()
                .setName("ping")
                .setDescription("Ping the bot")
                .toJSON()
        );
    }

    public override async executeChatInput(interaction: ChatInputCommandInteraction<"cached">): Promise<void> {
        const { client } = this;

        await interaction.reply({
            embeds: [
                new EmbedBuilder()
                    .setTitle("Ping response")
                    .setDescription(`Pong, ${client.ws.ping}`)
            ]
        });
    }
}