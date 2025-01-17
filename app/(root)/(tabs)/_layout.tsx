import { Tabs } from "expo-router";
import Icon from "react-native-vector-icons/FontAwesome";
import { Text, View } from "react-native";

const TabIcon = ({
  focused,
  icon,
  title,
}: {
  focused: boolean;
  icon: string;
  title: string;
}) => {
  return (
    <View className="flex-1 flex flex-col items-center mt-2">
      <Icon name={icon} color={focused ? "#6BBFFF" : "#F3F4F6"} size={24} />
      <Text
        className={`${
          focused
            ? " text-primary-brighterBlue font-rubik-medium"
            : "text-secondary-gray font-rubik"
        } text-xs w-full text-center mt-1`}
      >
        {title}
      </Text>
    </View>
  );
};

const TabsLayout = () => {
  return (
    <Tabs
      screenOptions={{
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: "#081657",
          borderTopColor: "#fff",
          borderWidth: 1,
          borderTopLeftRadius: 14,
          borderTopRightRadius: 14,
          minHeight: 70,
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
        name="budget/index"
        options={{
          title: "Budget",
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabIcon focused={focused} title="Budget" icon="money" />
          ),
        }}
      />
      <Tabs.Screen
        name="scan/index"
        options={{
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabIcon focused={focused} title="" icon="qrcode" />
          ),
        }}
      />
      <Tabs.Screen
        name="transactions/index"
        options={{
          title: "Transactions",
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabIcon focused={focused} title="Transactions" icon="dollar" />
          ),
        }}
      />
      <Tabs.Screen
        name="settings/index"
        options={{
          title: "Settings",
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabIcon focused={focused} title="Settings" icon="cog" />
          ),
        }}
      />
    </Tabs>
  );
};

export default TabsLayout;
