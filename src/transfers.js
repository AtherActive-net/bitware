import User from "./models/User.model.js";


class Transfers {

    /**
     * Check the balance of a user.
     * @param {string} userId The DiscordID of this user.
     * @returns `number` The balance of this user.
     * @returns `null` If the user does not exist.
     */
    async getUserBalance(discordId) {
        let user = await User.findOne({ discordId: discordId });
        if (user) {
            return user.bits;
        } else {
            return null;
        }        
    }

    /**
     * Get the balance of a User object.
     * @param {User} user The user object to check.
     * @returns `number` The balance of this user.
     */
    checkUserBalanceObject(user) {
        return user.bits;
    }

    /**
     * Transfer bits from one user to another.
     * @param {discordId} sender 
     * @param {discordId} receiver 
     * @param {number} amount 
     * @returns `true` The transaction was successful.
     * @returns `false` The transaction failed.
     */
    async payUser(sender,receiver,amount) {
        let sendUser = await User.findOne({ discordId: sender });
        let receiveUser = await User.findOne({ discordId: receiver });
        if(!this.checkUserBalanceObject(sendUser) >= amount) return false;

        sendUser.bits -= amount;
        receiveUser.bits += amount;
        await sendUser.save();
        await receiveUser.save();
        return true;
    }

    /**
     * Send a user bits. This is an admin function and will essentially create NEW bits.
     * @param {discordID} receiver 
     * @param {number} amount 
     * @returns `true` The transaction was successful.
     * @returns `false` The transaction failed.
     */
    async giveUser(receiver,amount) {
        let receiveUser = await User.findOne({ discordId: receiver });
        receiveUser.bits += amount;
        await receiveUser.save();
        return true;
    }

    /**
     * Take bits from a user. This is an admin function and will essentially destroy bits.
     * @param {discordID} target The user to take bits from.
     * @param {number} amount The amount to take away.
     * @returns `true` The transaction was successful.
     * @returns `false` The transaction failed.
     */
    async takeFromUser(target,amount) {
        let targetUser = await User.findOne({ discordId: target });
        if(!this.checkUserBalanceObject(targetUser) >= amount) return false;
        targetUser.bits -= amount;
        await targetUser.save();
        return true;
    }
}

export default new Transfers();