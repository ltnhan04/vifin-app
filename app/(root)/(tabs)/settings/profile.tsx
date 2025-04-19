import React, { useState, useEffect } from "react";
import {
  View,
  SafeAreaView,
  ScrollView,
  Image,
  Text,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from "react-native";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FirebaseError } from "firebase/app";
import { toast } from "sonner-native";
import * as ImagePicker from "expo-image-picker";
import Icon from "react-native-vector-icons/Ionicons";
import {
  useUpdateCustomerMutation,
  useGetCustomerQuery,
} from "@/redux/features/customer/customerApi";
import { useAppSelector } from "@/redux/hooks";
import { ProfileType, profileSchema } from "@/schema/profile.schema";
import FormField from "@/components/ui/FormField";
import ButtonSubmit from "@/components/ui/Button";
import RadioSection from "@/components/common/settings/RadioSection";
import androidSafeArea from "@/utils/android-safe-area";

const Profile = () => {
  const [isEdited, setEdited] = useState(false);
  const [avatar, setAvatar] = useState<string | null>(null);

  const customerId = useAppSelector((state) => state.auth.user?.customerId);
  const { data, isLoading: isFetching } = useGetCustomerQuery({
    customerId: customerId as string,
  });
  const [updateCustomer, { isLoading }] = useUpdateCustomerMutation();

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ProfileType>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      full_name: "",
      gender: "male",
    },
  });

  useEffect(() => {
    if (data) {
      reset({
        full_name: data.data.full_name || undefined,
        gender:
          data.data.gender === "male" || data.data.gender === "female"
            ? data.data.gender
            : "male",
      });
      setAvatar(data.data.avatar || null);
    }
  }, [data, reset]);

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: "images",
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setAvatar(result.assets[0].uri);
    }
  };

  const onSubmit: SubmitHandler<ProfileType> = async (
    formData: ProfileType
  ) => {
    try {
      const payload = {
        customerId: customerId as string,
        updateData: {
          ...formData,
          avatar: avatar ?? undefined,
        },
      };
      await updateCustomer(payload).unwrap();
      toast.success("Profile updated", {
        description: "Your profile has been updated successfully.",
      });
      setEdited(false);
    } catch (error: any) {
      const err = error as FirebaseError;
      toast.error("Failed to update profile", {
        description: err.message,
      });
    }
  };

  const handleCancel = () => {
    Alert.alert(
      "Confirm Cancel!",
      "Are you sure you want to stop the editing process? The changes will not be saved.",
      [
        {
          text: "Yes",
          onPress: () => {
            setEdited(false);
            setAvatar(data?.data.avatar || null);
          },
          style: "destructive",
        },
        {
          text: "Exit",
          onPress: () => {},
          style: "cancel",
        },
      ]
    );
  };

  if (isFetching) {
    return (
      <SafeAreaView style={androidSafeArea.androidSafeArea}>
        <View className="flex-1 justify-center items-center">
          <ActivityIndicator size="large" color="#6BBDE3" />
          <Text className="text-secondary-gray mt-4">Loading Profile...</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={androidSafeArea.androidSafeArea}>
      <ScrollView contentContainerClassName="px-6 py-10">
        <View className="w-full flex flex-row items-center justify-center mt-20 mb-6">
          <View className="relative">
            <Image
              className="w-48 h-48 rounded-full border-2 border-primary-brighterBlue shadow-xl shadow-primary-brighterBlue"
              source={{
                uri:
                  avatar ||
                  "https://www.iconarchive.com/download/i104802/papirus-team/papirus-status/avatar-default.512.png",
              }}
            />
            <View className="absolute bottom-10 -right-4">
              <TouchableOpacity
                activeOpacity={0.7}
                onPress={pickImage}
                className="p-2 rounded-full bg-primary-brighterBlue"
              >
                <Icon name="create-outline" size={24} color={"#fff"} />
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <FormField
          label="Full Name"
          name="full_name"
          control={control}
          error={errors}
          type="default"
          isDisabled={!isEdited}
          placeholder="Enter your name"
        />
        <View className="mt-6 mb-4">
          <Text className="font-rubik-medium text-lg text-secondary-gray">
            Gender
          </Text>
          <RadioSection name="gender" control={control} type="profile" />
        </View>
        {!isEdited ? (
          <ButtonSubmit
            background="#6BBDE3"
            handleOnPress={() => setEdited(true)}
            isLoading={isLoading}
            textColor="white"
            title="Update Profile"
          />
        ) : (
          <View className="flex flex-col gap-y-3">
            <ButtonSubmit
              background="#6BBDE3"
              handleOnPress={handleSubmit(onSubmit)}
              textColor="white"
              title="Save Changes"
            />
            <ButtonSubmit
              background="#D15757"
              handleOnPress={handleCancel}
              textColor="white"
              title="Cancel"
            />
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default Profile;
