import { Text, TouchableOpacity, View, FlatList } from "react-native";
import React from "react";
import { router } from "expo-router";
import Icon from "react-native-vector-icons/Ionicons";
import { LinearGradient } from "expo-linear-gradient";
import { useAppSelector } from "@/redux/hooks";
import { useGetCategoriesQuery } from "@/redux/features/category/categoryApi";
import Loading from "@/app/loading";
import SubCategoryItem from "@/components/common/category/SubCategoryItem";
import ParentCategoryItem from "@/components/common/category/ParentCategoryItem";
import NoWallet from "@/components/ui/NoWallet";

const ListCategory = () => {
  const { data, isFetching, isLoading } = useGetCategoriesQuery();
  const customerId = useAppSelector((state) => state.auth.user?.customerId);

  if (isFetching || isLoading) {
    return <Loading />;
  }

  return (
    <LinearGradient colors={["#081657", "#316F95"]} style={{ flex: 1 }}>
      <View className="px-6">
        <TouchableOpacity
          className="flex flex-row items-center mb-4"
          activeOpacity={0.7}
          onPress={() => router.push("/transactions/modal/add-category")}
        >
          <Icon name="add-circle" size={30} color={"#4FAAFF"} />
          <Text className="font-bold text-xl text-[#4FAAFF] ml-3">
            New Category
          </Text>
        </TouchableOpacity>

        <FlatList
          data={data?.data}
          keyExtractor={(item) => item._id}
          contentContainerStyle={{ paddingBottom: 50 }}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => {
            const isOwner = item.createdBy === customerId;
            return (
              <View className="py-1">
                <ParentCategoryItem
                  _id={item._id}
                  name={item.name}
                  symbol={item.symbol}
                  isOwner={isOwner}
                />

                {item.children && (
                  <View className="ml-5 border-l-2 border-[#4FAAFF]">
                    <FlatList
                      data={item.children}
                      keyExtractor={(subItem) => subItem._id}
                      renderItem={({ item: subItem }) => {
                        const isSubOwner = subItem.createdBy === customerId;
                        return (
                          <SubCategoryItem
                            _id={subItem._id}
                            isSubOwner={isSubOwner}
                            symbol={subItem.symbol}
                            name={subItem.name}
                          />
                        );
                      }}
                    />
                  </View>
                )}
              </View>
            );
          }}
          ListEmptyComponent={() => <NoWallet />}
        />
      </View>
    </LinearGradient>
  );
};

export default ListCategory;
