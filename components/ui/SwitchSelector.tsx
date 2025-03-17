import { useState } from "react";
import SegmentedControl from "@react-native-segmented-control/segmented-control";

interface SwitchTabsProps {
  item: string[];
  setWidth?: number;
  selectedValue?: string;
  onValueChange?: (value: string) => void;
  initialValue?: number;
}

const SwitchTab: React.FC<SwitchTabsProps> = ({
  item,
  setWidth,
  onValueChange,
  initialValue,
}) => {
  const [selectedIndex, setSelectedIndex] = useState(initialValue);

  return (
    <SegmentedControl
      values={item}
      selectedIndex={selectedIndex}
      style={{ width: setWidth || "100%" }}
      onChange={(event) => {
        const index = event.nativeEvent.selectedSegmentIndex;
        setSelectedIndex(index);
        onValueChange?.(item[index]);
      }}
    />
  );
};

export default SwitchTab;
