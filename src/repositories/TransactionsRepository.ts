import { EntityRepository, Repository } from 'typeorm';

import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

@EntityRepository(Transaction)
class TransactionsRepository extends Repository<Transaction> {
  private async calculateTotalByType(
    type: 'income' | 'outcome',
  ): Promise<number> {
    const transactions = await this.find();

    return transactions.reduce((accumulator, currentValue) => {
      if (currentValue.type === type) {
        return accumulator + +currentValue.value;
      }
      return accumulator;
    }, 0);
  }

  public async getBalance(): Promise<Balance> {
    // TODO
    const totalIncomeTransactions = await this.calculateTotalByType('income');
    const totalOutcomeTransactions = await this.calculateTotalByType('outcome');

    const totalTransactions =
      totalIncomeTransactions - totalOutcomeTransactions;

    const balance = {
      income: totalIncomeTransactions,
      outcome: totalOutcomeTransactions,
      total: totalTransactions,
    };

    return balance;
  }
}

export default TransactionsRepository;
