import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';

dotenv.config();

const Hash = {
  /**
       * Hash Password Method
       * @param {string} Password
       * @returns {string} returns hashed password
       */
  hashPassword(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10));
  },

  /**
       * compare Password
       * @param {string} hashPassword
       * @param {string} password
       * @returns {Boolean} return True or False
       */
  comparePassword(hashPassword, password) {
    return bcrypt.compareSync(password, hashPassword);
  },

  /**
    * Hash articleId Method
    * @param {string} articleId
    * @returns {string} returns hashed Id
  */
  hashArticleId(article_id) {
    return bcrypt.hashSync(article_id, bcrypt.genSaltSync(10));
  },

  /**
     * compare articleId
     * @param {string} hashPassword
     * @param {string} password
     * @returns {Boolean} return True or False
  */
  compareArticleId(hashArticleId, article_id) {
    return bcrypt.compareSync(article_id, hashArticleId);
  },

};

export default Hash;
