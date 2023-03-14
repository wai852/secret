
const express = require("express");
const mongoose = require("mongoose");

//const _ = require("lodash");

const ejs = require("ejs");
//const router = express.Router();

const register = require('./routes/register');
const login = require('./routes/login');

const app = express();

app.set('view engine', 'ejs');

app.use(express.json()); ////Used to parse JSON bodies
app.use(express.urlencoded({extended: true})); //Parse URL-encoded bodies
app.use(express.static("public"));

//using mongoose
mongoose.set('strictQuery', false);
mongoose.connect('mongodb://127.0.0.1:27017/SecretDB');


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

app.listen("3000",function(){
    console.log("Server started at port:3000")
})