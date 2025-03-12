export const formatDate = (date: Date | null) =>
  date
    ? date.toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
        timeZone: "Asia/Ho_Chi_Minh",
      })
    : "Select Date";
export const adjustToHoChiMinhTime = (date: Date) => {
  return new Date(
    date.toLocaleString("en-US", { timeZone: "Asia/Ho_Chi_Minh" })
  );
};
