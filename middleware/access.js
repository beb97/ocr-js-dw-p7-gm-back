const roles = require("../models/roles.js");
const rules = require("../models/rules.js");

module.exports = (req, res, next) => {
    try {
        // console.log(roles.admin);
        const method = req.method;
        // console.log("method: " , method);

        const rule = rules[method];
        // console.log(rule);

        res.locals.rule = rule;
        // console.log("rule: ", res.locals.rule);
        next();
    } catch(err) {
        res.status(401).json({
            error: err.message
        });
    }
};

