const express = require('express');
const bodyParser = require('body-parser');
// const { Pool, Client } = require('pg');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// HOME ROUTE
app.get('/', (req, res) => {
  res.status(200).json({
    status: 200,
    message: 'Welcome to Team Work.',
  });
});


const port = process.env.PORT || 2100;

app.listen(port, () => {
  console.log(`Application Server is live on ${port}`);
});

module.exports = app;
