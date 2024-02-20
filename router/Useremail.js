const express = require('express');
const User = express.Router();


User.get('/email',(req,res)=>{

    res.send('email')

})



module.exports = User