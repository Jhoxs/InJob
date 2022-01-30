const empCtrl = {}

const { DateTime } = require('luxon');
const pool = require('../controllers/database.controller');
const plantilla = require('../lib/plantillasHTML');
const {enviarCorreo} = require('../config/nodemailer.config');

//metodo para mostrar pagina de registro -- Empresa
empCtrl.addEmpleoG = async(req,res)=>{
    try {
        const areas = await pool.query('SELECT * FROM area_trabajo');
        const provincias = await pool.query('SELECT * FROM provincias');

        res.render('empleo/add',{areas,provincias});
    } catch (error) {
        console.log(error);
        req.flash('message','ocurrio un error');
        res.redirect('/inicio');
    }
    
}
//guardar datos empleo -- Empresa
empCtrl.addEmpleoP = async(req,res) =>{
    const {nombre, area, sueldo, provincia, direccion, vencimiento, descripcion, requisitos} = req.body;
    const registro  = DateTime.now().toFormat('yyyy-LL-dd');
    const {cedula} = req.user;
    let newEmpleo = {
        id_empresa:cedula,
        id_area:area,
        nombre_empleo:nombre,
        sueldo,
        id_provincia:provincia,
        direccion,
        fecha_vencimiento:vencimiento,
        fecha_registro:registro,
        descripcion,
        requisitos
    }
    try {
        await pool.query('INSERT INTO empleos SET ?',[newEmpleo]);
        req.flash('success','Se añadieron los datos con exito');
        res.redirect('/empleo/viewJobs');
    } catch (error) {
        console.log(error);
        req.flash('message','ocurrio un error');
        res.redirect('/empleo/add');
    }
}

