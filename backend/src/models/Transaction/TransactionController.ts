import TransactionService from "./TransactionService";
import { Request, Response } from "express";

export default class TransactionController {
  
  private TransactionService: TransactionService;

  constructor() {
    this.TransactionService = new TransactionService();
  }

  async getAllTransactionsByUserId(req: Request, res: Response): Promise<Response> {
    const { userId } = req.params;
    try {
      const transactions = await this.TransactionService.getAllTransactionsByUserId(parseFloat(userId));
      return res.status(200).json(transactions);
    } catch (error) {
      return res.status(400).json({ error });
    }
  }

  async createTransaction(req: Request, res: Response): Promise<Response> {
    const { userId, title, value, type, category } = req.body;
    try {
      const newTransaction = await this.TransactionService.createTransaction({ userId, title, value, type, category });
      return res.status(200).json(newTransaction);
    } catch (error) {
      return res.status(400).json({ error });
    }
  }
}