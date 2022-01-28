const Handlebars = require('handlebars');
const { DateTime } = require('luxon');
//nos da el formato es_eS
const {register,format} =require('../config/timeago.config');

/*Esta seccion nos permite utilizar los templets hbs */
//options será el contenido que se encuentra dentro de los condicionales
const helpersHbs = {}


Handlebars.registerHelper("esAdmin",(rol,options)=>{
    if(rol === 'administrador'){
        return options.fn(this);
    }
})

Handlebars.registerHelper("esEmpresa",(rol,options)=>{
    if(rol === 'empresa'){
        return options.fn(this);
    }
})
Handlebars.registerHelper("esEmpleado",(rol,options)=>{
    if(rol === 'empleado'){
        return options.fn(this);
    }
})

helpersHbs.timeago = (fechaRegistro) => {
    
    return format(fechaRegistro,'es_ES');
};

helpersHbs.timeAct = (fechaVencimiento) =>{
    const nf = fechaVencimiento.toISOString();
    return DateTime.fromISO(nf).setLocale('es-Es').toFormat('dd LLLL yyyy');
}

helpersHbs.timeActEdit = (fechaVencimiento) =>{
    const nf = fechaVencimiento.toISOString();
    return DateTime.fromISO(nf).toFormat('yyyy-LL-dd');
}

module.exports = helpersHbs;