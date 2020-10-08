const express = require('express');
const router = express.Router();

const userCtrl = require('../controllers/User');
const auth = require('../middlewares/auth');

router.get('/:slug', auth, userCtrl.getUser);

router.post('/signup', userCtrl.signup);
router.post('/login', userCtrl.login);

module.exports = router;