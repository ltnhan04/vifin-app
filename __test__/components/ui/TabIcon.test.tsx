import React from "react";
import { render } from "@testing-library/react-native";
import TabIcon from "@/components/ui/TabIcon";
import Icon from "react-native-vector-icons/Ionicons";

describe("TabIcon Component", () => {
  it("renders correctly when focused is true", () => {
    const { getByText, UNSAFE_getByType } = render(
      <TabIcon focused={true} icon="home" title="Home" />
    );

    // Kiểm tra Text hiển thị tiêu đề
    expect(getByText("Home")).toBeTruthy();

    // Lấy Icon và kiểm tra các prop: name và color
    const iconElement = UNSAFE_getByType(Icon);
    expect(iconElement.props.name).toBe("home");
    expect(iconElement.props.color).toBe("#6BBFFF");
  });

  it("renders correctly when focused is false", () => {
    const { getByText, UNSAFE_getByType } = render(
      <TabIcon focused={false} icon="settings" title="Settings" />
    );

    // Kiểm tra Text hiển thị tiêu đề
    expect(getByText("Settings")).toBeTruthy();

    // Lấy Icon và kiểm tra các prop: name và color
    const iconElement = UNSAFE_getByType(Icon);
    expect(iconElement.props.name).toBe("settings");
    expect(iconElement.props.color).toBe("#F3F4F6");
  });
});
