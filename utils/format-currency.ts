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
