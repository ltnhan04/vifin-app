import { View, Text } from "react-native";

const TopItem = ({
  title,
  price,
  percent,
  type,
}: {
  title: string;
  price: number;
  percent: number;
  type: "expense" | "income";
}) => {
  return (
    <View className="mt-2">
      <Text className="text-base text-white font-rubik-medium">{title}</Text>
      <View className="flex flex-row items-center justify-between">
        <Text className="text-sm text-white font-rubik-medium">
          {price} VND
        </Text>
        <Text
          className={`${type === "expense" ? "text-secondary-red" : "text-secondary-green-100"} font-rubik-bold text-sm`}
        >
          {percent}%
        </Text>
      </View>
    </View>
  );
};

export default TopItem;
