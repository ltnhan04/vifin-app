import { Text, View } from "react-native";

export default function Index() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>This is new text</Text>
      <Text className="text-red-500">This is new text 1</Text>
    </View>
  );
}
