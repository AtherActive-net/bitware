import { sequelize } from "../database.js"
import Sequelize from "sequelize"
import { remainingBits, dropTimeout, dropHappening } from "../drops.js"

const User = sequelize.define('user', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    discordId: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    bits: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0,
    },
})

User.findByDiscordId = async function(discordId) {
    return await User.findOne({where: {discordId: discordId}})
}

User.doesUserExist = async function(discordId) {
    return await User.findByDiscordId(discordId) !== null
}

User.updateBits = async function(discordId, amount,framework,message) {
    const user = await User.findByDiscordId(discordId)
    user.bits += amount
    await user.save()
    if(remainingBits == 0 && dropHappening) {
        await dropTimeout(framework,message);
    }
}

User.getTopUsers = async function() {
    return await User.findAll({order: [['bits', 'DESC']], limit: 10})
}   

User.getCurrentChirps = async function(discordId) {
    const user = await User.findByDiscordId(discordId)
    return user.bits
}

export default User;