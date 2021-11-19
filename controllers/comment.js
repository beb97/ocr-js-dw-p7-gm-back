const commentService = require('../services/comment');

exports.findAll = async function (req, res) {
    console.log("comment.findAll");
    try {
        const comments = await commentService.findAll()
        return res.status(200).json(comments)
    } catch (error) {
        return res.status(400).json(error.message)
    }
};

exports.find = async function (req, res) {
    console.log("comment.findAll");
    const id = {"id":req.params.id};
    try {
        const comment = await commentService.find(id)
        return res.status(200).json(comment)
    } catch (error) {
        return res.status(400).json(error.message)
    }
};

exports.create = async function (req, res) {
    console.log("comment.create");
    const pComment = req.body;

    try {
        const comment = await commentService.create(pComment)
        return res.status(200).json(comment)
    } catch (error) {
        return res.status(400).json(error.message)
    }
};

exports.update = async function (req, res) {
    console.log("comment.update");
    const id = req.params.id
    const comment = {
        email : req.body.email
    }
    try {
        const comments = await commentService.update(comment,id)
        return res.status(200).json(comments)
    } catch (error) {
        return res.status(400).json(error.message)
    }
};

exports.delete = async function (req, res) {
    console.log("comment.delete");
    const id = req.params.id;

    try {
        const comments = await commentService.delete(id)
        return res.status(200).json(comments)
    } catch (error) {
        return res.status(400).json(error.message)
    }
};
