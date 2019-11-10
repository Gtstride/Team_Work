import express from 'express';


const router = express.Router();

/**
 * @router POST /articles/articleId/comment
 * @description Employees can comment on their colleagues article
 * @Access Private
 */
router.post('/articles/articleId/comment', (req, res) => {
  res.status(200).json({
    status: 'Successful',
    Message: 'Others can comment on their colleagues article here.',
  });
});

module.export = router;
