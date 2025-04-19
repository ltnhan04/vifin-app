import React from 'react';
import { render } from '@testing-library/react-native';
import Badge from '@/components/ui/Badge';
import { getColorForValue, lightenColor } from '@/utils/get-color';

describe('Badge Component', () => {
  it('renders correctly with computed background color', () => {
    const category = "Sample Category";
    // Giả sử giá trị nào đó để tính màu, ví dụ value = 60
    const value = 60;
    const baseColor = getColorForValue(value); // Dành cho value = 60, sẽ trả về "#F59E0B"
    const computedBgColor = lightenColor(baseColor, 30); // Tính màu sáng hơn, ví dụ "#FACC15" (có thể khác tùy thuộc vào tinycolor)

    const { getByTestId, getByText } = render(
      <Badge category={category} bgColor={computedBgColor} />
    );

    // Kiểm tra Text hiển thị đúng nội dung category
    expect(getByText(category)).toBeTruthy();

    // Lấy View qua testID
    const viewElement = getByTestId("badge-view");
    expect(viewElement).toBeTruthy();

    // Kiểm tra style của View chứa backgroundColor đúng theo computedBgColor
    expect(viewElement.props.style).toEqual(
      expect.objectContaining({ backgroundColor: computedBgColor })
    );
  });
});
