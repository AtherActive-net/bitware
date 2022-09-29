import Discord from "discord.js";
import { Command } from "strike-discord-salt-edits-temp/dist/command.js";
import Guild from "../../models/Guild.model.js";

class Addguild extends Command {
    name = 'addguild';

    async run(event) {
        const {framework, message} = event;
        let channel = message.channel;
        let guild = message.guild;

        await Guild.addGuild(guild.id,channel.id);

        await message.channel.send(`Added guild ${guild.name} with channel ${channel.name} to receive drops`);
    }
}


export default Addguild