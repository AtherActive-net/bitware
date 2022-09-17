import { sequelize } from "../database.js"
import Sequelize from "sequelize"
import { remainingBits, dropTimeout, dropHappening } from "../drops.js"


const Guild = sequelize.define('guild', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    guildId : {
        type: Sequelize.STRING,
        allowNull: false,
    },
    channelId : {
        type: Sequelize.STRING,
        allowNull: false,
    },
})

Guild.getAllGuilds = async function() {
    return await Guild.findAll()
}

export default Guild;