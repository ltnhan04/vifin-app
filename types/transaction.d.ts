export interface ITransactionType {
  label: string;
  value: string;
  icon: any;
}

export interface TransactionItem {
  id: number;
  category: string;
  amount: number;
  icon: HTMLImageElement;
}

export interface IResponseTransactionByYear {
  data: ITransactionByYear;
  message: string;
}

export interface ITransactionByYear {
  totalAmount: number;
  transactionsByYear: IListTransactionsByYear[];
}

export interface IListTransactionsByYear {
  year: string;
  total: number;
  transactions: ITransaction[];
}

export interface IResponseTransactionByMonth {
  data: ITransactionByMonth;
  message: string;
}

export interface ITransactionByMonth {
  totalAmount: number;
  transactionsByMonth: IListTransactionsByMonth[];
}

export interface IListTransactionsByMonth {
  month: string;
  total: number;
  transactions: ITransaction[];
}

export interface IResponseTransactionByDay {
  data: ITransactionByDay;
  message: string;
}

export interface ITransactionByDay {
  totalAmount: any;
  transactionsByDay: IListTransactionsByDay[];
}

export interface IListTransactionsByDay {
  date: string;
  total: number;
  transactions: ITransaction[];
}

export interface IResponseRecentTransaction {
  data: ITransaction[];
  message: string;
}

export interface IResponseNewTransaction {
  data: ITransaction;
  message: string;
}

export interface INewTransaction {
  amount: number;
  transaction_type: string;
  wallet_id: string;
  category_id: string;
  note?: string;
}

export interface IResponseEditTransaction {
  data: IEditTransaction;
  message: string;
}
export interface IEditTransaction {
  amount: number;
  customer_id: string;
  transaction_type: string;
  wallet_id: string;
  category_id: string;
  note: any;
  createdAt: CreatedAt;
  updatedAt: UpdatedAt;
  _id: string;
}
export interface ITransaction {
  amount: number;
  customer_id: string;
  transaction_type: string;
  wallet: Wallet;
  category: Category;
  note: any;
  createdAt: CreatedAt;
  updatedAt: UpdatedAt;
  _id: string;
}

export interface Wallet {
  _id: string;
  wallet_name: string;
  customer_id: string;
  currency_unit: string;
  createdAt: CreatedAt;
  symbol: string;
  amount: string;
  updatedAt: UpdatedAt;
}
export interface Category {
  _id: string;
  name: string;
  symbol: string;
  parent_id: any;
  createdBy: string;
  transaction_type: string;
  createdAt: CreatedAt;
  updatedAt: UpdatedAt;
}

export interface CreatedAt {
  _seconds: number;
  _nanoseconds: number;
}

export interface UpdatedAt {
  _seconds: number;
  _nanoseconds: number;
}
