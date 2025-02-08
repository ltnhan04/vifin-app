import { useState } from "react";
import SegmentedControl from "@react-native-segmented-control/segmented-control";

interface SwitchTabsProps {
  item: string[];
  setWidth?: number;
}
const SwitchTab: React.FC<SwitchTabsProps> = ({ item, setWidth }) => {
  const [switchSelector, setSwitchSelector] = useState(0);
  return (
    <SegmentedControl
      values={item}
      selectedIndex={switchSelector}
      style={{ width: setWidth || "100%" }}
      onChange={(event) => {
        setSwitchSelector(event.nativeEvent.selectedSegmentIndex);
      }}
    />
  );
};

export default SwitchTab;
