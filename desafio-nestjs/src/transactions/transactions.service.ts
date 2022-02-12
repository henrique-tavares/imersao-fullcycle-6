import { Inject, Injectable } from '@nestjs/common';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { Transaction } from './entities/transaction.entity';

@Injectable()
export class TransactionsService {
  constructor(
    @Inject('TRANSACTIONS_REPOSITORY')
    private transactionsRepository: typeof Transaction,
  ) {}

  async create(createTransactionDto: CreateTransactionDto) {
    return await this.transactionsRepository.create({
      ...createTransactionDto,
    });
  }

  async findAll() {
    return await this.transactionsRepository.findAll();
  }
}
