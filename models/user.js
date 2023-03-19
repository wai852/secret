
require('dotenv').config() //for env
const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');
const bcrypt = require("bcrypt"); //Level 4
//const encrypt = require("mongoose-encryption");Level 2

//console.log(process.env.API_KEY)
//create JS obj by using schema from mongoose schema

const userSchema = new mongoose.Schema({
    username: {
        type:String,
        required: [true,"No username specified!"]
    },
    password:{
        type:String,
        //required: [true,"No password specified!"]
    }
  });
//Level 2: DB encrpy
//use string as a secret key
//const secret = "aaaaaa"

//console.log(process.env.API_KEY)
//change to use env for secret key
//userSchema.plugin(encrypt, { secret: secret ,encryptedFields: ['password'] });
//userSchema.plugin(encrypt, { secret: process.env.SECRET_KEY ,encryptedFields: ['password'] });
//hash function 382

//use the passport for mongoose, and indicate using email for username
userSchema.plugin(passportLocalMongoose);

//create model
const User = mongoose.model("User",userSchema);
module.exports = User; 
