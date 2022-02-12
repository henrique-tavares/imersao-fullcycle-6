import { Provider } from '@nestjs/common';
import { Sequelize } from 'sequelize-typescript';
import { Transaction } from 'src/transactions/entities/transaction.entity';

export const databaseProviders: Provider[] = [
  {
    provide: 'SEQUELIZE',
    useFactory: async () => {
      const sequelize = new Sequelize({
        dialect: 'sqlite',
        storage: 'src/database/database.sqlite',
      });
      sequelize.addModels([Transaction]);
      await sequelize.sync();
      return sequelize;
    },
  },
];
