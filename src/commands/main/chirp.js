import Discord from "discord.js";
import { Command } from "strike-discord-salt-edits/dist/command.js";
import {remainingBits, dropHappening, updateRemainingBits, claimedIds, RANDOM_DOUBLE_CHANCE, randomInRange} from "../../drops.js";
import User from "../../models/User.model.js";

const CHIRP = "<:chirp:1015918908244508682>";

class Claim extends Command {
    name = "chirp";
    help= {
        msg: "Claim a Chirp from the current drop!",
        usage: "!claim",
    }

    async run(event) {
        const {framework, message} = event;

        if(!dropHappening || remainingBits == 0) {
            await message.channel.send("No drop happening right now!");
            return;
        }
        if(this.hasClaimedDrop(message)) {
            await message.channel.send("You've already claimed from this drop!");
            return;
        }

        if(randomInRange(0,RANDOM_DOUBLE_CHANCE) == Math.floor(RANDOM_DOUBLE_CHANCE/2)) {

            await this.setClaimedDrop(message);
            await this.updateDatabaseValue(message,2);
            const emb = new Discord.MessageEmbed()
                .setTitle("CHIIIIIRP OVERLOAD!!!");
            emb.setDescription(`
            ${CHIRP}${CHIRP}${CHIRP}${CHIRP}${CHIRP}
            A Chirp overload has occurred! Error log below:
            \`[INFO] Chirp claim request\`
            \`[ERROR] Chirp overload detected! Dropping 2 Chirps instead of 1.\`
            You have claimed 2 Chirps!
            ${CHIRP}${CHIRP}${CHIRP}${CHIRP}${CHIRP}
            `)
            emb.setColor(0x00ff00);
            return emb
        }

        await this.setClaimedDrop(message);
        await this.updateDatabaseValue(message,framework);
        const emb = new Discord.MessageEmbed()
            .setTitle("You successfully claimed a Chirp!");
        emb.setDescription(`${CHIRP}`)
        emb.setColor(0x00ff00);

        message.react(CHIRP)

        return emb
    }
    

    async updateDatabaseValue(message, framework, droppedAmount=1) {
        const author = `${message.author.id}`
        if(await User.doesUserExist(author)) {
            User.updateBits(author, droppedAmount,framework,message);
        } else {
            await User.create({
                discordId: author,
                bits: droppedAmount,
            })
        }

        updateRemainingBits(droppedAmount);
        return
    }

    hasClaimedDrop(message) {
        const author = `${message.author.id}`
        return claimedIds.includes(author);
    }

    setClaimedDrop(message) {
        const author = `${message.author.id}`
        claimedIds.push(author);
        return
    }
}

export default Claim;