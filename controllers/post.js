const postService = require('../services/post');
const userService = require('../services/user');
const likeService = require('../services/like');
const h = require('./helpers');

exports.findAll = async function (req, res) {
    console.log("post.findAll");
    try {
        const posts = await postService.findAll()
        return res.status(200).json(posts)
    } catch (error) {
        return res.status(400).json({error:error.message})
    }
};

exports.find = async function (req, res) {
    console.log("post.find");
    // console.log(req.path);
    // console.log(req.originalUrl) 
    const id = { id: req.params.id };
    try {
        const post = await postService.find(id);
        return res.status(200).json(post)
    } catch (error) {
        return res.status(400).json({error:error.message})
    }
};

exports.create = async function (req, res) {
    console.log("post.create");
    const pPost = req.body;
    pPost.userId = res.locals.user.id;
    try {
        const post = await postService.create(pPost)
        return res.status(200).json(post)
    } catch (error) {
        return res.status(400).json({error:error.message})
    }
};

exports.like = async function (req, res) {
    console.log("post.like");
    const pPost = { postId: req.params.id };
    pPost.userId = res.locals.user.id;
    try {
        const like = await likeService.create(pPost)
        return res.status(200).json(like)
    } catch (error) {
        return res.status(400).json({error:error.message})
    }
};

exports.unlike = async function (req, res) {
    console.log("post.unlike");
    const pPost = { postId: req.params.id };
    pPost.userId = res.locals.user.id;
    
    try {
        const like = await likeService.find(pPost)
        if( ! h.isOwnerOrAdmin(like.userId, res.locals.user)) throw new Error("not your like")

        const result = await likeService.delete(pPost)
        return res.status(200).json(result)
    } catch (error) {
        return res.status(400).json({error:error.message})
    }
};

exports.update = async function (req, res) {
    console.log("post.update");
    const id = req.params.id
    const body = {
        message: req.body.message,
        titre: req.body.titre
    }
    try {
        const post = await postService.find({id:id})
        if( ! h.isOwnerOrAdmin(post.userId, res.locals.user)) throw new Error("not your post") 

        const result = await postService.update(body, id)
        return res.status(200).json(result)
    } catch (error) {
        return res.status(400).json({error: error.message})
    }
};

exports.delete = async function (req, res) {
    console.log("post.delete");
    const id = req.params.id;

    try {
        const post = await postService.find({id:id})
        if( ! h.isOwnerOrAdmin(post.userId, res.locals.user)) throw new Error("not your post") 

        const result = await postService.delete(id)
        return res.status(200).json(result)
    } catch (error) {
        return res.status(400).json({error: error.message})
    }
};
