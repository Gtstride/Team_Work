import db from '../models/Index';
import Hash from '../config/hash';
import validateSignInInput from '../validation/signin';
import Authentication from '../middleware/Authentication';

const validateCreateUserInput = require('../validation/user');

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

  static async register(req, res) {
    try {
      const { errors, isValid } = validateCreateUserInput(req.body);

      // Check Validation
      if (!isValid) {
        return res.status(400).json(errors);
      }

      const {
        user_id,
        first_name,
        last_name,
        email,
        password,
        gender,
        job_role,
        department,
        address,
      } = req.body;
      const hashPassword = Hash.hashPassword(req.body.password);

      // const data = {
      //   user_id,
      //   first_name,
      //   last_name,
      //   email,
      //   hashPassword,
      //   gender,
      //   job_role,
      //   department,
      //   address,
      // };

      const createQuery = `INSERT INTO users( user_id, first_name, last_name, email, password, gender, job_role, department, address
        ) VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9) RETURNING *`;
      const values = [
        user_id,
        first_name,
        last_name,
        email,
        hashPassword,
        gender,
        job_role,
        department,
        address,
      ];

      const { rows } = await db.query(createQuery, values);
      res.status(200).send({
        status: 'Successfull',
        message: 'Successfully Created a new employee',
        result: rows,
      });
      // });
    } catch (error) {
      console.log(error);
      return res.status(400).json({
        status: 'Unsuccessful',
        error: 'Something went wrong, try again',
      });
    }
  }
}

export default Auth;
