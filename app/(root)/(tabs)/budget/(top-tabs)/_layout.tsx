import { View, Text } from "react-native";
import { Tabs } from "expo-router";
import React from "react";

const BudgetTab = () => {
  return (
    <Tabs
      screenOptions={{
        tabBarPosition: "top",
        tabBarShowLabel: false,
        tabBarStyle: { display: "none" },
      }}
    >
      <Tabs.Screen
        name="week"
        options={{
          headerShown: false,
          title: "This Week",
        }}
      />
      <Tabs.Screen
        name="month"
        options={{
          headerShown: false,
          title: "This Month",
        }}
      />
      <Tabs.Screen
        name="year"
        options={{
          headerShown: false,
          title: "This Year",
        }}
      />
    </Tabs>
  );
};

export default BudgetTab;
