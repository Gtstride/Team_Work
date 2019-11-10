import express from 'express';
import Article from '../controllers/ArticleController';

const router = express.Router();


/**
 * @router POST /articles
 * @description Employees can create an article
 * @Access Public
 */
router.post('/articles', Article.createArticle);


/**
 * @router PATCH /articles/:id
 * @description Employees can Edit their article
 * @Access Private
 */
router.patch('/article/:id', Article.modifyArticle);

/**
 * @router GET all articles
 * @description Employees can view all articles
 * @Access Public
 */
router.get('/article', Article.getAllArticle);


/**
 * @router GET /articles/:id
 * @description Employees can view a specific article
 * @Access Public
 */
router.get('/articles/:id', Article.getArticleById);


/**
 * @router DELETE /articles/:id
 * @description Employees can delete their article
 * @Access Private
 */
router.delete('/article/:id', Article.deleteArticle);


module.exports = router;
