import { getRepository } from 'typeorm';
import Transaction from '../models/Transaction';
// import AppError from '../errors/AppError';

class DeleteTransactionService {
  public async execute(id: string): Promise<void> {
    // TODO
    const transactionsRepository = getRepository(Transaction);

    await transactionsRepository.delete({ id });
  }
}

export default DeleteTransactionService;
