const db = require("../models");
const User = db.users;

exports.findAll = async function () {
    try {
        const users = await User.findAll();
        return users;
    } catch (e) {
        throw Error('Error while getting Users : '+e.message)
    }
}

exports.create = async function (pUser) {
    try {
        const user = await User.create(pUser);
        return user;
    } catch (e) {
        throw Error('Error while getting Users : '+e.message)
    }
}

exports.delete = async function (id) {
    try {
        const user = await User.findByPk( id );
        if (!user) {
            throw Error('no user')
        }
        // else if(user.userId !== userId ) {
        //     throw Error('not your user')
        // }
        else {
            await User.destroy({ where: {id: id} });
            return {message: 'User supprimée  !'};
        }
    } catch (e) {
        throw Error('Error while getting Users : '+e.message)
    }
}