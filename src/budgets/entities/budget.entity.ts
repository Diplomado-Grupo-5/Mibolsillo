export class Budget {
  id: number;

  amountLimit: number; // monto_limite
  month: number; // mes (1 - 12)
  year: number; // año

  userId: number; // id_usuario
  categoryId: number; // id_categoria

  createdAt: string;
}
