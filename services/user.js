const db = require("../models");
const User = db.users;

exports.findAll = async function () {
    try {
        const users = await User.findAll();
        return users;
    } catch (e) {
        throw Error('error while getting Users : '+e.message)
    }
}

exports.find = async function (pUser) {
    try {
        console.log(pUser);
        const users = await User.findOne({where: pUser});
        return users;
    } catch (e) {
        throw Error('error while getting Users : '+e.message)
    }
}

exports.create = async function (pUser) {
    try {
        const user = await User.create(pUser);
        return user;
    } catch (e) {
        throw Error('error while getting Users : '+e.message)
    }
}

exports.update = async function (pUser, id) {
    try {
        const user = await User.update(
            {...pUser},
            {where: {id: id}}
        )
        return user;
    } catch (e) {
        throw Error('error while deleting Users : '+e.message)
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
            return {message: 'user deleted  !'};
        }
    } catch (e) {
        throw Error('error while deleting Users : '+e.message)
    }
}