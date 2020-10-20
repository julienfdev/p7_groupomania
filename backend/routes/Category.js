const express = require('express');
const router = express.Router();

const categoriesCtrl = require('../controllers/Category');
const auth = require('../middlewares/auth');


router.get('/',auth, categoriesCtrl.getCategories);

module.exports = router;