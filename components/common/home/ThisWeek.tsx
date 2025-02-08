import { useState } from "react";
import androidSafeArea from "@/utils/android-safe-area";
import { SafeAreaView, ScrollView } from "react-native";
import SwitchChart from "@/components/ui/SwitchChart";
import ReportSection from "@/components/common/home/ReportSection";

const ThisWeek = () => {
  const [selectedChart, setSelectedChart] = useState(0);
  return (
    <SafeAreaView style={androidSafeArea.androidSafeArea}>
      <ScrollView style={{ flex: 1 }}>
        <SwitchChart handleSelectedChart={setSelectedChart} />
        <ReportSection chartType={selectedChart} />
      </ScrollView>
    </SafeAreaView>
  );
};

export default ThisWeek;
