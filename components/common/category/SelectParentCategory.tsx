import { useState } from "react";
import { View, Text, TouchableOpacity, Image, Modal } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { Control, Controller } from "react-hook-form";
import { CategoryType } from "@/schema/category.schema";
import { useGetCategoriesQuery } from "@/redux/features/category/categoryApi";
import images from "@/constants/images";
import ParentCategories from "@/components/common/category/ParentCategories";

const SelectParentCategory = ({
  control,
}: {
  control: Control<CategoryType>;
}) => {
  const { data } = useGetCategoriesQuery();
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <View>
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={() => setModalVisible(true)}
        className="flex-row items-center gap-x-8 border-b border-gray-500 pb-5"
      >
        <Image
          source={images.inheritance}
          resizeMode="contain"
          className="w-12 h-12"
        />
        <View className="flex-row items-center justify-between flex-1">
          <Controller
            name="parent_id"
            control={control}
            render={({ field: { value } }) => (
              <Text className="text-xl font-semibold text-white">
                {value
                  ? data?.data.find((category) => category._id === value)
                      ?.name || "Select parent category"
                  : "Select parent category"}
              </Text>
            )}
          />
          <Icon name="chevron-forward-outline" size={20} color="#fff" />
        </View>
      </TouchableOpacity>

      <Modal visible={modalVisible} animationType="fade">
        <ParentCategories
          control={control}
          onClose={() => setModalVisible(false)}
        />
      </Modal>
    </View>
  );
};

export default SelectParentCategory;
