import React from "react";
import { render } from "@testing-library/react-native";
import { PieChart } from "react-native-gifted-charts";
import Badge from "@/components/ui/Badge";
import TargetItem from "@/components/ui/TargetItem";
import { formatCurrency } from "@/utils/format-currency";
import { getColorForValue, lightenColor } from "@/utils/get-color";

// Mock các hàm tiện ích
jest.mock("@/utils/format-currency", () => ({
  formatCurrency: jest.fn((price, currency) => `${price} ${currency}`),
}));

jest.mock("@/utils/get-color", () => ({
  // Trả về mã màu hợp lệ cho percentage=40 là "#000040"
  getColorForValue: jest.fn((percentage) => "#000040"),
  // Trả về mã màu hợp lệ cho lightenColor
  lightenColor: jest.fn((color, factor) => "#0000A0"),
}));

describe("TargetItem Component", () => {
  const percentage = 40;

  it("renders the pie chart with center label showing percentage", () => {
    const { getAllByText, UNSAFE_getByType } = render(
      <TargetItem percentage={percentage} />
    );
    // Lấy tất cả các phần tử chứa "40%"
    const percentageElements = getAllByText(`${percentage}%`);
    expect(percentageElements.length).toBeGreaterThan(0);
    // Kiểm tra rằng PieChart được render
    expect(UNSAFE_getByType(PieChart)).toBeTruthy();
  });

  it("renders title 'Vacations' and Badge with correct props", () => {
    const { getByText, UNSAFE_getByType } = render(
      <TargetItem percentage={percentage} />
    );
    // Kiểm tra tiêu đề "Vacations"
    expect(getByText("Vacations")).toBeTruthy();
    // Kiểm tra Badge
    const badge = UNSAFE_getByType(Badge);
    expect(badge.props.category).toBe("Shopping");
    // Kiểm tra bgColor trả về từ getColorForValue(percentage) (mã màu hợp lệ)
    expect(badge.props.bgColor).toBe("#000040");
  });

  it("renders formatted currency values", () => {
    const { getByText } = render(<TargetItem percentage={percentage} />);
    
    // Vì formatCurrency được mock trả về chuỗi "<price> VND"
    expect(getByText("3000000 VND / 4000000 VND")).toBeTruthy();
    expect(getByText("1000000 VND")).toBeTruthy();

    // Kiểm tra rằng formatCurrency được gọi đúng
    expect(formatCurrency).toHaveBeenCalledWith(3000000, "VND");
    expect(formatCurrency).toHaveBeenCalledWith(4000000, "VND");
    expect(formatCurrency).toHaveBeenCalledWith(1000000, "VND");
  });

  it("renders goal completion text", () => {
    const { getByText } = render(<TargetItem percentage={percentage} />);
    expect(getByText("Goal will be completed on 3rd January, 2025")).toBeTruthy();
  });
});
