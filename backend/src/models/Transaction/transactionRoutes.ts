import express from 'express';
import { transactionController } from './index';

export const transactionRoutes = express.Router();

transactionRoutes
  .get('/:userId', (req, res) => transactionController.getAllTransactionsByUserId(req, res))
  .post('/createTransaction', (req, res) => transactionController.createTransaction(req, res));
