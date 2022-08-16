const jwt = require("jsonwebtoken");
const userService = require("../services/user");

module.exports = async function (req, res, next) {
  try {
    // Passer sur un usage cookie
    // console.log("auth", req.headers.authorization);
    const authorization = req.headers.authorization;
    if (!authorization) {
      // 401 Unauthorized
      return res.status(401).json({ error: "No token found" });
    }

    let decodedToken;
    try {
      let token = authorization.split(" ")[1];
      // console.log("token",token);
      decodedToken = jwt.verify(token, "NOT_REALLY_SECRET");
    } catch (err) {
      return res
        .status(401)
        .json({ error: "Invalid token - possibly expired" });
    }

    const userId = decodedToken.userId;
    if (!userId) {
      return res.status(401).json({ error: "Invalid user" });
    }
    // console.log("userId from token :" , userId);

    const id = { id: userId };
    let user;
    try {
      user = await userService.find(id);
      if (!user) {
        return res.status(401).json({ error: "User not found" });
      }
      delete user.dataValues.password;
      res.locals.user = user.dataValues;
    } catch (error) {
      return res
        .status(401)
        .json({ error: "While searching user : " + error.message });
    }

    // console.log("locals-user", res.locals.user);

    next();
  } catch (e) {
    res.status(401).json({ error: "Invalid request : " + e.message });
  }
};
