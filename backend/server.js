require('dotenv').config();

const express = require('express');
const connectDB = require('./src/lib/db');
const path = require('path');
const cors = require('cors');
const app = express();
const { serve } = require('inngest/express');
const { inngest, syncUser, deleteUser } = require('./src/lib/inngest');
const { clerkMiddleware } = require('@clerk/express');
const chatRoute = require('./src/routes/chatRoute');
const sessionRoute = require('./src/routes/sessionRoute');

app.use(express.json());
app.use(cors({ origin: process.env.CLIENT_URL, credentials: true }));
app.use(clerkMiddleware()); // this adds auth field to req object : req.auth() this is working now 
app.use(express.urlencoded({ extended: true }));
app.use("/api/inngest", serve({ client: inngest, functions: [syncUser, deleteUser] }));

app.use('/api/chat', chatRoute);
app.use('/api/sessions', sessionRoute);
app.get("/health", (req, res) => {
  res.status(200).send("Server is healthy");
});


if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../frontend/dist')));

  app.get("/{*any}", (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/dist/index.html'));
  });
}

const startServer = async () => {
  try {
    await connectDB();
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
      console.log(`✅ Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error(' ❌Failed to start server:', error);
  }
};

startServer();










// app.get("/videoCall", requireAuth(),(req, res) => {
//   res.status(200).send("Video Call Endpoint");
// });
// app.get("/videoCall",protectRoute,(req, res) => {
//   res.status(200).send("Video Call Endpoint");
// });