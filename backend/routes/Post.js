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

// Passing a parameter to the controller (isHot? true for hot, false for fresh)
router.get('/hot/:page?', auth, (req,res,next) => {PostCtrl.getPage(req, res, next, true)});        
router.get('/fresh/:page?', auth, (req,res,next) => {PostCtrl.getPage(req, res, next, false)});
router.get('/category/:slug/:page?', auth, PostCtrl.getCategoryPosts);
router.get('/:slug',auth, PostCtrl.getPost);


module.exports = router;