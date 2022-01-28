const indexCtrl = {}
const pool = require('../controllers/database.controller');

indexCtrl.landing = (req,res) =>{
    res.render('index',{title:'InJob'});
}

//---Inicio
indexCtrl.inicio = async(req, res) => {   
    const empleos = await pool.query('SELECT u.nombre, u.apellido,id_empleos, nombre_empleo, sueldo, at.nombre_area, fecha_vencimiento, fecha_registro FROM usuario AS u, empleos AS e, area_trabajo AS at WHERE e.id_area = at.id_area AND u.cedula = id_empresa ORDER BY fecha_registro ASC LIMIT 4');
    res.render('inicio',{title:'inicio',empleos});
}

module.exports = indexCtrl;