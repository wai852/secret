
const express = require('express');
const router = express.Router();
const User = require('../models/user');
const mongoose = require("mongoose");
const ejs = require("ejs");


//using mongoose
mongoose.set('strictQuery', false);
mongoose.connect('mongodb://127.0.0.1:27017/SecretDB');

// middleware that is specific to this router
router.use(function timeLog(req, res, next) {
    console.log('secrets;Time: ', Date.now());
    next();
});

// define the secrets page route
router.get("/", (req,res)=>{
    console.log("secrets page")
    
    //if user haven't already logged in then redirect login page
    if (req.isAuthenticated()){
        console.log(`is Authenticated: ${req.isAuthenticated()}`)
    //find all the secrets from user except the fill without values
    //ne = not equal
        User.find({"secret": {$ne: null}}).then((foundUsers)=>{
        //if (err){
        //  console.log("err:"+err);
        //} 
        if (foundUsers) {
            console.log(foundUsers)
            res.render("secrets", {secretsUser: foundUsers});
          }
      });
    }
    else {
        console.log(`is Authenticated: ${req.isAuthenticated()}`)
        res.redirect("/login")
    }
});

module.exports = router;