import { Text, TouchableOpacity, View, FlatList, Image } from "react-native";
import React from "react";
import { Control, Controller } from "react-hook-form";
import { LinearGradient } from "expo-linear-gradient";
import Icon from "react-native-vector-icons/Ionicons";
import { useGetCategoriesQuery } from "@/redux/features/category/categoryApi";
import Loading from "@/app/loading";
import { CategoryType } from "@/schema/category.schema";

const ParentCategories = ({
  control,
  onClose,
}: {
  control: Control<CategoryType>;
  onClose: () => void;
}) => {
  const { data, isFetching, isLoading } = useGetCategoriesQuery();

  if (isFetching || isLoading) {
    return <Loading />;
  }

  return (
    <LinearGradient colors={["#0C1E46", "#235B8E"]} style={{ flex: 1 }}>
      <View className="px-6 py-4">
        <TouchableOpacity onPress={onClose} className="mb-4">
          <Icon name="close" size={30} color="#fff" />
        </TouchableOpacity>

        <Text className="text-xl font-rubik-medium text-gray-200 mb-4">
          Parent Categories
        </Text>

        <Controller
          name="parent_id"
          control={control}
          render={({ field: { onChange, value } }) => (
            <FlatList
              data={data?.data}
              keyExtractor={(item) => item._id}
              contentContainerStyle={{ paddingBottom: 72 }}
              showsVerticalScrollIndicator={false}
              renderItem={({ item }) => {
                const isSelected = value === item._id;
                return (
                  <TouchableOpacity
                    className={`flex flex-row items-center py-3 px-4 rounded-lg `}
                    activeOpacity={0.8}
                    onPress={() => {
                      if (isSelected) {
                        onChange(null);
                      } else {
                        onChange(item._id);
                        onClose();
                      }
                    }}
                  >
                    <Image
                      className="size-14 rounded-full border-2 border-[#4FAAFF]"
                      source={{ uri: item.symbol }}
                    />
                    <Text className="ml-4 text-xl font-rubik-medium text-gray-200">
                      {item.name}
                    </Text>
                    {isSelected && (
                      <Icon
                        name="checkmark-circle"
                        size={24}
                        color="#6BBFFF"
                        style={{ marginLeft: "auto" }}
                      />
                    )}
                  </TouchableOpacity>
                );
              }}
            />
          )}
        />
      </View>
    </LinearGradient>
  );
};

export default ParentCategories;
