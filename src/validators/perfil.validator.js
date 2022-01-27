//importamos el modulo check
const { check } = require("express-validator");
const { validateResultURL} = require("../helpers/validateHelper");
//lamada a la base de datos
const pool = require('../controllers/database.controller');
//creamos un objeto validacion
const profVal = {}
//valida ingreso de infoAdicional -- admin
profVal.validaInfoAcc = [
    check('value')
      .notEmpty()
      .withMessage('La casilla no debe estar vacia')
      .isLength({max:30})
      .withMessage('No se admiten más de 30 digitos')
      .toUpperCase()
    ,
    (req, res, next) => {
      validateResultURL(req, res, next);
    },
  ];

  module.exports = profVal;