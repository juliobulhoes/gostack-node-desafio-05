import TransactionsRepository from '../repositories/TransactionsRepository';
import Transaction from '../models/Transaction';

interface Request {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class CreateTransactionService {
  private transactionsRepository: TransactionsRepository;

  constructor(transactionsRepository: TransactionsRepository) {
    this.transactionsRepository = transactionsRepository;
  }

  public execute({ title, value, type }: Request): Transaction {
    const allowedTypes = ['income', 'outcome'];

    if (!allowedTypes.includes(type)) {
      throw Error('This transaction type is not allowed');
    }

    const balance = this.transactionsRepository.getBalance();

    if (type === 'outcome' && value > balance.total) {
      throw Error("You're not able to outcome this value");
    }

    const transaction = this.transactionsRepository.create({
      title,
      value,
      type,
    });

    return transaction;
  }
}

export default CreateTransactionService;
