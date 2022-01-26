const express = require('express');
const { isNotLoggedIn } = require('../middleware/auth.middleware');
const router = express.Router();

router.get('/',isNotLoggedIn,(req,res)=>{
    res.render('index',{title:'InJob'});
})




module.exports = router;