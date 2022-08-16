const userService = require("../services/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const h = require("./helpers");

exports.login = async function (req, res) {
  console.log("user.login");
  let pUser = { pseudo: req.body.pseudo };
  // let pUser = { email: req.body.email };
  let pPassword = req.body.password;

  try {
    const user = await userService.find(pUser);
    if (!user) {
      throw Error("incorrect password or username");
    }

    // Passwords order matter ! (plain, hashed)
    let arePasswordsMatching = await bcrypt.compare(pPassword, user.password);
    if (!arePasswordsMatching) {
      throw Error("incorrect password or username");
    }

    // TODO : changer le secret
    let token = jwt.sign(
      // { userId: 69 },
      { userId: user.id },
      "NOT_REALLY_SECRET",
      { expiresIn: "24h" }
    );

    // In order to set cookies in the browser, you would need to include the ‘credentials’ option with your request, to allow the server to set cookies.
    let expires = new Date(Date.now() + 60 * 60 * 24 * 1000);
    const response = {
      user: {
        email: user.email,
        pseudo: user.pseudo,
        id: user.id,
        isAdmin: user.isAdmin,
      },
      expires: expires,
      token: token,
    };

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
    return res.status(400).json({ error: error.message });
  }
};

exports.signup = async function (req, res) {
  console.log("user.signup");
  const pUser = req.body;
  pUser.password = await bcrypt.hash(pUser.password, 10);

  try {
    const user = await userService.create(pUser);
    return res.status(200).json(user);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

exports.info = function (req, res) {
  console.log("user.info");
  return res.status(200).json(res.locals.user);
};
