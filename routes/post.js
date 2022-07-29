const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');
const postCtrl = require('../controllers/post');
const access = require('../middleware/access');

router.get('/', auth, access, postCtrl.findAll);
router.get('/:id', auth, access, postCtrl.find);
router.post('/', auth, postCtrl.create);
router.put('/:id', auth, postCtrl.update);
router.delete('/:id', auth, postCtrl.delete);

router.post('/:id/like', auth, postCtrl.like);
router.delete('/:id/like', auth, postCtrl.unlike);

module.exports = router;