import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateBudgetDto } from './dto/create-budget.dto';
import { UpdateBudgetDto } from './dto/update-budget.dto';

@Injectable()
export class BudgetsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateBudgetDto) {
    if (dto.month < 1 || dto.month > 12) {
      throw new BadRequestException('El mes debe estar entre 1 y 12');
    }

    return this.prisma.budget.create({
      data: {
        amountLimit: dto.amountLimit,
        month: dto.month,
        year: dto.year,
        userId: dto.userId,
        categoryId: dto.categoryId,
      },
    });
  }

  async findAll() {
    return this.prisma.budget.findMany({ orderBy: { id: 'asc' } });
  }

  async findOne(id: number) {
    const found = await this.prisma.budget.findUnique({ where: { id } });
    if (!found) throw new NotFoundException(`Budget ${id} no existe`);
    return found;
  }

  async update(id: number, dto: UpdateBudgetDto) {
    await this.findOne(id);
    return this.prisma.budget.update({ where: { id }, data: dto });
  }

  async remove(id: number) {
    await this.findOne(id);
    await this.prisma.budget.delete({ where: { id } });
  }
}
