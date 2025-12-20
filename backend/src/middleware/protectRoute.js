const { requireAuth } =require('@clerk/express');
const userModel=require('../models/userModel');

const protectRoute=[requireAuth(),async (req,res,next)=>{ // this requireAuth redirect to "/" home if not authorized
    // we can also handle unauthorized here instead of redirecting to "/health":  requireAuth({signInUrl:"/health"}) 
    try{

        const clerkId=req.auth().userId;
        if(!clerkId){
            return res.status(401).json({message:"Unauthorized: No user ID found"});
        }
        const userFind=await userModel.findOne({clerkId});
        if(!userFind){
            return  res.status(401).json({message:"Unauthorized: User not found"});
        }
        req.user=userFind; //attach user data to req object
        next();
        
    }catch(err){
        console.error("❌ Error in protectRoute middleware:",err);
        return res.status(500).json({message:"Internal server error"});
    }
}];

module.exports={protectRoute};

//when you passes multiple middlewares in array format , they are executed in sequence.
//  Here first requireAuth() runs, then the async function runs