import { Redirect } from "expo-router";

const Index = () => {
  return <Redirect href={"/(auth)/sign-in"} />;
};

export default Index;
