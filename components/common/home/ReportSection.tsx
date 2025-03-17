import { View, Text } from "react-native";
import { Image } from "react-native-svg";
import React, { useState } from "react";
import { BarChart, PieChart } from "react-native-gifted-charts";
import { formatCurrency } from "@/utils/format-currency";
import { columnData, pieData } from "@/constants/data";
import { ScrollView } from "react-native-gesture-handler";

interface ReportSectionProps {
  chartType: number;
}

const ReportSection: React.FC<ReportSectionProps> = ({ chartType }) => {
  const [indexBar, setIndexBar] = useState(0);
  return chartType === 0 ? (
    <View className="mt-4">
      <View className="flex flex-row items-center justify-between">
        <View className="flex flex-col items-center">
          <Text className="text-lg font-semibold ">Total</Text>
          <Text className="text-xl text-secondary-red font-semibold">
            {formatCurrency(4000000, "VND")}
          </Text>
        </View>
        <View className="flex flex-col items-center">
          <Text className="text-lg font-semibold ">Daily Average</Text>
          <Text className="text-xl text-secondary-red font-semibold">
            {formatCurrency(400000, "VND")}
          </Text>
        </View>
      </View>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        className="mt-6"
      >
        <BarChart
          data={columnData}
          barWidth={30}
          spacing={20}
          frontColor="#6BBFFF"
          showValuesAsTopLabel={false}
          showYAxisIndices={false}
          yAxisThickness={0}
          xAxisThickness={0}
          maxValue={500000}
          height={250}
          barBorderRadius={6}
          noOfSections={5}
          yAxisTextStyle={{ color: "gray" }}
          showGradient
          rulesColor={"#6BBFFF"}
          gradientColor={"#081657"}
          onPress={setIndexBar}
          activeOpacity={0.8}
        />
      </ScrollView>
    </View>
  ) : (
    <View className="mt-4">
      <View className="flex flex-row items-center justify-between">
        <View className="flex flex-col items-center">
          <Text className="text-lg font-semibold ">Total</Text>
          <Text className="text-xl text-secondary-red font-semibold">
            {formatCurrency(4000000, "VND")}
          </Text>
        </View>
        <View className="flex flex-col items-center">
          <Text className="text-lg font-semibold ">Daily Average</Text>
          <Text className="text-xl text-secondary-red font-semibold">
            {formatCurrency(400000, "VND")}
          </Text>
        </View>
      </View>
      <View className="flex items-center justify-center mt-10">
        <PieChart
          data={pieData}
          donut
          textSize={12}
          textColor="black"
          radius={120}
          focusOnPress
          innerRadius={60}
          labelsPosition="outward"
          showValuesAsLabels={true}
          showExternalLabels
          showText
          strokeWidth={2}
          strokeColor="white"
          externalLabelComponent={(item) => {
            const icon = pieData.find((value) => value.value === item?.value);
            return (
              <Image
                width={36}
                height={36}
                href={icon?.icon}
                translateY={-27}
                translateX={-8}
              />
            );
          }}
          centerLabelComponent={() => (
            <View className="flex items-center justify-center">
              <Text className="text-lg font-bold">Total</Text>
              <Text className="text-xl font-semibold text-primary-brighterBlue">
                {formatCurrency(400000, "VND")}
              </Text>
            </View>
          )}
        />
      </View>
    </View>
  );
};

export default ReportSection;
