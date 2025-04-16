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
    <View className="mb-4">
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={() => setModalVisible(true)}
        className="flex-row items-center gap-x-6 border-b border-white/10 pb-4"
      >
        <View className="pr-8 border-r border-white/10">
          <View className="bg-secondary-gray-100/20 rounded-xl p-2">
            <Image
              source={images.inheritance}
              resizeMode="contain"
              className="w-10 h-10 opacity-90"
            />
          </View>
        </View>
        <View className="flex-row items-center justify-between flex-1">
          <Controller
            name="parent_id"
            control={control}
            render={({ field: { value } }) => (
              <Text className="text-xl font-rubik-semibold text-white/90">
                {value
                  ? data?.data.find((category) => category._id === value)
                      ?.name || "Parent category"
                  : "Parent category"}
              </Text>
            )}
          />
          <View className="bg-white/5 rounded-full p-1">
            <Icon
              name="chevron-forward-outline"
              size={18}
              color="rgba(255,255,255,0.8)"
            />
          </View>
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
