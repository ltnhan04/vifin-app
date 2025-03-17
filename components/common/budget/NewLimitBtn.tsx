import { router } from "expo-router";
import { TouchableOpacity, Text } from "react-native";

const NewLimitBtn = ({ bgColor }: { bgColor: string }) => {
  return (
    <TouchableOpacity
      style={{ backgroundColor: bgColor }}
      className="px-4 py-3 rounded-xl mt-4"
      activeOpacity={0.8}
      onPress={() => router.push("/(root)/(tabs)/budget/modal")}
    >
      <Text className="text-sm text-white font-medium ">Create New Limit</Text>
    </TouchableOpacity>
  );
};

export default NewLimitBtn;
