import { PrismaClient } from '@prisma/client';
import TransactionInterface from './TransactionInterface';

const prisma = new PrismaClient();

export default class TransationModel {

  async getAllTransactionsByUserId(userId: number): Promise<TransactionInterface[]> {
    const transactions = await prisma.transaction.findMany({
      where: { userId: { in: userId } }
    });
    return transactions;
  }

  async createTransaction(transaction: TransactionInterface): Promise<TransactionInterface> {
    const newTransaction = await prisma.transaction.create({ 
      data: {
        userId: transaction.userId,
        value: transaction.value,
        title: transaction.title,
        type: transaction.type,
        category: transaction.category,
      },
    });
    return newTransaction;
  }
}
