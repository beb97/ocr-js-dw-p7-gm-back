const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');
const postCtrl = require('../controllers/post');

router.get('/', auth, postCtrl.findAll);
router.get('/:id', postCtrl.find);
router.post('/', postCtrl.create);
router.put('/:id', postCtrl.update);
router.delete('/:id', postCtrl.delete);

module.exports = router;