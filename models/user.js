
require('dotenv').config() //for env
const mongoose = require('mongoose');
//const encrypt = require("mongoose-encryption");Level 2

//console.log(process.env.API_KEY)
//create JS obj by using schema from mongoose schema
const userSchema = new mongoose.Schema({
    email: {
        type:String,
        required: [true,"No email specified!"]
    },
    password:{
        type:String,
        required: [true,"No password specified!"]
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


//create model
const User = mongoose.model("User",userSchema);
module.exports = User; 