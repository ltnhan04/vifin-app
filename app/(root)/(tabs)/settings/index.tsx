import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import androidSafeArea from "@/utils/android-safe-area";
import React from "react";
import SettingItem from "@/components/ui/SettingItem";

const Settings = () => {
  return (
    <SafeAreaView style={androidSafeArea.androidSafeArea}>
      <ScrollView contentContainerClassName="px-6 py-10">
        <View className="flex flex-col gap-y-6">
          <TouchableOpacity>
            <SettingItem icon="person" title="My Profile" showArrow={true} />
          </TouchableOpacity>
          <TouchableOpacity>
            <SettingItem icon="wallet" title="My Wallet" showArrow={true} />
          </TouchableOpacity>
          <TouchableOpacity>
            <SettingItem icon="grid" title="Categories" showArrow={true} />
          </TouchableOpacity>
          <SettingItem icon="timer" title="Reminder" showSwitch={true} />
          <SettingItem
            icon="cash"
            title="Currency Unit"
            showOptions="currency_unit"
          />
          <SettingItem
            icon="language"
            title="Languages"
            showOptions="languages"
          />
          <TouchableOpacity>
            <SettingItem icon="log-out" title="Logout" isLogout={true} />
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Settings;
