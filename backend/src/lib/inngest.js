require('dotenv').config();
const connectDB = require("./db");
const userModel = require("../models/userModel");
const {upsertStreamUser, deleteStreamUser} = require("./stream");
const { Inngest } = require("inngest");

// Create a client to send and receive events
const inngest = new Inngest({ id: "code-cracker" });

const syncUser = inngest.createFunction(
    { id: "sync-user" }, { event: "clerk/user.created" },
    async ({ event }) => {

        await connectDB();

        const { id, first_name, last_name, image_url, created_at, email_addresses } = event.data;

        let user = await userModel.create({
            name: `${first_name || ""} ${last_name || ""}`,
            email: email_addresses[0]?.email_address,
            profileImage: image_url || "",
            clerkId: id,
        })

        await upsertStreamUser({
            id: user.clerkId.toString(),
            name: user.name,
            image: user.profileImage,
            email: user.email,
        });

    });



const deleteUser = inngest.createFunction(
    { id: "delete-user-from-db" }, { event: "clerk/user.deleted" },
    async ({ event }) => {

        await connectDB();

        const { id } = event.data;
        let deletedUser = await userModel.deleteOne({ clerkId: id });

        await deleteStreamUser(id.toString());

    });

module.exports = { inngest, syncUser, deleteUser };