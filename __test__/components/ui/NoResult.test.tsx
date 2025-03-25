import React from "react";
import { render } from "@testing-library/react-native";
import { Image } from "react-native";
import NoResults from "@/components/ui/NoResult";

// Mock module images để kiểm tra thuộc tính source của Image
jest.mock("@/constants/images", () => ({
  noResult: { uri: "dummy-no-result-image" },
}));

describe("NoResults Component", () => {
  it("renders image and texts correctly", () => {
    const { getByText, UNSAFE_getByType } = render(<NoResults />);
    
    // Kiểm tra các text được render
    expect(getByText("No Result")).toBeTruthy();
    expect(getByText("We could not find any result")).toBeTruthy();
    
    // Lấy component Image và kiểm tra thuộc tính source
    const image = UNSAFE_getByType(Image);
    expect(image.props.source).toEqual({ uri: "dummy-no-result-image" });
  });
});
