import { FlatList, SafeAreaView } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useGetWalletsQuery } from "@/redux/features/wallet/walletApi";
import androidSafeArea from "@/utils/android-safe-area";
import WalletItem from "@/components/common/wallet/WalletItem";
import Loading from "@/app/loading";
import NoWallet from "@/components/ui/NoWallet";

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
          renderItem={({ item }) => (
            <WalletItem
              _id={item._id}
              amount={Number(item.amount)}
              walletIcon={item.symbol}
              walletName={item.wallet_name}
            />
          )}
          ListEmptyComponent={() => <NoWallet />}
        />
      </SafeAreaView>
    </LinearGradient>
  );
};

export default WalletScreen;
