import { useRouter, Slot, useFocusEffect } from "expo-router";
import { useCallback, useEffect } from "react";
import { useAppSelector } from "@/redux/hooks";
import { useUpdatePushTokenMutation } from "@/redux/features/customer/customerApi";
import { registerForPushNotificationsAsync } from "@/utils/registerForPushNotificationsAsync";

const AppLayout = () => {
  const router = useRouter();
  const { user } = useAppSelector((state) => state.auth);
  const [updatePushToken] = useUpdatePushTokenMutation();

  useEffect(() => {
    const registerPushNotification = async () => {
      try {
        const pushToken = await registerForPushNotificationsAsync();
        if (pushToken && user?.customerId) {
          await updatePushToken({
            uid: user.customerId,
            pushToken: pushToken,
          }).unwrap();
        }
      } catch (error) {
        console.error("Failed to register push notification:", error);
      }
    };

    if (user?.customerId) {
      registerPushNotification();
    }
  }, [user?.customerId]);
  useFocusEffect(
    useCallback(() => {
      if (!user) {
        router.replace("/(root)/(onboarding)");
      }
    }, [user, router])
  );

  return <Slot />;
};

export default AppLayout;
