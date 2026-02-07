import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';

@Injectable()
export class TransactionsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateTransactionDto) {
    return this.prisma.transaction.create({
      data: {
        userId: dto.userId,
        categoryId: dto.categoryId,
        type: dto.type,
        amount: dto.amount,
        description: dto.description,
        date: dto.date ? new Date(dto.date) : new Date(),
      },
    });
  }

  async findAll() {
    return this.prisma.transaction.findMany({ orderBy: { id: 'asc' } });
  }

  async findOne(id: number) {
    const found = await this.prisma.transaction.findUnique({ where: { id } });
    if (!found) throw new NotFoundException(`Transaction ${id} no existe`);
    return found;
  }

  async update(id: number, dto: UpdateTransactionDto) {
    await this.findOne(id);
    return this.prisma.transaction.update({ where: { id }, data: dto });
  }

  async remove(id: number) {
    await this.findOne(id);
    await this.prisma.transaction.delete({ where: { id } });
  }
}
