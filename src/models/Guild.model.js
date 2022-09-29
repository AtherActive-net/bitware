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

/**
 * Configure a new guild for drops
 * @param {*} guildId 
 * @param {*} channelId 
 * @returns 
 */
Guild.addGuild = async function(guildId, channelId) {
    return await Guild.create({
        guildId: guildId,
        channelId: channelId,
    })
}

Guild.updateGuild = async function(guildId, channelId) {
    return await Guild.update({
        channelId: channelId,
    }, {
        where: {
            guildId: guildId,
        }
    })
}

export default Guild;