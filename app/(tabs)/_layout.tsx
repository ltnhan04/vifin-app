import React from "react";
import { View, Image, Text } from "react-native";
import { StatusBar } from "expo-status-bar";
import { Tabs, useSegments } from "expo-router";
import { useAppSelector } from "@/redux/hooks";
import Icon from "react-native-vector-icons/Ionicons";
import icons from "@/constants/icons";
import usePageToHide from "@/utils/usePageToHide";
import TabIcon from "@/components/ui/TabIcon";

const TabsLayout = () => {
  const { user } = useAppSelector((state) => state.auth);

  const segment = useSegments();
  const pageToHide = usePageToHide();
  const page = segment[segment.length - 1];
  return (
    <>
      <Tabs
        screenOptions={{
          tabBarShowLabel: false,
          tabBarHideOnKeyboard: true,
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
            headerTitle: "",
            headerBackground: () => (
              <View className="bg-primary-dark" style={{ flex: 1 }}></View>
            ),
            headerLeft: () => {
              return (
                <View className="flex flex-row items-center px-6">
                  <Image
                    source={icons.hello}
                    className="size-7"
                    resizeMode="contain"
                  />
                  <Text className="text-white font-rubik-medium text-xl ml-2">
                    Welcome to{" "}
                    <Text className="text-primary-brightBlue">ViFin</Text>
                    <Text className="font-rubik-bold">
                      , {user?.displayName}
                    </Text>
                  </Text>
                </View>
              );
            },
            headerRight: () => (
              <Image
                source={icons.bell}
                resizeMode="contain"
                className="size-7 mr-6"
              />
            ),
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
          name="transactions"
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
