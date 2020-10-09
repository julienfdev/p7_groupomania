const express = require('express');
const router = express.Router();

const PostCtrl = require('../controllers/Post');
const auth = require('../middlewares/auth');

router.post('/', auth, PostCtrl.postComment)

router.use('/', (req, res, next) =>{res.status(200).json({message: 'coucou postrouter'})})

module.exports = router;