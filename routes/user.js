const express = require('express');
const router = express.Router();

const userCtrl = require('../controllers/user');

router.get('/', userCtrl.findAll);
router.get('/:id', userCtrl.find);
router.post('/', userCtrl.create);
router.put('/:id', userCtrl.update);
router.delete('/:id', userCtrl.delete);

router.post('/login', userCtrl.login);
router.post('/signup', userCtrl.signup);

module.exports = router;