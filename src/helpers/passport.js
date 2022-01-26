const passport = require('passport');
//usado para hacer strategy locales
const LocalStrategy = require('passport-local').Strategy;

//llamada a la base de datos
const pool = require('../controllers/database.controller');
//importamos modulo que nos permite usar las funciones de encriptar y comparar
const encript = require('../helpers/Encript');

//--LOGIN---
//creamos una funcion que nos permite logear con passport
passport.use('local.login', 
new LocalStrategy({
    usernameField: 'correo',
    passwordField: 'clave',
    passReqToCallback: true
}, 
async(req,correo,clave,done)=>{
    //hace la consulta a la base de datos buscando a una persona con el mismo correo
    const rows = await pool.query('SELECT * FROM usuario WHERE correo = ?',[correo]);
    //en caso de que encuentre al menos un correo igual 
    if(rows.length > 0){
        //guarda el correo en la tabla user
        const user = rows[0];
        //valida el password por medio de la funcion que se encuentra en helpers
        const validarPass = await encript.compararPassword(clave,user.clave);
        if(validarPass){
            const newRol = await pool.query('SELECT roles.rol FROM usuario, rol_usuario, roles WHERE rol_usuario.id_usuario = usuario.cedula AND rol_usuario.id_rol = roles.id_rol AND usuario.cedula = ?',user.cedula);
            Object.assign(user,{rol:newRol[0].rol});
            //si es valido envia el usuario y un mensaje de bienvenida
            done(null,user,req.flash('success','Bienvenido '+user.nombre+' '+user.apellido));
        }else{
            done(null,false,req.flash('message','El password es incorrecto'));
        }
    } else{
        //si no encuentra ningun usuario muestra un mensaje de error
        return done(null,false,req.flash('message','Este usuario no existe'));
    }
    
}));

//---REGISTRO---
//Creamos la funcion que nos permite registrar a un usuario
passport.use('local.registro',new LocalStrategy({
    usernameField: 'correo',
    passwordField: 'clave',
    passReqToCallback: true
}, async(req,correo,clave,done)=>{
    //llamamos a los datos que recibiran del post
    const {nombre, apellido, cedula, telefono,nacimiento,sexo,rol} = req.body;
    //Creamos un objeto donde se guardaran estos datos
    let nuevoUsuario = {
        nombre,
        apellido,
        cedula,
        correo,
        telefono,
        clave,
        nacimiento,
        sexo,
    }
    if(nuevoUsuario.sexo===undefined){
        nuevoUsuario.sexo='Otros';
    }
    if(rol>2 || rol===undefined){
        rol='1';
    }
    //Encriptamos la clave del usuario
    nuevoUsuario.clave = await encript.encriptarPassword(clave);
    console.log(nuevoUsuario);
    //Guardamos los datos en la bd
    try {
        await pool.query('INSERT INTO usuario SET ?',nuevoUsuario);
        await pool.query('INSERT INTO rol_usuario (id_rolUsuario,id_usuario,id_rol) VALUES (null,?,?)',[nuevoUsuario.cedula,rol]);
        //agregamos el rol del usuario al objeto user
        const newRol = await pool.query('SELECT roles.rol FROM usuario, rol_usuario, roles WHERE rol_usuario.id_usuario = usuario.cedula AND rol_usuario.id_rol = roles.id_rol AND usuario.cedula = ?',nuevoUsuario.cedula);
        Object.assign(nuevoUsuario,{rol:newRol[0].rol});
        req.flash('success','Se añadieron con exito los datos');
        return done(null,nuevoUsuario,req.flash('success','Bienvenido '+nuevoUsuario.nombre));
    } catch (error) {
        console.log(error);
        return done(null,false,req.flash('message','Ocurrio un error al guardar los datos'));
    }
}));

//serializacion del usuario
passport.serializeUser (async(user, done) => {
    try {
        done(null, user);
    } catch (error) {
        console.log(error);
    }
});
//deserializacion del usuario
passport.deserializeUser(async(user, done) => {
    done(null, user);
});
