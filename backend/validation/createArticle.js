const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateCreateArticleInput(data) {
  const errors = {};

  data.title = !isEmpty(data.title) ? data.title : '';
  data.article = !isEmpty(data.article) ? data.article : '';

  if (!Validator.isLength(data.first_name, { min: 2, max: 40 })) {
    errors.title = 'Title seems too long';
  }

  if (Validator.isEmpty(data.title)) {
    errors.title = 'Title field is required';
  }

  if (Validator.isEmpty(data.article)) {
    errors.article = 'Article is required';
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
};
