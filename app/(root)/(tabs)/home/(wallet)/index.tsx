import { FlatList, SafeAreaView, View, Text, Image } from "react-native";
import { useGetWalletsQuery } from "@/redux/features/wallet/walletApi";
import androidSafeArea from "@/utils/android-safe-area";
import WalletItem from "@/components/common/wallet/WalletItem";
import Loading from "@/app/loading";
import images from "@/constants/images";
import { LinearGradient } from "expo-linear-gradient";

const WalletScreen = () => {
  const { data, isFetching, isLoading } = useGetWalletsQuery();

  if (isLoading || isFetching) {
    return <Loading />;
  }

  return (
    <LinearGradient colors={["#081657", "#316F95"]} style={{ flex: 1 }}>
      <SafeAreaView style={androidSafeArea.androidSafeArea}>
        <FlatList
          data={data?.data || []}
          keyExtractor={(_item, index) => index.toString()}
          contentContainerStyle={{ paddingHorizontal: 24 }}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
            <WalletItem
              _id={item._id}
              amount={Number(item.amount)}
              walletIcon={item.symbol}
              walletName={item.wallet_name}
            />
          )}
          ListEmptyComponent={() => (
            <View style={{ alignItems: "center" }} className="relative">
              <Image
                resizeMode="contain"
                className="w-80"
                source={images.emptyWallet}
              />
              <Text className="text-xl absolute left-0 top-[70%] right-0 text-center text-white">
                No wallets available
              </Text>
            </View>
          )}
        />
      </SafeAreaView>
    </LinearGradient>
  );
};

export default WalletScreen;
