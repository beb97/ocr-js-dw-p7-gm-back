const express = require('express');
const router = express.Router();

const userCtrl = require('../controllers/user');

router.get('/', userCtrl.findAll);
router.post('/', userCtrl.create);
router.delete('/:id', userCtrl.delete);


module.exports = router;