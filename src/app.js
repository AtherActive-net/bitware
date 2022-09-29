import Framework from 'strike-discord-salt-edits-temp';
import { sequelize } from './database.js';
import config from './config.js';
import Claim from './commands/main/claim.js';
import { CommandEvent } from 'strike-discord-salt-edits-temp/dist/command.js';

const framework = new Framework({
    token: config.TOKEN,
    defaultPrefix: '!',	
    ownerID: 189317034360832001,
    databaseOpts: {
        databaseName: "bitware",
        url: "mongodb://10.0.100.2:27017/bitware",
    },
    loggerOpts: {
        logToFile: true
    },
    dmPrefixOnPing: true,
    commandsPath: `${process.cwd()}/src/commands/`,
});

    // framework.loadBotCommands(`${process.cwd()}/../node_modules/strike-discord-salt-edits-temp/dist/defaultCommands/`);
    framework.loadBotCommands(`${process.cwd()}/node_modules/strike-discord-framework/dist/defaultCommands/`);

setTimeout(async () => {
    await framework.init();
    await framework.permissions.setPublic('command.main.claim', true)
    
}, 1);
