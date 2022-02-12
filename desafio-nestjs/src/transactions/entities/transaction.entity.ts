import { INTEGER, DECIMAL } from 'sequelize';
import { Model, Table, Column } from 'sequelize-typescript';

@Table
export class Transaction extends Model {
  @Column(INTEGER)
  account_id: number;

  @Column(DECIMAL)
  amount: number;
}
