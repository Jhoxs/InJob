const pool = require('../controllers/database.controller');
const vRol = {};
//Protege las rutas dependiendo de los roles
//--Verifica si es Administrador
vRol.esAdmin = async(req,res,next) =>{
    const newRol = await pool.query('SELECT rol FROM roles WHERE id_rol = ?','3');
    console.log('----------ROLES-------')
    console.log(newRol[0].rol)
    if(req.user.rol===newRol[0].rol){
        return next();
    }
    console.log('no tiene acceso de administrador');
    req.flash('message','No tienes los permisos suficientes');
    return res.redirect('/inicio');
}
//--Verifica si es Empresa
vRol.esEmpresa = async(req,res,next)=>{
    const newRol = await pool.query('SELECT rol FROM roles WHERE id_rol = ?','2');
    if(newRol[0].rol===req.user.rol||req.user.rol==='administrador'){
        return next();
    }
    console.log('no tiene acceso');
    req.flash('message','No tienes los permisos suficientes');
    return res.redirect('/inicio');
}
//--Verifica si es Empleado
//no es estrictamente necesario hacer una consulta a la base de datos
vRol.esEmpleado = (req,res,next)=>{
    if(req.user.rol==='empresa'||'empleado'===req.user.rol){
        return next();
    }
    console.log('no tiene acceso');
    req.flash('message','No tienes los permisos suficientes');
    return res.redirect('/inicio');
}


module.exports = vRol;