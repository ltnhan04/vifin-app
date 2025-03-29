import React from "react";
import { render } from "@testing-library/react-native";
import { Image } from "react-native";
import MyWalletItem from "@/components/ui/MyWalletItem";
import { formatCurrency } from "@/utils/format-currency";

// Mock formatCurrency to control output format
jest.mock("@/utils/format-currency", () => ({
  formatCurrency: jest.fn((price, currency) => `${price} ${currency}`),
}));

describe("MyWalletItem", () => {
  const name = "My Wallet";
  const price = 5000;
  const symbol = "https://dummyimage.com/wallet-icon.png";

  it("renders the wallet item with correct name and formatted price", () => {
    const { getByText } = render(
      <MyWalletItem name={name} price={price} symbol={symbol} />
    );

    // Check that the name is displayed
    expect(getByText(name)).toBeTruthy();

    // Check that the formatted price is displayed
    expect(getByText("5000 VND")).toBeTruthy();
  });

  it("calls formatCurrency with correct arguments", () => {
    render(<MyWalletItem name="Test Wallet" price={price} symbol={symbol} />);
    expect(formatCurrency).toHaveBeenCalledWith(price, "VND");
  });

  it("renders the wallet icon correctly", () => {
    const { UNSAFE_getByType } = render(
      <MyWalletItem name={name} price={price} symbol={symbol} />
    );
    const image = UNSAFE_getByType(Image);
    expect(image.props.source).toEqual({ uri: symbol });
  });
});