//Editar empleo GET -- empresa
empCtrl.editEmpG = async(req,res) =>{
    const {id} = req.params;
    const {cedula} = req.user;
    try {
        const areas = await pool.query('SELECT * FROM area_trabajo');
        const provincias = await pool.query('SELECT * FROM provincias');
        const data = await pool.query('SELECT * FROM empleos WHERE id_empleos = ? AND id_empresa = ?',[id,cedula]);
        //si existe este dato
        if(data.length > 0){
            const box_data = await pool.query('SELECT nombre_area, nombre_provincia FROM area_trabajo, provincias WHERE id_area = ? AND id_provincia = ?',[data[0].id_area,data[0].id_provincia]);
            Object.assign(data[0],{nombre_area:box_data[0].nombre_area});
            Object.assign(data[0],{nombre_provincia:box_data[0].nombre_provincia});
            res.render('empleo/edit',{areas,provincias,data:data[0]});
        }else{
            res.render('err/403');
        }
    } catch (error) {
        console.log(error);
        req.flash('message','ocurrio un error');
        res.redirect('/inicio');
    }
}
//Editar empleo POST -- empresa
empCtrl.editEmpP = async(req,res) =>{
    const {nombre, area, sueldo, provincia, direccion, vencimiento, descripcion, requisitos} = req.body;
    const registro  = DateTime.now().toFormat('yyyy-LL-dd');
    const {cedula} = req.user;
    const {id} =  req.params;
    let upEmpleo = {
        id_empresa:cedula,
        id_area:area,
        nombre_empleo:nombre,
        sueldo,
        id_provincia:provincia,
        direccion,
        fecha_vencimiento:vencimiento,
        fecha_registro:registro,
        descripcion,
        requisitos
    }
    try {
        //verificamos que exista
        const rows = await pool.query('SELECT * FROM empleos WHERE id_empleos = ? AND id_empresa = ?',[id,cedula]);
        //si existe este dato
        if(rows.length > 0){
            await pool.query('UPDATE empleos SET ? WHERE id_empleos = ? AND id_empresa = ?',[upEmpleo,id,cedula]);
            req.flash('success','Se actualizaron los datos con exito');
            res.redirect('/empleo/viewJobs');
        }else{
            res.render('err/403');
        }
        
    } catch (error) {
        console.log(error);
        req.flash('message','ocurrio un error');
        res.redirect('/empleo/viewJobs');
    }
}
//Eliminar empleo -- Empresa
empCtrl.delEmp = async(req,res) =>{
    const {id} = req.params;
    const {cedula} = req.user;
    try {
        //se verifica que exista el empleo antes de ser borrado
        const rows = await pool.query('SELECT * FROM empleos WHERE id_empleos = ? AND id_empresa = ?',[id,cedula]);
        if(rows.length>0){
            await pool.query('DELETE FROM empleos WHERE id_empleos = ? AND id_empresa = ?',[id,cedula]);
            req.flash('success','Se eliminaron los datos con exito');
            res.redirect('/empleo/viewJobs');
        }else{
            res.render('err/403');
        }
    } catch (error) {
        console.log(error);
        req.flash('message','ocurrio un error');
        res.redirect('/empleo/viewJobs');
    }
}
//Eliminar Solicitud -- Empresa
empCtrl.delSolEmp = async (req,res) =>{
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
        if(rows.length > 0) {
            //eliminamos la solicitud
            await pool.query('DELETE FROM empleado_empresa WHERE id_empleos = ? AND id_empleado = ? AND id_empresa = ?',[sol.id_empleos,sol.id_empleado,sol.id_empresa]);
            req.flash('success','Se eliminó la solicitud con exito');
            res.redirect('/empleo/showSolEmpresa/'+sol.id_empleos);
        }else{
            throw new Error ('Existe un error');
        }
        
    } catch (error) {
        console.log(error);
        req.flash('message','Ocurrio un error');
        res.redirect('/empleo/showSolEmpresa/'+sol.id_empleos);
    }

}
//mostrar solicitudes reccibidas -- Empresa
empCtrl.showSolEmpresa = async(req,res) =>{
    const {cedula} = req.user;
    try {
        const sol = await pool.query('SELECT COUNT(e.id_empleos) AS totalSol, e.id_empleos, e.nombre_empleo,  a.nombre_area, e.sueldo, e.fecha_vencimiento FROM empleos AS e , empleado_empresa AS ee, area_trabajo AS a WHERE ee.id_empresa = ? AND ee.id_empleos = e.id_empleos AND e.id_area = a.id_area GROUP BY e.id_empleos',[cedula]);
        res.render('empleo/showSolEmpresa',{empleos:sol});
    } catch (error) {
        console.log(error);
        req.flash('message','ocurrio un error');

    }
    
}
//mostrar detalles especificos de empresa -- Empresa
empCtrl.showSolEmpresaDetalles = async(req,res) =>{
    const {cedula} = req.user;
    const {id} = req.params;
    try {
        //Informacion
        const infoEmp = await pool.query('SELECT e.*, u.nombre, u.apellido, p.nombre_provincia, at.nombre_area FROM empleos AS e, area_trabajo AS at, usuario AS u, provincias AS p WHERE id_empleos = ? AND id_empresa = cedula AND e.id_provincia = p.id_provincia AND e.id_area = at.id_area',[id]);
        //Solicitudes
        const sol = await pool.query('SELECT u.cedula, u.nombre, u.apellido, ee.id_empleos FROM usuario AS u, empleado_empresa AS ee WHERE ee.id_empresa = ? AND ee.id_empleos = ? AND ee.id_empleado = u.cedula LIMIT 5 ',[cedula,id]);
        res.render('empleo/infoEmpresa',{info:infoEmp[0],sol:sol});
    } catch (error) {
        console.log(error);
        req.flash('message','ocurrio un error');
    }
}
//mostrar todas las solicitudes recibidas 
empCtrl.showAllSol = async(req,res) =>{
    const {cedula} = req.user;
    const {id} = req.params;
    try {
        //Informacion
        const infoEmp = await pool.query('SELECT e.*, u.nombre, u.apellido, p.nombre_provincia, at.nombre_area FROM empleos AS e, area_trabajo AS at, usuario AS u, provincias AS p WHERE id_empleos = ? AND id_empresa = cedula AND e.id_provincia = p.id_provincia AND e.id_area = at.id_area',[id]);
        //Solicitudes
        const sol = await pool.query('SELECT u.cedula, u.nombre, u.apellido, ee.id_empleos FROM usuario AS u, empleado_empresa AS ee WHERE ee.id_empresa = ? AND ee.id_empleos = ? AND ee.id_empleado = u.cedula',[cedula,id]);
        res.render('empleo/showAllSol',{info:infoEmp[0],sol:sol});
    } catch (error) {
        console.log(error);
        req.flash('message','ocurrio un error');
    }
}

