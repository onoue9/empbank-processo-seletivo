import { PrismaClient } from '@prisma/client';
import TransactionInterface from './TransactionInterface';

const prisma = new PrismaClient();

export default class TransationModel {

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
