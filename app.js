
const express = require("express");
const mongoose = require("mongoose");
const session = require("express-session") //use session package
const User = require('./models/user')

const passport = require("passport")
const LocalStrategy = require("passport-local");
//const _ = require("lodash");

const ejs = require("ejs");
//const router = express.Router();

const register = require('./routes/register');
const login = require('./routes/login');
const secrets = require('./routes/secrets');
const bcrypt = require("bcrypt"); //Level 4

const app = express();

app.set('view engine', 'ejs');
//app.set('trust proxy', 1) // trust first proxy

app.use(express.json()); ////Used to parse JSON bodies
app.use(express.urlencoded({extended: false})); //Parse URL-encoded bodies
app.use(express.static("public"));


// Use the session middleware and setup it
app.use(session({
    secret: 'cute',
    resave: false,
    saveUninitialized: false,
    cookie: {}   //remeber to make it to true if in production stage
  }));
//this is a method that comes bundled with passport and sets up passport 
//for us to start using it for authentication.
app.use(passport.initialize());
app.use(passport.session()); //use passport to deal with session

//using mongoose
mongoose.set('strictQuery', false);

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/SecretDB');

}
main().catch(err => console.log(err));
// CHANGE: USE "createStrategy" INSTEAD OF "authenticate"
/*passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
}, User.authenticate()));*/
passport.use(User.createStrategy());
//passport.use(new LocalStrategy(User.authenticate()));
//Serialise: create the identifications into the cookie
passport.serializeUser(User.serializeUser());
//Deserialise: allows passport to identifiy the User
passport.deserializeUser(User.deserializeUser());

/*passport.use(new LocalStrategy((username,password,done)=>{  //done is a callback function
    try{
        User.findOne({username:username}).then(user=>{
            if (!user){
                return done(null,false, {message:"Incorrect email"})
            }
 //using bcrypt to encrypt passoword in register post route and compare function in login post round. 
 //login post route will check here during authentication so need to use compare here  
            bcrypt.compare(password,user.password,function(err,result){ 
                if (err){
                    console.log(err)
                    return done(err)
                }

                if (result) {
                    console.log(result)
                    return done(null,user)
                }
                else {
                    return done (null,false, {message:"Incorrect Password"})
                }
            })

        })
    }
    catch (err){
            return done(err)
    }

}))
//serialize user
passport.serializeUser(function(user, cb) {
    process.nextTick(function() {
      cb(null, { id: user._id, username: user.username });
    });
});
passport.deserializeUser(function(user, cb) {
  process.nextTick(function() {
    return cb(null, user);
  });
});*/


app.get("/", (req,res)=>{
    res.render("home");
})

/*app.get("/login", (req,res)=>{
    res.render("login");
})*/
/*app.get("/register", (req,res)=>{
    res.render("register");
})*/
app.use("/login",login);
app.use("/register",register);
app.use("/secrets",secrets);
app.listen("3000",function(){
    console.log("Server started at port:3000")
})