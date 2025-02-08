import tinycolor from "tinycolor2";

export const getColorForValue = (value: number) => {
  if (value <= 50) {
    return "#22C55E";
  } else if (value <= 75) {
    return "#F59E0B";
  } else {
    return "#EF4444";
  }
};

export const lightenColor = (color: string, amount = 30) => {
  return tinycolor(color).lighten(amount).toHexString();
};
