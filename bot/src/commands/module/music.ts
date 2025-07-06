import { ApplicationCommandType, ContextMenuCommandBuilder, ContextMenuCommandType, SlashCommandBuilder } from "discord.js";
import Command from "../command.js";

export default class extends Command {
    public constructor() {
        super("music");

        this.applicationCommands.push(
            new SlashCommandBuilder()
                .setName("music")
                .setDescription("Các lệnh về nhạc")

                .addSubcommand(subcommand =>
                    subcommand
                        .setName("play")
                        .setDescription("Chơi 1 bài nhạc, bạn có muốn không?")
                        .addStringOption(option =>
                            option 
                                .setName("song")
                                .setDescription("Đưa bài nhạc bạn muốn chơi vào đây!")
                                .setRequired(true)
                        )
                )
                .addSubcommand(subcommand =>
                    subcommand
                        .setName("pause")
                        .setDescription("Tạm dừng 1 bài nhạc đang chơi")
                )
                .addSubcommand(subcommand =>
                    subcommand
                        .setName("resume")
                        .setDescription("Quay lại chơi nhạc tiếp cho bạn")
                )
                .addSubcommand(subcommand =>
                    subcommand
                        .setName("stop")
                        .setDescription("Bài nhạc đang hay sao bạn lại dừng?")
                )
                .addSubcommand(subcommand =>
                    subcommand
                        .setName("skip")
                        .setDescription("Tiến tới bài nhạc bạn yêu thích nào!")
                        .addIntegerOption(option =>
                            option
                                .setName("number")
                                .setDescription("Bạn muốn tiến tới bao nhiêu bài trong hàng đợi?")
                                .setMinValue(1)
                        )
                )

                .addSubcommand(subcommand =>
                    subcommand
                        .setName("volumes")
                        .setDescription("Điều chỉnh âm lượng bạn muốn nghe")
                        .addIntegerOption(option =>
                            option
                                .setName("number")
                                .setDescription("Âm lượng mà bạn muốn điều chỉnh")
                                .setRequired(true)
                                .setMinValue(0)
                                .setMaxValue(150)
                        )
                )
                .addSubcommand(subcommand =>
                    subcommand
                        .setName("loop")
                        .setDescription("Sẽ cho bạn nghe dài dài về bài này!")
                        .addStringOption(option =>
                            option
                                .setName("mode")
                                .setDescription("Chọn loại lặp lại mà bạn muốn")
                                .setChoices([
                                    {
                                        name: "track",
                                        value: "track"
                                    },
                                    {
                                        name: "queue",
                                        value: "queue"
                                    }
                                ])
                        )
                )
                .addSubcommand(subcommand =>
                    subcommand
                        .setName("lyrics")
                        .setDescription("Tìm kiếm giúp bạn lời bài hát về bài đang nghe")
                        .addStringOption(option =>
                            option
                                .setName("song")
                                .setDescription("Bạn muốn tìm bài hát nào?")
                                .setRequired(false)
                        )
                )
                .addSubcommand(subcommand =>
                    subcommand
                        .setName("queue")
                        .setDescription("Bạn còn nhiều bài chưa nghe trong hàng đợi lắm!")
                )
                .toJSON(),
            new ContextMenuCommandBuilder()
                .setName("Nghe nhạc từ tin nhắn này à?")
                .setType(
                    ApplicationCommandType.Message as ContextMenuCommandType
                )
                .toJSON()
        )

        this.subcommands[this.name] = [
            { name: "play", target: "play" },
            { name: "pause", target: "pause" },
            { name: "resume", target: "resume" },
            { name: "stop", target: "stop" },
            { name: "skip", target: "skip" },
            { name: "volumes", target: "volumes" },
            { name: "loop", target: "loop" },
            { name: "lyrics", target: "lyrics" },
            { name: "queue", target: "queue" }
        ]
    }

    public override async executeMessageContextMenu(interaction: Command.MessageContentMenu): Promise<void> {
        await interaction.reply({
            content: `Bạn muốn nghe nhạc từ ${interaction.targetMessage} đúng không?`
        });
        return;
    }
}