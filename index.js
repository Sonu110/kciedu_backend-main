require('dotenv').config()
const express = require('express')
const app = express()
const Moongoes = require('mongoose')
const Router = require('./router/Router')
const cors = require('cors')
const cloudinary = require('cloudinary').v2;

app.use(cors())

app.use(express.json())
app.use(express.urlencoded({extended:false}))
app.use(Router)

Moongoes.connect(process.env.MongodbUrl ).then(()=>{
    console.log("suceess");
}).catch(()=>
{
console.log("not succes mongodb");
})
cloudinary.config({ 
    cloud_name: process.env.cloudname, 
    api_key: process.env.cloudkey, 
    api_secret: process.env.Cloudpassword
  });

app.listen(process.env.PORT,()=>{
    console.log("server start at ", process.env.PORT);
})