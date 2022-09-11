import Discord from "discord.js";
import { Command } from "strike-discord-framework/dist/command.js";
import User from "../../models/User.model.js";

class Baltop extends Command {
    name="baltop"
    help= {
        msg: "Check the top 10 richest users!",
        usage: "!baltop",
    }

    async run(event) {
        const {framework, message} = event;
        const topUsers = await User.getTopUsers();

        const emb = new Discord.MessageEmbed()
        .setTitle("Top 10 Chirp Owners")
        .setColor('#ebcf34')
        
        let i = 1;
        topUsers.forEach(async element => {
            const user = await framework.client.users.fetch(`${element.discordId}`);
            emb.addFields([
                {
                    name: `${i}. ${user.username}`,
                    value: `${element.bits} Chirps`,
                    inline: false
                }
            ])
            i++;
        });

        return emb
    }
}

export default Baltop