import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import SwitchTab from "@/components/ui/SwitchSelector";

describe("SwitchTab Component", () => {
  const items = ["Tab 1", "Tab 2", "Tab 3"];
  const mockOnValueChange = jest.fn();

  it("renders correctly without crashing", () => {
    const { getByTestId } = render(<SwitchTab item={items} />);
    expect(getByTestId("switch-tab")).toBeTruthy();
  });

  it("sets default selected tab when initialValue is provided", () => {
    const { getByTestId } = render(<SwitchTab item={items} initialValue={1} />);
    expect(getByTestId("switch-tab").props.selectedIndex).toBe(1);
  });

  it("calls onValueChange when tab is changed", () => {
    const { getByTestId } = render(
      <SwitchTab item={items} onValueChange={mockOnValueChange} />
    );

    // Giả lập thay đổi giá trị
    fireEvent(getByTestId("switch-tab"), "change", {
      nativeEvent: { selectedSegmentIndex: 2 },
    });

    expect(mockOnValueChange).toHaveBeenCalledWith("Tab 3");
  });
});
