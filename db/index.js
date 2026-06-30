const mongoose = require("mongoose");
require("dotenv").config();

async function connectDB() {
    try{
   await mongoose.connect(process.env.MONGO_URI);
   console.log("db connected successfully");    
}catch(err){
        console.log(err);
    }
}

module.exports = connectDB;