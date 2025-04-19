import React from "react";
import { render } from "@testing-library/react-native";
import GoogleLoginSection from "@/components/common/auth/GoogleLoginSection";

// Vì component sử dụng các hook và module bên ngoài, ta cần mock các module này
jest.mock("@react-native-firebase/auth", () => ({
  __esModule: true,
  default: jest.fn(),
  GoogleAuthProvider: {
    credential: jest.fn(),
  },
}));

jest.mock("@react-native-google-signin/google-signin", () => ({
  GoogleSignin: {
    hasPlayServices: jest.fn(),
    signIn: jest.fn(),
  },
}));


jest.mock("@/redux/features/customer/customerApi", () => ({
  useCreateNewCustomerMutation: jest.fn(() => [jest.fn()]),
}));

jest.mock("@/redux/hooks", () => ({
  useAppDispatch: jest.fn(() => jest.fn()),
}));

jest.mock("@/redux/features/auth/authSlice", () => ({
  setUser: jest.fn(),
}));

jest.mock("@/components/ui/Button", () => {
  const React = require("react");
  const { TouchableOpacity, Text } = require("react-native");
  return (props: any) => (
    <TouchableOpacity onPress={props.handleOnPress} testID="google_login_button">
      <Text>{props.title}</Text>
    </TouchableOpacity>
  );
});

describe("GoogleLoginSection UI", () => {
  it("renders a button with title 'Continue with Google'", () => {
    const { getByTestId, getByText } = render(<GoogleLoginSection />);
    // Kiểm tra có nút với testID là "google_login_button"
    const button = getByTestId("google_login_button");
    expect(button).toBeTruthy();
    // Kiểm tra văn bản của button
    expect(getByText("Continue with Google")).toBeTruthy();
  });
});
