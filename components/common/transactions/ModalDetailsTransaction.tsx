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
        className="flex-1 justify-center items-center bg-black/60"
        onPress={setModalVisible}
      >
        <View
          className="bg-[#081657] p-6 rounded-2xl w-11/12 max-w-lg shadow-2xl border border-[#6BBFFF]/30"
          onStartShouldSetResponder={() => true}
        >
          <View className="flex flex-row items-center justify-between mb-6">
            <View className="w-6" />
            <Text className="text-xl font-semibold text-white text-center">
              {formatDueDate(selectedBarData.transactions[0].createdAt)}
            </Text>
            <TouchableOpacity
              onPress={setModalVisible}
              className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center"
            >
              <Ionicons name="close" color={"white"} size={20} />
            </TouchableOpacity>
          </View>

          {selectedBarData && (
            <>
              <View className="flex flex-row w-full items-center justify-center mb-8">
                <PieChart
                  data={pieData}
                  donut
                  textSize={14}
                  textColor="#fff"
                  fontWeight="800"
                  radius={90}
                  focusOnPress
                  innerRadius={45}
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
                      <Text className="text-lg font-bold text-[#999999 ]">
                        Total
                      </Text>
                      <Text className="text-base font-bold text-[#FF6B6B]">
                        {formatCurrency(selectedBarData.total, "VND")}
                      </Text>
                    </View>
                  )}
                />
              </View>

              <View className="bg-white/10 rounded-xl p-4 border border-white/10">
                <Text className="text-white font-semibold mb-4">
                  Transactions
                </Text>
                <ScrollView className="max-h-60" indicatorStyle={"white"}>
                  {selectedBarData.transactions.length > 0 ? (
                    selectedBarData.transactions.map((transaction, idx) => (
                      <View key={idx} className="mb-3 last:mb-0">
                        <RecentTransactionItem transaction={transaction} />
                      </View>
                    ))
                  ) : (
                    <View className="py-8">
                      <Text className="text-white/60 text-center">
                        No transactions available
                      </Text>
                    </View>
                  )}
                </ScrollView>
              </View>
            </>
          )}
        </View>
      </Pressable>
    </Modal>
  );
};

export default ModalDetailsTransaction;
