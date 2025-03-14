import { IBudgetByRepeatType } from "@/types/budget";

export const calculateBudget = (budgetData: IBudgetByRepeatType[]) => {
  const totalLimit = budgetData.reduce(
    (sum, budget) => sum + (budget.amount || 0),
    0
  );
  const totalSpent = budgetData.reduce(
    (sum, budget) => sum + (budget.usage || 0),
    0
  );
  const percentage = totalLimit > 0 ? (totalSpent / totalLimit) * 100 : 0;

  return { totalLimit, totalSpent, percentage };
};

export const calculateExpense = (goalAmount: number, currentAmount: number) => {
  const remainingAmount = goalAmount - currentAmount;
  const progress = currentAmount / goalAmount;
  const percentage = Math.round(progress * 100);
  return { remainingAmount, percentage, progress };
};
