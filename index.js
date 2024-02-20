require('dotenv').config()
const express = require('express')
const app = express()
const Moongoes = require('mongoose')
const Router = require('./router/Router')
const cors = require('cors')
const Admin = require('./router/Adminrouterstudent')
const AdminAuth = require('./middleware/Admin')
const User = require('./router/Useremail')
const cloudinary = require('cloudinary').v2;

app.use(cors())

app.use(express.json())
app.use(express.urlencoded({extended:false}))
app.use(Router)
app.use(User)
app.use(AdminAuth, Admin)


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