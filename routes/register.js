
const { kStringMaxLength } = require('buffer');
const express = require('express');
const router = express.Router();
const mongoose = require("mongoose");
const User = require('../models/user');

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
router.post("/",(req,res)=>{
    console.log(req.body.userEmail + " "+ req.body.password);
    //380: Level 2
    const newUser = new User({
        email: req.body.userEmail,
        password: req.body.password  //381 turn to hash 
    })
    //encrpt and decrpt by itselves
    newUser.save().then(savedDoc => {
        if(savedDoc){ res.render("secrets"); console.log("saved!");}
        else{ res.send(err); }
    });
    /*
    //Level 3
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
    //Level 4
    bcrypt.hash(req.body.password, saltRounds, function(err, hash) {
    // Store hash in your password DB.
    const newUser = new User({
        email: req.body.userEmail,
        password: hash  //381 turn to hash 
    })
    newUser.save().then(savedDoc => {
        if(savedDoc){ res.render("secrets"); console.log("saved!");}
        else{ res.send(err); }
    });*/
});

module.exports = router;