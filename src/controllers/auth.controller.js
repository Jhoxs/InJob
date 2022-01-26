const authCtrl = {}
const passport = require ('passport');
const pool = require('../controllers/database.controller');

//---registro
//getRegistro
authCtrl.renderRegistro = (req,res)=>{
    res.render('auth/registro',{title:'registro'});
}
//postRegistro
authCtrl.registro = passport.authenticate('local.registro',{
    successRedirect: '/inicio',
    failureRedirect: '/registro',
    failureFlash: true
})

//---login
//getLogin
authCtrl.renderLogin = (req,res) =>{
    res.render('auth/login',{title:'login'});
}
//postLogin
authCtrl.login  = passport.authenticate('local.login',{
        successRedirect: '/inicio',
        failureRedirect: '/login',
        failureFlash: true
});


//---Inicio
authCtrl.inicio = async(req, res) => {    
     res.render('inicio',{title:'inicio'});
}

//---Cerrar Sesion
authCtrl.logout =  (req,res,next) =>{
    req.logOut();
    res.redirect('/');
}



module.exports = authCtrl;