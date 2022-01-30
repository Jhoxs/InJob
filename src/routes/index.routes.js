const express = require('express');

const indexCtrl = require('../controllers/index.controller');
const { isNotLoggedIn,isLoggedIn } = require('../middleware/auth.middleware');
const router = express.Router();

//landing
router.get('/',isNotLoggedIn,indexCtrl.landing);

//inicio
router.get('/inicio', isLoggedIn, indexCtrl.inicio);

//incio
//ver recientemente en lista
router.get('/viewListRec', isLoggedIn, indexCtrl.viewListRec);
//ver mejor valorados en lista
router.get('/viewListVal', isLoggedIn, indexCtrl.viewListVal);

module.exports = router;