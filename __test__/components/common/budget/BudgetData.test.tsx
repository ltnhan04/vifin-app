// __test__/components/ui/BudgetData.test.tsx

import React from "react";
import { render } from "@testing-library/react-native";
import BudgetData from "@/components/common/budget/BudgetData";
import { formatCurrency } from "@/utils/format-currency";

// Mock hàm formatCurrency
jest.mock("@/utils/format-currency", () => ({
  formatCurrency: jest.fn((amount, currency) => `${amount} ${currency}`),
}));

describe("BudgetData", () => {
  it("renders title and days when days is provided", () => {
    const { getByText } = render(
      <BudgetData title="Test Budget" amount={5000} primaryColor="red" days="30" />
    );
    // Kiểm tra tiêu đề
    expect(getByText("Test Budget")).toBeTruthy();
    // Nếu days được cung cấp thì hiển thị "30 days"
    expect(getByText("30 days")).toBeTruthy();
  });

  it("renders title and formatted currency when days is not provided", () => {
    const { getByText } = render(
      <BudgetData title="Test Budget" amount={5000} primaryColor="blue" />
    );
    // Kiểm tra tiêu đề
    expect(getByText("Test Budget")).toBeTruthy();
    // Kiểm tra rằng formatCurrency được gọi với 5000 và 'VND'
    expect(formatCurrency).toHaveBeenCalledWith(5000, "VND");
    // Và hiển thị kết quả định dạng
    expect(getByText("5000 VND")).toBeTruthy();
  });

  it("renders 0 VND when amount is undefined and days is not provided", () => {
    const { getByText } = render(
      <BudgetData title="Test Budget" primaryColor="green" />
    );
    // Kiểm tra tiêu đề
    expect(getByText("Test Budget")).toBeTruthy();
    // Vì amount không được cung cấp nên hiển thị 0 VND
    expect(formatCurrency).toHaveBeenCalledWith(0, "VND");
    expect(getByText("0 VND")).toBeTruthy();
  });
});