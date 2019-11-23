/* eslint-disable import/named */
import express from 'express';
import { urlencoded, json } from 'body-parser';
import { resolve } from 'path';
import db from '../models/Index';
import Authentication from '../middleware/Authentication';
import { uploader, cloudinaryConfig } from '../config/cloudinaryConfig';
import { multerUploads, dataUri } from '../middleware/multer';
import validateCreateGifinput from '../validation/createGif';

const app = express();

app.use(express.static(resolve(__dirname, '../uploads')));

app.use(urlencoded({ extended: false }));
app.use(json());

app.use('*', cloudinaryConfig);

const router = express.Router();
// // const upload = multer({ dest: 'uploads/' });

// ---------POST---ROUTE---CREATE-A-GIF---/gifs
/**
 * @router POST /gifs
 * @description Employees can post / create a gif
 * @Access Public
 */
// router.post('/postGifs', multerUploads, (req, res) => {
//   if (req.file) {
//     const file = dataUri(req).content;
//     return uploader.upload(file)
//       .then((result) => {
//         // console.log(file)
//         const image = result.url;
//         return res.status(200).json({
//           status: 'Successful',
//           Message: 'Your image has been successfully uploaded to cloudinary.',
//           data: {
//             image,
//           },
//         });
//       }).catch((err) => res.status(400).json({
//         status: 'Error',
//         message: 'someting went wrong while processing your request',
//         data: {
//           err: err.message,
//         },
//       }));
//   }
//   // console.log('req.file : ', req.file);
// });
router.post('/postGifs', multerUploads, (req, res) => {
  // gif key (gif) form-data
  const image = req.file.gif;
  const { gif_title, gif_user_id } = req.body;
  try {
    const { err } = validateCreateGifinput(req.body);
    // verify token
    // Authentication.verifyToken(req, process.env.SECRET_KEY, async (err, data) => {
    // incorrect token
    if (err) {
      return res.status(403).json({
        status: 'error',
        error: 'incorrect token',
      });
    }

    // empty body values (form-data)
    // if (!image || !gif_title || !gif_user_id) {
    //   return res.status(400).json({
    //     status: 'error',
    //     error: 'all fields are required',
    //   });
    // }

    if (req.file) {
      const file = dataUri(req).content;
      return uploader.upload(file)
        .then(async (result) => {
          const gif = `INSERT INTO gifs (image, gif_title, gif_user_id , created_on)
            VALUES($1, $2, $3, $4) RETURNING *`;
          const values = [result.url, gif_title, gif_user_id, new Date().toLocaleString()];
          const gifQuery = await db.query(gif, values);
          // console.log(file)
          const image = result.url;
          return res.status(200).json({
            status: 'Successful',
            Message: 'Your image has been successfully uploaded to cloudinary.',
            data: {
              image,
              gif_id: gifQuery.rows[0].gif_id,
              created_on: gifQuery.rows[0].created_on,
              title: gifQuery.rows[0].title,
              imageUrl: gifQuery.rows[0].image,
            },
          });
        }).catch((err) => res.status(400).json({
          status: 'Error',
          message: 'someting went wrong while processing your request',
          data: {
            err: err.message,
          },
        }));
    }
    // });
  } catch (e) {
    console.log(e);
  }
});
module.exports = router;
