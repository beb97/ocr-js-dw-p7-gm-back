const postService = require('../services/post');

exports.findAll = async function (req, res) {
    console.log("post.findAll");
    try {
        const posts = await postService.findAll()
        return res.status(200).json(posts)
    } catch (error) {
        return res.status(400).json(error.message)
    }
};

exports.find = async function (req, res) {
    console.log("post.findAll");
    const id = {"id":req.params.id};
    try {
        const post = await postService.find(id)
        return res.status(200).json(post)
    } catch (error) {
        return res.status(400).json(error.message)
    }
};

exports.create = async function (req, res) {
    console.log("post.create");
    const pPost = req.body;

    try {
        const post = await postService.create(pPost)
        return res.status(200).json(post)
    } catch (error) {
        return res.status(400).json(error.message)
    }
};

exports.update = async function (req, res) {
    console.log("post.update");
    const id = req.params.id
    const post = {
        email : req.body.email
    }
    try {
        const posts = await postService.update(post,id)
        return res.status(200).json(posts)
    } catch (error) {
        return res.status(400).json(error.message)
    }
};

exports.delete = async function (req, res) {
    console.log("post.delete");
    const id = req.params.id;

    try {
        const posts = await postService.delete(id)
        return res.status(200).json(posts)
    } catch (error) {
        return res.status(400).json(error.message)
    }
};
