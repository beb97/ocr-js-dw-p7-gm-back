const db = require("../models");
const Comment = db.comments;
const Post = db.posts;
const User = db.users;

exports.findAll = async function () {
    try {
        const comments = await Comment.findAll( {
            attributes: {exclude: ['createdAt', 'updatedAt']},
            include: [
                {
                    model:User,
                    // as:"user",
                    attributes: ['id','email'],
                },
                {
                    model: Post,
                    // as: "post",
                    attributes: {exclude: ['createdAt', 'updatedAt']},
                }],
        });
        return comments;
    } catch (e) {
        throw Error('error while getting Comments : '+e.message)
    }
}

exports.find = async function (pComment) {
    try {
        console.log(pComment);
        const comments = await Comment.findOne(
            {include: ["user", "post"]},
            {where: pComment},
        );
        return comments;
    } catch (e) {
        throw Error('error while getting Comments : '+e.message)
    }
}

exports.create = async function (pComment) {
    try {
        const comment = await Comment.create(pComment);
        return comment;
    } catch (e) {
        console.log(e);
        throw Error('error while creating Comments : '+e.message)
    }
}

exports.update = async function (pComment, id) {
    try {
        const comment = await Comment.update(
            {...pComment},
            {where: {id: id}}
        )
        return comment;
    } catch (e) {
        throw Error('error while deleting Comments : '+e.message)
    }
}

exports.delete = async function (id) {
    try {
        const comment = await Comment.findByPk( id );
        if (!comment) {
            throw Error('no comment')
        }
            // else if(comment.commentId !== commentId ) {
            //     throw Error('not your comment')
        // }
        else {
            await Comment.destroy({ where: {id: id} });
            return {message: 'comment deleted  !'};
        }
    } catch (e) {
        throw Error('error while deleting Comments : '+e.message)
    }
}