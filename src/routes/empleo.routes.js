const express = require('express');
const router = express.Router();
const { isLoggedIn } = require('../middleware/auth.middleware');
const valRoutes = require('../validators/routes.validator');
const empCtrl = require('../controllers/empleo.controller');
//validaciones
const vRol = require ('../helpers/validaRol');
const empVal = require('../validators/empleo.validator');

//agregar nuevos empleos -- Empresa
router.get('/add',isLoggedIn,vRol.esEmpresa,empCtrl.addEmpleoG);
router.post('/add',isLoggedIn,vRol.esEmpresa,empVal.validaAddEmp,empCtrl.addEmpleoP);
//editar emmpleos -- Empresa 
router.get('/edit/:id',isLoggedIn,vRol.esEmpresa,empCtrl.editEmpG);
router.post('/edit/:id',isLoggedIn,vRol.esEmpresa,empVal.validaAddEmp,empCtrl.editEmpP);
//eliminar empleos -- Empresa
router.get('/delete/:id',isLoggedIn,vRol.esEmpresa,empCtrl.delEmp);
//eliminar solicitud empleos --Empresa
router.get('/deleteSolEmp/:id',isLoggedIn,vRol.esEmpresa,valRoutes.verRoutesDelete,empCtrl.delSolEmp);
//ver los empleos agregados -- Empresa
router.get('/viewJobs',isLoggedIn,vRol.esEmpresa,empCtrl.showEmp);
//ver las solicitudes de empleo -- Emplersa
router.get('/showSolEmpresa',isLoggedIn,vRol.esEmpresa,empCtrl.showSolEmpresa);
router.get('/showSolEmpresa/:id',isLoggedIn,vRol.esEmpresa,empCtrl.showSolEmpresaDetalles);
router.get('/showAllSol/:id',isLoggedIn,vRol.esEmpresa,empCtrl.showAllSol);
//muestra el empleo seleccionado
router.get('/infoJob/:id',isLoggedIn,vRol.esEmpleado,empCtrl.showInfo);

//envia solicitud empleo -- empleado
router.get('/sendSol/:id',isLoggedIn,vRol.esEmpleado,empCtrl.sendSol);
//elimina la solicitud de empleo -- empleado
router.get('/deleteSol/:id',isLoggedIn,vRol.esEmpleado,empCtrl.delSol)
//muestra los empleos a los que se envio solicitud --empleado
router.get('/showSol',isLoggedIn,vRol.esEmpleado,empCtrl.showSol);

//buscar empleo
router.post('/searchEmpleo',isLoggedIn,empCtrl.searchEmp);

module.exports = router;