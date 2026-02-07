import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { TransactionsModule } from './transactions/transactions.module';
import { CategoriesModule } from './categories/categories.module';
import { BudgetsModule } from './budgets/budgets.module';

@Module({
  imports: [UsersModule, TransactionsModule, CategoriesModule, BudgetsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
