const userService = require('../services/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.findAll = async function (req, res) {
    console.log("user.findAll");
    try {
        const users = await userService.findAll()
        return res.status(200).json(users)
    } catch (error) {
        return res.status(400).json(error.message)
    }
};

exports.find = async function (req, res) {
    console.log("user.findAll");
    const id = {"id":req.params.id};
    try {
        const user = await userService.find(id)
        return res.status(200).json(user)
    } catch (error) {
        return res.status(400).json(error.message)
    }
};

exports.create = async function (req, res) {
    console.log("user.create");
    const pUser = req.body;

    try {
        const user = await userService.create(pUser)
        return res.status(200).json(user)
    } catch (error) {
        return res.status(400).json(error.message)
    }
};

exports.update = async function (req, res) {
    console.log("user.update");
    const id = req.params.id
    const user = {
        email : req.body.email
    }
    try {
        const users = await userService.update(user,id)
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

exports.login = async function (req, res) {
    console.log("user.login");
    let pUser = {email:req.body.email};
    let pPassword = req.body.password;

    try {
        const user = await userService.find(pUser)
        if(!user) {
            throw Error('incorrect password or username')
        }

        // Passwords order matter ! (plain, hashed)
        let arePasswordsMatching = await bcrypt.compare(pPassword, user.password);
        if(!arePasswordsMatching) {
            throw Error('incorrect password or username')
        }

        // TODO : changer le secret
        let token = jwt.sign(
            { userId: user.id },
            "NOT_REALLY_SECRET",
            { expiresIn: '24h' }
        )

        // In order to set cookies in the browser, you would need to include the ‘credentials’ option with your request, to allow the server to set cookies.
        return res.cookie('token', token).status(200).json(user);
    } catch (error) {
        return res.status(400).json(error.message)
    }
}

exports.signup = async function (req, res) {
    console.log("user.signup");
    const pUser = req.body;
    pUser.password = await bcrypt.hash(pUser.password, 10)

    try {
        const user = await userService.create(pUser)
        return res.status(200).json(user)
    } catch (error) {
        return res.status(400).json(error.message)
    }
}

