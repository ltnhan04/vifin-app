jest.useFakeTimers();

import React from "react";
import { render, fireEvent, waitFor, cleanup } from "@testing-library/react-native";
import { useForm, FormProvider } from "react-hook-form";
import FormField from "@/components/ui/FormField";
import { FormDataProps } from "@/types/form";

// Định nghĩa kiểu form cho test (chỉ có 1 trường "email")
type TestFormType = { email: string };

// Các prop mặc định, loại bỏ prop control vì sẽ được truyền từ TestFormField
const defaultProps: Omit<FormDataProps, "control"> = {
  name: "email",
  label: "Test Label",
  type: "default",
  isSecure: true,
  isDisabled: false,
  icon: "eye",
  error: undefined,
  placeholder: "Enter text",
  handleShowingPassword: jest.fn(),
};

// Helper component bọc FormField trong FormProvider, đảm bảo truyền control đúng
const TestFormField: React.FC<Partial<Omit<FormDataProps, "control">>> = (props) => {
  const methods = useForm<TestFormType>({ defaultValues: { email: "" } });
  return (
    <FormProvider {...methods}>
      <FormField {...defaultProps} {...props} control={methods.control} />
    </FormProvider>
  );
};

describe("FormField Component", () => {
  afterEach(cleanup);

  it("renders label and placeholder correctly", () => {
    const { getByText, getByPlaceholderText } = render(<TestFormField />);
    expect(getByText("Test Label")).toBeTruthy();
    expect(getByPlaceholderText("Enter text")).toBeTruthy();
  });

  it("displays error message when error exists", () => {
    // Truyền error cho trường "email"
    const errorProps: Partial<Omit<FormDataProps, "control">> = {
      error: { email: { message: "This field is required" } } as any,
    };
    const { getByText } = render(<TestFormField {...errorProps} />);
    expect(getByText("This field is required")).toBeTruthy();
  });

  it("calls handleShowingPassword when icon button is pressed", () => {
    const handleShowingPasswordMock = jest.fn();
    const propsWithIcon: Partial<Omit<FormDataProps, "control">> = {
      handleShowingPassword: handleShowingPasswordMock,
    };
    const { getByTestId } = render(<TestFormField {...propsWithIcon} />);
    const toggleButton = getByTestId("toggle-password");
    fireEvent.press(toggleButton);
    expect(handleShowingPasswordMock).toHaveBeenCalled();
  });

  it("updates value on text change", async () => {
    const { getByPlaceholderText } = render(<TestFormField />);
    const input = getByPlaceholderText("Enter text");
    fireEvent.changeText(input, "New Value");
    await waitFor(() => {
      expect(input.props.value).toBe("New Value");
    });
  });

  it("calls onBlur when input loses focus", async () => {
    // Tạo component với giá trị mặc định khác để kiểm tra onBlur
    const TestComponent = () => {
      const methods = useForm<TestFormType>({ defaultValues: { email: "Initial" } });
      return (
        <FormProvider {...methods}>
          <FormField {...defaultProps} control={methods.control} />
        </FormProvider>
      );
    };

    const { getByPlaceholderText } = render(<TestComponent />);
    const input = getByPlaceholderText("Enter text");
    fireEvent(input, "focus");
    fireEvent(input, "blur");
    await waitFor(() => {
      // Vì onBlur không thay đổi giá trị, nên vẫn giữ "Initial"
      expect(input.props.value).toBe("Initial");
    });
  });
});
