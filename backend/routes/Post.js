const express = require('express');
const router = express.Router();

const PostCtrl = require('../controllers/Post');
const auth = require('../middlewares/auth');

router.post('/', auth, PostCtrl.postPost);
router.post('/:slug/like',auth, PostCtrl.postLike);

router.put('/:slug', auth, PostCtrl.updatePost);
router.delete('/:slug', auth, PostCtrl.deletePost);

router.get('/:slug',auth, PostCtrl.getPost);

module.exports = router;