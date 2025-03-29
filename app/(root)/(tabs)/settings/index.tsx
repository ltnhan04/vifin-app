import React from "react";
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Image,
} from "react-native";
import { useRouter } from "expo-router";
import { useAppSelector } from "@/redux/hooks";
import images from "@/constants/images";
import androidSafeArea from "@/utils/android-safe-area";
import SettingItem from "@/components/ui/SettingItem";
import LogoutSection from "@/components/common/settings/LogoutSection";
import Toast from "react-native-toast-message";

const Settings = () => {
  const router = useRouter();
  const { user } = useAppSelector((state) => state.auth);
  const handleEditProfile = () => {
    if (!user) return;

    if (user.provider === "google.com") {
      Toast.show({
        type: "error",
        text1: "Cannot edit Google-linked profile",
        text2: "Please update information via Google account",
      });
      return;
    }

    router.push("/settings/profile");
  };
  return (
    <SafeAreaView style={androidSafeArea.androidSafeArea}>
      <ScrollView contentContainerClassName="px-6 py-10">
        <View className="w-full flex flex-row items-center justify-center my-6">
          <Image
            className="w-48 h-48 rounded-full border-2 border-primary-brighterBlue shadow-xl shadow-primary-brighterBlue"
            src={
              user?.avatar
                ? user.avatar
                : "https://www.iconarchive.com/download/i104802/papirus-team/papirus-status/avatar-default.512.png"
            }
          />
        </View>
        <Text className="text-center my-3 text-white font-rubik-extrabold text-2xl">
          {user?.full_name}
        </Text>
        <View className="flex flex-row justify-center gap-x-4 items-start">
          <Image
            source={images.mail}
            resizeMode="contain"
            className="size-6 bg-primary-transparent"
          />
          <Text className="text-center mb-12 text-white font-rubik-extrabold text-lg">
            {user?.email}
          </Text>
        </View>
        <View className="flex flex-col gap-y-6">
          <TouchableOpacity onPress={handleEditProfile}>
            <SettingItem icon="person" title="Edit Profile" showArrow={true} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => router.push("/(root)/(tabs)/home/(wallet)")}
          >
            <SettingItem icon="wallet" title="My Wallet" showArrow={true} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() =>
              router.push(
                "/(root)/(tabs)/budget/modal/(category)/list-category"
              )
            }
          >
            <SettingItem icon="grid" title="Categories" showArrow={true} />
          </TouchableOpacity>
          <LogoutSection />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Settings;
