import { Slot, useRouter, useFocusEffect } from "expo-router";
import { useCallback, useEffect } from "react";
import { useAppSelector } from "@/redux/hooks";
import { useUpdatePushTokenMutation } from "@/redux/features/customer/customerApi";
import { registerForPushNotificationsAsync } from "@/utils/registerForPushNotificationsAsync";
import * as Notifications from "expo-notifications";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

const AppLayout = () => {
  const router = useRouter();
  const { user } = useAppSelector((state) => state.auth);
  const [updatePushToken] = useUpdatePushTokenMutation();

  useEffect(() => {
    let didRun = false;

    const registerPushNotification = async () => {
      try {
        const pushToken = await registerForPushNotificationsAsync();
        if (pushToken && user?.customerId && !didRun) {
          didRun = true;
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

  useEffect(() => {
    const subscription = Notifications.addNotificationReceivedListener(
      (notification) => {
        console.log(
          "💥 Notification received in foreground:",
          JSON.stringify(notification, null, 2)
        );
      }
    );

    return () => subscription.remove();
  }, []);

  useFocusEffect(
    useCallback(() => {
      if (user === undefined) return;
      if (!user) {
        router.replace("/(root)/(onboarding)");
      }
    }, [user, router])
  );

  return <Slot />;
};

export default AppLayout;
