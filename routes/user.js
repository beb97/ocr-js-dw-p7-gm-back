const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth");
const userCtrl = require("../controllers/user");

// AVANT le router.get("/:id"...)
router.get("/", auth, userCtrl.findAll);
router.get("/:id", auth, userCtrl.find);
router.post("/", userCtrl.create);
router.put("/:id", auth, userCtrl.update);
router.delete("/:id", auth, userCtrl.delete);


module.exports = router;
