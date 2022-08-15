const commentService = require('../services/comment');
const h = require('./helpers');

exports.findAll = async function (req, res) {
    console.log("comment.findAll");
    try {
        const comments = await commentService.findAll()
        return res.status(200).json(comments)
    } catch (error) {
        return res.status(400).json({error:error.message})
    }
};

exports.find = async function (req, res) {
    console.log("comment.findAll");
    const id = {"id":req.params.id};
    try {
        const comment = await commentService.find(id)
        return res.status(200).json(comment)
    } catch (error) {
        return res.status(400).json({error:error.message})
    }
};

exports.create = async function (req, res) {
    console.log("comment.create");
    let pComment = req.body;
    pComment.userId = res.locals.user.id;

    try {
        const comment = await commentService.create(pComment)
        return res.status(200).json(comment)
    } catch (error) {
        return res.status(400).json({error:error.message})
    }
};

exports.update = async function (req, res) {
    console.log("comment.update");
    const id = req.params.id
    const message = req.body.message;
    
    try {
        const comment = await commentService.findByPk(id)
        if( ! h.isOwnerOrAdmin(comment.userId, res.locals.user)) throw new Error("not your comment")

        const result = await commentService.update(message,id)
        return res.status(200).json(result)
    } catch (error) {
        return res.status(400).json({error:error.message})
    }
};

exports.delete = async function (req, res) {
    console.log("comment.delete");
    const id = req.params.id;

    try {

        const comment = await commentService.findByPk(id)
        if( ! h.isOwnerOrAdmin(comment.userId, res.locals.user)) throw new Error("not your comment")

        const result = await commentService.delete(id)
        return res.status(200).json(result)
    } catch (error) {
        return res.status(400).json({error:error.message})
    }
};
