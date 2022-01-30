const express = require('express');
const router = express.Router();
const { isLoggedIn } = require('../middleware/auth.middleware');
const profCtrl = require('../controllers/perfil.controller');
const validacion = require('../validators/user.validator');
const profVal = require('../validators/perfil.validator');
const vRol = require('../helpers/validaRol');

//obtener la pagina de usuarios -- empleados
router.get('/',isLoggedIn,vRol.esEmpleado,profCtrl.renderProf);
//obtener la pagina para empresa -- empresa
router.get('/empresa',vRol.esEmpresa,profCtrl.renderEmpresa);
//add inormacion adicional -- Empresa
router.get('/addInfoEmp',vRol.esEmpresa,profCtrl.addInfoEmpG);
router.post('/addInfoEmp',vRol.esEmpresa,validacion.validaInfoAddEmp,profCtrl.addInfoEmpP);
//muestra el perfil de los empleados -- empresa
router.get('/empleado/:id',isLoggedIn,vRol.esEmpresa,profCtrl.renderProfEmpleado);
//muestra el perfil de las empresas -- empleado
router.get('/empresa/:id',isLoggedIn,profCtrl.renderProfEmpresa);

//modificar perfil -- empresa
router.get('/editEmpresa',isLoggedIn,vRol.esEmpresa,profCtrl.editEmpresaG);
router.post('/editEmpresa',isLoggedIn,vRol.esEmpresa,validacion.validaInfoAddEmp,profCtrl.editEmpresaP);
//modificar el perfil--empleado
router.get('/edit',isLoggedIn,profCtrl.renderProfEditG);
router.post('/edit',isLoggedIn,validacion.validaPerfil,profCtrl.renderProfEditP);

//agrega datos al pefil (informacion adicional) -- empleado
router.post('/addValue/:id',profVal.validaInfoAcc,isLoggedIn,profCtrl.addInfo);
//elimina los datos -- empleado
router.get('/delValue/:id',isLoggedIn,profCtrl.delInfo);

//Enviar reporte
router.post('/reportar/:id',isLoggedIn,vRol.esEmpleado,profVal.reporte,profCtrl.reportEmpresaP);
//valorar empleo
router.post('/valorar/:id',isLoggedIn,vRol.esEmpleado,profVal.valoracion,profCtrl.valorarEmpresaP);

module.exports = router;