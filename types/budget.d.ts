export type SelectedItemType = "category" | "amount" | "dueDate" | "wallet";

export interface IResponseBudget {
  data: BudgetType[];
  message: string;
}

export type ResponseBudgetType = {
  data: BudgetType;
  message: string;
};

export type BudgetType = {
  category_id: string;
  wallet_id: string;
  startDate: Date;
  dueDate: Date;
  amount: number;
  usage?: number;
  repeat_type?: string;
  is_repeated: boolean;
  is_completed: boolean;
  createdAt?: string;
  updatedAt?: string;
  _id: string;
};
