const express = require('express');
const router = express.Router();

// middleware that is specific to this router
router.use(function timeLog(req, res, next) {
    console.log('Time: ', Date.now());
    next();
});

// define the secrets page route
router.get("/", (req,res)=>{
    console.log("secrets page")
    //if user haven't already logged in then redirect login page
    if (req.isAuthenticated()){
        console.log("YES!")
        res.render("secrets")
    }
    else {
        console.log("NO!")
        res.redirect("/login")
    }
});
router.post("/",(req,res)=>{

});

module.exports = router;