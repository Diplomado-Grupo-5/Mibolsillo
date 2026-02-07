import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { Transaction } from './entities/transaction.entity';

@Injectable()
export class TransactionsService {
  private transactions: Transaction[] = [];
  private nextId = 1;

  create(dto: CreateTransactionDto): Transaction {
    const newTransaction: Transaction = {
      id: this.nextId++,

      userId: dto.userId,
      categoryId: dto.categoryId,
      type: dto.type,
      amount: dto.amount,
      description: dto.description,

      date: dto.date ?? new Date().toISOString(),

      isActive: true,
      createdAt: new Date().toISOString(),
    };

    this.transactions.push(newTransaction);
    return newTransaction;
  }

  findAll(): Transaction[] {
    return this.transactions;
  }

  findOne(id: number): Transaction {
    const found = this.transactions.find((t) => t.id === id);
    if (!found) throw new NotFoundException(`Transaction ${id} no existe`);
    return found;
  }

  update(id: number, dto: UpdateTransactionDto): Transaction {
    const transaction = this.findOne(id);
    Object.assign(transaction, dto);
    return transaction;
  }

  remove(id: number): void {
    const idx = this.transactions.findIndex((t) => t.id === id);
    if (idx === -1) throw new NotFoundException(`Transaction ${id} no existe`);
    this.transactions.splice(idx, 1);
  }
}
