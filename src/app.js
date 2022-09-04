import Framework from 'strike-discord-framework';
import { sequelize } from './database.js';
import config from './config_.js';

const framework = new Framework({
    token: config.TOKEN,
    defaultPrefix: '!',	
    ownerID: 189317034360832001,
    databaseOpts: {
        databaseName: "bitware",
        url: "mongodb://127.0.0.1"
    },
    loggerOpts: {
        logToFile: true
    },
    dmPrefixOnPing: true,
    commandsPath: `${process.cwd()}/src/commands/`,
});


framework.loadBotCommands(`${process.cwd()}/node_modules/strike-discord-framework/dist/defaultCommands/`);

setTimeout(async () => {
    await framework.init();
    await framework.permissions.setPublic('command.main.claim', true)
}, 1);