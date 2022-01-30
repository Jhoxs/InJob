//importamos el modulo check
const { check } = require("express-validator");
const { validateResultURL, validateResult, validateValoracion} = require("../helpers/validateHelper");
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

  //Validacion de los reportes
profVal.reporte = [
  check('reporte')
    .notEmpty()
    .withMessage('La casilla no debe estar vacia')
    .isLength({max:500})
    .withMessage('No puede usar mas de 300 caracteres')
    .toLowerCase()
    .custom(async(value,{req})=>{
      //verificamos que el usaurio no envie varios reportes
      const {id} = req.params;
      const data = id.split('+');
      const {cedula} = req.user;
      const rows = await pool.query('SELECT * FROM rep_empresa WHERE id_empresa = ? AND id_empleado = ?',[data[1],cedula]);
      //console.log(data[1]+"+"+cedula);
      //console.log(rows.length);
      if(rows.length > 0){
        throw new Error('Tu ya reportaste a esta empresa');
      }else{
        return true;
      }
      
      

    })
  ,
  (req,res,next) =>{
    validateValoracion(req,res,next);
  }
]
//validacion de valoraciones
profVal.valoracion = [
  check('valoracion')
    .notEmpty()
    .withMessage('Debe ingresar una estrella')
    .toInt()
    .custom((value)=>{
      if(value > 5 || value < 0){
        throw new Error('Esta ingresando datos erroneos')
      }
      return true;
    })
    .custom(async(value,{req})=>{
      //verificamos que no se califique varias veces por el mismo usuario
      const {id} = req.params;
      const data = id.split('+');
      const {cedula} = req.user;
      const rows = await pool.query('SELECT * FROM cal_empresa WHERE id_empresa = ? AND id_empleado = ?',[data[1],cedula]);
      if(rows.length > 0){
        throw new Error('Tu ya calificaste a esta empresa');
      }else{
        return true;
      }
    })
  ,
  (req,res,next) =>{
    validateValoracion(req,res,next);
  }
]

module.exports = profVal;