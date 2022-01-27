const empCtrl = {}

const pool = require('../controllers/database.controller');


empCtrl.addEmpleoG = async(req,res)=>{
    try {
        const areas = await pool.query('SELECT nombre_area FROM area_trabajo');
        const provincias = await pool.query('SELECT nombre_provincia FROM provincias');

        res.render('empleo/add',{areas,provincias});
    } catch (error) {
        console.log(error);
        req.flash('message','ocurrio un error');
        res.redirect('/incio');
    }
    
}




module.exports = empCtrl;