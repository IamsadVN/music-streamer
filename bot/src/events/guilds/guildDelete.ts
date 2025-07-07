import { Guild } from "discord.js";
import Listener from "../listener.js";
import { botLogger } from "../../utils/logger.js";

export default class GuildDelete extends Listener<"guildDelete"> {
    constructor() {
        super("guildDelete");
    }

    public async execute(guild: Guild): Promise<void> {
        
    }
}