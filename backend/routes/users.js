import express from 'express';
import UserController from '../controllers/UserController';
// import Authentication from '../middleware/Authentication';

const router = express.Router();

/**
 * @router POST auth/create-user
 * @description Admin can create an employee user user
 * @Access Private Route
 */
router.post('/auth/create', UserController.register);

/**
 * @router POST auth/signin
 * @description Admin / Employees can login
 * @Access Public
 */
router.post('/auth/signin', UserController.login);

module.exports = router;
