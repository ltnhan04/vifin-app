import { View, Text, ScrollView, Image, Pressable } from "react-native";
import React, { useRef } from "react";
import { LinearGradient } from "expo-linear-gradient";
import ButtonSubmit from "@/components/ui/Button";
import BottomSheetModal from "@/components/ui/BottomSheet";
import images from "@/constants/images";
import BottomSheet from "@gorhom/bottom-sheet";

const BudgetScreen = () => {
  const bottomSheetRef = useRef<BottomSheet>(null);

  return (
    <LinearGradient colors={["#081657", "#316F95"]} style={{ flex: 1 }}>
      <View className="px-6 py-10" style={{ flex: 1 }}>
        <View style={{ flex: 1 }} className=" flex items-center justify-center">
          <Image
            source={images.emptyBox}
            resizeMode="contain"
            className="size-40"
          />
          <Text className=" font-rubik-medium text-xl text-white mt-4">
            You have no budget
          </Text>
          <Text className="font-rubik-medium text-base text-center mt-2 mb-4 text-secondary-gray-100">
            Start saving money by creating budgets and we will help you stick to
            it.
          </Text>
          <ButtonSubmit
            background="#6BBDE3"
            title="Create a Budget"
            textColor="white"
            handleOnPress={() => bottomSheetRef.current?.expand()}
          />
        </View>
      </View>
      <BottomSheetModal bottomSheetRef={bottomSheetRef} />
    </LinearGradient>
  );
};

export default BudgetScreen;
