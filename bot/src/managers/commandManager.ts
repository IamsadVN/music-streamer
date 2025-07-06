import { ApplicationCommandType, Collection, CommandInteraction } from "discord.js";
import { MusicStreamer } from "../bot.js";
import Command from "../commands/command.js";
import { SubcommandData } from "../types/subcommand.js";

interface SubcommandCollectionValue {
    commandName: string;
    data: SubcommandData;
}

export default class CommandManager {
    public client: MusicStreamer<true>;

    private commands: Collection<string, Command>
    private chatInputs: Collection<string,string>;
    private messageContextMenus: Collection<string,string>;

    private subcommands: Collection<string, SubcommandCollectionValue>;

    public constructor(client: MusicStreamer<true>) {
        this.client = client;

        this.commands = new Collection();
        this.chatInputs = new Collection();
        this.messageContextMenus = new Collection();

        this.subcommands = new Collection();
    }

    public add(command: Command) {
        command.client = this.client;
        command.init?.();
        this.commands.set(command.name, command);

        for (const data of command.applicationCommands) {
            if (data.type === ApplicationCommandType.Message) {
                this.messageContextMenus.set(data.name, command.name);
            }
            else {
                this.chatInputs.set(data.name,command.name);
            }
        }

        for (const key of Object.keys(command.subcommands)) {
            for (const data of command.subcommands[key]) {
                if ("subcommands" in data) {
                    for (const subcommand of data.subcommands) {
                        this.subcommands.set(
                            `${key}:${data.name}:${subcommand.name}`,
                            {
                                commandName: key,
                                data: subcommand
                            }
                        );
                    }
                }
                else {
                    this.subcommands.set(
                        `${key}:${data.name}`,
                        {
                            commandName: key,
                            data
                        }
                    );
                }
            }
        }
    }
    
    public get(name: string, type: ApplicationCommandType) {
        let baseName: string | undefined;

        if (type === ApplicationCommandType.Message) {
            baseName = this.messageContextMenus.get(name);
        }
        else {
            baseName = this.chatInputs.get(name);
        }

        return this.commands.get(baseName!);
    }

    public async execute(
        name: string,
        type: ApplicationCommandType,
        interaction: CommandInteraction<"cached">
    ) {
        const command = this.get(name,type);

        if (!command) return;

        if (interaction.isChatInputCommand()) {
            await command.executeChatInput?.(interaction);
            await this.handleSubcommand(command,interaction);
        }

        if (interaction.isMessageContextMenuCommand()) {
            await command.executeMessageContextMenu?.(interaction);
        }
    }

    public async handleSubcommand(
        command: Command,
        interaction: Command.ChatInput
    ) {
        const { commandName, options } = interaction;

        const _subcommand = options.getSubcommand(false);
        const _subcommandGroup = options.getSubcommandGroup(false);

        if (!_subcommand) {
            return;
        }

        let subcommand: SubcommandCollectionValue | undefined;

        if (_subcommandGroup) {
            subcommand = this.subcommands.get(
                `${commandName}:${_subcommandGroup}:${_subcommand}`
            );
        } else {
            subcommand = this.subcommands.get(`${commandName}:${_subcommand}`);
        }

        if (!subcommand) {
            return;
        }

        await (command as any)[`_${subcommand.data.target}`]?.(interaction);
    }
}