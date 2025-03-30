import { useRouter, Slot, useFocusEffect } from "expo-router";
import { useAppSelector } from "@/redux/hooks";
import { useCallback } from "react";

const AppLayout = () => {
  const router = useRouter();
  const { user } = useAppSelector((state) => state.auth);
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
