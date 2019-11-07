import express from 'express';
import Auth from '../controllers/Auth';

const router = express.Router();


/**
 * @router POST auth/create-user
 * @description Admin can create an employee user user
 * @Access Private Route
 */
router.post('/auth/create', Auth.register);

/**
 * @router POST auth/signin
 * @description Admin / Employees can login
 * @Access Public
 */
router.post('/auth/signin', Auth.login);

module.exports = router;
