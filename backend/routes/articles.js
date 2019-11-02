
const express = require('express');

const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');


/**
 * @router POST /articles
 * @description Employees can create an article
 * @Access Public
 */
router.post('/articles', (req, res) => {
  res.status(200).json({
    status: 'Successful',
    Message: 'Emplooyees can create an article right here.',
  });
});

/**
 * @router POST /articles/articleId/comment
 * @description Employees can comment on their colleagues article
 */
router.post('/articles/articleId/comment', (req, res) => {
  res.status(200).json({
    status: 'Successful',
    Message: 'Others can comment on their colleagues article here.',
  });
});

/**
 * @router PATCH /articles/:id
 * @description Users can Edit an article
 * @Access Public
 */
router.patch('/articles/:id', (req, res) => {
  res.status(200).json({
    status: 'Successful',
    Message: 'You can edit your article here.',
  });
});


/**
 * @router GET /articles
 * @description Employees can view  all article or gifs showing the most recently posted articles or gifs first
 * @Access Public
 */
router.get('/articles', (req, res) => {
  res.status(200).json({
    status: 'Successful',
    Message: 'You can get all article here.',
  });
});


/**
 * @router GET /articles/:id
 * @description Employees can view a specific article
 * @Access Public
 */
router.get('/articles/:id', (req, res) => {
  res.status(200).json({
    status: 'Successful',
    Message: 'You can get all article here.',
  });
});


/**
 * @router DELETE /articles/:id
 * @description Employees can delete their article
 * @Access Public
 */
router.delete('/articles/:id', (req, res) => {
  res.status(200).json({
    status: 'Successful',
    Message: 'You can delete your article here.',
  });
});


module.exports = router;
