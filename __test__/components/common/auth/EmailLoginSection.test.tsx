// __test__/components/common/auth/EmailLoginSection.test.tsx

import React from "react";
import { render } from "@testing-library/react-native";
import EmailLoginSection from "@/components/common/auth/EmailLoginSection";

// Mock các dependency để component render mà không thực thi logic async

jest.mock("@react-native-firebase/auth", () => ({
  __esModule: true,
  default: jest.fn(),
}));

jest.mock("react-hook-form", () => ({
  useForm: () => ({
    control: {},
    // Hàm handleSubmit trả về hàm dummy (không cần thực thi logic form) 
    handleSubmit: (fn: any) => () => fn({ email: "test@example.com", password: "password" }),
    reset: jest.fn(),
    formState: { errors: {} },
  }),
}));

jest.mock("@/redux/features/customer/customerApi", () => ({
  useLazyGetCustomerQuery: jest.fn(() => [jest.fn()]),
}));

jest.mock("@/redux/hooks", () => ({
  useAppDispatch: jest.fn(() => jest.fn()),
}));

jest.mock("@/redux/features/auth/authSlice", () => ({
  setUser: jest.fn(),
}));

// Giả lập FormField để chuyển prop testId thành testID và hiển thị placeholder
jest.mock("@/components/ui/FormField", () => {
  const React = require("react");
  const { TextInput } = require("react-native");
  return (props: any) => (
    <TextInput testID={props.testId} placeholder={props.placeholder} />
  );
});

// Giả lập Button để đảm bảo hiển thị nút
jest.mock("@/components/ui/Button", () => {
  const React = require("react");
  const { TouchableOpacity, Text } = require("react-native");
  return (props: any) => (
    <TouchableOpacity onPress={props.handleOnPress} testID="login_button">
      <Text>{props.title}</Text>
    </TouchableOpacity>
  );
});

describe("EmailLoginSection UI", () => {
  it("renders email and password fields and login button", () => {
    const { getByPlaceholderText, getByTestId, getByText } = render(<EmailLoginSection />);
    // Kiểm tra trường email
    expect(getByPlaceholderText("Enter your email")).toBeTruthy();
    // Kiểm tra trường password
    expect(getByPlaceholderText("Enter your password")).toBeTruthy();
    // Kiểm tra nút Login
    expect(getByText("Login")).toBeTruthy();
    expect(getByTestId("login_button")).toBeTruthy();
  });
});
