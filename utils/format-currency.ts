type Currency = "VND" | "USD";
export const formatCurrency = (amount: number, currency: Currency) => {
  let locate;
  switch (currency) {
    case "VND":
      locate = "vi-VN";
      break;
    case "USD":
      locate = "en-US";
      break;
    default:
      locate = "vi-VN";
  }

  return new Intl.NumberFormat(locate, {
    style: "currency",
    currency: currency,
    minimumFractionDigits: currency === "VND" ? 0 : 2,
  }).format(amount);
};

export const formatValue = (value: number): string => {
  if (value >= 1000000) {
    return `${(value / 1000000).toFixed(1)}M`;
  } else if (value >= 1000) {
    return `${(value / 1000).toFixed(1)}K`;
  }
  return value.toString();
};
