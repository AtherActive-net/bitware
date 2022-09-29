import { SlashCommand } from 'strike-discord-salt-edits-temp/dist/command.js';
import transfers from '../../transfers.js';
import Discord from 'discord.js';

class Pay extends SlashCommand {
    name = "pay";
    help = {
        msg: "Pay another user some Chirps!",
    }
    slashCommand = true;
    slashOptions = [
        {
            name: "user",
            description: "The user to pay",
            type: "USER",
            required: true,
        },
        {
            name: "amount",
            description: "The amount of Chirps to pay",
            type: "INTEGER",
            required: true,
        }
    ]

    async run(event) {
        const {framework, interaction} = event;
        const emb = new Discord.MessageEmbed();
        let target = await interaction.options.getUser("user");
        let amount = await interaction.options.getInteger("amount");

        // Check if you are paying yourself
        if(await this.checkIfPayingSelf(target.id,interaction.user.id)) {
            emb.setTitle("You can't pay yourself!");
            emb.setColor("RED");
            await interaction.reply({embeds: [emb]});
            return;
        }

        // Attempt to pay the target. If this is not possible, return false.
        let transfer;
        try {
            transfer = await transfers.payUser(interaction.user.id, target.id, amount);
        } catch(e) {
            // Check what eroor was thrown.
            switch(e) {
                case "USER_NOT_FOUND":
                    emb.setTitle("User not found!");
                    emb.setDescription("You or the target user were not found in our registry.");
                    emb.setColor("RED");
                    await interaction.reply({embeds: [emb]});
                    break;
            }

            return;
        }

        // Check if the transaction was sucessful.
        if(transfer) {
            emb.setTitle("Transaction Successful!");
            emb.setDescription(`<@${target.id}> has been paid ${amount} Chirps!`);
            emb.setColor("GREEN");
            await interaction.reply({embeds: [emb]});
        }
        else {
            emb.setTitle("Transaction failed!");
            emb.setDescription("You do not have enough Chirps to complete this transaction.");
            emb.setColor("RED");
            await interaction.reply({embeds: [emb]});
        }
    }

    async checkIfPayingSelf(targetId,userId) {
        if(targetId == userId) {
            return true;
        }
        else {
            return false;
        }
    }
}

export default Pay