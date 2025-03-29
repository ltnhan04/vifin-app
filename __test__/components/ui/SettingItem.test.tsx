import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import { Switch } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import SettingItem from "@/components/ui/SettingItem";
import Dropdown from "@/components/ui/Dropdown";

describe("SettingItem Component", () => {
  it("renders title and icon correctly when not logout", () => {
    const { getByText, UNSAFE_getAllByType } = render(
      <SettingItem title="Profile" icon="person" />
    );
    // Kiểm tra tiêu đề
    expect(getByText("Profile")).toBeTruthy();
    // Lấy tất cả các Icon được render
    const icons = UNSAFE_getAllByType(Icon);
    expect(icons[0].props.name).toBe("person");
    expect(icons[0].props.color).toBe("#fff");
  });

  it("renders icon with logout styling when isLogout is true", () => {
    const { getByText, UNSAFE_getAllByType } = render(
      <SettingItem title="Logout" icon="log-out" isLogout={true} />
    );
    expect(getByText("Logout")).toBeTruthy();
    const icons = UNSAFE_getAllByType(Icon);
    // Khi isLogout là true, icon chính sẽ có màu "#D15757"
    expect(icons[0].props.name).toBe("log-out");
    expect(icons[0].props.color).toBe("#D15757");
  });

  it("renders arrow icon when showArrow is true", () => {
    const { UNSAFE_getAllByType } = render(
      <SettingItem title="Settings" icon="settings" showArrow={true} />
    );
    const icons = UNSAFE_getAllByType(Icon);
    // Khi showArrow là true, ta có ít nhất 2 icon: icon chính và icon mũi tên
    expect(icons.length).toBeGreaterThanOrEqual(2);
    // Icon thứ hai (index 1) là mũi tên, với tên "chevron-forward"
    expect(icons[1].props.name).toBe("chevron-forward");
  });

  it("renders a switch and toggles its value when showSwitch is true", () => {
    const { UNSAFE_getByType } = render(
      <SettingItem title="Switch Option" icon="toggle" showSwitch={true} />
    );
    const switchComponent = UNSAFE_getByType(Switch);
    // Ban đầu, switch có value là false
    expect(switchComponent.props.value).toBe(false);
    fireEvent(switchComponent, "valueChange", true);
    // Dùng lại UNSAFE_getByType để xác nhận giá trị đã được cập nhật
    expect(UNSAFE_getByType(Switch).props.value).toBe(true);
  });

  it("renders Dropdown when showOptions is 'currency_unit'", () => {
    const { UNSAFE_getByType } = render(
      <SettingItem title="Currency" icon="cash" showOptions="currency_unit" />
    );
    const dropdown = UNSAFE_getByType(Dropdown);
    expect(dropdown).toBeTruthy();
    // Kiểm tra placeholder của Dropdown
    expect(dropdown.props.placeholder).toBe("USD");
  });

  it("renders Dropdown when showOptions is 'languages'", () => {
    const { UNSAFE_getByType } = render(
      <SettingItem title="Language" icon="language" showOptions="languages" />
    );
    const dropdown = UNSAFE_getByType(Dropdown);
    expect(dropdown).toBeTruthy();
    expect(dropdown.props.placeholder).toBe("English");
  });
});
