import { CacheType, Interaction } from "discord.js";
import Listener from "../listener.js";

export default class interactionCreate extends Listener<"interactionCreate"> {
    constructor() {
        super("interactionCreate");
    }

    public async execute(interaction: Interaction<CacheType>): Promise<void> {
        if (!interaction.inCachedGuild()) return;

        const {client} = this;

        const {commands} = client;

        if (interaction.isCommand()) {
            const {commandName, commandType} = interaction;

            await commands.execute(commandName,commandType, interaction);
        }

        if (interaction.isAutocomplete()) {
            const { commandName, commandType } = interaction;
            const command = commands.get(commandName, commandType);
            await command?.executeAutocomplete?.(interaction);
        }
    }
}