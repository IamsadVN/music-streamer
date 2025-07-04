import { Client, EmbedBuilder, GatewayIntentBits } from "discord.js";
import { config } from "dotenv";
import { getListeners, Logger } from "./utils/index.js";

config();

export class MusicStreamer<Ready extends boolean = boolean> extends Client<Ready> {
    constructor() {
        super({
            intents: [
                GatewayIntentBits.Guilds,
                GatewayIntentBits.GuildMessages,
                GatewayIntentBits.GuildMembers
            ]
        });
    }

    public async init() {
        for (const listener of await getListeners()) {
            listener.client = this as MusicStreamer<true>;

            const method = listener.once ? "once" : "on";

            this[method](listener.name, listener.execute!.bind(listener));

            
        }
        
        Logger.info(`Loaded ${(await getListeners()).length} events`);

        await this.login(process.env.BOT_TOKEN!);
    }

}

const client = new MusicStreamer();

await client.init();

// client.once("ready", async (client) => {
//     Logger.info(`Logged with name ${client.user.username}`);
// });

// client.on("error", (error) => {
//     console.error(error);
// });

// client.on("interactionCreate", async (interaction) => {
//     if (interaction.isChatInputCommand()) {
//         switch (interaction.commandName) {
//             case "ping": {
//                 return await interaction.reply({
//                     content: `Pong, ${client.ws.ping}ms`
//                 });
//             }
//             case "user": {
//                 const subcommandName = interaction.options.getSubcommand(true);

//                 switch (subcommandName) {
//                     case "avatar": {
//                         const userChosen = interaction.options.getUser("user") || interaction.user;

//                         const embedReply = new EmbedBuilder()
//                             .setAuthor({
//                                 name: interaction.user.username,
//                                 iconURL: interaction.user.displayAvatarURL({size: 64})
//                             })
//                             .setTitle("Here is the avatar of " + userChosen.displayName)
//                             .setImage(userChosen.displayAvatarURL({size: 4096}));

//                         return await interaction.reply({
//                             embeds: [embedReply]
//                         });
//                     }
//                     case "banner": {
//                         const userChosen = interaction.options.getUser("user") || interaction.user;
//                         await userChosen.fetch(true);

//                         const bannerURLTemp = `https://singlecolorimage.com/get/${userChosen.hexAccentColor?.slice(1)}/680x240`;

//                         const embedReply = new EmbedBuilder()
//                             .setAuthor({
//                                 name: interaction.user.username,
//                                 iconURL: interaction.user.displayAvatarURL({size: 64})
//                             })
//                             .setTitle(`Here is the banner of ${userChosen.displayName}`)
//                             .setImage(userChosen.bannerURL({size: 4096}) || bannerURLTemp);

//                         return await interaction.reply({
//                             embeds: [embedReply]
//                         })
//                     }
//                 }
                
//             }
//         }
//     }
//     if (interaction.isAutocomplete()) {
        
//     }
// });
