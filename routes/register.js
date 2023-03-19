
const { kStringMaxLength } = require('buffer');
const express = require('express');
const router = express.Router();
const mongoose = require("mongoose");
const User = require('../models/user');

const passport = require("passport")
const passportLocal = require("passport-local")

const md5 = require("md5"); //Level 3

const bcrypt = require("bcrypt"); //Level 4
const saltRounds = 10;

//using mongoose
mongoose.set('strictQuery', false);
mongoose.connect('mongodb://127.0.0.1:27017/SecretDB');

// middleware that is specific to this router
router.use(function timeLog(req, res, next) {
  console.log('Time: ', Date.now());
  next();
});
// define the register page route
router.get("/", (req,res)=>{
    console.log("register home page")
    res.render("register");
})
router.post("/",async (req,res)=>{
    console.log(req.body.username + " "+ req.body.password);
    /* //380: Level 2
    const newUser = new User({
        email: req.body.userEmail,
        password: req.body.password  //381 turn to hash 
    })
    //encrpt and decrpt by itselves
    newUser.save().then(savedDoc => {
        if(savedDoc){ res.render("secrets"); console.log("saved!");}
        else{ res.send(err); }
    });*/
    /*
    //Level 3 Hashing
    const newUser = new User({
        email: req.body.userEmail,
        password: md5(req.body.password)  //381 turn to hash 
    })
    //encrpt and decrpt by itselves
    newUser.save().then(savedDoc => {
        if(savedDoc){ res.render("secrets"); console.log("saved!");}
        else{ res.send(err); }
    });*/
    /*
    //Level 4 Salting
    bcrypt.hash(req.body.password, saltRounds, function(err, hash) {
    // Store hash in your password DB.
    const newUser = new User({
        email: req.body.userEmail,
        password: hash  //381 turn to hash salted
    })
    newUser.save().then(savedDoc => {
        if(savedDoc){ res.render("secrets"); console.log("saved!");}
        else{ res.send(err); }
    });
})*/                
    //JS obj         return back new User 
    User.register({username:req.body.username},req.body.password,function(err,user){
        console.log("YO!")
        if(err){
          console.log("Error in registering.",err);
          res.redirect("/register");
        }
        else{
            console.log("Start to authenticate")
            passport.authenticate("local")(req,res,function(){
                console.log(user,101);
                res.redirect("/secrets");
            });
        }
    })
    
    /*bcrypt.hash(req.body.password,saltRounds,function(err,hash){  
        if (err){
            console.log(err)
        }
        const newUser= new User ({
            username:req.body.username,
            password:hash
        })
        newUser.save()
        passport.authenticate('local')(req,res,()=>{res.redirect("/secrets")}) 
    })*/

})
module.exports = router