import express from 'express';
import { userRoutes } from '../models/User/userRoutes';
import { transactionRoutes } from '../models/Transaction/transactionRoutes';

export const routes = express.Router();

routes.use(userRoutes);
routes.use('/transaction', transactionRoutes);
