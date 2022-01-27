const express = require('express');
const router = express.Router();
const { isLoggedIn } = require('../middleware/auth.middleware');
const profCtrl = require('../controllers/perfil.controller');
const validacion = require('../validators/user.validator');
const profVal = require('../validators/perfil.validator');

//obtener la pagina de usuarios
router.get('/',isLoggedIn,profCtrl.renderProf);

//modificar el perfil
router.get('/edit',isLoggedIn,profCtrl.renderProfEditG);
router.post('/edit',isLoggedIn,validacion.validaPerfil,profCtrl.renderProfEditP);

//agrega datos al pefil (informacion adicional)
router.post('/addValue/:id',profVal.validaInfoAcc,isLoggedIn,profCtrl.addInfo);
//elimina los datos
router.get('/delValue/:id',isLoggedIn,profCtrl.delInfo);



module.exports = router;