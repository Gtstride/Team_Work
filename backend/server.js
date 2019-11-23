import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import cors from 'cors';

// Load routes
const users = require('./routes/users');
const postGifs = require('./routes/postGifs');
const articles = require('./routes/articles');
const gifs = require('./routes/gifs');
// const comments = require('./routes/comments');

// Instantiate express here
const app = express();

// configure cors
app.use(cors());

dotenv.config();

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, Content-Type, Authorization',
  );
  next();
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// HOME ROUTE
app.get('/', (req, res) => {
  res.status(200).json({
    status: 200,
    message: 'Welcome to Team Work API, Be sure to connect to others',
  });
  res.status(200).json({
    status: 'Error',
    message: 'Page Not found on this server',
  });
});

// Route Middleware
app.use('/api/v1', users);
app.use('/api/v1', articles);
app.use('/api/v1', postGifs);
app.use('/api/v1', gifs);
// app.use('/api/v1', comments);

const port = process.env.PORT || 2100;
module.exports = app.listen(port, () => {
  console.log(
    `Application is live and runs on server http://localhost:${port}`,
  );
});
