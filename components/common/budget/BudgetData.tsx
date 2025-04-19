import { View, Text } from "react-native";
import { formatCurrency } from "@/utils/format-currency";

const BudgetData = ({
  title,
  amount,
  primaryColor,
}: {
  title: string;
  amount?: number;
  primaryColor: string;
  days?: string;
}) => (
  <View className="flex flex-col justify-center items-center">
    <Text
      style={{ color: primaryColor }}
      className="text-sm font-bold tracking-wider uppercase"
    >
      {title}
    </Text>
    <Text
      style={{ color: primaryColor }}
      className="text-sm font-bold"
      numberOfLines={1}
      adjustsFontSizeToFit
    >
      {formatCurrency(amount || 0, "VND")}
    </Text>
  </View>
);

export default BudgetData;
