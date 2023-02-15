import TransactionModel from './TransactionModel';
import TransactionInterface from './TransactionInterface';
import CustomError from '../../utils/CustomError';

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
      throw new CustomError(400, "Transação inválida");
    }

    const createTransaction = await this.TransactionModel.createTransaction({ userId, title, value, type, category });

    if (!createTransaction) {
      throw new CustomError(400, "Transação não criada");
    }

    return createTransaction;
  }
}
