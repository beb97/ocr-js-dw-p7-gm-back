const userService = require('../services/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const h = require('./helpers');

exports.findAll = async function (req, res) {
    console.log("user.findAll");
    try {
        const users = await userService.findAll()
        return res.status(200).json(users)
    } catch (error) {
        return res.status(400).json({error:error.message})
    }
};

exports.find = async function (req, res) {
    console.log("user.find");
    const id = { "id": req.params.id };
    try {
        const user = await userService.find(id)

        if (!user) res.status(404).json({ error: 'user not found' })

        return res.status(200).json(user)
    } catch (error) {
        return res.status(400).json({error:error.message})
    }
};

exports.create = async function (req, res) {
    console.log("user.create");
    const pUser = req.body;

    try {
        const user = await userService.create(pUser)
        return res.status(200).json(user)
    } catch (error) {
        return res.status(400).json({error:error.message})
    }
};

exports.update = async function (req, res) {
    console.log("user.update");
    const id = req.params.id
    const body = {
        email: req.body.email,
        pseudo: req.body.pseudo
    }
    try {

        const user = await userService.find({ id: id })
        if (!h.isOwnerOrAdmin(user.userId, res.locals.user)) throw new Error("not your user")

        const result = await userService.update(body, id)
        return res.status(200).json(result)
    } catch (error) {
        return res.status(400).json({error:error.message})
    }
};

exports.delete = async function (req, res) {
    console.log("user.delete");
    const id = req.params.id;

    try {

        const user = await userService.find({ id: id })
        if (!h.isOwnerOrAdmin(user.userId, res.locals.user)) throw new Error("not your user")

        const result = await userService.delete(id)
        return res.status(200).json(result)
    } catch (error) {
        return res.status(400).json({error:error.message})
    }
};

exports.login = async function (req, res) {
    console.log("user.login");
    let pUser = { pseudo: req.body.pseudo };
    // let pUser = { email: req.body.email };
    let pPassword = req.body.password;

    try {
        const user = await userService.find(pUser)
        if (!user) {
            throw Error('incorrect password or username')
        }

        // Passwords order matter ! (plain, hashed)
        let arePasswordsMatching = await bcrypt.compare(pPassword, user.password);
        if (!arePasswordsMatching) {
            throw Error('incorrect password or username')
        }

        // TODO : changer le secret
        let token = jwt.sign(
            // { userId: 69 },
            { userId: user.id },
            "NOT_REALLY_SECRET",
            { expiresIn: '24h' }
        )

        // In order to set cookies in the browser, you would need to include the ‘credentials’ option with your request, to allow the server to set cookies.
        let expires = new Date(Date.now() + 60 * 60 * 24 * 1000);
        const response = {
            email: user.email,
            pseudo: user.pseudo,
            id: user.id,
            isAdmin: user.isAdmin,
            expires: expires,
            token: token
        }

        // https://web.dev/i18n/fr/samesite-cookies-explained/
        // let cookieOptions = { sameSite: 'none', secure: true };
        // let cookieOptions = { 
        //     sameSite: 'Strict',
        //     httpOnly: true,
        //     expires: expires,
        // };
        return res.status(200).json(response);
        // return res.cookie('token', token, cookieOptions).status(200).json(response);
    } catch (error) {
        return res.status(400).json({error:error.message})
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
        return res.status(400).json({error:error.message})
    }
}

