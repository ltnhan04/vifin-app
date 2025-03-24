import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  ScrollView,
  Pressable,
} from "react-native";
import { Image } from "react-native-svg";
import React from "react";
import RecentTransactionItem from "@/components/ui/RecentTransactionItem";
import { ITransaction } from "@/types/transaction";
import { formatCurrency } from "@/utils/format-currency";
import { formatDueDate } from "@/utils/format-date";
import { Ionicons } from "@expo/vector-icons";
import { PieChart } from "react-native-gifted-charts";
import { CalculateCategoryPercent } from "@/utils/calculate-category-percent";

interface IModalProps {
  modalVisible: boolean;
  setModalVisible: () => void;
  selectedBarData: {
    total: number;
    transactions: ITransaction[];
  };
}

const ModalDetailsTransaction: React.FC<IModalProps> = ({
  modalVisible,
  setModalVisible,
  selectedBarData,
}) => {
  const pieData = CalculateCategoryPercent(
    selectedBarData.total,
    selectedBarData.transactions
  );
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={setModalVisible}
    >
      <Pressable
        className="flex-1 justify-center items-center bg-black/40"
        onPress={setModalVisible}
      >
        <View
          className="bg-[#081657] p-6 rounded-2xl w-11/12 max-w-lg shadow-lg border border-[#6BBFFF]"
          onStartShouldSetResponder={() => true}
        >
          <View className="flex flex-row items-start justify-between">
            <View></View>
            <Text className="text-xl font-semibold text-white mb-4 text-center">
              {formatDueDate(selectedBarData.transactions[0].createdAt)}
            </Text>
            <TouchableOpacity onPress={setModalVisible}>
              <Ionicons name="close-outline" color={"white"} size={24} />
            </TouchableOpacity>
          </View>

          {selectedBarData && (
            <>
              <View className="flex flex-row w-full items-center justify-center mt-4">
                <PieChart
                  data={pieData}
                  donut
                  textSize={14}
                  textColor="#444"
                  fontWeight="800"
                  radius={120}
                  focusOnPress
                  innerRadius={60}
                  labelsPosition="outward"
                  showValuesAsLabels={true}
                  showExternalLabels
                  labelLineConfig={{ color: "white" }}
                  showText
                  strokeWidth={2}
                  strokeColor="white"
                  externalLabelComponent={(item) => {
                    const symbol = pieData.find(
                      (data) => data.value === item?.value
                    );
                    return (
                      <Image
                        width={36}
                        height={36}
                        href={symbol?.icon}
                        translateY={-27}
                        translateX={-8}
                      />
                    );
                  }}
                  centerLabelComponent={() => (
                    <View className="flex items-center justify-center">
                      <Text className="text-lg font-bold">Total</Text>
                      <Text className="text-xl font-semibold text-primary-brighterBlue">
                        {formatCurrency(selectedBarData.total, "VND")}
                      </Text>
                    </View>
                  )}
                />
              </View>

              <ScrollView className="max-h-96" indicatorStyle={"white"}>
                {selectedBarData.transactions.length > 0 ? (
                  selectedBarData.transactions.map((transaction, idx) => (
                    <RecentTransactionItem
                      key={idx}
                      transaction={transaction}
                    />
                  ))
                ) : (
                  <Text className="text-gray-400 text-center">
                    No transactions available
                  </Text>
                )}
              </ScrollView>
            </>
          )}
        </View>
      </Pressable>
    </Modal>
  );
};

export default ModalDetailsTransaction;
