const {chatClient}=require('../lib/stream');

module.exports.getStreamChatToken=async(req,res)=>{
    try{

        const token=chatClient.createToken(req.user.clerkId);
        return res.status(200).json({token,userId:req.user.clerkId,username:req.user.name,userImage:req.user.profileImage});
        
    }catch(err){
        console.error("❌ Error in getStreamChatToken controller:",err);
        return res.status(500).json({message:"Internal server error"});
    }
};