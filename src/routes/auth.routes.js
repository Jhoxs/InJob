const express = require('express');
const router = express.Router();


router.get('/registro',(req,res)=>{
    res.send('Registro');
})

module.exports = router;