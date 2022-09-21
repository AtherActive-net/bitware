import { SlashCommand } from 'strike-discord-framework/dist/command.js';

class Pay extends SlashCommand {
    name = "Pay";
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
        return 'test'
    }
}

export default Pay