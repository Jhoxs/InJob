//importamos el modulo check
const { check } = require("express-validator");
const {validateResult} = require("../helpers/validateHelper");
const empVal = {}


empVal.validaAddEmp = [
    check('nombre')
        .notEmpty()
        .withMessage('Debe rellenar el campo nombre')
        .isLength({max:30})
        .withMessage('Excediste el numero de caracteres')
    ,
    check('area')
        .notEmpty()
        .withMessage('Debes llenar el campo area')
        .isNumeric()
        .withMessage('Dato ingesado erroneo')
        .isLength({max:10})
    ,
    check('sueldo')
        .isNumeric()
        .withMessage('Debe ingesar una cantidad en numeros')
        .notEmpty()
        .withMessage('Debe llenar el campo sueldo')
        .isLength({max:10})
    ,
    check('provincia')
        .isNumeric()
        .withMessage('Dato ingresado de forma erronea')
        .notEmpty()
        .withMessage('Debe rellenar el campo provincia')
        .isLength({max:10})
    ,
    check('direccion')
        .notEmpty()
        .withMessage('Debe rellenar el campo direccion')
        .isLength({max:40})
        .withMessage('Excediste el numero de caracteres')
    ,
    check('vencimiento')
        .notEmpty()
        .withMessage('Debe rellenar el campo fecha')
        .isDate()
        .withMessage('Debe ingresar una fecha')
    ,
    check('descripcion')
        .notEmpty()
        .withMessage('Debe rellenar el campo descripcion')
    ,
    check('requisitos')
        .notEmpty()
        .withMessage('Debe rellenar el campo de requisitos')
    ,(req,res,next) =>{
        validateResult(req,res,next);
    }
];

module.exports = empVal;