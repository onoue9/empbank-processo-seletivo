import express from 'express';
import { userController } from './index';

export const userRoutes = express.Router();

userRoutes.get('/', (req, res) => userController.getAllUsers(req, res));
userRoutes.get('/:userId', (req, res) => userController.getUser(req, res));
userRoutes.post('/login', (req, res) => userController.loginUser(req, res));
userRoutes.post('/register', (req, res) => userController.registerUser(req, res));
