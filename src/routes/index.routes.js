const express = require('express');

const indexCtrl = require('../controllers/index.controller');
const { isNotLoggedIn,isLoggedIn } = require('../middleware/auth.middleware');
const router = express.Router();

//landing
router.get('/',isNotLoggedIn,indexCtrl.landing);

//inicio
router.get('/inicio', isLoggedIn, indexCtrl.inicio);


module.exports = router;