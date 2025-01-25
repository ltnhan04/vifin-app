import { View, Text } from "react-native";

const Badge = ({
  category,
  bgColor,
}: {
  category: string;
  bgColor: string;
}) => {
  return (
    <View style={{ backgroundColor: bgColor }} className="px-3 py-1 rounded-xl">
      <Text className="text-black font-rubik-bold text-xs text-center">
        {category}
      </Text>
    </View>
  );
};
export default Badge;
