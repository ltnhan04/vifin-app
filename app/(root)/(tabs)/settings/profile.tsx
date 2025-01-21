import React, { useState } from "react";
import {
  View,
  SafeAreaView,
  ScrollView,
  Image,
  Text,
  TouchableOpacity,
  Alert,
} from "react-native";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FirebaseError } from "firebase/app";
import { ProfileType, profileSchema } from "@/schema/profile.schema";
import Toast from "react-native-toast-message";
import FormField from "@/components/ui/FormField";
import ButtonSubmit from "@/components/ui/Button";
import RadioSection from "@/components/common/settings/RadioSection";
import androidSafeArea from "@/utils/android-safe-area";
import Icon from "react-native-vector-icons/Ionicons";

const Profile = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isEdited, setEdited] = useState(false);
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ProfileType>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: "",
      gender: "male",
    },
  });

  const onSubmit: SubmitHandler<ProfileType> = async (data: ProfileType) => {
    setIsLoading(true);
    try {
      console.log(data);
      setEdited(!isEdited);
    } catch (error: any) {
      const err = error as FirebaseError;
      Toast.show({
        type: "error",
        text1: "Update Failed: " + err.message,
      });
    } finally {
      setIsLoading(false);
      reset();
    }
  };

  const handleCancel = () => {
    Alert.alert(
      "Confirm Cancel!",
      "Are you sure you want to stop the editing process? The changes will not be saved.",
      [
        {
          text: "Yes",
          onPress: () => setEdited(!isEdited),
          style: "destructive",
        },
        {
          text: "Exit",
          onPress: () => {},
          style: "cancel",
        },
      ],
    );
  };

  return (
    <SafeAreaView style={androidSafeArea.androidSafeArea}>
      <ScrollView contentContainerClassName="px-6 py-10">
        <View className="w-full flex flex-row items-center justify-center mt-20 mb-6">
          <View className="relative">
            <Image
              className="w-48 h-48 rounded-full border-2 border-primary-brighterBlue shadow-xl shadow-primary-brighterBlue"
              src={
                "https://www.iconarchive.com/download/i104802/papirus-team/papirus-status/avatar-default.512.png"
              }
            />
            <View className="absolute bottom-10 -right-4">
              <TouchableOpacity
                activeOpacity={0.7}
                className="p-2 rounded-full bg-primary-brighterBlue"
              >
                <Icon name="create-outline" size={24} color={"#fff"} />
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <FormField
          label="Name"
          name="name"
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
          <RadioSection name="gender" control={control} />
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
