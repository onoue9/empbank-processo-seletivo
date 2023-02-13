import TransactionModel from './TransactionModel';
import TransactionInterface from './TransactionInterface';

export default class TransactionService {

  private TransactionModel: TransactionModel;

  constructor() {
    this.TransactionModel = new TransactionModel();
  }

  async getAllTransactionsByUserId(userId: number): Promise<TransactionInterface[]> {
    const transactions = await this.TransactionModel.getAllTransactionsByUserId(userId);
    return transactions;
  }

  async createTransaction(transaction: TransactionInterface): Promise<TransactionInterface> {

    const { userId, title, value, type, category } = transaction;

    if (!userId || !title || !value || !type || !category) {
      throw new Error("Invalid transaction");
    }

    const createTransaction = await this.TransactionModel.createTransaction(transaction);

    if (!createTransaction) {
      throw new Error("Transaction not created");
    }

    return createTransaction;
  }
}
