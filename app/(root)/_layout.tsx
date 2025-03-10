import { useEffect, useState } from "react";
import { Slot, useRouter } from "expo-router";
import { useAppSelector } from "@/redux/hooks";
import Loading from "@/app/loading";

const AppLayout = () => {
  const { user } = useAppSelector((state) => state.auth);
  const router = useRouter();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (isMounted && !user) {
      router.replace("/(root)/(auth)/sign-in");
    }
  }, [user, isMounted]);

  if (!user) return <Loading />;
  return <Slot />;
};

export default AppLayout;
