const StreamChat = require("stream-chat").StreamChat;
const { StreamClient } = require('@stream-io/node-sdk');
require('dotenv').config();

const api_key = process.env.STREAM_API_KEY;
const api_secret = process.env.STREAM_API_SECRET;

if (!api_key || !api_secret) {
    console.error("❌ STREAM_API_KEY and STREAM_API_SECRET must be defined in environment variables");
}

const streamClient = new StreamClient(api_key, api_secret); //use for video call feature
const chatClient = StreamChat.getInstance(api_key, api_secret);  //use for chat feature 

const upsertStreamUser = async (userData) => {
    try {
        await chatClient.upsertUser(userData);
        console.log(`✅ Stream user upserted successfully : ${userData}`);
    } catch (err) {
        console.error("❌ Error upserting Stream user:", err);
    }
}
const deleteStreamUser = async (userId) => {
    try {
        await chatClient.deleteUser(userId);
        console.log(`✅ Stream user with ID ${userId} deleted successfully`);
    } catch (err) {
        console.error("❌ Error deleting Stream user:", err);
    }
}
module.exports = { chatClient, upsertStreamUser, deleteStreamUser, streamClient };

//upsert means to insert a new user or update an existing user