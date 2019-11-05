// import createTables from '../models/createTables';
import pool from '../models/Index';
import Hash from '../config/hash';

const validateCreateUserInput = require('../validation/user');

class CreateUser {
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

      const data = {
        user_id,
        first_name,
        last_name,
        email,
        password,
        gender,
        job_role,
        department,
        address,
      };

      pool.connect((err, client, done) => {
        const query = `INSERT INTO users( user_id, first_name, last_name, email, password, gender, job_role, department, address
      ) VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9) RETURNING *`;

        const values = [
          data.user_id,
          data.first_name,
          data.last_name,
          data.email,
          hashPassword,
          data.gender,
          data.job_role,
          data.department,
          data.address,
        ];

        client.query(query, values, (error, result) => {
          done();
          if (error) {
            return res.status(400).json({
              status: 'An error has occurred',
              error: error.detail,
            });
          }
          res.status(200).send({
            status: 'Successfull',
            message: 'Successfully Created a new employee',
            result: result.rows,
          });
        });
      });
    } catch (error) {
      return res.status(400).json({
        status: 'Unsuccessful',
        error: 'Something went wrong, try again',
      });
    }
  }
}

export default CreateUser;
