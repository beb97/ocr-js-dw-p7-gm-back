const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth");
const authCtrl = require("../controllers/auth");

router.get("/info", auth, authCtrl.info);
router.post("/login", authCtrl.login);
router.post("/signup", authCtrl.signup);

module.exports = router;
