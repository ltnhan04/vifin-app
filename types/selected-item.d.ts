import { BudgetType } from "@/schema/budget.schema";
import { Control, FieldErrors } from "react-hook-form";

export interface SelectedItemProps {
  selectedItem: SelectedItemType;
  onChange?: (value: number) => void;
  value?: number;
  isLoading?: boolean;
  openBottomSheet?: () => void;
  selectedDateRange?: string;
  symbol?: string;
  categoryName?: string;
  walletName?: string;
  page?: "transaction" | "budget";
}
