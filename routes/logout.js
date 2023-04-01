const express = require('express');
const router = express.Router();
const passport = require("passport")

// middleware that is specific to this router
router.use(function timeLog(req, res, next) {
    console.log('logout Time: ', Date.now());
    next();
});

// define the logout page route
router.get("/",function(req, res, next){
  req.logout(function(err) {
    if (err) { return next(err); }
    res.redirect('/');
  });
});
router.post("/",(req,res)=>{

});



module.exports = router;