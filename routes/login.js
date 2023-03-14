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
// define the login page route
router.get("/", (req,res)=>{
    console.log("login home page")
    res.render("login",{loginMsg:""});
})
router.post("/", (req,res)=>{
  User.findOne({email:req.body.userEmail}).then(function (foundUser) {
    if(foundUser){ 
      console.log("found!")  //compare with db
      //Level 2
      if(foundUser.password ===req.body.password){ 
        res.render("secrets"); 
      }
      else{ 
        console.log("Not found!") 
        res.render("login",{loginMsg:"Not found"}); 
      }
      /*// Level 3
      if(foundUser.password === md5(req.body.password)){ //using md5 382
        res.render("secrets"); 
      }
      else{ 
        console.log("Not found!") 
        res.render("login",{loginMsg:"Not found"}); 
      }*/
      /*
      //Level 4 Load hash from your password DB.
      bcrypt.compare(req.body.password, hash, function(err, result) {
        // result == true
        if(result){
          res.render("secrets");
        }else{
          console.log("Not found!") 
          res.render("login",{loginMsg:"Not found"}); 
        }
      });
      */
    }else{ 
      console.log("Not found!") 
      res.render("login",{loginMsg:"Not found"}); 
    }

  });
});


module.exports = router;