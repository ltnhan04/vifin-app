import React from "react";
import { render } from "@testing-library/react-native";
import { Image } from "react-native";
import TopItem from "@/components/ui/TopItem";
import { formatCurrency } from "@/utils/format-currency";
import type { IconKey } from "@/types/icon";

// Mock hàm formatCurrency để kiểm soát output định dạng
jest.mock("@/utils/format-currency", () => ({
  formatCurrency: jest.fn((price, currency) => `${price} ${currency}`),
}));

// Mock module icons để trả về một source đơn giản cho icon
jest.mock("@/constants/icons", () => ({
  walletIcon: { uri: "dummy-wallet-icon" },
}));

describe("TopItem Component", () => {
  const defaultProps = {
    title: "Test Title",
    price: 1000,
    percent: 10,
    type: "expense" as "expense" | "income",
    avt: "walletIcon" as IconKey, // ép kiểu giá trị "walletIcon" thành IconKey
  };

  it("renders title, formatted price and percent correctly", () => {
    const { getByText } = render(<TopItem {...defaultProps} />);
    expect(getByText("Test Title")).toBeTruthy();
    // Vì hàm formatCurrency được mock trả về "1000 VND"
    expect(getByText("1000 VND")).toBeTruthy();
    expect(getByText("10%")).toBeTruthy();
  });

  it("renders icon image with correct source", () => {
    const { UNSAFE_getByType } = render(<TopItem {...defaultProps} />);
    const image = UNSAFE_getByType(Image);
    expect(image.props.source).toEqual({ uri: "dummy-wallet-icon" });
  });

  it("renders correct percent style based on type", () => {
    // Sử dụng snapshot testing để so sánh giao diện khi type là expense và income
    const { toJSON, rerender } = render(<TopItem {...defaultProps} />);
    expect(toJSON()).toMatchSnapshot();

    rerender(<TopItem {...defaultProps} type="income" />);
    expect(toJSON()).toMatchSnapshot();
  });
});
