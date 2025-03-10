import { View, Text } from "react-native";
import React from "react";
import { useLocalSearchParams } from "expo-router";
import { useGetCategoryQuery } from "@/redux/features/category/categoryApi";
import Loading from "@/app/loading";

const EditCategory = () => {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { data, isLoading, isFetching } = useGetCategoryQuery(
    { id },
    { skip: !id }
  );
  if (isLoading || isFetching) {
    return <Loading />;
  }
  console.log(data?.data);
  return (
    <View>
      <Text>{id}</Text>
    </View>
  );
};

export default EditCategory;
