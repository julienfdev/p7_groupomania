const express = require('express');
const router = express.Router();

const PostCtrl = require('../controllers/Post');
const auth = require('../middlewares/auth');
const debug = require('../middlewares/debug');
const multer = require('../middlewares/multer');
const multipartFormatter = require('../middlewares/multipart-formatter');
const validators = require('../middlewares/validators');

router.post('/',multer, multipartFormatter, auth, validators.postPost, PostCtrl.postPost);
router.post('/:slug/like',auth, validators.like, PostCtrl.postLike);
router.post('/:slug/comment', auth, validators.comment, PostCtrl.postComment);

router.put('/:slug',multer, multipartFormatter, auth, validators.updatePost, PostCtrl.updatePost);
router.delete('/:slug', auth, PostCtrl.deletePost);

// Passing a parameter to the controller (isHot? true for hot, false for fresh)
router.get('/hot/:page?', auth, (req,res,next) => {PostCtrl.getPage(req, res, next, true)});        
router.get('/fresh/:page?', auth, (req,res,next) => {PostCtrl.getPage(req, res, next, false)});
router.get('/category/:slug/:page?', auth, PostCtrl.getCategoryPosts);
router.get('/:slug',auth, PostCtrl.getPost);


module.exports = router;