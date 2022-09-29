import Discord from "discord.js";
import { SlashCommand } from "strike-discord-salt-edits-temp/dist/command.js";
import User from "../../models/User.model.js";
import Transfers from "../../transfers.js";

class Bal extends SlashCommand {
    name="bal";
    help= {
        msg: "Check your balance!",
    }
    slashOptions= [
        {
            name: "target",
            description: "The user to check the balance of",
            type: "USER",
            required: false,
        }
    ]

    async run(event) {
        const {framework, interaction} = event;
        const author = `${interaction.user.id}`
        const target = interaction.options.getUser("target") || interaction.user;

        if(!target) interaction.reply("User not found!");

        const bits = await Transfers.getUserBalance(target.id);
        const emb = new Discord.MessageEmbed()
            .setTitle("Wallet");
        emb.setDescription(`<@${target.id}> has ${bits} Chirps!`);
        emb.setColor('#ebcf34');

        await interaction.reply({embeds: [emb]});
    }   
}

export default Bal