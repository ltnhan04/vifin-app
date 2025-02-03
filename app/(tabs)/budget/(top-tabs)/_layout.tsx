import React from "react";
import {
  createMaterialTopTabNavigator,
  MaterialTopTabNavigationOptions,
  MaterialTopTabNavigationEventMap,
} from "@react-navigation/material-top-tabs";
import { withLayoutContext } from "expo-router";
import { ParamListBase, TabNavigationState } from "@react-navigation/native";

const { Navigator } = createMaterialTopTabNavigator();
export const MaterialTopTabs = withLayoutContext<
  MaterialTopTabNavigationOptions,
  typeof Navigator,
  TabNavigationState<ParamListBase>,
  MaterialTopTabNavigationEventMap
>(Navigator);

const BudgetTabs = () => {
  return (
    <>
      <MaterialTopTabs
        screenOptions={{
          tabBarActiveTintColor: "#6BBFFF",
          tabBarInactiveTintColor: "#71717A",
          tabBarStyle: {
            backgroundColor: "#081657",
          },
          tabBarLabelStyle: {
            fontSize: 13,
            fontWeight: "bold",
            textTransform: "uppercase",
            marginTop: 16,
          },
          tabBarIndicatorStyle: {
            backgroundColor: "#6BBFFF",
            height: 3,
            borderRadius: 16,
          },
        }}
      >
        <MaterialTopTabs.Screen name="index" options={{ title: "This Week" }} />
        <MaterialTopTabs.Screen
          name="month"
          options={{ title: "This Month" }}
        />
        <MaterialTopTabs.Screen name="year" options={{ title: "This Year" }} />
      </MaterialTopTabs>
    </>
  );
};

export default BudgetTabs;
