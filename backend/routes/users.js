const express = require('express');

const router = express.Router();

const { pool } = require('../models/User');

// ------------------------CREATE---USER-----POST---ROUTE---/auth/create-----BEGINS-HERE-------------------------------------------------
/**
 * @router POST auth/create-user
 * @description Admin can create a new user
 * @Access Private Route
 */
router.post('/auth/create', (req, res) => {
  const data = {
    user_id: req.body.id,
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    email: req.body.email,
    password: req.body.password,
    gender: req.body.gender,
    job_role: req.body.job_role,
    department: req.body.department,
    address: req.body.address,
  };

  pool.connect((err, client, done) => {
    const query = `INSERT INTO users( user_id, first_name, last_name, email, password, gender, job_role, department, address
    ) VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9) RETURNING *`;

    const values = [
      data.user_id,
      data.first_name,
      data.last_name,
      data.email,
      data.password,
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
        result,
      });
    });
  });
});

// ------------------------SIGIN---POST---ROUTE---/auth/signin-----------------------------------------------------------------------------------------------------
/**
 * @router POST auth/signin
 * @description Admin / Employees can login
 * @Access Public
 */
router.post('/auth/signin', (req, res) => {
  res.status(200).json({
    status: 'Successful',
    Message: 'This is the login route.',
  });
});

module.exports = router;
