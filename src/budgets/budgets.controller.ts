import { Body, Controller, Post, Get, Param, ParseIntPipe, Patch, Put, Delete, HttpCode } from '@nestjs/common';
import { BudgetsService } from './budgets.service';
import { CreateBudgetDto } from './dto/create-budget.dto';
import { UpdateBudgetDto } from './dto/update-budget.dto';

@Controller('budgets')
export class BudgetsController {
  constructor(private readonly budgetsService: BudgetsService) {}

  // Crear presupuesto
  @Post()
  create(@Body() dto: CreateBudgetDto) {
    return this.budgetsService.create(dto);
  }

  // Obtener todos los presupuestos
  @Get()
  findAll() {
    return this.budgetsService.findAll();
  }

  // Obtener presupuesto por ID
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.budgetsService.findOne(id);
  }

  // Actualizar presupuesto (parcial)
  @Patch(':id')
  updatePartial(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateBudgetDto,
  ) {
    return this.budgetsService.update(id, dto);
  }

  // Actualizar presupuesto (completo)
  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateBudgetDto,
  ) {
    return this.budgetsService.update(id, dto);
  }

  // Eliminar presupuesto
  @Delete(':id')
  @HttpCode(204)
  remove(@Param('id', ParseIntPipe) id: number) {
    this.budgetsService.remove(id);
  }
}
