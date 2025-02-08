export interface TransactionItem {
  id: number;
  category: string;
  amount: number;
  icon: HTMLImageElement;
}

export interface CollapsibleTransactionItemProps {
  date: string;
  day: string;
  monthYear: string;
  totalAmount: number;
  transactions: TransactionItem[];
}
