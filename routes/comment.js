const express = require('express');
const router = express.Router();

const commentCtrl = require('../controllers/comment');

router.get('/', commentCtrl.findAll);
router.get('/:id', commentCtrl.find);
router.post('/', commentCtrl.create);
router.put('/:id', commentCtrl.update);
router.delete('/:id', commentCtrl.delete);

module.exports = router;