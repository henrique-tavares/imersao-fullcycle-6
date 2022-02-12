import { Provider } from '@nestjs/common';
import { Transaction } from './entities/transaction.entity';

export const transactionsProviders: Provider[] = [
  {
    provide: 'TRANSACTIONS_REPOSITORY',
    useValue: Transaction,
  },
];
