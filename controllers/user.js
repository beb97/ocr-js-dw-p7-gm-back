const userService = require("../services/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const h = require("./helpers");

exports.findAll = async function (req, res) {
  console.log("user.findAll");
  try {
    const users = await userService.findAll();
    return res.status(200).json(users);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

exports.find = async function (req, res) {
  console.log("user.find");
  const id = { id: req.params.id };
  try {
    const user = await userService.find(id);

    if (!user) {
      return res.status(404).json({ error: "user not found" });
    }

    return res.status(200).json(user);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

exports.create = async function (req, res) {
  console.log("user.create");
  const pUser = req.body;

  try {
    const user = await userService.create(pUser);
    return res.status(200).json(user);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

exports.update = async function (req, res) {
  console.log("user.update");
  const id = req.params.id;
  const body = {
    email: req.body.email,
    pseudo: req.body.pseudo,
  };
  try {
    const user = await userService.find({ id: id });
    if (!h.isOwnerOrAdmin(user.id, res.locals.user))
      throw new Error("not your user");

    const result = await userService.update(body, id);
    return res.status(200).json(result);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

exports.delete = async function (req, res) {
  console.log("user.delete");
  const id = req.params.id;

  try {
    const user = await userService.find({ id: id });
    if (!h.isOwnerOrAdmin(user.id, res.locals.user))
      throw new Error("not your user");

    const result = await userService.delete(id);
    return res.status(200).json(result);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};
