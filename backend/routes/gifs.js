
const express = require('express');

const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

// ------------------------POST---ROUTE---CREATE-A-GIF---/gifs------------------------------------------------------------------------------------
/**
 * @router POST /gifs
 * @description Employees can post / create a gif
 * @Access Public
 */
router.post('/gifs', (req, res) => {
  res.status(200).json({
    status: 'Successful',
    Message: 'The almighty gif route, posted by emplooyees.',
  });
});


// ------------------------POST-ROUTE----EMPLOYEES- CAN-COMMENT-ON-THEIR-COLLEAGUES-GIF-------/gifs---------------------------------------------------
/**
 * @router POST /gifs/gifId/comment
 * @description Employees can comment on their colleagues gif post
 * @Access Public
 */
router.post('/gifs/gifId/comment', (req, res) => {
  res.status(200).json({
    status: 'Successful',
    Message: 'The comment on gifs by employees.',
  });
});

/**
 * @router GET /gifs/:id
 * @description Employees can view a specific gif
 * @Access Public
 */
router.get('/gifs/:id', (req, res) => {
  res.status(200).json({
    status: 'Successful',
    Message: 'You can get a gif here.',
  });
});


/**
 * @router DELETE /gifs/:id/comment
 * @description Employees can delete their gif post
 * @Access Public
 */
router.delete('/gifs/:id/comment', (req, res) => {
  res.status(200).json({
    status: 'Successful',
    Message: 'You can delete your gif here.',
  });
});


/**
 * @router DELETE /gifs/:id
 * @description Employees can delete their gif
 * @Access Public
 */
router.delete('/gifs/:id', (req, res) => {
  res.status(200).json({
    status: 'Successful',
    Message: 'You can delete your gif here.',
  });
});

module.exports = router;
