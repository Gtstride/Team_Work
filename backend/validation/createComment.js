const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateCreateCommentInput(data) {
  const errors = {};

  data.department = !isEmpty(data.comment) ? data.comment : '';

  if (!Validator.isLength(data.comment, { min: 2, max: 120 })) {
    errors.comment = 'comment ';
  }

  if (Validator.isEmpty(data.first_name)) {
    errors.first_name = 'First Name field is required';
  }

  if (!Validator.isEmail(data.email)) {
    errors.email = 'Email is invalid';
  }

  if (Validator.isEmpty(data.email)) {
    errors.email = 'Email field is required';
  }

  if (!Validator.isLength(data.password, { min: 6, max: 30 })) {
    errors.password = 'Password must be at least 6 characters';
  }

  if (Validator.isEmpty(data.password)) {
    errors.password = 'Password field is required';
  }

  if (Validator.isEmpty(data.job_role)) {
    errors.job_role = 'Job role is required';
  }

  if (Validator.isEmpty(data.comment)) {
    errors.comment = 'Department of employee is required';
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
};
