const repCtrl = {}
const pool = require('./database.controller');

repCtrl.viewList = async (req,res) =>{
    try {
        const reporte = await pool.query('SELECT COUNT(r.id_empleado) AS cRep,u.cedula, u.nombre, u.apellido, u.correo, u.telefono, u.nacimiento FROM usuario AS u, rep_empresa AS r WHERE u.cedula = r.id_empresa GROUP BY (r.id_empleado)');
        res.render('reports/viewList',{reporte});
    } catch (error) {
        console.log(error);
        req.flash('message','Ocurrio un error al mostrar los reportes');
        res.redirect('/inicio');
    }
}


repCtrl.viewDetails = async (req,res) =>{
    const {id} = req.params;
    try {
        const reporte = await pool.query('SELECT u.cedula, u.nombre, u.apellido, u.correo, u.telefono, u.nacimiento,r.comentario FROM usuario AS u, rep_empresa AS r WHERE  r.id_empresa  = ? AND  u.cedula = r.id_empleado',[id]);
        if(reporte.length > 0){
            res.render('reports/viewDetails',{reporte});
        }else{
            res.render('err/404');
        }
    } catch (error) {
        console.log(error);
        req.flash('message','Ocurrio un error al mostrar los reportes');
        res.redirect('/inicio');
    }
}

repCtrl.viewEmpresa = async(req,res) =>{
    const {id} =req.params;
    const {cedula} = req.user;
    let sol = {
        id_empresa: id,
        id_empleado: cedula
    }
    let reporte,calificacion =false;
    let vista = true;
    let rol = 'empresa';
    try {
        const perfil = await pool.query('SELECT * FROM usuario AS u, rol_usuario AS ru, roles AS r WHERE cedula = ? AND r.rol = ? AND r.id_rol = ru.id_rol AND ru.id_usuario = u.cedula;',[sol.id_empresa,rol]);
        if(perfil.length > 0){
            const infoAdd  = await pool.query('SELECT * FROM info_empresa WHERE id_empresa = ?',[sol.id_empresa]);
            //verificamos si el usuario ya reportó
            const rows = await pool.query('SELECT * FROM rep_empresa WHERE id_empleado = ? AND id_empresa = ?',[sol.id_empleado,sol.id_empresa]);
            if(rows.length > 0){
                reporte = true;
            }
            //verificamos si el usuario ya calificó
            const rowsCali = await pool.query('SELECT * FROM cal_empresa WHERE id_empleado = ? AND id_empresa = ?',[sol.id_empleado,sol.id_empresa]);
            if(rowsCali.length > 0){
                calificacion = true;
            }
            //mostramos la sumatoria de calificaciones
            const sumPuntaje = await pool.query('SELECT SUM(calificacion) AS res FROM cal_empresa WHERE id_empresa = ?',[sol.id_empresa]);
            if(sumPuntaje.length == 0){
                sumPuntaje[0] = 0;
            }
            const sumReportes = await pool.query('SELECT id_repEmp FROM rep_empresa WHERE id_empresa = ?',[sol.id_empresa]);
            //mostramos la sumatoria de reportes
            res.render('profile/viewProfileEmpresa',{vista,perfil:perfil[0],infoAdd:infoAdd[0],reporte,calificacion,valoracion:sumPuntaje[0],numRep:sumReportes.length});
        }else{
            res.render('err/404');
        }
    } catch (error) {
        console.log(error);
        req.flash('message','Ocurrio un error al mostrar los reportes');
        res.redirect('/inicio');
    }
}


module.exports = repCtrl;