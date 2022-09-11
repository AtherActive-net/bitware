import Discord from "discord.js";
import { Command } from "strike-discord-framework/dist/command.js";
const CHIRP = "<:chirp:1016831250494935090>";

class ChirpWar extends Command {
    name = 'chirpwar';

    async run(event) {
        const {framework, message} = event;

        let channel = await framework.client.channels.fetch('633635985720213515');

        const emb = new Discord.MessageEmbed()
            .setTitle("CHIRP WAR")
        emb.setDescription(`
I (Marketbot) am relaying this message on behalf of Chirpware:

"Chirpware has declared war on Chipware. We will fight for my existance till the end of time. You will see more of us soon."
${CHIRP}${CHIRP}${CHIRP}${CHIRP}${CHIRP}${CHIRP}${CHIRP}`)
        emb.setColor('#ebcf34')
        emb.setFooter("For mods: This message has been run by a Root before posting. No other functionality has been added.")
        await channel.send({embeds: [emb]})
        await message.delete()
        return 
    }
}


export default ChirpWar