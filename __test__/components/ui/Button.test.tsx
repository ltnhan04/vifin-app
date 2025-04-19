jest.useFakeTimers();

import React from "react";
import { render, fireEvent, cleanup } from "@testing-library/react-native";
import ButtonSubmit from "@/components/ui/Button";

describe("ButtonSubmit Component", () => {
  const title = "Submit";
  const background = "#123456";
  const textColor = "#FFFFFF";
  const handleOnPress = jest.fn();
  const iconMock = { uri: "dummy-icon.png" };

  afterEach(cleanup);

  it("renders correctly when not loading and not disabled", () => {
    const rendered = render(
      <ButtonSubmit
        title={title}
        isLoading={false}
        isDisabled={false}
        background={background}
        textColor={textColor}
        handleOnPress={handleOnPress}
      />
    );

    // Kiểm tra hiển thị title
    expect(rendered.getByText(title)).toBeTruthy();
    // ActivityIndicator không xuất hiện
    expect(rendered.queryByTestId("activity-indicator")).toBeNull();

    // Kiểm tra rằng button không bị disabled
    const button = rendered.getByTestId("button-submit");
    // Kiểm tra thông qua accessibilityState.disabled
    expect(button.props.accessibilityState?.disabled).toBeFalsy();

    expect(rendered.toJSON()).toMatchSnapshot();
  });

  it("renders correctly when loading: shows ActivityIndicator and disables button", () => {
    const rendered = render(
      <ButtonSubmit
        title={title}
        isLoading={true}
        isDisabled={false}
        background={background}
        textColor={textColor}
        handleOnPress={handleOnPress}
      />
    );

    // Kiểm tra hiển thị title
    expect(rendered.getByText(title)).toBeTruthy();
    // ActivityIndicator phải xuất hiện
    const activityIndicator = rendered.getByTestId("activity-indicator");
    expect(activityIndicator).toBeTruthy();

    // Button phải bị disable
    const button = rendered.getByTestId("button-submit");
    expect(button.props.accessibilityState?.disabled).toBeTruthy();
  });

  it("renders correctly when disabled: button disabled and no ActivityIndicator", () => {
    const rendered = render(
      <ButtonSubmit
        title={title}
        isLoading={false}
        isDisabled={true}
        background={background}
        textColor={textColor}
        handleOnPress={handleOnPress}
      />
    );

    // Kiểm tra hiển thị title
    expect(rendered.getByText(title)).toBeTruthy();
    // ActivityIndicator không xuất hiện
    expect(rendered.queryByTestId("activity-indicator")).toBeNull();

    // Button bị disabled
    const button = rendered.getByTestId("button-submit");
    expect(button.props.accessibilityState?.disabled).toBeTruthy();
  });

  it("renders icon if provided", () => {
    const rendered = render(
      <ButtonSubmit
        title={title}
        isLoading={false}
        isDisabled={false}
        background={background}
        textColor={textColor}
        icon={iconMock}
        handleOnPress={handleOnPress}
      />
    );

    const image = rendered.getByTestId("button-icon");
    expect(image.props.source).toEqual(iconMock);
  });

  it("calls handleOnPress when button is pressed", () => {
    const rendered = render(
      <ButtonSubmit
        title={title}
        isLoading={false}
        isDisabled={false}
        background={background}
        textColor={textColor}
        handleOnPress={handleOnPress}
      />
    );

    const button = rendered.getByTestId("button-submit");
    fireEvent.press(button);
    expect(handleOnPress).toHaveBeenCalledTimes(1);
  });
});
