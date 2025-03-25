jest.useFakeTimers();

import React from "react";
import { Animated, TouchableOpacity } from "react-native";
import { render, act } from "@testing-library/react-native";
import SwitchChart from "@/components/ui/SwitchChart";

// Mock chartList từ "@/constants/data" để có 3 phần tử
jest.mock('@/constants/data', () => ({
  chartList: [
    { icon: { uri: "icon1" } },
    { icon: { uri: "icon2" } },
    { icon: { uri: "icon3" } },
  ],
}));

describe("SwitchChart Component", () => {
  const handleSelectedChart = jest.fn();

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("renders the correct number of chart options", () => {
    const { UNSAFE_getAllByType } = render(
      <SwitchChart handleSelectedChart={handleSelectedChart} />
    );
    const options = UNSAFE_getAllByType(TouchableOpacity);
    expect(options.length).toBe(3);
  });

  it("calls handleSelectedChart with correct index when an option is pressed", () => {
    const { UNSAFE_getAllByType } = render(
      <SwitchChart handleSelectedChart={handleSelectedChart} />
    );
    const options = UNSAFE_getAllByType(TouchableOpacity);
    // Bao bọc trong act để đảm bảo các cập nhật state được xử lý đúng
    act(() => {
      options[1].props.onPress();
    });
    expect(handleSelectedChart).toHaveBeenCalledWith(1);
  });

  it("animates the indicator when an option is selected", () => {
    const { UNSAFE_getAllByType } = render(
      <SwitchChart handleSelectedChart={handleSelectedChart} />
    );
    
    // Lấy tất cả các Animated.View
    const animatedViews = UNSAFE_getAllByType(Animated.View);
    // Tìm indicator bằng cách lọc các Animated.View có width === 50 và backgroundColor === "white"
    const indicator = animatedViews.find((view) => {
      const style = Array.isArray(view.props.style)
        ? Object.assign({}, ...view.props.style)
        : view.props.style;
      return style && style.width === 50 && style.backgroundColor === "white";
    });
    expect(indicator).toBeTruthy();
    expect(indicator?.props.style.transform).toBeDefined();

    // Nhấn vào option thứ 3 (index 2) và chạy timer trong act
    const options = UNSAFE_getAllByType(TouchableOpacity);
    act(() => {
      options[2].props.onPress();
      jest.runAllTimers();
    });

    // Lấy lại danh sách Animated.View và tìm lại indicator
    const updatedAnimatedViews = UNSAFE_getAllByType(Animated.View);
    const updatedIndicator = updatedAnimatedViews.find((view) => {
      const style = Array.isArray(view.props.style)
        ? Object.assign({}, ...view.props.style)
        : view.props.style;
      return style && style.width === 50 && style.backgroundColor === "white";
    });
    expect(updatedIndicator).toBeTruthy();
    expect(updatedIndicator?.props.style.transform).toBeDefined();
  });
});
