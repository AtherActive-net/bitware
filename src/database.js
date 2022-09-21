// Database init with Sequelize
import Sequelize from 'sequelize';
import config from './config.js';

// Dotenv broke so just using a config file for now
const sequelize = new Sequelize('bitware', config.DB_USERNAME, config.DB_PASSWORD, {
    host: '10.0.100.2',
    dialect: 'mysql',
});


setTimeout(async () => {

    const User = import('./models/User.model.js');
    const Guild = import('./models/Guild.model.js');

    await sequelize.sync({alter: true, logging: false});
},1000)

export {sequelize}