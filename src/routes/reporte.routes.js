const express = require('express');
const router = express.Router();
const { isLoggedIn } = require('../middleware/auth.middleware');
const vRol = require('../helpers/validaRol');
const repCtrl = require('../controllers/reporte.controller');

//ver reportes de la empersa
router.get('/viewList',isLoggedIn,vRol.esAdmin,repCtrl.viewList);
router.get('/viewList/:id',isLoggedIn,vRol.esAdmin,repCtrl.viewDetails);

//ver perfil de la empresa por su id
router.get('/viewEmpresa/:id',isLoggedIn,vRol.esAdmin,repCtrl.viewEmpresa);



module.exports = router;