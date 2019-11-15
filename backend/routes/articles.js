import express from 'express';
import ArticleController from '../controllers/ArticleController';
import Authentication from '../middleware/Authentication';

const router = express.Router();

/**
 * @router POST /articles
 * @description Employees can create an article
 * @Access Public
 */
router.post('/articles', ArticleController.createArticle);

/**
 * @router PATCH /articles/:id
 * @description Employees can Edit their article
 * @Access Private
 */
router.patch('/article/:id', Authentication.verifyToken, ArticleController.modifyArticle);

/**
 * @router GET all articles
 * @description Employees can view all articles
 * @Access Public
 */
router.get('/article', ArticleController.getAllArticle);

/**
 * @router GET /articles/:id
 * @description Employees can view a specific article
 * @Access Public
 */
router.get('/article/:id', Authentication.verifyToken, ArticleController.getArticleById);

/**
 * @router DELETE /articles/:id
 * @description Employees can delete their article
 * @Access Private
 */
router.delete(
  '/article/:id',
  Authentication.verifyToken, ArticleController.deleteArticle,
);

module.exports = router;
