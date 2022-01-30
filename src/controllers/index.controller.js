const indexCtrl = {}
const pool = require('../controllers/database.controller');

indexCtrl.landing = (req,res) =>{
    res.render('index',{title:'InJob'});
}

//---Inicio
indexCtrl.inicio = async(req, res) => {   
    try {
        //todos los empleos
        const empleos = await pool.query('SELECT u.nombre, u.apellido,id_empleos, nombre_empleo, sueldo, at.nombre_area, fecha_vencimiento, fecha_registro FROM usuario AS u, empleos AS e, area_trabajo AS at WHERE e.id_area = at.id_area AND u.cedula = id_empresa ORDER BY fecha_registro ASC LIMIT 4');
        //los empleos depende de su valoracion
        const empVal = await pool.query('SELECT e.*, u.nombre, u.apellido,  SUM(ce.calificacion) AS cal FROM cal_empresa AS ce,usuario AS u, empleos AS e WHERE ce.id_empresa = e.id_empresa AND e.id_empresa = u.cedula GROUP BY (ce.id_empresa) ORDER BY (cal) DESC LIMIT 4');
        if(empVal.length == 0){
            empVal = 0;
        }
        res.render('inicio',{title:'inicio',empleos,empleoValorado:empVal});
    } catch (error) {
        console.log(error);
        res.redirect('/');
    }
}

indexCtrl.viewListVal = async (req,res) => {
    try {
        //los empleos depende de su valoracion
        const empVal = await pool.query('SELECT e.*, u.nombre, u.apellido,  SUM(ce.calificacion) AS cal FROM cal_empresa AS ce,usuario AS u, empleos AS e WHERE ce.id_empresa = e.id_empresa AND e.id_empresa = u.cedula GROUP BY (ce.id_empresa) ORDER BY (cal) DESC');
        if(empVal.length == 0){
            empVal = 0;
        }
        res.render('empleo/viewListVal',{title:'inicio',empleoValorado:empVal});
    } catch (error) {
        console.log(error);
        res.redirect('/');
    }
}

indexCtrl.viewListRec = async (req,res) => {
    try {
        //todos los empleos
        const empleos = await pool.query('SELECT u.nombre, u.apellido,id_empresa ,id_empleos, nombre_empleo, sueldo, at.nombre_area, fecha_vencimiento, fecha_registro FROM usuario AS u, empleos AS e, area_trabajo AS at WHERE e.id_area = at.id_area AND u.cedula = id_empresa ORDER BY fecha_registro ASC');
        console.log(empleos);
        res.render('empleo/viewListRec',{title:'inicio',empleos});
    } catch (error) {
        console.log(error);
        res.redirect('/');
    }
}

module.exports = indexCtrl;