import express from 'express';
import { transactionController } from './index';

export const transactionRoutes = express.Router();

transactionRoutes.post('/create', (req, res) => transactionController.createTransaction(req, res));
