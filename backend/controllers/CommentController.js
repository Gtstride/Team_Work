import db from '../models/Index';
import validateCreateCommentInput from '../validation/createComment';
import Authentication from '../middleware/Authentication';

class CommentController {
  static async createArticleComment(req, res) {
    // const id = parseInt(req.params.id);
    // console.log(id);
    // const { comment, user_id } = req.body;
    // // const comment_id = [0];

    // try {
    //   const { errors, isValid } = validateCreateCommentInput(req.body);

    //   // Check Validation
    //   if (!isValid) {
    //     return res.status(400).json(errors);
    //   }

    //   const check = 'SELECT * FROM articles WHERE article_id = $1';
    //   const checkValue = [id];
    //   const checkQuery = await db.query(check, checkValue);

    //   const comments = `INSERT INTO articleComments( comment, created_on, user_id, article_id
    //     ) VALUES($1, $2, 43, $4) RETURNING *`;

    //   const values = [comment, new Date().toLocaleString(), user_id, id];

    //   const createCommentQuery = await db.query(comments, values);

    //   const token = Authentication.generateToken(
    //     { comment_id },
    //     process.env.SECRET_KEY,
    //     {
    //       expiresIn: 3600,
    //     },
    //     (errors, token),
    //   );

    //   // console.log(create);
    //   res.status(201).json({
    //     status: 'Success',
    //     data: {
    //       message: 'Comment successfully created',
    //       createdOn: createCommentQuery.rows[0].createdon,
    //       articleTitle: checkQuery.rows[0].title,
    //       article: checkQuery.rows[0].article,
    //       comment: createCommentQuery.rows[0].comment,
    //     },
    //   });
    // } catch (error) {
    //   if (error) {
    //     // console.log(error);
    //     return res.status(404).json({
    //       status: 'There\'s been an error',
    //       error: error.message,
    //     });
    //   }
    // }
    const id = parseInt(req.params.id);
    const { comment, authorId } = req.body;
    try {
      jwt.verify(req.token, process.env.SECRET_KEY, async (err, data) => {
        if (err) {
          return res.status(403).json({
            status: 'error',
            error: 'incorrect token',
          });
        }

        if (!comment || !authorId) {
          return res.status(400).json({
            status: 'error',
            error: 'all fields are required'
          });
        }

        const check = 'SELECT * FROM articles WHERE articleid=$1';
        const checkValue = [id];
        const checkQuery = await db.query(check, checkValue);


        const comments = `INSERT INTO article_comments (comment, createdOn, authorId, articleId)
                                VALUES($1, $2, $3, $4) RETURNING *`;
        const values = [comment, new Date().toLocaleString(), authorId, id];
        const commentQuery = await pool.query(comments, values);
                

        res.status(201).json({
          status: 'success',
          data: {
            message: 'Comment successfully created',
            createdOn: commentQuery.rows[0].createdon,
            articleTitle: checkQuery.rows[0].title,
            article: checkQuery.rows[0].article,
            comment: commentQuery.rows[0].comment
          }
        })
      })
    }
    catch (e) {
      console.log(e)
    }

  }

  // static async modifyArticle(req, res) {
  //   try {
  //     const { errors, isValid } = validateModifyArticleInput(req.body);

  //     // Check Validation
  //     if (!isValid) {
  //       return res.status(400).json(errors);
  //     }

  //     const id = parseInt(10, req.params.id);

  //     const token = Authentication.verifyToken(
  //       req.token,
  //       process.env.SECRET_KEY,
  //       async (error, token) => {
  //         if (error) {
  //           return res.status(403).json({
  //             status: 'Error',
  //             error: error.message,
  //             token,
  //           });
  //         }
  //       },
  //     );

  //     const check = 'SELECT * FROM article WHERE article_id = $1';
  //     const checkValue = [id];
  //     const checkQuery = await db.query(check, checkValue);

