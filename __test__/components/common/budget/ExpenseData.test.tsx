import React from "react";
import { render } from "@testing-library/react-native";
import ExpenseData from "@/components/common/budget/ExpenseData";

// Mock các hàm tiện ích
jest.mock("@/utils/format-currency", () => ({
  formatCurrency: jest.fn((amount: number, currency: string) => `${amount} ${currency}`),
}));

jest.mock("@/utils/get-color", () => ({
  getColorForValue: jest.fn((percentage: number) => (percentage >= 100 ? "green" : "red")),
  lightenColor: jest.fn((color: string) => `light-${color}`),
}));

// Mock icons
jest.mock("@/constants/icons", () => ({
  shopping: "dummy-shopping-icon",
}));

describe("ExpenseData Component", () => {
  const mockDueDate = { _seconds: 1711843200, _nanoseconds: 0 }; // Ngày 31/03/2024

  it("renders correctly with valid data", () => {
    const { getByText } = render(
      <ExpenseData
        currentAmount={3000}
        goalAmount={5000}
        categoryName="Shopping"
        dueDate={mockDueDate}
        symbol="dummy-shopping-icon"
      />
    );

    expect(getByText("Shopping")).toBeTruthy();
    expect(getByText(/Due day:/)).toBeTruthy();
    expect(getByText("3000 VND")).toBeTruthy();
    expect(getByText("Goal: 5000 VND")).toBeTruthy();
    expect(getByText("60%")).toBeTruthy();
    expect(getByText("2000 VND left to reach the goal")).toBeTruthy();
  });

  it("renders correctly when dueDate is missing", () => {
    const { getByText, queryByText } = render(
      <ExpenseData
        currentAmount={3000}
        goalAmount={5000}
        categoryName="Shopping"
        dueDate={undefined as any} // Trường hợp dueDate bị thiếu
        symbol="dummy-shopping-icon"
      />
    );

    expect(getByText("Shopping")).toBeTruthy();
    expect(queryByText(/Due day:/)).toBeFalsy(); // Không hiển thị ngày nếu thiếu dueDate
    expect(getByText("3000 VND")).toBeTruthy();
    expect(getByText("Goal: 5000 VND")).toBeTruthy();
  });
});
