const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');
const postCtrl = require('../controllers/post');

router.get('/', auth, postCtrl.findAll);
router.get('/:id', auth, postCtrl.find);
router.post('/', auth, postCtrl.create);
router.put('/:id', auth, postCtrl.update);
router.delete('/:id', auth, postCtrl.delete);

module.exports = router;