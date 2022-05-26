
const express = require("express");
const Jwt = require("jsonwebtoken");  
const fs = require("fs");
const router = express.Router();
const Model = require("../models/model");
let secret = fs.readFileSync("routes/secret.key");




router.post("/postlogin", (req, res) => {  
    Jwt.sign({ Model }, secret, async (err, token) => {
      if (!req.body.username || !req.body.password || !req.body.email) {
        res.json({ msg: "username, password or email is invalid or incorrect" });
      } else {
        try {
          const data = await Model.find({
            username: req.body.username,
            password: req.body.password,
            email:req.body.email
          });
          if (data != "") {
            res.json({ data, token });
          } else {
            res.json({ msg: "username,password or email is invalid" });
          }
        } catch (error) {
          res.json({ msg:"there is an error" });
        }
      }
    });
  });


function verifytoken(req, res, next) {
//form of token ===>  Authorization: Bearer <token>
//when the client wants to use token that they get from server , send token to authorization using bearer schema. 
const bearerHeader = req.headers['authorization'];
//split at space 
//method split will read constant bearer and when there is a space it will make split bearerheader to this form "Bearer <token>"
const bearer = bearerHeader.split(' ');
if (typeof bearerHeader !== 'undefined') {
    //get token from array 
    const token = bearer[1];
    //set token ===> before making POST , token will be sent
    req.token = token;
    next();
  } 
  //in case of bearer not having bearerheader 
else{
        res.sendStatus(403);
}
}



module.exports = router;
