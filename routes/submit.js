const express = require('express');
const router = express.Router();
const mongoose = require("mongoose");
const User = require("../models/user")


router.use(function timeLog(req, res, next) {
    console.log('Submit;Time: ', Date.now());
    next();
  });

router.get("/", (req,res)=>{
    console.log("submit home page")
    if(req.isAuthenticated()){
        res.render("submit");
    }else{
        res.redirect("/login");
    }
})

router.post("/",async(req,res)=>{
  try {
  const submitedSecrete = req.body.secret
  console.log("User:"+req.user.id);
  const foundUser = await User.findById(req.user.id)
  if(foundUser){
    console.log("Inside:"+foundUser);
    foundUser.secret = submitedSecrete;
    console.log("Inside after add new secret:"+foundUser);
    foundUser.save().then(()=>{
      res.redirect("/secrets");
    });
  }
  }catch(err){
    console.log(err);
  }
})

module.exports = router;