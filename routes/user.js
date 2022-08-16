const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth");
const userCtrl = require("../controllers/user");

router.get("/", auth, userCtrl.findAll);
router.get("/:id", auth, userCtrl.find);
router.post("/", userCtrl.create);
router.put("/:id", auth, userCtrl.update);
router.delete("/:id", auth, userCtrl.delete);

router.post("/info", auth, userCtrl.info);
router.post("/login", userCtrl.login);
router.post("/signup", userCtrl.signup);

module.exports = router;
