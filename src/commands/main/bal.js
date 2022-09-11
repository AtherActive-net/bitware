import Discord from "discord.js";
import { Command } from "strike-discord-framework/dist/command.js";
import User from "../../models/User.model.js";

class Bal extends Command {
    name="bal";
    help= {
        msg: "Check your balance!",
        usage: "!bal",
    }

    async run(event) {
        const {framework, message} = event;
        const author = `${message.author.id}`

        const bits = await User.getCurrentChirps(author);
        const emb = new Discord.MessageEmbed()
            .setTitle("Wallet");
        emb.setDescription(`You have ${bits} Chirps!`);

        return emb
    }   
}

export default Bal