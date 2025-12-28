const  sessionModel  = require('../models/sessionModel');
const { streamClient, chatClient } = require('../lib/stream');


module.exports.createSession = async (req, res) => {
    try {
        const { problem, difficulty } = req.body;
        const userId = req.user._id; //mongodb id of the host user
        const clerkId = req.user.clerkId; //clerk id of the host user

        // Validate input
        if (!problem || !difficulty) {
            return res.status(400).json({ message: "Problem and difficulty are required" });
        }

        // unique callId generation
        const callId = `session_${Date.now()}_${Math.random().toString(36).substring(7)}`;
        //create session in db
        const session = await sessionModel.create({
            problem,
            difficulty,
            host: userId,
            callId
        });

        // create stream video call 
        // https://getstream.io/video/docs/javascript/guides/joining-and-creating-calls/

        const vc = await streamClient.video.call("default", callId).getOrCreate({
            data: {
                created_by_id: clerkId,
                custom: {
                    problem,
                    difficulty,
                    sessionId: session._id.toString()
                }
            }
        });


        // https://getstream.io/chat/docs/react/creating_channels/  : docs of channel creation
        //create chat channel for the session
        const channel = chatClient.channel("messaging", callId, {
            name: `${problem} session`,
            members: [clerkId],
            created_by_id: clerkId
        });

        await channel.create()
        res.status(201).json({ session });

    } catch (err) {
        console.error("❌ Error in createSession controller:", err);
        return res.status(500).json({ message: "Internal server error" });
    }
};
module.exports.getActiveSessions = async (req, res) => {
    try {

        const acitveSession = await sessionModel.find({ status: "active" })
            .populate('host', 'name clerkId profileImage email')
            .sort({ createdAt: -1 }).limit(20);
        return res.status(200).json({ acitveSession });

    } catch (err) {
        console.error("❌ Error in getActiveSession controller:", err);
        return res.status(500).json({ message: "Internal server error" });
    }
};
module.exports.getMyRecentSessions = async (req, res) => {
    try {
        const recentSessions = await sessionModel.find({
            status: "completed",
            $or: [{ host: req.user._id }, { participant: req.user._id }]
        })
            .sort({ createdAt: -1 }).limit(10);

        // const recentSessions = await sessionModel.find({ status: "completed" })
        // .populate('host', 'name clerkId profileImage email')
        // .sort({ createdAt: -1 }).limit(10);

        return res.status(200).json({ recentSessions });

    } catch (err) {
        console.error("❌ Error in getMyRecentSession controller:", err);
        return res.status(500).json({ message: "Internal server error" });
    }
};
module.exports.joinSession = async (req, res) => {
    try {
        const { id } = req.params;
        const userId = req.user._id; //mongodb id of the participant user
        const clerkId = req.user.clerkId; //clerk id of the participant user

        const session = await sessionModel.findById(id);
        if (!session ) {
            return res.status(404).json({ message: "Session not found" });
        }
        if( session.status !== "active") {
            return res.status(400).json({ message: "Cannot join a completed session" });
        }
        if (session.participant) {
            return res.status(400).json({ message: "Session already has a participant" });
        }

        if(session.host.toString() === userId.toString()) {
            return res.status(400).json({ message: "Host cannot join as participant in their own session" });
        }
  
        session.participant = userId;
        await session.save();

        const channel = chatClient.channel("messaging", session.callId);
        await channel.addMembers([clerkId]);
    
        //we are missing to add participant to stream video call 
    
        return res.status(200).json({ session });
    } catch (err) {
        console.error("❌ Error in joinSession controller:", err);
        return res.status(500).json({ message: "Internal server error" });
    }
};
module.exports.getSessionById = async (req, res) => {
    try {

        const { id } = req.params;
        const session = await sessionModel.findById(id)
            .populate('host', 'name clerkId profileImage email')
            .populate('participant', 'name clerkId profileImage email');
        if (!session) {
            return res.status(404).json({ message: "Session not found" });
        }
        return res.status(200).json({ session });
    } catch (err) {
        console.error("❌ Error in getSessionById controller:", err);
        return res.status(500).json({ message: "Internal server error" });
    }
};
module.exports.endSession = async (req, res) => {
    try {
        const { id } = req.params;
        const userId = req.user._id;
        const session = await sessionModel.findById(id);

        if (!session) {
            return res.status(404).json({ message: "Session not found" });
        }

        if (session.host.toString() !== userId.toString()) {
            return res.status(403).json({ message: "Only the host can end the session" });
        }
        if (session.status === "completed") {
            return res.status(400).json({ message: "Session is already completed" });
        }

        
        //delete stream video call and chat channel
        const call= streamClient.video.call("default", session.callId);
        await call.delete({hard:true});
        
        const channel= chatClient.channel("messaging", session.callId);
        await channel.delete();
        
        session.status = "completed";
        await session.save();
        return res.status(200).json({ message: "Session ended successfully", session });

    } catch (err) {
        console.error("❌ Error in endSession controller:", err);
        return res.status(500).json({ message: "Internal server error" });
    }
};