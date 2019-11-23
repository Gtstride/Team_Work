import cloudinary from 'cloudinary';
import db from '../models/Index';
import Authentication from '../middleware/Authentication';
import validateCreateGifinput from '../validation/createGif';

class GifController {
  static async deleteGif(req, res) {
    try {
      const id = Number(req.params.id);
      const token = Authentication.verifyToken(
        req.headers.token,
        process.env.SECRET_KEY,
        async (error, data) => {
          if (error) {
            return res.status(403).json({
              status: 'Error',
              message: 'Incorrect token supplied',
              error: error.message,
              data,
            });
          }
        },
      );

      const removeGif = 'DELETE FROM gifs WHERE gif_id = $1';
      const value = [id];
      const removeGifQuery = await db.query(removeGif, value);

      res.status(200).json({
        status: 'Success',
        token,
        data: {
          message: `Gif with ${id} succcessfully deleted`,
          removeArticleQuery: removeGifQuery.rows[0],
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

  static async getOneGif(req, res) {
    try {
      const id = parseInt(10, req.params.id);
      const token = Authentication.verifyToken(
        req.token,
        process.env.SECRET_KEY,
        async (error, data) => {
          if (error) {
            return res.status(403).json({
              status: 'Error',
              message: 'Incorrect token supplied',
              error: error.message,
              data,
            });
          }
        },
      );

      const getGifById = 'SELECT * FROM gifs WHERE gif_id = $1';
      const value = [id];
      const getGifQuery = await db.query(getGifById, value);

      res.status(200).json({
        token,
        status: 'Success',
        data: {
          message: `Gif with ${id} succcessfully retrieved`,
          getGifQuery: getGifQuery.rows,
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

  static async getGif(req, res) {
    try {
      const token = Authentication.verifyToken(
        req.token,
        process.env.SECRET_KEY,
        async (error, data) => {
          if (error) {
            return res.status(403).json({
              status: 'Error',
              message: 'Incorrect token supplied',
              error: error.message,
              data,
            });
          }
        },
      );

      const getAllGifs = 'SELECT * FROM gifs';
      const getAllGifsQuery = await db.query(getAllGifs);

      res.status(200).json({
        token,
        status: 'Success',
        data: {
          message: 'All Gifs succcessfully retrieved',
          getAllArticlesQuery: getAllGifsQuery.rows,
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

export default GifController;
