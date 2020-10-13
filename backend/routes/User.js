const express = require('express');
const router = express.Router();

const userCtrl = require('../controllers/User');
const auth = require('../middlewares/auth');

router.get('/:slug', auth, userCtrl.getUser);
router.get('/:slug/posts/', auth, userCtrl.getUserPosts);
router.get('/:slug/likedPosts', auth, userCtrl.getUserLikedPosts);
router.get('/:slug/comments/', auth, userCtrl.getUserComments);

router.put('/:slug', auth, userCtrl.updateUser);
router.delete('/:slug', auth, userCtrl.deleteUser);

router.post('/signup', userCtrl.signup);
router.post('/login', userCtrl.login);

module.exports = router;