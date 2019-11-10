import express from 'express';
import AuthController from '../controllers/AuthController';

const router = express.Router();

// const { register, login } = AuthController;

// const { validateCreateUserInput, validateSignInInput } = UserValidator;

/**
 * @router POST auth/create-user
 * @description Admin can create an employee user user
 * @Access Private Route
 */
router.post('/auth/create', AuthController.register);

/**
 * @router POST auth/signin
 * @description Admin / Employees can login
 * @Access Public
 */
router.post('/auth/signin', AuthController.login);

module.exports = router;
