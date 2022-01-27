const profCtrl = {}
const pool = require('./database.controller');
const { DateTime } = require('luxon');


//toISOString() nos presenta en un formato ISO
//toLocaleDateString() nos presenta en un formato dd/mm/aa

//metodo get para obtener el perfil del usuario
profCtrl.renderProf = async(req,res) =>{
    const {cedula} = req.user;
    try {
        const perfil = await pool.query('SELECT * FROM usuario WHERE cedula = ?',req.user.cedula);
        //uso de luxon para dar formato a la fecha
        let newFecha = perfil[0].nacimiento.toISOString();
        newFecha = DateTime.fromISO(newFecha).setLocale('es-ES').toFormat('dd LLLL yyyy');
        Object.assign(perfil[0],{newFecha:newFecha});
        //---obtiene la informacion adicional
        //Habilidades personales
        const skill = await pool.query('SELECT  id_skill , nombre_skill FROM skill WHERE id_empleado = ?',[cedula]);
        //Experiencia Laboral
        const exp = await pool.query('SELECT  id_exp , nombre_experiencia FROM experiencia WHERE id_empleado = ?',[cedula]);
        //Certificados
        const cert = await pool.query('SELECT id_certificados, nombre_certificados FROM certificados WHERE id_empleado = ? ',[cedula]);
        //Idiomas
        const idiomas = await pool.query('SELECT id_idiomas, nombre_idiomas FROM idiomas WHERE id_empleado = ? ',[cedula]);
        //Formacion academica
        const fA1 = await pool.query('SELECT id_formA, nombre_formA FROM forma WHERE id_empleado = ? AND nivel = ?',[cedula,'1']);
        const fA2 = await pool.query('SELECT id_formA, nombre_formA FROM forma WHERE id_empleado = ? AND nivel = ?',[cedula,'2']);
        const fA3 = await pool.query('SELECT id_formA, nombre_formA FROM forma WHERE id_empleado = ? AND nivel = ?',[cedula,'3']);
        //guarda el nacimiento en formato dd/mm/aa para un posterior uso
        perfil[0].nacimiento = perfil[0].nacimiento.toLocaleDateString();

        res.render('profile/perfil',{perfil:perfil[0],skill,exp,cert,idiomas,f1:fA1[0],f2:fA2[0],f3:fA3[0]});
    } catch (error) {
        if(error instanceof TypeError){
            //Cierra sesion en caso de que el administrador haya modificado los datos
            console.log(error);
            req.flash('message','Vuelve a iniciar session');
            res.render('err/errPerfil');
        }else{
            req.flash('message','Ocurrio un error al mostrar tus datos');
            console.log(error);
            res.redirect('/inicio');
        }
    }
}


//metodo get para editar el perfil del usuario ----
profCtrl.renderProfEditG = async(req,res) => {
    try {
        const perfil = await pool.query('SELECT * FROM usuario WHERE cedula = ?',req.user.cedula);
        //Da formato a la fecha para mostrarla en el formulario -- input Date
        let newFecha = perfil[0].nacimiento.toISOString();
        newFecha = DateTime.fromISO(newFecha).setLocale('es-ES').toFormat('yyyy-LL-dd');
        Object.assign(perfil[0],{newFecha:newFecha});
        //Da formato para mostrar en el formulario  -- lable Fecha Nacimiento
        perfil[0].nacimiento = perfil[0].nacimiento.toLocaleDateString();
        res.render('profile/editP',{perfil:perfil[0]});
    }
    catch (error) {
       
        req.flash('message','Ocurrio un error editar tu perfil');
        res.redirect('/perfil');
        
    }
}

