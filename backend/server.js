const express = require('express');
const app = express();
require('dotenv').config();  // to use environment variables from .env file
// we have to perform this in every file where we want to use process.env

const path = require('path');

// app.get('/', (req, res) => {
//   res.status(200).send('api is healthy ');
// });

app.get("/health", (req,res) => {
  res.status(200).send("Server is healthy");
});

// if(process.env.NODE_ENV === 'production'){
//   app.use(express.static(path.join(__dirname,'../frontend/dist')));

//   app.get("/*", (req,res) => {
//     res.sendFile(path.join(__dirname,'../frontend/dist/index.html'));
//   });
// } 

if(process.env.NODE_ENV === 'production'){
  app.use(express.static(path.join(__dirname,'../frontend/dist')));

  app.get("/{*any}", (req,res) => {
    res.sendFile(path.join(__dirname,'../frontend/dist/index.html'));
  });
} 

app.listen(process.env.PORT || 5000, () => {
  console.log('Server is running on port', process.env.PORT || 5000);
})