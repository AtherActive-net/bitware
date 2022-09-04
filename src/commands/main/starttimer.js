import Discord from "discord.js";
import { Command } from "strike-discord-framework/dist/command.js";
import { timer } from "../../drops.js";

class StartTimer extends Command {
    name = "starttimer";

    async run(event) {
        const {framework, message} = event;
        // send msg confirming timer start. Rest is automatic from here on out!
        await message.channel.send("Timer started!");
        await timer(framework,message);
        return 
    }
}


export default StartTimer;