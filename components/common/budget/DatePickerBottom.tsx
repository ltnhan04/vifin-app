import { Text, TouchableOpacity } from "react-native";
import React, { useCallback, useState } from "react";
import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetView,
} from "@gorhom/bottom-sheet";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { Controller, Control } from "react-hook-form";
import { BudgetType } from "@/schema/budget.schema";
import { formatDate } from "@/utils/format-date";
import {
  weekStart,
  weekEnd,
  monthStart,
  monthEnd,
  yearStart,
  yearEnd,
} from "@/utils/date-range";

const DatePickerBottom = ({
  bottomRef,
  control,
}: {
  bottomRef: React.RefObject<BottomSheet>;
  control: Control<BudgetType>;
}) => {
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [isPickingStartDate, setIsPickingStartDate] = useState(true);

  const renderBackdrop = useCallback(
    (props: any) => (
      <BottomSheetBackdrop
        appearsOnIndex={1}
        disappearsOnIndex={-1}
        {...props}
      />
    ),
    []
  );

  const handleSelectPreset = (
    preset: "week" | "month" | "year",
    onChangeStart: (date: Date) => void,
    onChangeDue: (date: Date) => void,
    onChangeRepeatType: (repeat_type: "weekly" | "monthly" | "yearly") => void
  ) => {
    let start: Date;
    let end: Date;

    switch (preset) {
      case "week":
        start = weekStart;
        end = weekEnd;
        onChangeRepeatType("weekly");
        break;
      case "month":
        start = monthStart;
        end = monthEnd;
        onChangeRepeatType("monthly");
        break;
      case "year":
        start = yearStart;
        end = yearEnd;
        onChangeRepeatType("yearly");
        break;
    }

    onChangeStart(start);
    onChangeDue(end);
    bottomRef.current?.close();
  };

  const handleConfirmDate = (
    date: Date,
    onChangeStart: (date: Date) => void,
    onChangeDue: (date: Date) => void,
    onChangeRepeatType: (repeat_type: "custom") => void
  ) => {
    const adjustedDate = new Date(
      date.toLocaleString("en-US", { timeZone: "Asia/Ho_Chi_Minh" })
    );
    if (isPickingStartDate) {
      onChangeStart(adjustedDate);
      setIsPickingStartDate(false);
      setDatePickerVisibility(false);
      setTimeout(() => setDatePickerVisibility(true), 100);
    } else {
      onChangeDue(adjustedDate);
      onChangeRepeatType("custom");
      setDatePickerVisibility(false);
      bottomRef.current?.close();
    }
  };
  return (
    <BottomSheet
      ref={bottomRef}
      snapPoints={["46%"]}
      index={-1}
      backdropComponent={renderBackdrop}
      enablePanDownToClose
      handleIndicatorStyle={{ backgroundColor: "#081657" }}
    >
      <BottomSheetView className="flex-1 px-5 py-4 items-center bg-white">
        <Text className="text-lg font-bold mb-3">Select Date Range</Text>

        <Controller
          control={control}
          name="repeat_type"
          render={({ field: { onChange: onChangeRepeatType } }) => (
            <Controller
              control={control}
              name="startDate"
              render={({
                field: { onChange: onChangeStart, value: startDate },
              }) => (
                <Controller
                  control={control}
                  name="dueDate"
                  render={({
                    field: { onChange: onChangeDue, value: dueDate },
                  }) => (
                    <>
                      <TouchableOpacity
                        onPress={() =>
                          handleSelectPreset(
                            "week",
                            onChangeStart,
                            onChangeDue,
                            onChangeRepeatType
                          )
                        }
                        className="bg-gray-200 py-3 px-4 rounded-lg mb-2 w-full items-center"
                      >
                        <Text className="text-base font-medium">This Week</Text>
                        <Text className="text-sm text-gray-500 mt-1">
                          {formatDate(weekStart)} - {formatDate(weekEnd)}
                        </Text>
                      </TouchableOpacity>

                      <TouchableOpacity
                        onPress={() =>
                          handleSelectPreset(
                            "month",
                            onChangeStart,
                            onChangeDue,
                            onChangeRepeatType
                          )
                        }
                        className="bg-gray-200 py-3 px-4 rounded-lg mb-2 w-full items-center"
                      >
                        <Text className="text-base font-medium">
                          This Month
                        </Text>
                        <Text className="text-sm text-gray-500 mt-1">
                          {formatDate(monthStart)} - {formatDate(monthEnd)}
                        </Text>
                      </TouchableOpacity>

                      <TouchableOpacity
                        onPress={() =>
                          handleSelectPreset(
                            "year",
                            onChangeStart,
                            onChangeDue,
                            onChangeRepeatType
                          )
                        }
                        className="bg-gray-200 py-3 px-4 rounded-lg mb-2 w-full items-center"
                      >
                        <Text className="text-base font-medium">This Year</Text>
                        <Text className="text-sm text-gray-500 mt-1">
                          {formatDate(yearStart)} - {formatDate(yearEnd)}
                        </Text>
                      </TouchableOpacity>

                      <TouchableOpacity
                        onPress={() => setDatePickerVisibility(true)}
                        className="bg-primary-dark py-3 px-4 rounded-lg mb-2 w-full items-center"
                      >
                        <Text className="text-base font-medium text-white">
                          {startDate && dueDate
                            ? `${formatDate(startDate)} - ${formatDate(dueDate)}`
                            : "Custom Date Range"}
                        </Text>
                      </TouchableOpacity>

                      <DateTimePickerModal
                        isVisible={isDatePickerVisible}
                        mode="date"
                        onConfirm={(date) =>
                          handleConfirmDate(
                            date,
                            onChangeStart,
                            onChangeDue,
                            onChangeRepeatType
                          )
                        }
                        onCancel={() => setDatePickerVisibility(false)}
                      />
                    </>
                  )}
                />
              )}
            />
          )}
        />
      </BottomSheetView>
    </BottomSheet>
  );
};

export default DatePickerBottom;
