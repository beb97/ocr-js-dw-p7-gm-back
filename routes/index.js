const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');
const indexCtrl = require('../controllers/index');

router.get('/', auth, indexCtrl.getHome);

module.exports = router;