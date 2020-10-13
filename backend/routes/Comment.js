const express = require('express');
const router = express.Router();

const commentCtrl = require('../controllers/Comment');
const auth = require('../middlewares/auth');

router.get('/', auth, commentCtrl.adminGetLastComments);
router.put('/:slug', auth, commentCtrl.updateComment);
router.delete('/:slug', auth, commentCtrl.deleteComment);

module.exports = router;