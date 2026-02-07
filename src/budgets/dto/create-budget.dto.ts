import { IsInt, IsNotEmpty, IsNumber, Min } from 'class-validator';

export class CreateBudgetDto {
  @IsNumber()
  @Min(0)
  amountLimit: number; // monto_limite

  @IsInt()
  @Min(1)
  month: number; // mes (1-12)

  @IsInt()
  @Min(2020)
  year: number; // año

  @IsInt()
  @IsNotEmpty()
  userId: number; // id_usuario

  @IsInt()
  @IsNotEmpty()
  categoryId: number; // id_categoria
}
