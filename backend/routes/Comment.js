const express = require('express');
const router = express.Router();

const commentCtrl = require('../controllers/Comment');
const auth = require('../middlewares/auth');
const validators = require('../middlewares/validators')

router.get('/', auth, commentCtrl.adminGetLastComments);
router.put('/:slug', auth, validators.comment, commentCtrl.updateComment);
router.delete('/:slug', auth, commentCtrl.deleteComment);

module.exports = router;