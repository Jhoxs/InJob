const authCtrl = {}
const passport = require ('passport');

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

//---Cerrar Sesion
authCtrl.logout =  (req,res,next) =>{
    req.logOut();
    res.redirect('/');
}

//---Inicio
authCtrl.inicio = async(req, res) => {    
    res.render('inicio',{title:'inicio'});
}


module.exports = authCtrl;