import { View, Text, Image } from "react-native";
import icons from "@/constants/icons";
import type { IconKey } from "@/types/icon";
import { formatCurrency } from "@/utils/format-currency";

const TopItem = ({
  title,
  price,
  percent,
  type,
  avt,
}: {
  title: string;
  price: number;
  percent: number;
  avt: IconKey;
  type: "expense" | "income";
}) => {
  return (
    <View className="flex flex-row items-center gap-x-3">
      <Image
        source={icons[avt]}
        className="size-9 bg-primary-dark rounded-full"
      />
      <View className="mt-2 flex-1">
        <Text className="text-base text-white font-rubik-medium">{title}</Text>
        <View className="flex flex-row items-center justify-between">
          <Text className="text-sm text-white font-rubik-medium">
            {formatCurrency(price, "VND")}
          </Text>
          <Text
            className={`${type === "expense" ? "text-secondary-red" : "text-secondary-green-100"} font-rubik-bold text-sm`}
          >
            {percent}%
          </Text>
        </View>
      </View>
    </View>
  );
};

export default TopItem;
