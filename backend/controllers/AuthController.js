import db from '../models/Index';
import validateSignInInput from '../validation/signin';
import Authentication from '../middleware/Authentication';
import Hash from '../config/hash';
import validateCreateUserInput from '../validation/user';

class AuthController {
  static async register(req, res) {
    try {
      const { errors, isValid } = validateCreateUserInput(req.body);

      // Check Validation
      if (!isValid) {
        return res.status(400).json(errors);
      }

      const {
        first_name, last_name, email, gender, job_role, department, address,
      } = req.body;
      const hashPassword = Hash.hashPassword(req.body.password);

      const createUserQuery = `INSERT INTO users( first_name, last_name, email, password, gender, job_role, department, address, is_admin
        ) VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9) RETURNING *`;
      const userValues = [first_name, last_name, email, hashPassword, gender, job_role, department, address, false];

      const { rows } = await db.query(createUserQuery, userValues);
      const user = rows[0];
      const { user_id, is_admin } = rows[0];

      const token = Authentication.generateToken({ user_id, email, is_admin }, process.env.SECRET_KEY, {
        expiresIn: 3600,
      }, (errors, token));

      res.status(201).send({
        status: 'Successfull',
        data: {
          message: 'User account successfully created.',
          token,
          ...user,
        },
      });
    } catch (error) {
      if (error.routine === '_bt_check_unique') {
        // console.log(error);
        return res.status(409).json({
          status: 'Unsuccessful',
          // error: 'User already exist or your input fields ain\'t entered correctly',
          error: error.message,
        });
      }
      return res.status(400).json({
        status: 'There\'s been an error',
        error: error.message,
      });
    }
  }

  static async login(req, res) {
    try {
      const { errors, isValid } = validateSignInInput(req.body);

      // Check Input Validation
      if (!isValid) {
        return res.status(400).json({
          status: 'error',
          errors: errors.details[0].message,
        });
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

      const { userId, email } = rows[0];

      const token = Authentication.generateToken(userId, email);
      // return success message
      return res.status(200).json({
        status: 'success',
        data: {
          token,
          userId,
          // email,
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

export default AuthController;