  //     const title = req.body.title || checkQuery.rows[0].title;
  //     const article = req.body.article || checkQuery.rows[0].article;

  //     const modify = 'UPDATE article SET title=$1, article=$2, created_on=$3 WHERE article_id=$4 RETURNING *';
  //     // console.log(modify);
  //     const value = [title, article, new Date().toLocaleString(), id];
  //     const modifyQuery = await db.query(modify, value);
  //     // console.log(token);
  //     res.status(200).json({
  //       status: 'Success',
  //       token,
  //       data: {
  //         message: 'Article succcessfully updated',
  //         title,
  //         article,
  //         modified_on: modifyQuery.rows[0].created_on,
  //       },
  //     });
  //   } catch (error) {
  //     if (error) {
  //       return res.status(400).json({
  //         status: 'Error',
  //         error,
  //       });
  //     }
  //   }
  // }

  // static async deleteArticle(req, res) {
  //   try {
  //     const id = Number(req.params.id);
  //     const token = Authentication.verifyToken(
  //       req.headers.token,
  //       process.env.SECRET_KEY,
  //       async (error, data) => {
  //         if (error) {
  //           return res.status(403).json({
  //             status: 'Error',
  //             message: 'Incorrect token supplied',
  //             error: error.message,
  //             data,
  //           });
  //         }
  //       },
  //     );

  //     const removeArticle = 'DELETE FROM article WHERE article_id = $1';
  //     const value = [id];
  //     const removeArticleQuery = await db.query(removeArticle, value);

  //     res.status(200).json({
  //       status: 'Success',
  //       token,
  //       data: {
  //         message: `Article ${id} succcessfully deleted`,
  //         removeArticleQuery: removeArticleQuery.rows[0],
  //       },
  //     });
  //   } catch (error) {
  //     if (error) {
  //       return res.status(400).json({
  //         status: 'Error',
  //         error: error.message,
  //       });
  //     }
  //   }
  // }

  // static async getAllArticle(req, res) {
  //   try {
  //     const token = Authentication.verifyToken(
  //       req.token,
  //       process.env.SECRET_KEY,
  //       async (error, data) => {
  //         if (error) {
  //           return res.status(403).json({
  //             status: 'Error',
  //             message: 'Incorrect token supplied',
  //             error: error.message,
  //             data,
  //           });
  //         }
  //       },
  //     );

  //     const getArticles = 'SELECT * FROM article';
  //     const getAllArticlesQuery = await db.query(getArticles);

  //     res.status(200).json({
  //       token,
  //       status: 'Success',
  //       data: {
  //         message: 'All article succcessfully retrieved',
  //         getAllArticlesQuery: getAllArticlesQuery.rows,
  //       },
  //     });
  //   } catch (error) {
  //     if (error) {
  //       return res.status(400).json({
  //         status: 'Error',
  //         error: error.message,
  //       });
  //     }
  //   }
  // }

  // static async getArticleById(req, res) {
  //   try {
  //     const id = parseInt(10, req.params.id);
  //     const token = Authentication.verifyToken(
  //       req.token,
  //       process.env.SECRET_KEY,
  //       async (error, data) => {
  //         if (error) {
  //           return res.status(403).json({
  //             status: 'Error',
  //             message: 'Incorrect token supplied',
  //             error: error.message,
  //             data,
  //           });
  //         }
  //       },
  //     );

  //     const getArticle = 'SELECT * FROM article WHERE article_id = $1';
  //     const value = [id];
  //     const getArticleQuery = await db.query(getArticle, value);

  //     res.status(200).json({
  //       token,
  //       status: 'Success',
  //       data: {
  //         message: `Article ${id} succcessfully retrieved`,
  //         getArticleQuery: getArticleQuery.rows,
  //       },
  //     });
  //   } catch (error) {
  //     if (error) {
  //       return res.status(400).json({
  //         status: 'Error',
  //         error: error.message,
  //       });
  //     }
  //   }
  // }
}

export default CommentController;
