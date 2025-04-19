export type SelectedItemType = "category" | "amount" | "dueDate" | "wallet";

export interface IResponseBudget {
  data: BudgetType[];
  message: string;
}

export type ResponseBudgetType = {
  data: BudgetType;
  message: string;
};

export interface IResponseGetBudgetByRepeatType {
  data: IBudgetByRepeatType[];
  message: string;
}

export interface IBudgetByRepeatType {
  startDate: StartDate;
  dueDate: DueDate;
  amount: number;
  usage: number;
  repeat_type: string;
  is_repeated: boolean;
  is_completed: boolean;
  createdAt: CreatedAt;
  updatedAt: UpdatedAt;
  _id: string;
  category: Category;
  wallet: Wallet;
}

export interface StartDate {
  _seconds: number;
  _nanoseconds: number;
}

export interface DueDate {
  _seconds: number;
  _nanoseconds: number;
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
  parent_id: any;
  createdBy: string;
  createdAt: CreatedAt2;
  name: string;
  transaction_type: string;
  symbol: string;
  updatedAt: UpdatedAt2;
}

export interface CreatedAt2 {
  _seconds: number;
  _nanoseconds: number;
}

export interface UpdatedAt2 {
  _seconds: number;
  _nanoseconds: number;
}

export interface Wallet {
  customer_id: string;
  currency_unit: string;
  amount: string;
  createdAt: CreatedAt3;
  symbol: string;
  wallet_name: string;
  updatedAt: UpdatedAt3;
}

export interface CreatedAt3 {
  _seconds: number;
  _nanoseconds: number;
}

export interface UpdatedAt3 {
  _seconds: number;
  _nanoseconds: number;
}

export type BudgetType = {
  category_id: string;
  wallet_id: string;
  startDate: Date;
  dueDate: Date;
  amount: number;
  usage?: number;
  repeat_type?: "custom" | "weekly" | "monthly" | "yearly";
  is_repeated: boolean;
  is_completed: boolean;
  createdAt?: string;
  updatedAt?: string;
  _id: string;
};
