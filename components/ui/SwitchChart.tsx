import { View, TouchableOpacity, Image, Animated, Easing } from "react-native";
import React, { useState, useEffect, useRef } from "react";
import { chartList } from "@/constants/data";

interface SwitchChartProps {
  handleSelectedChart: (value: number) => void;
}

const SwitchChart: React.FC<SwitchChartProps> = ({ handleSelectedChart }) => {
  const [selectedChart, setSelectedChart] = useState(0);
  const indicatorAnim = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    Animated.timing(indicatorAnim, {
      toValue: selectedChart,
      duration: 300,
      easing: Easing.inOut(Easing.ease),
      useNativeDriver: true,
    }).start();
  }, [selectedChart, indicatorAnim]);

  const translateX = indicatorAnim.interpolate({
    inputRange: [0, chartList.length - 1],
    outputRange: [0, (50 + 8) * (chartList.length - 1)],
  });
  return (
    <View
      style={{
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <View
        style={{
          padding: 2,
          borderRadius: 12,
          backgroundColor: "#c3c3c3",
          elevation: 4,
          shadowColor: "#bcbcbc",
        }}
      >
        <View style={{ position: "relative" }}>
          <Animated.View
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: 50,
              height: "100%",
              backgroundColor: "white",
              borderRadius: 10,
              transform: [{ translateX }],
            }}
          />
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            {chartList.map((value, index) => (
              <TouchableOpacity
                key={index}
                activeOpacity={0.7}
                onPress={() => {
                  setSelectedChart(index);
                  handleSelectedChart(index);
                }}
                style={{
                  width: 50,
                  alignItems: "center",
                  justifyContent: "center",
                  padding: 4,
                  marginRight: index !== chartList.length - 1 ? 8 : 0,
                }}
              >
                <Image
                  source={value.icon}
                  style={{ width: 40, height: 40 }}
                  resizeMode="contain"
                />
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </View>
    </View>
  );
};

export default SwitchChart;
