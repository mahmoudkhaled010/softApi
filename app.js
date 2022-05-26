const express = require('express');
const bodyparser = require('body-parser');

//cookies
const cookieParser = require('cookie-parser')

///////////////////////////


//import mongoose
const mongoose = require('mongoose')
require('dotenv/config')
mongoose.connect(process.env.DATABASE,()=>{
console.log("Connect to DB")
})
//////////////////////
 

const app = express();
app.use(express.json());

app.use(bodyparser.json())

//admin
const routeradmin = require("./routes/admin");
app.use("/api/admin", routeradmin);

//coach 

const routercoach = require("./routes/coach");
app.use("/api/coach", routercoach);

//Learner

const routerlearner = require("./routes/learner");
app.use("/api/learner", routerlearner);

//login
const login = require("./routes/login");
const { exists, validate } = require('./models/model');
const session = require('express-session');
app.use("/api/login", login);
//////////////////////////////////////////////////

//middlewar
app.use(logger) 
app.get('/middle', (req,res) => {
    
    console.log('Home Page')
    res.send('Home Page')

}); 
 app.get('/Middleware',auth, (req,res) => {
    console.log(`User is admin = ${req.admin}`)
    console.log('Users Page')
    res.send('Users Page')
    
 });

function logger(req,res,next) {
    console.log(req.originalUrl)
    next();
}

function auth(req,res,next) {
     if(req.query.admin ==='true'){
        req.admin = true
        next()
        return 
     }
         res.send('No Auth')
     }
//////////////////////////////////////////////

//cookies
app.use(cookieParser());

function validateCookie(req,res,next){
    const{ cookies } = req;
    if('session_id' in cookies){
        console.log('Session ID Exists');
        if(cookies.session_id === '123456') next();
        else res.status(403).send({msg:'not authonticated'});
        } else  res.status(403).send({msg:'not authonticated'});

    }
    
app.get('/protected', validateCookie,(req,res)=>{
    res.status(200).json({msg:'you are authorized'});
})



app.get('/signin',(req,res)=>{
res.cookie('session_id' , '123456')
res.status(200).json({msg:'loggedin.'})

});
///////////////////////////////////



app.listen('5060', ()=> console.log('Server started on port 5060'));
