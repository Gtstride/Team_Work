import cloudinary from 'cloudinary';
import db from '../models/Index';
import Authentication from '../middleware/Authentication';
import validateCreateGifinput from '../validation/createGif';

// cloudinary config
// import cloudinaryConfig from '../config/cloudinary.config';

class GifController {
  static async postGif(req, res) {
    const image = req.files;
    const { gif_title, gif_user_id } = req.body;
    try {
      const { errors, isValid } = validateCreateGifinput(req.body);

      // Check Validation
      if (!isValid) {
        return res.status(400).json(errors);
      }

      Authentication.verifyToken(req.token, process.env.SECRET_KEY, async (err) => {
        if (err) {
          return res.status(403).json({
            status: 'Error',
            error: 'Incorrect token supplied',
          });
        }
      });

      cloudinary.uploader
        .upload(image, { resource_type: 'gif' })
        .then(async (result) => {
          const createGif = 'INSERT INTO gifs( image, gif_title, gif_user_id, created_on ) VALUES($1, $2, $3, $4) RETURNING *';
          const gifQuery = await db.query(createGif, values);
          const values = [
            result.url,
            gif_title,
            gif_user_id,
            new Date().toLocaleString(),
          ];

          res.status(201).json({
            status: 'Success',
            data: {
              gif_id: gifQuery.rows[0].gif_id,
              message: 'Gif image successfully posted',
              created_on: gifQuery.rows[0].created_on,
              title: gifQuery.rows[0].title,
              imageUrl: gifQuery.rows[0].image,
            },
          });
        });
    } catch (error) {
      console.log(error);
      return res.status(404).json({
        status: 'Error',
        error: error.message,
      });
    }
  }

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
