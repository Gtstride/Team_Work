const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateCreateGifInput(data) {
  const errors = {};

  data.gif_title = !isEmpty(data.gif_title) ? data.gif_title : '';
  data.image = !isEmpty(data.image) ? data.image : '';

  if (Validator.isEmpty(data.gif_title)) {
    errors.gif_title = 'Your gif must have a title';
  }

  if (Validator.isEmpty(data.gif_title)) {
    errors.gif_title = 'Gif Title field is required';
  }

  // if (Validator.isEmpty(data.image)) {
  //   errors.image = 'Please upload an image';
  // }

  return {
    errors,
    isValid: isEmpty(errors),
  };
};
