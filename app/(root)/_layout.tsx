import { useEffect } from "react";
import { Slot, useRouter } from "expo-router";
import { useAppSelector } from "@/redux/hooks";
import Loading from "@/app/loading";

const AppLayout = () => {
  const { user } = useAppSelector((state) => state.auth);
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.replace("/(root)/(auth)/sign-in");
    }
  }, [user]);

  if (!user) return <Loading />;
  return <Slot />;
};

export default AppLayout;
