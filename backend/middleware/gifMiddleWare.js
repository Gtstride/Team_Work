const gifMiddleware = {
  checkPostGif(req, res, next) {
    const image = req.files.gif;

    if (!image.name.match(/.(gif)$/)) {
      return res.status(400).json({
        status: 'error',
        error: 'image upload must be a gif',
      });
    }
    next();
  },
};

export default gifMiddleware;