//--Empleado
//mostrar los datos de los empleados -- empleado
empCtrl.showEmp = async(req,res) =>{
    const {cedula} = req.user;
    try {
        const empleos = await pool.query('SELECT id_empleos, nombre_empleo, sueldo, at.nombre_area, fecha_vencimiento, fecha_registro FROM empleos AS e, area_trabajo AS at WHERE id_empresa = ? AND e.id_area = at.id_area',[cedula]);
        res.render('empleo/jobs',{empleos});
    } catch (error) {
        console.log(error);
        req.flash('message','Ocurrio un error')
        res.redirect('/inicio');
    }
}

//mostrar empleo seleccionado
empCtrl.showInfo = async(req,res) =>{
    const {id} = req.params;
    const {cedula} = req.user;
    let existe = false;
    try {
        const infoEmp = await pool.query('SELECT e.*, u.nombre, u.apellido, p.nombre_provincia, at.nombre_area FROM empleos AS e, area_trabajo AS at, usuario AS u, provincias AS p WHERE id_empleos = ? AND id_empresa = cedula AND e.id_provincia = p.id_provincia AND e.id_area = at.id_area',[id]);
        //verificamos si ya tenemos una solicitud aqui
        const rows =   await pool.query('SELECT * FROM empleado_empresa AS ee, empleos AS e WHERE ee.id_empleos = ? AND ee.id_empleado = ? AND ee.id_empresa = e.id_empresa',[id,cedula]);
        if(rows.length > 0) existe = true;
        //agergamos existe al objeto infoEmp
        Object.assign(infoEmp[0],{existe});
        res.render('empleo/info',{info:infoEmp[0]});
    } catch (error) {
        console.log(error);
        req.flash('message','Ocurrio un error');
        res.redirect('/inicio');
    }
}

//proceso de solicitud empleo
empCtrl.sendSol = async(req,res) =>{
    const {id} =  req.params;
    const data = id.split('+');
    const {cedula} = req.user;
    let sol = {
        id_empleos: data[0],
        id_empresa: parseInt(data[1]),
        id_empleado: cedula
    }
    try {
        //primero debemos verificar si no existen datos similares
        const rows = await pool.query('SELECT * FROM empleado_empresa WHERE id_empleos = ? AND id_empleado = ? AND id_empresa = ?',[sol.id_empleos,sol.id_empleado,sol.id_empresa]);
        //en caso de que exista coincidencia enviará un error
        if(rows.length > 0) throw new Error('No puedes volver a enviar el empleo aquí');
        //verificamos que no se encuentre en una nomina 
        const nomina = await pool.query('SELECT * FROM nomina WHERE id_empleado = ?',[sol.id_empleado]);
        if(nomina.length > 0) throw new Error('Ya se encuentra en la nomina');
        //insertamos la solicitud
        await pool.query('INSERT INTO empleado_empresa SET ?',sol);
        req.flash('success','Se envió la solicitud con exito');
        res.redirect('/inicio');
    } catch (error) {
        console.log(error);
        req.flash('message','Ocurrio un error');
        res.redirect('/empleo/infoJob/'+sol.id_empleos);
    }
}
//Eliminar la solicitud -- empleado
empCtrl.delSol = async(req,res) =>{
    const {id} =  req.params;
    const data = id.split('+');
    const {cedula} = req.user;
    let sol = {
        id_empleos: parseInt(data[0]),
        id_empresa: parseInt(data[1]),
        id_empleado: cedula
    }
    try {
        //primero debemos verificar si los datos existen
        const rows = await pool.query('SELECT * FROM empleado_empresa WHERE id_empleos = ? AND id_empleado = ? AND id_empresa = ?',[sol.id_empleos,sol.id_empleado,sol.id_empresa]);
        //en caso de que exista coincidencia enviará un error
        if(rows.length > 0) {
            await pool.query('DELETE FROM empleado_empresa WHERE id_empleos = ? AND id_empleado = ? AND id_empresa = ?',[sol.id_empleos,sol.id_empleado,sol.id_empresa]);
            req.flash('success','Se eliminó la solicitud con exito');
            res.redirect('/inicio');
        }else{
            throw new Error('No puedes enviar eliminar esta solicitud');
        }
        //insertamos la solicitud
        
    } catch (error) {
        console.log(error);
        req.flash('message','Ocurrio un error');
        res.redirect('/empleo/infoJob/'+sol.id_empleos);
    }
}

