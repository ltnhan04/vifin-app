export interface IResponseTransactionByYear {
  data: ITransactionByYear;
  message: string;
}
export interface IResponseTransactionByMonth {
  data: ITransactionByMonth;
  message: string;
}
export interface IResponseTransactionByDay {
  data: ITransactionByDay;
  message: string;
}
export interface ITransactionByYear {
  totalIncome: number;
  totalExpense: number;
  transactionsByYear: TransactionsByYear[];
}
export interface ITransactionByMonth {
  totalIncome: number;
  totalExpense: number;
  transactionsByMonth: TransactionsByMonth[];
}

export interface ITransactionByDay {
  totalIncome: number;
  totalExpense: number;
  transactionsByDay: TransactionsByDay[];
}

export interface TransactionsByDay {
  date: string;
  totalIncome: number;
  totalExpense: number;
  transactions: Transaction[];
}
export interface TransactionsByMonth {
  month: string;
  totalIncome: number;
  totalExpense: number;
  transactions: Transaction[];
}
export interface TransactionsByYear {
  year: string;
  totalIncome: number;
  totalExpense: number;
  transactions: Transaction[];
}
export interface Transaction {
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

export type WalletListType = {
  icon: HTMLImageElement;
  label: string;
  value: number;
};

export interface WalletType {
  symbol: string;
  amount: number;
  currency_unit: "VND" | "USD";
  wallet_name: string;
}

export interface ResponseListWallet {
  data: IWallet[];
  message: string;
}
export interface ResponseWalletType {
  data: IWallet;
  message: string;
}

export interface IWallet {
  symbol: string;
  wallet_name: string;
  customer_id: string;
  currency_unit: string;
  amount: string;
  createdAt: string;
  updatedAt: string;
  _id: string;
}

export interface ResponseBudgetInWallet {
  data: budget[];
  message: string;
}

export interface Budget {
  category_id: string;
  wallet_id: string;
  startDate: CreatedAt;
  dueDate: CreatedAt;
  amount: number;
  repeat_type: string;
  is_repeated: boolean;
  is_completed: boolean;
  createdAt: CreatedAt;
  usage: number;
  updatedAt: UpdatedAt;
  _id: string;
  category: Category;
}

export interface CreatedAt {
  _seconds: number;
  _nanoseconds: number;
}

export interface UpdatedAt {
  _seconds: number;
  _nanoseconds: number;
}

export interface Category {
  symbol: string;
  parent_id: string;
  createdBy: string;
  transaction_type: string;
  createdAt: CreatedAt2;
  name: string;
  updatedAt: UpdatedAt2;
  _id: string;
}

export interface CreatedAt2 {
  _seconds: number;
  _nanoseconds: number;
}

export interface UpdatedAt2 {
  _seconds: number;
  _nanoseconds: number;
}
