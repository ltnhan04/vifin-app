import { useRouter, Slot, useFocusEffect } from "expo-router";
import { useAppSelector } from "@/redux/hooks";

const AppLayout = () => {
  const router = useRouter();
  const { user } = useAppSelector((state) => state.auth);
  useFocusEffect(() => {
    if (!user) {
      return router.replace("/(root)/(auth)/sign-in");
    }
  });

  return <Slot />;
};

export default AppLayout;
