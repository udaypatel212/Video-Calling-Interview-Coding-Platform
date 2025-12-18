const express = require('express');
const app = express();
require('dotenv').config();  // to use environment variables from .env file
// we have to perform this in every file where we want to use process.env

app.get('/', (req, res) => {
  res.status(200).send('workss');
});
app.get('/health', (req, res) => {
  res.status(200).send('api is healthy ');
});

app.listen(process.env.PORT || 5000, () => {
  console.log('Server is running on port', process.env.PORT || 5000);
}  )