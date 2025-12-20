require('dotenv').config();
const connectDB = require("./db");
const userModel = require("../models/userModel");

const { Inngest } = require("inngest");

// Create a client to send and receive events
const inngest = new Inngest({ id: "code-cracker" });

const syncUser = inngest.createFunction(
    { id: "sync-user" }, { event: "clerk/user.created" },
    async ({ event }) => {

        await connectDB();

        const { id, fist_name, last_name, image_url, created_at, email_addresses } = event.data;

        let user = await userModel.create({
            name: `${fist_name || ""} ${last_name || ""}`,
            email: email_addresses[0]?.email_address,
            profileImage: image_url || "",
            clerkId: id,
        })
    });



const deleteUser = inngest.createFunction(
    { id: "delete-user-from-db" }, { event: "clerk/user.deleted" },
    async ({ event }) => {

        await connectDB();

        const { id } = event.data;
        let deletedUser = await userModel.deleteOne({ clerkId: id });

    });

module.exports = { inngest, syncUser, deleteUser };