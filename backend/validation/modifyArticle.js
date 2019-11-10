const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateModifyArticleInput(data) {
  const errors = {};

  data.title = !isEmpty(data.title) ? data.title : '';
  data.article = !isEmpty(data.article) ? data.article : '';

  if (!Validator.isLength(data.title, { min: 2, max: 40 })) {
    errors.title = 'Title shouldn\'t be more than 40';
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
