import {
  View,
  Text,
  Switch,
  ScrollView,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import React, { useState } from "react";
import { Control, useForm } from "react-hook-form";
import { budgetSchema, BudgetType } from "@/schema/budget.schema";
import SelectedItem from "@/components/ui/SelectedItem";
import ButtonSubmit from "@/components/ui/Button";
import androidSafeArea from "@/utils/android-safe-area";

const AddBudget = () => {
  const [isReminder, setIsReminder] = useState(false);

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={`${Platform.OS === "ios" ? "padding" : "height"}`}
    >
      <SafeAreaView style={androidSafeArea.androidSafeArea}>
        <ScrollView
          contentContainerClassName="px-6 pb-6 h-full"
          style={{ flex: 1 }}
        >
          <View className="flex flex-col justify-between" style={{ flex: 1 }}>
            <View className="flex flex-col gap-y-3">
              <SelectedItem selectedItem="category" />
              <SelectedItem selectedItem="amount" />
              <SelectedItem selectedItem="dueDate" />
              <SelectedItem selectedItem="wallet" />
              <View className="flex flex-row items-center justify-between border-b border-secondary-gray-100 py-4">
                <View>
                  <Text className="font-rubik-semibold text-base text-black">
                    Repeat this budget
                  </Text>
                  <Text className="font-rubik-medium text-sm text-secondary-gray-200">
                    Budget will renew automatically.
                  </Text>
                </View>
                <Switch
                  trackColor={{ false: "#767577", true: "#6BBFFF" }}
                  thumbColor={isReminder ? "#fff" : "#f4f3f4"}
                  ios_backgroundColor="#3e3e3e"
                  onValueChange={(prevState) => setIsReminder(!!prevState)}
                  value={isReminder}
                />
              </View>
            </View>
            <ButtonSubmit
              title="Save"
              isLoading={false}
              isDisabled={true}
              background="#6BBFFF"
              textColor="white"
              handleOnPress={() => {}}
            />
          </View>
        </ScrollView>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

export default AddBudget;
