import { useState, useEffect } from "react";
import SegmentedControl from "@react-native-segmented-control/segmented-control";

interface SwitchTabsProps {
  item: string[];
  setWidth?: number;
  selectedValue?: string;
  onValueChange?: (value: string) => void;
}

const SwitchTab: React.FC<SwitchTabsProps> = ({
  item,
  setWidth,
  selectedValue,
  onValueChange,
}) => {
  const defaultIndex = item.indexOf("Expense");
  const [selectedIndex, setSelectedIndex] = useState(defaultIndex);

  useEffect(() => {
    if (selectedValue) {
      setSelectedIndex(item.indexOf(selectedValue));
    } else {
      onValueChange?.(item[defaultIndex]);
    }
  }, [selectedValue]);

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
