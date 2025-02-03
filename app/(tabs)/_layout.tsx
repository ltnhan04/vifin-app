import React from "react";
import { View } from "react-native";
import { StatusBar } from "expo-status-bar";
import { Tabs, useSegments } from "expo-router";
import Icon from "react-native-vector-icons/Ionicons";
import usePageToHide from "@/utils/usePageToHide";
import TabIcon from "@/components/ui/TabIcon";

const TabsLayout = () => {
  const segment = useSegments();
  const pageToHide = usePageToHide();
  const page = segment[segment.length - 1];
  return (
    <>
      <Tabs
        screenOptions={{
          tabBarShowLabel: false,
          animation: "shift",
          tabBarStyle: {
            backgroundColor: "#081657",
            display: pageToHide.includes(page) ? "none" : "flex",
            minHeight: 70,
            shadowColor: "#6BBFFF",
            paddingTop: "3%",
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.1,
            shadowRadius: 10,
            elevation: 8,
          },
        }}
      >
        <Tabs.Screen
          name="home/index"
          options={{
            title: "Home",
            headerShown: false,
            tabBarIcon: ({ focused }) => (
              <TabIcon focused={focused} title="Home" icon={"home"} />
            ),
          }}
        />
        <Tabs.Screen
          name="budget"
          options={{
            title: "Budget",
            headerShown: false,
            tabBarIcon: ({ focused }) => (
              <TabIcon focused={focused} title="Budget" icon="wallet" />
            ),
          }}
        />
        <Tabs.Screen
          name="scan/index"
          options={{
            headerShown: false,
            tabBarIcon: () => (
              <View
                className="absolute -top-3 w-16 h-16 flex items-center justify-center rounded-full"
                style={{
                  backgroundColor: "#6BBFFF",
                  shadowColor: "#6BBFFF",
                  shadowOffset: { width: 0, height: 0 },
                  shadowOpacity: 0.8,
                  shadowRadius: 20,
                  elevation: 12,
                }}
              >
                <Icon name={"scan"} color="#fff" size={32} />
              </View>
            ),
          }}
        />
        <Tabs.Screen
          name="transactions/index"
          options={{
            title: "Transactions",
            headerShown: false,
            tabBarIcon: ({ focused }) => (
              <TabIcon focused={focused} title="Transactions" icon="cash" />
            ),
          }}
        />
        <Tabs.Screen
          name="settings"
          options={{
            title: "Settings",
            headerShown: false,
            tabBarIcon: ({ focused }) => (
              <TabIcon focused={focused} title="Settings" icon="settings" />
            ),
          }}
        />
      </Tabs>
      <StatusBar style="inverted" backgroundColor="#081657" />
    </>
  );
};

export default TabsLayout;
