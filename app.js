//jshint esversion:6
require('dotenv').config();
const express = require("express");
const mongoose = require("mongoose");
const session = require("express-session") //use session package
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const passport = require("passport")
const findOrCreate = require('mongoose-findorcreate');
const User = require('./models/user')

//const LocalStrategy = require("passport-local");
//const _ = require("lodash");

const ejs = require("ejs");

// Routes
const register = require('./routes/register');
const login = require('./routes/login');
const secrets = require('./routes/secrets');
const submit = require('./routes/submit');
const logout = require('./routes/logout');
//const auth = require('./routes/auth');
//const bcrypt = require("bcrypt"); //Level 4

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
    cookie: { }   //remeber to make it to true if in production stage
  }));
// Passport middleware
//this is a method that comes bundled with passport and sets up passport 
//for us to start using it for authentication.
app.use(passport.initialize());
app.use(passport.session()); //use passport to deal with session

//using mongoose
mongoose.set('strictQuery', false);
mongoose.connect('mongodb://127.0.0.1:27017/SecretDB');
//async function main() {
  //await mongoose.connect('mongodb://127.0.0.1:27017/SecretDB');

//}
//main().catch(err => console.log(err));
// CHANGE: USE "createStrategy" INSTEAD OF "authenticate"
/*passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
}, User.authenticate()));*/
passport.use(User.createStrategy());
//passport.use(new LocalStrategy(User.authenticate()));
//Serialise: create the identifications into the cookie
//passport.serializeUser(User.serializeUser());
//Deserialise: allows passport to identifiy the User
//passport.deserializeUser(User.deserializeUser());

//387. change the serialize and deseriallize user code 

passport.serializeUser(function(user, cb) {
  process.nextTick(function() {
    cb(null, { id: user.id, username: user.username});
  });
});
 
passport.deserializeUser(function(user, cb) {
  process.nextTick(function() {
    return cb(null, user);
  });
});
//err is set to null because there is no possibility of error in the serializeUser function. 
//Because this function works after passport authentication. If there is a problem with authentication, this function will not work without it.

/*passport.serializeUser(function(user, done) {
  done(null, user);
 });
passport.deserializeUser(function (user, done) {
  /*process.nextTick(function () {
    return done(null, user);
  });
  User.findById(user.id).then((err, user)=>{
    if(err){  return done(err) }; // when an error occur during the databese interaction
    if(!user){return done(null,false)} //there is no error but user wasn't found
    return done(null,user);//when user is found and there no error
  });
});*/

//const { deleteOne } = require("./models/user");
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
*/

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:3000/auth/google/secrets", //set on the google consle 
    userProfileURL: "https://www.googleapis.com/oauth2/v3/userinfo", //maybe deprecated
    passReqToCallback   : true
  },function(request, accessToken, refreshToken, profile, done) {
    console.log(profile);
    User.findOrCreate({ googleId: profile.id }, (err, user)=> {
      //return statement to terminate the current execution of the function and go on next step.
      return done(err, user); 
    });
  }
  /*,async function (accessToken, refreshToken, profile, done) {
    try {
      console.log(profile);
      // Find or create user in your database
      let user = await User.findOne({ googleId: profile.id });
      if (!user) {
        // Create new user in database
        const username = Array.isArray(profile.emails) && profile.emails.length > 0 ? profile.emails[0].value.split('@')[0] : '';
        const newUser = new User({
          username: profile.displayName,
          googleId: profile.id
        });
        user = await newUser.save();
      }
      return done(null, user);
    } catch (err) {
      return done(err);
    }
  }*/
));

app.get("/", (req,res)=>{
    res.render("home");
})

app.get("/auth/google", passport.authenticate('google', { scope: ["profile"] } ))

app.get("/auth/google/secrets", passport.authenticate('google', { 
  successRedirect: '/secrets',
  failureRedirect: '/login' 
}));


/*app.get("/login", (req,res)=>{
    res.render("login");
})*/
/*app.get("/register", (req,res)=>{
    res.render("register");
})*/

app.use("/login", login);
app.use("/register", register);
app.use("/secrets", secrets);
//app.use("/auth", auth);
app.use("/submit", submit);
app.use("/logout", logout);
app.listen("3000", function(){
    console.log("Server started at port:3000")
})