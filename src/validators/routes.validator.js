//importamos el modulo check
const { check } = require("express-validator");
const {validateResultURL,validateDel} = require("../helpers/validateHelper");
//creamos el objeto para validar turnos
const valRoutes = {};

//validamos la ruta dividida en dos
valRoutes.verRoutesDelete = [
    check('id')
        .isLength({max:50})
        .withMessage('Ocurrio un erro al ingresar los datos')
        .custom((value,{req})=>{
            //verifica que el url entre con un split
            if(value.includes('+')){
                let newValue = value.split('+');
                let regFecha  =  /[0-9]{10}/ //
                //el primer dato envia el id
                if(newValue[0].length>20) throw new Error('El URL no es valido');
                //el segundo parametro envia la cedula
                if(regFecha.test(newValue[1])){
                    return true;

                }else{
                    throw new Error('El URL no es valido');
                }
            }else{
                throw new Error('No se encuentra en el parametro especificado');
            }  
        })
    ,

    (req,res,next) =>{
        validateDel(req,res,next);
    }
]

module.exports = valRoutes;