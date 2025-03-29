import { View, Text, Image } from "react-native";
import React, { useCallback } from "react";
import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetView,
} from "@gorhom/bottom-sheet";

import AllStatistics from "@/components/common/home/AllStatistics";
import icons from "@/constants/icons";

const BottomStatistics = ({
  bottomRef,
}: {
  bottomRef: React.RefObject<BottomSheet>;
}) => {
  const renderBackdrop = useCallback(
    (props: any) => (
      <BottomSheetBackdrop
        appearsOnIndex={2}
        disappearsOnIndex={-1}
        {...props}
      />
    ),
    []
  );

  return (
    <BottomSheet
      ref={bottomRef}
      snapPoints={["25%", "50%", "70%"]}
      maxDynamicContentSize={2}
      index={0}
      backdropComponent={renderBackdrop}
      enablePanDownToClose
    >
      <BottomSheetView
        style={{
          flex: 1,
          paddingHorizontal: 24,
          paddingVertical: 16,
          alignItems: "center",
        }}
      >
        <>
          <View className="flex flex-row items-center justify-between w-full">
            <Text className="text-center w-full font-semibold text-black text-2xl">
              <Image source={icons.columnChart} className="size-9" /> Statistics
            </Text>
          </View>
          <AllStatistics />
        </>
      </BottomSheetView>
    </BottomSheet>
  );
};

export default BottomStatistics;
