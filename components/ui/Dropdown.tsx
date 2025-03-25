import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Modal,
  TouchableWithoutFeedback,
} from "react-native";
import React, { useCallback, useRef, useState } from "react";
import { AntDesign } from "@expo/vector-icons";

type OptionItem = {
  value: string;
  label: string;
};

interface DropDownProps {
  data: OptionItem[];
  onChange: (item: OptionItem) => void;
  placeholder: string;
}

export default function Dropdown({
  data,
  onChange,
  placeholder,
}: DropDownProps) {
  const [expanded, setExpanded] = useState(false);
  const [buttonPosition, setButtonPosition] = useState<{
    x: number;
    y: number;
    width: number;
    height: number;
  } | null>(null);

  const [value, setValue] = useState("");

  const buttonRef = useRef<View>(null);

  const onSelect = useCallback((item: OptionItem) => {
    onChange(item);
    setValue(item.label);
    setExpanded(false);
  }, []);

  const showDropdown = () => {
    if (buttonRef.current) {
      buttonRef.current.measure((x, y, width, height, pageX, pageY) => {
        setButtonPosition({ x: pageX, y: pageY, width, height });
        setExpanded(true);
      });
    }
  };

  return (
    <View ref={buttonRef}>
      <TouchableOpacity
        style={styles.button}
        activeOpacity={0.8}
        onPress={showDropdown}
      >
        <Text style={styles.text}>{value || placeholder}</Text>
        <AntDesign color={"white"} name={expanded ? "caretup" : "caretdown"} />
      </TouchableOpacity>
      {expanded && buttonPosition ? (
        <Modal visible={expanded} transparent>
          <TouchableWithoutFeedback onPress={() => setExpanded(false)}>
            <View testID="dropdown-backdrop" style={styles.backdrop}>
              <View
                style={[
                  styles.options,
                  {
                    position: "absolute",
                    top: buttonPosition.y + buttonPosition.height - 22,
                    left: buttonPosition.x,
                    width: buttonPosition.width,
                  },
                ]}
              >
                <FlatList
                  keyExtractor={(item) => item.value}
                  data={data}
                  renderItem={({ item }) => (
                    <TouchableOpacity
                      activeOpacity={0.8}
                      style={styles.optionItem}
                      onPress={() => onSelect(item)}
                    >
                      <Text className="text-sm">{item.label}</Text>
                    </TouchableOpacity>
                  )}
                  ItemSeparatorComponent={() => (
                    <View style={styles.separator} />
                  )}
                />
              </View>
            </View>
          </TouchableWithoutFeedback>
        </Modal>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
  },
  optionItem: {
    height: 28,
    justifyContent: "center",
  },
  separator: {
    height: 2,
  },
  options: {
    backgroundColor: "white",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 6,
    maxHeight: 250,
    elevation: 5,
  },
  text: {
    fontSize: 14,
    fontWeight: "600",
    color: "white",
  },
  button: {
    position: "relative",
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 6,
    borderColor: "white",
    borderWidth: 1,
  },
});
