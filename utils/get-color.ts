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

export const getBarColor = (transactionType: string) => {
  const barColor = transactionType === "income" ? "#4CAF50" : "#F44336";
  const gradientColor = transactionType === "income" ? "#2E7D32" : "#D32F2F";
  return { barColor, gradientColor };
};
