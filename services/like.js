const db = require("../models");
const Like = db.likes;


exports.create = async function (pLike) {
    try {
        const like = await Like.create(pLike);
        return like;
    } catch (e) {
        throw Error('error while liking Posts : ' + e.message)
    }
}

exports.delete = async function (pLike) {
    try {
        const like = await Like.findOne({ where: pLike });
        if (!like) {
            throw Error('no like')
        }
        else {
            await Like.destroy({ where: { id: like.id } });
            return { message: 'like deleted  !' };
        }

    } catch (e) {
        throw Error('error while uniking Posts : ' + e.message)
    }
}

exports.findAll = async function () {
    try {
        const likes = await Like.findAll( {
            attributes: {exclude: ['createdAt', 'updatedAt']},
            include: [
                {
                    model:User,
                    // attributes: ['id','email'],
                    attributes: {exclude: ['createdAt', 'updatedAt']},
                },
                {
                    model: Post,
                    attributes: {exclude: ['createdAt', 'updatedAt']},
                }],
        });
        return likes;
    } catch (e) {
        throw Error('error while getting likes : '+e.message)
    }
}

exports.find = async function (pLike) {
    console.log("service.like.find")
    try {
        console.log(pLike);
        const like = await Like.findOne(
            {
                where: pLike,
                include: ["user", "post"]
            },
        );
        return like;
    } catch (e) {
        throw Error('error while getting like : '+e.message)
    }
}

exports.update = async function (pLike, id) {
    try {
        const like = await Like.update(
            { ...pLike },
            { where: { id: id } }
        )
        return like;
    } catch (e) {
        throw Error('error while updating like : ' + e.message)
    }
}