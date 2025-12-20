const mongoose = require('mongoose');
require('dotenv').config();


const connectDB= async()=>{
    try{
        if(!process.env.MONGODB_URI){
            throw new Error("MONGODB_URI is not defined in environment variables");
        }
     const conn=   await mongoose.connect(process.env.MONGODB_URI);
        console.log(" ✅ MongoDB connected successfully : ");
    }catch(err){
        console.error("❌ MongoDB connection error:", err);
        process.exit(1);
        // 0 for success, 1 for failure
    }
}

module.exports = connectDB;