import { ApplicationCommandOptionChoiceData, EmbedBuilder, Locale, SlashCommandBuilder } from "discord.js";
import Command from "../command.js";
import { getLocalizations, translate } from "../../utils/i18next.js";
import { guildLocalCodeUpdate, guildLocaleCodeGet } from "../../database/index.js";

const supportedLanguage: ApplicationCommandOptionChoiceData<string>[] = [
    {
        name: "Tiếng Việt",
        value: Locale.Vietnamese
    },
    {
        name: "English (US)",
        value: Locale.EnglishUS
    }
]

export default class extends Command {
    public constructor() {
        super("language");

        this.applicationCommands.push(
            new SlashCommandBuilder()
                .setName("language")
                .setDescription(translate("commands.language.slash.description", Locale.Vietnamese))
                .setDescriptionLocalizations(getLocalizations("commands.language.slash.description"))
                .addStringOption(option =>
                    option
                        .setName("choice")
                        .setDescription(translate("commands.language.slash.options.choice.description", Locale.Vietnamese))
                        .setDescriptionLocalizations(getLocalizations("commands.language.slash.options.choice.description"))
                        .setRequired(true)
                        .setAutocomplete(true)
                )
                .toJSON()
        )
    }

    public override async executeChatInput(interaction: Command.ChatInput): Promise<void> {
        const languageChoice = interaction.options.getString("choice", true);
        const [ previousLanguageCode ] = await guildLocaleCodeGet(interaction.guild.id);

        if (languageChoice === previousLanguageCode.localeCode) {
            await interaction.reply({
                embeds: [
                    new EmbedBuilder()
                        .setTitle("Không thể thay đổi ngôn ngữ!")
                        .setDescription(`Ngôn ngữ hiện tại của máy chủ đã là ${languageChoice} sẵn rồi!`)
                ]
            });
            return;
        }

        if (!Object.values(Locale).includes(languageChoice as Locale)) {
            await interaction.reply({
                embeds: [
                    new EmbedBuilder()
                        .setTitle("Không thể thay đổi ngôn ngữ!")
                        .setDescription(`Bạn đã nhập sai loại ngôn ngữ, hãy sử dụng các option có sẵn để chọn!`)
                ]
            });
            return;
        }

        await guildLocalCodeUpdate(interaction.guild.id, languageChoice);

        await interaction.reply({
            embeds: [
                new EmbedBuilder()
                    .setTitle("Thay đổi ngôn ngữ thành công!")
                    .setDescription(`Ngôn ngữ của máy chủ đã được đổi từ ${previousLanguageCode.localeCode} thành ${languageChoice}`)
            ]
        });
    }

    public override async executeAutocomplete(interaction: Command.Autocomplete): Promise<void> {
        const focusedChoices = interaction.options.getFocused();

        const filteredChoices = supportedLanguage.filter(language => language.name.startsWith(focusedChoices));

        await interaction.respond(
            filteredChoices.map(choice => ({ name: choice.name, value: choice.value }))
        );
    }
}