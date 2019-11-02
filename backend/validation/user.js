const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateCreateUserInput(data) {
  const errors = {};

  data.first_name = !isEmpty(data.first_name) ? data.first_name : '';
  data.email = !isEmpty(data.email) ? data.email : '';
  data.password = !isEmpty(data.password) ? data.password : '';
  data.job_role = !isEmpty(data.job_role) ? data.job_role : '';
  data.department = !isEmpty(data.department) ? data.department : '';

  if (!Validator.isLength(data.first_name, { min: 2, max: 30 })) {
    errors.first_name = 'First Name must be between 3 and 15 characters';
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

  if (Validator.isEmpty(data.department)) {
    errors.depaartment = 'Department of employee is required';
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
};
