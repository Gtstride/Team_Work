const express = require('express');

const bodyParser = require('body-parser');
// const { pool } = require('./models/User');

// Load routes
const users = require('./routes/users');
// const gifs = require('./routes/gifs');
// const articles = require('./routes/articles');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// HOME ROUTE
app.get('/', (req, res) => {
  res.status(200).json({
    status: 200,
    message: 'Welcome to Team Work, Be sure to connect to others',
  });
});

// app.post('/auth/create', users);

// Route Middleware
app.use('/api/v1', users);
// app.use('/api/v1', gifs);
// app.use('/api/v1', articles);

const port = process.env.PORT || 2100;
app.listen(port, () => {
  console.log(`App is live on ${port}`);
});
