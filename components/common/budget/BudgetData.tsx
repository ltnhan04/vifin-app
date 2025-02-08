import { View, Text } from "react-native";
import { formatCurrency } from "@/utils/format-currency";

const BudgetData = ({
  title,
  amount,
  primaryColor,
  days,
}: {
  title: string;
  amount?: number;
  primaryColor: string;
  days?: string;
}) => (
  <View className="flex flex-col justify-center items-center">
    <Text
      style={{ color: primaryColor }}
      className="text-base font-rubik-bold max-w-40 w-full"
    >
      {title}
    </Text>
    <Text
      style={{ color: primaryColor }}
      className="text-sm font-rubik-semibold"
    >
      {days ? `${days} days` : formatCurrency(amount || 0, "VND")}
    </Text>
  </View>
);
export default BudgetData;
