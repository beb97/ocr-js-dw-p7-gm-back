const userService = require('../services/user');

exports.findAll = async function (req, res) {
    console.log("user.findAll");
    try {
        const users = await userService.findAll()
        return res.status(200).json(users)
    } catch (error) {
        return res.status(400).json(error.message)
    }
};

exports.create = async function (req, res) {
    console.log("user.create");
    const user = {
        email : req.body.email
    }
    try {
        const users = await userService.create(user)
        return res.status(200).json(users)
    } catch (error) {
        return res.status(400).json(error.message)
    }
};

exports.delete = async function (req, res) {
    console.log("user.delete");
    const id = req.params.id;

    try {
        const users = await userService.delete(id)
        return res.status(200).json(users)
    } catch (error) {
        return res.status(400).json(error.message)
    }
};

