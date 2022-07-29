const roles = require("../models/roles.js");

module.exports = {
    GET : roles.user,
    POST : roles.user,
    PUT : roles.owner,
    DELETE : roles.owner
}