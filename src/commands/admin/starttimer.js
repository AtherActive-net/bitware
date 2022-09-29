import Discord from "discord.js";
import { Command } from "strike-discord-salt-edits-temp/dist/command.js";
import { timer,active } from "../../drops.js";

class StartTimer extends Command {
    name = "starttimer";

    async run(event) {
        const {framework, message} = event;
        // send msg confirming timer start. Rest is automatic from here on out!
        if(!active) {
            await message.channel.send("Timer started!");
            await timer(framework,message);
        }
        else {
            await message.channel.send("The timer is already running.");
        }
        return 
    }
}


export default StartTimer;