const Handlebars = require('handlebars');
/*Esta seccion nos permite utilizar los templets hbs */
//options será el contenido que se encuentra dentro de los condicionales
Handlebars.registerHelper("esAdmin",(rol,options)=>{
    if(rol === 'administrador'){
        return options.fn(this);
    }
})