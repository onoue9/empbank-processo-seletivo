export default interface TransactionInterface {
  id?: number;
  userId: number;
  value: number;
  title: string;
  type: string;
  category: string;
}
