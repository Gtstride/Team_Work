const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateCreateCommentInput(data) {
  const errors = {};

  data.comment = !isEmpty(data.comment) ? data.comment : '';

  if (!Validator.isLength(data.comment, { min: 2, max: 120 })) {
    errors.comment = 'Comment must be at least 6 characters and at most 119';

    if (Validator.isEmpty(data.comment)) {
      errors.comment = 'Comment field is required';
    }

    return {
      errors,
      isValid: isEmpty(errors),
    };
  }
};
