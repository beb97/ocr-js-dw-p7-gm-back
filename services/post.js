const db = require("../models");
const Post = db.posts;
const User = db.users;
const Comment = db.comments;

exports.findAll = async function () {
    try {
        const posts = await Post.findAll({
            // logging: console.log,
            attributes: {exclude: ['userId', 'updatedAt']},
            include: [
                {
                    model: Comment,
                    attributes: ["id", "message", "createdAt"],
                    include: [{
                        model: User,
                        attributes: ["id", "pseudo"],
                    }]
                },
                {
                    model: User,
                    attributes: ["id", "pseudo"],
                },
            ]
        });
        return posts;
    } catch (e) {
        throw Error('error while getting Posts : ' + e.message)
    }
}

exports.find = async function (pPost) {
    try {
        // console.clear();
        const posts = await Post.findOne({
            // logging: console.log,
            where: pPost,
            attributes: {exclude: ['userId', 'updatedAt']},
            include: [
                {
                    model: Comment,
                    attributes: ["id", "message", "createdAt"],
                    include: [{
                        model: User,
                        attributes: ["id", "pseudo"],
                    }]
                },
                {
                    model: User,
                    attributes: ["id", "pseudo"],
                },
                {
                    model: db.likes,
                    attributes: ["id"],
                    include: [{
                        model: User,
                        attributes: ["id", "pseudo"],
                    }]
                    // attributes: ["userId", "pseudo"]
                }
            ]
        });
        return posts;
    } catch (e) {
        throw Error('error while getting Posts : ' + e.message)
    }
}

exports.create = async function (pPost) {
    try {
        const post = await Post.create(pPost);
        return post;
    } catch (e) {
        throw Error('error while creating Posts : ' + e.message)
    }
}

exports.like = async function (pPost) {
    try {
        const post = await db.likes.create(pPost);
        return post;
    } catch (e) {
        throw Error('error while liking Posts : ' + e.message)
    }
}

exports.unlike = async function (pPost) {
    try {
        // console.log(pPost);
        const like = await db.likes.findOne({where: pPost});
        if (!like) {
            throw Error('no like')
        }
        else {
            await db.likes.destroy({ where: { id: like.id } });
            return { message: 'like deleted  !' };
        }

    } catch (e) {
        throw Error('error while uniking Posts : ' + e.message)
    }
}

exports.update = async function (pPost, id) {
    try {
        const post = await Post.update(
            { ...pPost },
            { where: { id: id } }
        )
        return post;
    } catch (e) {
        throw Error('error while deleting Posts : ' + e.message)
    }
}

exports.delete = async function (id) {
    try {
        const post = await Post.findByPk(id);
        if (!post) {
            throw Error('no post')
        }
        // else if(post.postId !== postId ) {
        //     throw Error('not your post')
        // }
        else {
            await Post.destroy({ where: { id: id } });
            return { message: 'post deleted  !' };
        }
    } catch (e) {
        throw Error('error while deleting Posts : ' + e.message)
    }
}