//muestra los empleos que enviamos solicitud
empCtrl.showSol = async(req,res) =>{
    const {cedula} = req.user;
    try {
        const data = await pool.query('SELECT  e.*, u.nombre, u.apellido FROM usuario AS u, empleos AS e, empleado_empresa AS ee WHERE e.id_empleos = ee.id_empleos AND ee.id_empleado = ? AND e.id_empresa = ee.id_empresa AND u.cedula = e.id_empresa',[cedula]);
        res.render('empleo/showSol',{data});
    } catch (error) {
        console.log(error);
        req.flash('message','Ocurrio un error');
        res.redirect('/inicio');
    }
}
//busca el empleo
empCtrl.searchEmp = async(req,res) =>{
    const {empleo} = req.body;
    try {
        const result = await pool.query('SELECT e.*, u.nombre, u.apellido FROM empleos AS e, usuario AS u WHERE nombre_empleo = ? AND e.id_empresa = u.cedula',[empleo]);
        res.render('empleo/searchEmp',{resEmp:result});
    } catch (error) {
        console.log(error);
        req.flash('message','Ocurrio un error');
        res.redirect('/inicio');
    }
}


//aceptar empleo
empCtrl.accept = async(req,res) =>{
    const {id} = req.params;
    const {cedula} = req.user;
    const data = id.split('+');
    
    //info user
    const iU = {
        id_empleado: data[1],
        id_empresa: cedula
    }
    try {
        //verificamos si podemos ingresar en este enlace y extraemos el nombre del empleo
        const rows = await pool.query('SELECT ee.*, e.nombre_empleo FROM empleado_empresa AS ee, empleos AS e WHERE ee.id_empleado = ? AND ee.id_empresa = ?',[iU.id_empleado,iU.id_empresa]);
        if(rows.length > 0){
            //verificamos que no exista en la nomina
            const nomina = await pool.query('SELECT * FROM nomina WHERE id_empleado = ? AND id_empresa = ?',[iU.id_empleado,iU.id_empresa]);
            if(nomina.length > 0){
                req.flash('message','Usted ya se encuentra en la nomina');
                res.redirect('/perfil/empleado/'+id); 
            }else{
                //agregamos al usuario a la nomina
                Object.assign(iU,{nombre_empleo: rows[0].nombre_empleo});
                //insertamos los datos en la nomina
                await pool.query('INSERT INTO nomina SET ?',iU);
                //buscamos el correo electronico
                //iformacion del trabajador
                const iT = await pool.query('SELECT nombre, apellido, correo FROM usuario WHERE cedula = ?',[iU.id_empleado]);
                //informacion de la emplresa
                const iE = await pool.query('SELECT nombre, apellido, correo FROM usuario WHERE cedula = ?',[iU.id_empresa]);
                //empaquetamos la informacion
                const mailOptions = {
                    from: "INJOB <injobprueba@gmail.com>",
                    to: iT[0].correo,
                    subject: "Notificacion de aceptación",
                    html: plantilla.msjAceptacion(iT[0].nombre,iT[0].apellido,iE[0].nombre,iE[0].apellido,iU.nombre_empleo)
                }
                //enviamos la información por correo electrónico
                await enviarCorreo(mailOptions)
                        .then((result)=>{console.log('Envio exitoso del correo actual')})
                        .catch((e)=>{console.log(e)}); 
                //eliminamos la oferta de trabajo
                await pool.query('DELETE FROM empleos WHERE id_empleos = ? AND id_empresa = ?',[data[0],iU.id_empresa]);
                //eliminamos las solicitudes del trabajador
                await pool.query('DELETE FROM empleado_empresa WHERE id_empleado = ? AND id_empresa = ?',[iU.id_empleado,iU.id_empresa]);
                req.flash('success','Se acepto al empleado correctamente');
                res.redirect('/inicio'); 
            }
            
        }else{
            res.render('err/404');
        }
        

    } catch (error) {
        console.log(error)
        res.redirect('/perfil/empleado/'+id); 
    }
}


module.exports = empCtrl;