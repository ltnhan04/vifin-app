import { Redirect } from "expo-router";
import useAuth from "@/utils/useAuth";

const Index = () => {
  const user = useAuth();
  return user ? (
    <Redirect href={"/(tabs)/home"} />
  ) : (
    <Redirect href={"/(auth)/sign-in"} />
  );
};

export default Index;
