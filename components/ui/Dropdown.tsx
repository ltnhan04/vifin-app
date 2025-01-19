import { View, Text } from "react-native";
import { languages, units } from "@/constants/data";
import React, { useState } from "react";

interface DropdownProps {
  value: "currency_unit" | "languages";
}

const Dropdown: React.FC<DropdownProps> = ({ value }) => {
  const [items, setItems] = useState(
    value === "currency_unit" ? units : languages,
  );
  return (
    <View>
      <Text>Dropdown</Text>
    </View>
  );
};

export default Dropdown;
