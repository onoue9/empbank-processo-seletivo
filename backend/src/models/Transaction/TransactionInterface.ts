import { Decimal } from "@prisma/client/runtime";

export default interface TransactionInterface {
  id?: number;
  userId: number;
  value: Decimal;
  title: string;
  type: string;
  category: string;
}
