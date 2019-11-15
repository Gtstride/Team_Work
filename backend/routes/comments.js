import express from 'express';
import CommentController from '../controllers/CommentController';
import Authentication from '../middleware/Authentication';

const router = express.Router();

/**
 * @router POST /articles/articleId/comment
 * @description Employees can comment on their colleagues article
 * @Access Private
 */
// router.post('/articles/articleId/comment', (req, res) => {
//   res.status(200).json({
//     status: 'Successful',
//     Message: 'Others can comment on their colleagues article here.',
//   });
// });

router.post('/articles/article_id/comment', CommentController.createArticleComment);

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
 * @router DELETE /gifs/:id/comment
 * @description Employees can delete their comment on gifs
 * @Access Public
 */
router.delete('/gifs/:id/comment', (req, res) => {
  res.status(200).json({
    status: 'Successful',
    Message: 'You can delete your gif here.',
  });
});

module.exports = router;
