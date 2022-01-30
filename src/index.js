const express = require ('express');
const morgan = require('morgan');
const path = require ('path');
//Modulo para usar plantillas hbs
const { engine } = require('express-handlebars');
//Modulo encargado de las sesiones de usuario
const passport = require('passport');
//Modulo que permite mostrar notificaciones
const flash = require('connect-flash');
const bodyParser = require('body-parser');
//Modulo para agregar taeras al servidor
const cron = require('node-cron');
//const taskCron = require('./helpers/tareasCron');
//>--Uso de la base de datos
//Modulos para crear sesion en una bd
const session = require('express-session');
const MySQLStore = require('express-mysql-session')(session);
//config almacena la informacion de mi base de datos
const iniciadorRoles = require('./lib/iniRolUser');
const { database } = require('./config/database.config');
const sessionStore = new MySQLStore(database);
//Modulo para llamar a las variables de entorno del .env
require('dotenv').config();

//--inicializadores
const app = express();
require('./helpers/passport');
iniciadorRoles.iniciar();

//--Configuraciones
app.set('port', process.env.PORT||3000);
app.set('views', path.join(__dirname, '/views'));
//implementacion con plantillaa hbs
app.engine('hbs', engine ({
    defaultLayout: 'main',
    layoutsDir: path.join(app.get('views'), 'layouts'),
    partialsDir: path.join(app.get('views'), 'partials'),
    extname: '.hbs',
    helpers: require('./helpers/handlebars')
}))
app.set('view engine', 'hbs');


//--Middleware
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
//Creamos la sesion local
app.use(
    session({
      key: 'session_cookie_name',
      secret: "Josemysqlnodemysql_cookie_secret",
      store: sessionStore,
      resave: false,
      saveUninitialized: false
    })
  );
//flash nos permite usar alertas en caso de algun error 
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

//--Variables Globales
app.use((req,res,next) => {
    //hace uso de la libreria flash para mandar mensajes de confirmacion, u otros mensajes
    app.locals.message = req.flash('message');
    app.locals.success = req.flash('success');
    app.locals.user = req.user;
    next();
});

//--Rutas
app.use(require('./routes/index.routes'));
app.use(require('./routes/auth.routes'));
app.use('/usuarios',require('./routes/user.routes'));
app.use('/perfil',require('./routes/perfil.routes'));
app.use('/empleo',require('./routes/empleo.routes'));
app.use('/reporte',require('./routes/reporte.routes'));


//--StaticFiles (public)
app.use(express.static(path.join(__dirname,'public')));
//Envia una pagina 404 si no se encontró ninguna ruta
app.all('*', (req, res)=>{
    res.render('err/404');
});

//--Servidores de escucha
app.listen(app.get('port'), () => {
    console.log('Server on port',app.get('port'));
});
