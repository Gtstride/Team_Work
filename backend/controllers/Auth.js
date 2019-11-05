import db from '../models/Index';
import Hash from '../config/hash';
import validateSignInInput from '../validation/signin';
import Authentication from '../middleware/Authentication';

class Auth {
  static async login(req, res) {
    try {
      const { errors, isValid } = validateSignInInput(req.body);

      // Check Input Validation
      if (!isValid) {
        return res.status(400).json(errors);
      }

      const text = 'SELECT * FROM users WHERE email=$1';
      const { rows } = await db.query(text, [req.body.email]);

      if (!rows[0]) {
        return res.status(404).json({
          status: 'Unsuccessful',
          message: 'Email not found',
        });
      }

      if (!Hash.comparePassword(rows[0].password, req.body.password)) {
        return res.status(401).json({
          status: 'Error',
          meesage: 'Incorrect email or password',
        });
      }

      const { user_id, email } = rows[0];

      const token = Authentication.generateToken(user_id, email);
      // return success message
      return res.status(200).json({
        status: 'success',
        data: {
          token,
          user_id,
          email,
        },
      });
    } catch (error) {
      return res.status(400).json({
        status: 'Unsuccessful',
        error: error.message,
      });
    }
  }
}

export default Auth;
