const bcrypt = require('bcryptjs');

const dotenv = require('dotenv');

dotenv.config();

/**
 * @description Hash password method
 * @private document
 * @access Private
 * @param {string} Password
 * @returns {string} returns hashed password
 * @returns {Boolean} return True or False
 */

const Hash = {
  hashPassword(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10));
  },

  comparePassword(hashPassword, password) {
    return bcrypt.compareSync(password, hashPassword);
  },
};

module.exports = Hash;
