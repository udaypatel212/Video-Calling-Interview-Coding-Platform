const express = require('express');
const connectDB = require('./src/lib/db');
require('dotenv').config();
const path = require('path');
const cors = require('cors');
const {serve} = require('inngest/express');

const app = express();
app.use(express.json());

app.use(cors({origin:process.env.CLIENT_URL, credentials:true}));

app.use(express.urlencoded({ extended: true }));
 
app.use('/api/inngest', serve({client:"inngest",functions}));


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