import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { CreateBudgetDto } from './dto/create-budget.dto';
import { UpdateBudgetDto } from './dto/update-budget.dto';
import { Budget } from './entities/budget.entity';

@Injectable()
export class BudgetsService {
  private budgets: Budget[] = [];
  private nextId = 1;

  create(dto: CreateBudgetDto): Budget {
    // Validación lógica básica
    if (dto.month < 1 || dto.month > 12) {
      throw new BadRequestException('El mes debe estar entre 1 y 12');
    }

    const newBudget: Budget = {
      id: this.nextId++,
      amountLimit: dto.amountLimit,
      month: dto.month,
      year: dto.year,
      userId: dto.userId,
      categoryId: dto.categoryId,
      createdAt: new Date().toISOString(),
    };

    this.budgets.push(newBudget);
    return newBudget;
  }

  findAll(): Budget[] {
    return this.budgets;
  }

  findOne(id: number): Budget {
    const found = this.budgets.find((b) => b.id === id);
    if (!found) throw new NotFoundException(`Budget ${id} no existe`);
    return found;
  }

  update(id: number, dto: UpdateBudgetDto): Budget {
    const budget = this.findOne(id);
    Object.assign(budget, dto);
    return budget;
  }

  remove(id: number): void {
    const idx = this.budgets.findIndex((b) => b.id === id);
    if (idx === -1) throw new NotFoundException(`Budget ${id} no existe`);
    this.budgets.splice(idx, 1);
  }
}
