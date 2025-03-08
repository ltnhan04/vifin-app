import { ScrollView, SafeAreaView } from "react-native";
import React from "react";
import androidSafeArea from "@/utils/android-safe-area";
import icons from "@/constants/icons";
import WalletItem from "@/components/common/wallet/WalletItem";

const WalletScreen = () => {
  return (
    <SafeAreaView style={androidSafeArea.androidSafeArea}>
      <ScrollView
        contentContainerStyle={{
          flex: 1,
          paddingHorizontal: 24,
        }}
        showsVerticalScrollIndicator={false}
      >
        <WalletItem
          amount={50000}
          walletIcon={icons.walletIcon}
          walletName="Momo Wallet"
        />
        <WalletItem
          amount={50000}
          walletIcon={icons.walletIcon}
          walletName="Momo Wallet"
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default WalletScreen;
