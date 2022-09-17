import Discord from "discord.js";
import { Command } from "strike-discord-framework/dist/command.js";
import Guild from "../../models/Guild.model.js";
import { sendToAllGuids } from "../../drops.js";
const CHIRP = "<:chirp:1016831250494935090>";

class Demo extends Command {
    name = 'demo';

    async run(event) {
        const {framework, message} = event;

        const emb = new Discord.MessageEmbed()
            .setTitle("Dev test")

        await message.delete()
        await sendToAllGuids(framework,emb);
        return 
    }
}


export default Demo