profCtrl.renderProfEditP = async(req,res) => {
    try {
        const { nombre, apellido, cedula, correo, telefono, nacimiento, sexo} = req.body; 
        let profUser = {
            nombre,
            apellido,
            cedula,
            correo,
            telefono,
            nacimiento,
            sexo
        }
        console.log(req.user);
        console.log(profUser);
        //actualiza mis datos en la base de datos
        await pool.query('UPDATE usuario SET ? WHERE cedula = ?',[profUser,req.body.cedulaAct]);
        req.user.cedula = profUser.cedula;
        req.flash('success','Los datos se actualizaron con exito');
        res.redirect('/perfil');
    } catch (error) {
        console.log(error);
        
        req.flash('message','Ocurrio un error editar tu perfil');
        res.redirect('/perfil');
    }
}

//metodo para añadir informacion adicional al perfil
profCtrl.addInfo = async (req,res) =>{
    const  {id} = req.params;
    const {value} = req.body;
    const {cedula} = req.user;
    const newData = {
        tabla : id,
        nombre_info: value,
        id_empleado: cedula
    }
    try {
        switch(newData.tabla){
            case 'skill':
                await pool.query('INSERT INTO skill VALUES (null,?,?)',[newData.nombre_info,newData.id_empleado])
                req.flash('success','Los datos fueron añadidos con exito');
                res.redirect('/perfil');
                break;
            case 'experiencia':
                await pool.query('INSERT INTO experiencia VALUES (null,?,?)',[newData.nombre_info,newData.id_empleado])
                req.flash('success','Los datos fueron añadidos con exito');
                res.redirect('/perfil');
                break;
            case 'certificados':
                await pool.query('INSERT INTO certificados VALUES (null,?,?)',[newData.nombre_info,newData.id_empleado])
                req.flash('success','Los datos fueron añadidos con exito');
                res.redirect('/perfil');
                break;
            case 'idiomas':
                await pool.query('INSERT INTO idiomas VALUES (null,?,?)',[newData.nombre_info,newData.id_empleado])
                req.flash('success','Los datos fueron añadidos con exito');
                res.redirect('/perfil');
                break;
            case 'forma':
                const {nivel} = req.body;
                await pool.query('INSERT INTO forma VALUES (null,?,?,?)',[newData.nombre_info,nivel,newData.id_empleado])
                req.flash('success','Los datos fueron añadidos con exito');
                res.redirect('/perfil');
                break;

            default:
                req.flash('message','Datos no encontrados');
                res.redirect('/pefil');
        }
        
    } catch (error) {
        console.log(error);
        req.flash('message','Ocurrio un error al agregar los datos');
        res.redirect('/perfil');
    }
    
}

//metodo para eliminar información
profCtrl.delInfo = async(req,res) =>{
    const {id} = req.params;
    const data = id.split('+');
    try {
        switch(data[0]){
            case 'skill':
                await pool.query('DELETE FROM skill WHERE id_skill = ?',[data[1]]);
                req.flash('success','Dato eliminado');
                res.redirect('/perfil');
                break;
            case 'experiencia':
                await pool.query('DELETE FROM experiencia WHERE id_exp = ?',[data[1]]);
                req.flash('success','Dato eliminado');
                res.redirect('/perfil');
                break;
            case 'certificados':
                await pool.query('DELETE FROM certificados WHERE id_certificados = ?',[data[1]]);
                req.flash('success','Dato eliminado');
                res.redirect('/perfil');
                break;
            case 'idiomas':
                await pool.query('DELETE FROM idiomas WHERE id_idiomas = ?',[data[1]]);
                req.flash('success','Dato eliminado');
                res.redirect('/perfil');
                break;
            case 'forma':
                await pool.query('DELETE FROM forma WHERE id_formA = ?',[data[1]]);
                req.flash('success','Dato eliminado');
                res.redirect('/perfil');
                break;
            default:
                req.flash('message','Datos no encontrados');
                res.redirect('/perfil');
        }
        
    } catch (error) {
        req.flash('message','Ocurrio un error al eliminar el dato');
        console.log(error);
        res.redirect('/perfil');
    }
    


}

module.exports = profCtrl;