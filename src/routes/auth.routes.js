const express = require('express');
const router = express.Router();
const { isLoggedIn, isNotLoggedIn } = require('../middleware/auth.middleware');
const authCtrl = require('../controllers/auth.controller');
//modulo encargado de validar los datos
const validacion = require('../validators/user.validator');

//logear
router.get('/login',isNotLoggedIn,authCtrl.renderLogin);
router.post('/login',validacion.validateLogin,authCtrl.login);

//registrarse
router.get('/registro',isNotLoggedIn,authCtrl.renderRegistro);
router.post('/registro',validacion.validateRegistro,authCtrl.registro);

//cerrar sesion
router.get('/logout',isLoggedIn,authCtrl.logout);




module.exports = router;