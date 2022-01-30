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

//mostrar perfil de los empleados --Empresa
profCtrl.renderProfEmpleado = async(req,res) =>{
    const {id} =  req.params;
    const data = id.split('+');
    //datos de la empresa
    const {cedula} = req.user;
    let sol = {
        id_empleos: parseInt(data[0]),
        id_empleado: parseInt(data[1]),
        id_empresa: cedula
    }
    try {
        //primero debemos verificar si los datos existen
        const rows = await pool.query('SELECT * FROM empleado_empresa WHERE id_empleos = ? AND id_empleado = ? AND id_empresa = ?',[sol.id_empleos,sol.id_empleado,sol.id_empresa]);
        //en caso de que exista coincidencia enviará un error
        if(rows.length > 0){
            //verificamos si podemos ver el perfil
            const perfil = await pool.query('SELECT * FROM usuario WHERE cedula = ?',sol.id_empleado);
            //uso de luxon para dar formato a la fecha
            let newFecha = perfil[0].nacimiento.toISOString();
            newFecha = DateTime.fromISO(newFecha).setLocale('es-ES').toFormat('dd LLLL yyyy');
            Object.assign(perfil[0],{newFecha:newFecha});
            Object.assign(perfil[0],{id_empleos:sol.id_empleos});
            //---obtiene la informacion adicional
            //Habilidades personales
            const skill = await pool.query('SELECT  id_skill , nombre_skill FROM skill WHERE id_empleado = ?',[sol.id_empleado]);
            //Experiencia Laboral
            const exp = await pool.query('SELECT  id_exp , nombre_experiencia FROM experiencia WHERE id_empleado = ?',[sol.id_empleado]);
            //Certificados
            const cert = await pool.query('SELECT id_certificados, nombre_certificados FROM certificados WHERE id_empleado = ? ',[sol.id_empleado]);
            //Idiomas
            const idiomas = await pool.query('SELECT id_idiomas, nombre_idiomas FROM idiomas WHERE id_empleado = ? ',[sol.id_empleado]);
            //Formacion academica
            const fA1 = await pool.query('SELECT id_formA, nombre_formA FROM forma WHERE id_empleado = ? AND nivel = ?',[sol.id_empleado,'1']);
            const fA2 = await pool.query('SELECT id_formA, nombre_formA FROM forma WHERE id_empleado = ? AND nivel = ?',[sol.id_empleado,'2']);
            const fA3 = await pool.query('SELECT id_formA, nombre_formA FROM forma WHERE id_empleado = ? AND nivel = ?',[sol.id_empleado,'3']);
            //guarda el nacimiento en formato dd/mm/aa para un posterior uso
            perfil[0].nacimiento = perfil[0].nacimiento.toLocaleDateString();
            res.render('profile/viewProfileEmpleado',{perfil:perfil[0],skill,exp,cert,idiomas,f1:fA1[0],f2:fA2[0],f3:fA3[0]});
        }else{
            res.render('err/403');
        }
       
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
//render profile empresa
//Muestra el perfil de las empresas al -- empleado
profCtrl.renderProfEmpresa = async(req,res) =>{
    const {id} =  req.params;
    const data = id.split('+');
    //datos de la empresa
    const {cedula} = req.user;
    let sol = {
        id_empleos: parseInt(data[0]),
        id_empresa: parseInt(data[1]),
        id_empleado: cedula
    }
    let reporte = false;
    let calificacion = false;
    try {
        const perfil = await pool.query('SELECT * FROM usuario WHERE cedula = ?',[sol.id_empresa]);
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
        Object.assign(perfil[0],{id_empleos:sol.id_empleos});
        res.render('profile/viewProfileEmpresa',{perfil:perfil[0],infoAdd:infoAdd[0],reporte,calificacion,valoracion:sumPuntaje[0],numRep:sumReportes.length});
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

//--EMPRESA
profCtrl.renderEmpresa = async(req,res) =>{
    const {cedula} = req.user;
    try {
        const perfil = await pool.query('SELECT * FROM usuario WHERE cedula = ?',[cedula]);
        const infoAdd  = await pool.query('SELECT * FROM info_empresa WHERE id_empresa = ?',[cedula]);
        //hacemos la sumatoria para obtener la valoracion de la empresa
        const sumPuntaje = await pool.query('SELECT SUM(calificacion) AS res FROM cal_empresa WHERE id_empresa = ?',[cedula]);
        if(sumPuntaje.length == 0){
            sumPuntaje[0] = 0;
        }
        const reportes = await pool.query('SELECT id_repEmp FROM rep_empresa WHERE id_empresa = ?',[cedula]);
        res.render('profile/empresa',{perfil:perfil[0],infoAdd:infoAdd[0],valoracion:sumPuntaje[0],numRep:reportes.length});
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
//Agregar informacion personal -- empresa
profCtrl.addInfoEmpG = async(req,res) =>{
    res.render('profile/addInfoEmp');
}
profCtrl.addInfoEmpP = async(req,res) =>{
    const{ruc,mision,vision,certificados} =req.body
    const {cedula} = req.user;
    try {
        let newInfo = {
            id_empresa : cedula,
            ruc,
            mision,
            vision,
            certificados
        }
        await pool.query('INSERT INTO info_empresa SET ?',[newInfo]);
        req.flash('success','Los datos se añadieron con exito');
        res.redirect('/perfil/empresa');
    } catch (error) {
        console.log(error);
        req.flash('message','Ha ocurrido un error');
        res.redirect('/perfil/addInfoEmp');
    } 
}

profCtrl.editEmpresaG = async(req,res) =>{
    const {cedula} = req.user;
    try {
        const info = await pool.query('SELECT * FROM info_empresa WHERE id_empresa = ?',[cedula]);
        res.render('profile/editEmpresa',{info:info[0]});
    } catch (error) {
        console.log(error);
        req.flash('message','Ha ocurrido un error');
        res.redirect('/perfil/empresa');
    }
}
profCtrl.editEmpresaP = async(req,res) =>{
    const{ruc,mision,vision,certificados} =req.body
    const {cedula} = req.user;
    try {
        let newInfo = {
            id_empresa : cedula,
            ruc,
            mision,
            vision,
            certificados
        }
        await pool.query('UPDATE info_empresa SET ? WHERE id_empresa = ?',[newInfo,cedula]);
        req.flash('success','Los datos se actualizaron con exito');
        res.redirect('/perfil/empresa');
    } catch (error) {
        console.log(error);
        req.flash('message','Ha ocurrido un error');
        res.redirect('/perfil/empresa');
    }
}

//reportar empresa
profCtrl.reportEmpresaP = async(req,res) =>{
    const {id} = req.params;
    const {reporte} = req.body;
    const {cedula} = req.user;
    const data = id.split('+');
    let newReporte = {
        id_empresa: parseInt(data[1]),
        id_empleado: cedula,
        comentario: reporte
    }
    try {
        await pool.query('INSERT INTO rep_empresa SET ?',newReporte);
        req.flash('success','Su reporte se registro con exito');
        res.redirect('/perfil/empresa/'+data[0]+'+'+newReporte.id_empresa);
    } catch (error) {
        console.log('error');
        req.flash('message','Ha ocurrido un error');
        res.redirect('/perfil/empresa/'+data[0]+'+'+newReporte.id_empresa);
    }
}

//valorar la empresa
profCtrl.valorarEmpresaP = async (req,res) =>{
    const {id} = req.params;
    const {valoracion} = req.body;
    const {cedula} = req.user;
    const data = id.split('+');
    let newCali = {
        id_empresa: parseInt(data[1]),
        id_empleado: cedula,
        calificacion: valoracion
    }
    try {
        await pool.query('INSERT INTO cal_empresa SET ?',newCali);
        req.flash('success','Se ha registrado su calificación con exito');
        res.redirect('/perfil/empresa/'+id);
    } catch (error) {
        console.log('error');
        req.flash('message','Ha ocurrido un error');
        res.redirect('/perfil/empresa/'+id);
    }
}

module.exports = profCtrl;