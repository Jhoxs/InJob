const express = require('express');
const router = express.Router();
const { isLoggedIn } = require('../middleware/auth.middleware');
const profCtrl = require('../controllers/perfil.controller');
const validacion = require('../validators/user.validator');

//obtener la pagina de usuarios
router.get('/',isLoggedIn,profCtrl.renderProf);

//modificar el perfil
router.get('/edit',isLoggedIn,profCtrl.renderProfEditG);
router.post('/edit',isLoggedIn,validacion.validaPerfil,profCtrl.renderProfEditP);





module.exports = router;