import { CacheType, Events, Interaction } from "discord.js";
import Listener from "../listener.js";

export default class interactionCreate extends Listener<Events.InteractionCreate> {
    constructor() {
        super(Events.InteractionCreate);
    }

    public async execute(interaction: Interaction<CacheType>): Promise<void> {
        
    }
}