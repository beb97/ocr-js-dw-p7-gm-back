const db = require("../models");
const Post = db.posts;

exports.findAll = async function () {
    try {
        const posts = await Post.findAll(
            {include: ["user"]},
        );
        return posts;
    } catch (e) {
        throw Error('error while getting Posts : '+e.message)
    }
}

exports.find = async function (pPost) {
    try {
        console.log(pPost);
        const posts = await Post.findOne(
            {include: ["user"]},
            {where: pPost},
        );
        return posts;
    } catch (e) {
        throw Error('error while getting Posts : '+e.message)
    }
}

exports.create = async function (pPost) {
    try {
        const post = await Post.create(pPost);
        return post;
    } catch (e) {
        throw Error('error while creating Posts : '+e.message)
    }
}

exports.update = async function (pPost, id) {
    try {
        const post = await Post.update(
            {...pPost},
            {where: {id: id}}
        )
        return post;
    } catch (e) {
        throw Error('error while deleting Posts : '+e.message)
    }
}

exports.delete = async function (id) {
    try {
        const post = await Post.findByPk( id );
        if (!post) {
            throw Error('no post')
        }
            // else if(post.postId !== postId ) {
            //     throw Error('not your post')
        // }
        else {
            await Post.destroy({ where: {id: id} });
            return {message: 'post deleted  !'};
        }
    } catch (e) {
        throw Error('error while deleting Posts : '+e.message)
    }
}