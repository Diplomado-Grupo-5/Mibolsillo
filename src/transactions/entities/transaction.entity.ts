export class Transaction {
  id: number;

  userId: number;
  categoryId: number;

  type: 'INCOME' | 'EXPENSE';
  amount: number;
  description?: string;

  isActive: boolean;
  date: string;
  createdAt: string;
}
