const express = require('express');
const router = express.Router();
const { isLoggedIn, isNotLoggedIn } = require('../middleware/auth.middleware');
const empCtrl = require('../controllers/empleo.controller');
const vRol = require ('../helpers/validaRol');

//agregar nuevos empleos
router.get('/add',isLoggedIn,vRol.esEmpresa,empCtrl.addEmpleoG)



module.exports = router;