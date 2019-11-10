import db from '../models/Index';
import validateCreateArticleInput from '../validation/createArticle';
import validateModifyArticleInput from '../validation/modifyArticle';
import Authentication from '../middleware/Authentication';

class Article {
  static async createArticle(req, res) {
    try {
      const { errors, isValid } = validateCreateArticleInput(req.body);

      // Check Validation
      if (!isValid) {
        return res.status(400).json(errors);
      }

      const { title, article } = req.body;
      const article_id = [0];

      const create = `INSERT INTO article( title, article, created_on
        ) VALUES($1, $2, $3) RETURNING *`;
      const values = [title, article, new Date().toLocaleString()];

      const createQuery = await db.query(create, values);
      const token = Authentication.generateToken({ article_id }, process.env.SECRET_KEY, {
        expiresIn: 3600,
      }, (errors, token));

      // console.log(create);
      res.status(201).json({
        status: 'Success',
        token,
        data: {
          message: 'Article successfully posted',
          article_id: createQuery.rows[0].article_id,
          title: createQuery.rows[0].title,
          article: createQuery.rows[0].article,
          created_on: createQuery.rows[0].created_on,
        },
      });
    } catch (error) {
      if (error) {
        // console.log(error);
        return res.status(404).json({
          status: 'Bad request',
          error: error.message,
        });
      }
    }
  }

  static async modifyArticle(req, res) {
    try {
      const { errors, isValid } = validateModifyArticleInput(req.body);

      // Check Validation
      if (!isValid) {
        return res.status(400).json(errors);
      }

      const id = parseInt(10, req.params.id);

      const token = Authentication.verifyToken(req.token, process.env.SECRET_KEY, async (error, token) => {
        if (error) {
          return res.status(403).json({
            status: 'Error',
            error: error.message,
            token,
          });
        }
      });

      const check = 'SELECT * FROM article WHERE article_id = $1';
      const checkValue = [id];
      const checkQuery = await db.query(check, checkValue);

      const title = req.body.title || checkQuery.rows[0].title;
      const article = req.body.article || checkQuery.rows[0].article;

      const modify = 'UPDATE article SET title=$1, article=$2, created_on=$3 WHERE article_id=$4 RETURNING *';
      // console.log(modify);
      const value = [title, article, new Date().toLocaleString(), id];
      const modifyQuery = await db.query(modify, value);
      // console.log(token);
      res.status(200).json({
        status: 'Success',
        token,
        data: {
          message: 'Article succcessfully updated',
          title,
          article,
          modified_on: modifyQuery.rows[0].created_on,
        },
      });
    } catch (error) {
      if (error) {
        return res.status(400).json({
          status: 'Error',
          error,
        });
      }
    }
  }


  static async deleteArticle(req, res) {
    try {
      const id = Number(req.params.id);
      const token = Authentication.verifyToken(req.headers.token, process.env.SECRET_KEY, async (error, data) => {
        if (error) {
          return res.status(403).json({
            status: 'Error',
            message: 'Incorrect token supplied',
            error: error.message,
            data,
          });
        }
      });

      const removeArticle = 'DELETE FROM article WHERE article_id = $1';
      const value = [id];
      const removeArticleQuery = await db.query(removeArticle, value);

      res.status(200).json({
        status: 'Success',
        token,
        data: {
          message: `Article ${id} succcessfully deleted`,
          removeArticleQuery: removeArticleQuery.rows[0],
        },
      });
    } catch (error) {
      if (error) {
        return res.status(400).json({
          status: 'Error',
          error: error.message,
        });
      }
    }
  }

  static async getAllArticle(req, res) {
    try {
      const token = Authentication.verifyToken(req.token, process.env.SECRET_KEY, async (error, data) => {
        if (error) {
          return res.status(403).json({
            status: 'Error',
            message: 'Incorrect token supplied',
            error: error.message,
            data,
          });
        }
      });

      const getArticles = 'SELECT * FROM article';
      const getAllArticlesQuery = await db.query(getArticles);

      res.status(200).json({
        token,
        status: 'Success',
        data: {
          message: 'All article succcessfully retrieved',
          getAllArticlesQuery: getAllArticlesQuery.rows,
        },
      });
    } catch (error) {
      if (error) {
        return res.status(400).json({
          status: 'Error',
          error: error.message,
        });
      }
    }
  }


  static async getArticleById(req, res) {
    try {
      const id = Number(req.params.id)
      const token = Authentication.verifyToken(req.token, process.env.SECRET_KEY, async (error, data) => {
        if (error) {
          return res.status(403).json({
            status: 'Error',
            message: 'Incorrect token supplied',
            error: error.message,
            data,
          });
        }
      });

      const getArticles = 'SELECT * FROM article';
      const getAllArticlesQuery = await db.query(getArticles);

      res.status(200).json({
        token,
        status: 'Success',
        data: {
          message: 'All article succcessfully retrieved',
          getAllArticlesQuery: getAllArticlesQuery.rows,
        },
      });
    } catch (error) {
      if (error) {
        return res.status(400).json({
          status: 'Error',
          error: error.message,
        });
      }
    }
  }
}

export default Article;
