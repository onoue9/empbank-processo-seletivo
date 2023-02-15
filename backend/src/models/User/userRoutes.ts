import express from 'express';
import { userController } from './index';
import { userRegisterValidation } from '../../middlewares/UserValidation';
import { loginValidation } from '../../middlewares/UserValidation';

export const userRoutes = express.Router();

userRoutes.get('/', (req, res) => userController.getAllUsers(req, res));
userRoutes.get('/:userId', (req, res) => userController.getUser(req, res));
userRoutes.post('/login',
  (req, res, next) => loginValidation.validate(req, res, next),
  (req, res) => userController.loginUser(req, res),
);
userRoutes.post('/register',
  (req, res, next) => userRegisterValidation.validate(req, res, next),
  (req, res) => userController.registerUser(req, res),
);
