import { categoryColors } from "@/constants/data";
import { ITransaction } from "@/types/transaction";
interface IPieData {
  value: number;
  color: string;
  text: string;
  icon: string;
}

const calculatePercent = (total: number, amount: number) => {
  return Math.round((amount / total) * 100);
};

export const CalculateCategoryPercent = (
  total: number,
  transactions: ITransaction[]
) => {
  const pieData: IPieData[] = [];

  transactions.map((transaction) => {
    const categoryData = transaction.category;
    const value = calculatePercent(total, transaction.amount);
    const findColor = categoryColors.find(
      (category) => category.category === categoryData.name
    );
    pieData.push({
      value,
      color: findColor?.color ?? "#CCCCCC",
      text: `${value}%`,
      icon: categoryData.symbol,
    });
  });

  return pieData;
};
