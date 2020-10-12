const express = require('express');
const router = express.Router();

const PostCtrl = require('../controllers/Post');
const auth = require('../middlewares/auth');
const debug = require('../middlewares/debug');
const multer = require('../middlewares/multer');
const multipartFormatter = require('../middlewares/multipart-formatter');

router.post('/',multer, multipartFormatter, auth, PostCtrl.postPost);
router.post('/:slug/like',auth, PostCtrl.postLike);

router.put('/:slug',multer, multipartFormatter, auth, PostCtrl.updatePost);
router.delete('/:slug', auth, PostCtrl.deletePost);

router.get('/:slug',auth, PostCtrl.getPost);

module.exports = router;