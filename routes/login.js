const express = require('express');
const router = express.Router();
const mongoose = require("mongoose");
;

//const md5 = require("md5"); //Level 3

const bcrypt = require("bcrypt"); //Level 4
//const saltRounds = 10;

const passport = require("passport")


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
router.post("/",  passport.authenticate('local', { failureRedirect: '/login', failureMessage: true }),(req,res)=>{
  /*
  User.findOne({email:req.body.userEmail}).then(function (foundUser) {
    if(foundUser){ 
      console.log("found!")  //compare with db
      /*
      //Level 2 Db encrpyt
      if(foundUser.password ===req.body.password){ 
        res.render("secrets"); 
      }
      else{ 
        console.log("Not found!") 
        res.render("login",{loginMsg:"Not found"}); 
      }
      */
      
      /*
      // Level 3 Hasing
      if(foundUser.password === md5(req.body.password)){ //using md5 382
        res.render("secrets"); 
      }
      else{ 
        console.log("Not found!") 
        res.render("login",{loginMsg:"Not found"}); 
      }*/
      /*//Level 4 Load hash from your password DB.
      bcrypt.compare(req.body.password, foundUser.password, function(err, result) {
        // result == true
        if(result){
          console.log(`After compared:${result}`)
          res.render("secrets");
        }else{
          console.log("Not found!") 
          res.render("login",{loginMsg:"Not found"}); 
        }
      });
    }else{ 
      console.log("Not found!") 
      res.render("login",{loginMsg:"Not found"}); 
    }*/
    /*
    const user = new User({
      email: req.body.userEmail,
      password: req.body.password  //381 turn to hash 
  })
  //using passport
  req.logIn(user, function(err){
    if(err){
      console.log(err);
    }else{ 
      //if succesfult authenticate the user, then redirect user to secrets page
      passport.authenticate("local")(req,res, function(){
        res.redirect("/secrets");
    })
    }
  })*/
  /*passport.authenticate("local", {
    failureRedirect: "/login",
    failureMessage: true,
  }),
  (req, res) => {
    res.redirect("/secrets");
  }*/
  res.redirect('/secrets');
});


module.exports = router;