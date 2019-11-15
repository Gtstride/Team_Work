import express from 'express';
import GifController from '../controllers/GifController';
// import Authentication from '../middleware/Authentication';


const router = express.Router();

// ------------------------POST---ROUTE---CREATE-A-GIF---/gifs------------------------------------------------------------------------------------
/**
 * @router POST /gifs
 * @description Employees can post / create a gif
 * @Access Public
 */
router.post('/gifs', GifController.postGif);


/**
 * @router GET /gifs/:id
 * @description Employees can view a specific gif
 * @Access Public
 */
router.get('/gifs/:id', GifController.getOneGif);


/**
 * @router DELETE /gifs/:id
 * @description Employees can delete their gif
 * @Access Public
 */
router.delete('/gifs/:id', GifController.deleteGif);


/**
 * @router GET /gifs
 * @description Employees can see all gifs
 * @Access Public
 */
router.get('/gifs', GifController.getGif);

module.exports = router;
