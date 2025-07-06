import { 
    AutocompleteInteraction, 
    ChatInputCommandInteraction, 
    MessageContextMenuCommandInteraction,
    RESTPostAPIApplicationCommandsJSONBody as CommandData
} from "discord.js";
import { Subcommand } from "../types/subcommand.js";
import { MusicStreamer } from "../bot.js";

namespace Command {
    export type ChatInput = ChatInputCommandInteraction<"cached">;
    export type MessageContentMenu =
        MessageContextMenuCommandInteraction<"cached">;
    export type Autocomplete = AutocompleteInteraction<"cached">;
}

abstract class Command {
    public applicationCommands: CommandData[];
    public name: string;
    public subcommands: { [x: string]: Subcommand[] }
    public client!: MusicStreamer<true>

    public constructor(name: string) {
        this.applicationCommands = [];
        this.name = name;
        this.subcommands = {};
    }

    public executeChatInput?(interaction: Command.ChatInput): Promise<void>
    public executeAutocomplete?(interaction: Command.Autocomplete): Promise<void>
    public executeMessageContextMenu?(interaction: Command.MessageContentMenu): Promise<void>
    public init?(): Promise<void>
}

export default Command;