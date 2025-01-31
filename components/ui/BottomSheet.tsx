import { View, Text } from "react-native";
import React, { useCallback } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";

const BottomSheetModal = ({
  bottomSheetRef,
}: {
  bottomSheetRef: React.RefObject<BottomSheet>;
}) => {
  const handleSheetChanges = useCallback((index: number) => {
    console.log("Sheet changes: ", index);
  }, []);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <BottomSheet
        ref={bottomSheetRef}
        index={-1}
        snapPoints={["50%"]}
        onChange={handleSheetChanges}
      >
        <BottomSheetView style={{ flex: 1, padding: 36, alignItems: "center" }}>
          <Text>Awesome 🎉</Text>
        </BottomSheetView>
      </BottomSheet>
    </GestureHandlerRootView>
  );
};

export default BottomSheetModal;
