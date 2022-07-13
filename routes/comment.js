const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');
const commentCtrl = require('../controllers/comment');

router.get('/', auth, commentCtrl.findAll);
router.get('/:id', auth, commentCtrl.find);
router.post('/', auth, commentCtrl.create);
router.put('/:id', auth, commentCtrl.update);
router.delete('/:id', auth, commentCtrl.delete);

module.exports = router;