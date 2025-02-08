import { Text, useWindowDimensions } from "react-native";
import React, { useState } from "react";
import { TabView, SceneMap, TabBar } from "react-native-tab-view";
import ThisWeek from "@/components/common/home/ThisWeek";
import ThisMonth from "@/components/common/home/ThisMonth";
import ThisYear from "@/components/common/home/ThisYear";

interface CategoriesDetailProps {
  type: "income" | "expense" | undefined;
}
interface RouteType {
  key: string;
  title: string;
}

const routes: RouteType[] = [
  { key: "first", title: "This Week" },
  { key: "second", title: "This Month" },
  {
    key: "third",
    title: "This Year",
  },
];

const CategoriesDetail: React.FC<CategoriesDetailProps> = ({ type }) => {
  const layout = useWindowDimensions();
  const [index, setIndex] = useState(0);
  return (
    <TabView
      swipeEnabled
      navigationState={{ index, routes }}
      renderScene={SceneMap({
        first: ThisWeek,
        second: ThisMonth,
        third: ThisYear,
      })}
      onIndexChange={setIndex}
      initialLayout={{ width: layout.width }}
      renderTabBar={(props) => (
        <TabBar
          {...props}
          options={{
            first: {
              label: ({ route, focused, style }) => (
                <Text
                  style={[
                    style,
                    {
                      fontSize: 14,
                      color: focused ? "#57A9D1" : "#000",
                      fontWeight: "600",
                    },
                  ]}
                  className=" uppercase"
                >
                  {route.title}
                </Text>
              ),
            },
            second: {
              label: ({ route, focused, style }) => (
                <Text
                  style={[
                    style,
                    {
                      fontSize: 14,
                      color: focused ? "#57A9D1" : "#000",
                      fontWeight: "600",
                    },
                  ]}
                  className=" uppercase"
                >
                  {route.title}
                </Text>
              ),
            },
            third: {
              label: ({ route, focused, style }) => (
                <Text
                  style={[
                    style,
                    {
                      fontSize: 14,
                      color: focused ? "#57A9D1" : "#000",
                      fontWeight: "600",
                    },
                  ]}
                  className=" uppercase"
                >
                  {route.title}
                </Text>
              ),
            },
          }}
          activeColor="#57A9D1"
          inactiveColor="#c3c3c3"
          indicatorStyle={{
            backgroundColor: "#57A9D1",
            height: 3,
            borderRadius: 20,
          }}
          style={{
            backgroundColor: "white",
            height: 45,
            justifyContent: "center",
          }}
        />
      )}
    />
  );
};

export default CategoriesDetail;
