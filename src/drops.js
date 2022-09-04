import Discord from "discord.js";

const MIN_DROP_TIMER = 1; //10
const MAX_DROP_TIMER = 2; // 30
const MIN_DROP_DURATION = 1;
const MAX_DROP_DURATION = 2;
const MIN_BITS_DROPPED = 2;
const MAX_BITS_DROPPED = 10;
const CHIRP = "<:chirp:1015918908244508682>";
export const RANDOM_DOUBLE_CHANCE = 2; //300, halves this value and uses that as value for the drop.

export let droppedBits;
export let remainingBits;
export let dropHappening;
export let claimedIds = [];
export let active = false;

const DEFAULT_DESC = ` Chirps have been dropped! Type \`!claim\` to claim them!\n`
const DESCRIPTIONS = [
    `Did you know: Chirps are rare and only drop a few times per week!`,
    `Chirp drops expire quite quickly, so be sure to claim them as soon as possible!`,
    `There is a very small random chance to claim 2 chirps at once!`,
    'IM A BIRD, KAKAAA!',
    `Chirpware was inspired by Kodey's unofficial chirp claims!`,
    `The Chirp mint has no known location. The only known information is that it is high in a tree.`,
    `The Chirp production process is a closely guarded secret.`,
    `Chirp drops have a random duration. They can last anywhere from \`${MIN_DROP_TIMER}\` to \`${MAX_DROP_TIMER}\` minutes.`,
]

export function randomInRange(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
}

export async function timer(framework,message) {
    active = true;
    setTimeout(async () => {
        await timerComplete(framework,message);
    }, Math.floor(randomInRange(MAX_DROP_TIMER,MIN_DROP_TIMER) * 1000 * 60));
}

export async function timerComplete(framework,message) {
    dropHappening = true;
    droppedBits = Math.floor(randomInRange(MIN_BITS_DROPPED,MAX_BITS_DROPPED));
    remainingBits = droppedBits
    claimedIds = [];

    const emb = new Discord.MessageEmbed()
        .setTitle("CHIRP DROP TIME!");
    emb.setColor('#ebcf34');
    emb.description = remainingBits + DEFAULT_DESC + DESCRIPTIONS[randomInRange(0,DESCRIPTIONS.length-1)];

    await message.channel.send({embeds: [emb]});

    setTimeout(async () => {
        await dropTimeout(framework,message)
    }, Math.floor(randomInRange(MIN_DROP_DURATION,MAX_DROP_DURATION) * 1000 * 60));
}

export async function dropTimeout(framework,message) {
    if(!dropHappening) {
        await timer(framework,message);
        return;
    }

    const emb = new Discord.MessageEmbed()
        .setTitle("Drop has ended!");
    emb.setColor('#ebcf34');
    emb.description = "The drop has ended! See you next time.";

    await message.channel.send({embeds: [emb]});
    dropHappening = false;
    await timer(framework,message);
}   

export function updateRemainingBits(claimedAmount) {
    remainingBits -= claimedAmount;
    return
}