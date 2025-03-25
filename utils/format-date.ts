import { DueDate } from "@/types/budget";

export const formatDate = (date: Date | null) =>
  date
    ? date.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      timeZone: "Asia/Ho_Chi_Minh",
    })
    : "Select Date";

export const formatDueDate = (dueDate: { _seconds?: number; _nanoseconds?: number }) => {
  if (!dueDate || typeof dueDate._seconds !== "number") return "No due date";

  const date = new Date(dueDate._seconds * 1000);
  return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
};


export const formatChartDate = (
  date: Date,
  type: "week" | "month" | "year"
) => {
  const options: Intl.DateTimeFormatOptions = {
    timeZone: "Asia/Ho_Chi_Minh",
  };

  switch (type) {
    case "week":
      return date.toLocaleDateString("en-GB", {
        ...options,
        day: "2-digit",
        month: "short",
      });
    case "month":
      return date.toLocaleDateString("en-GB", {
        ...options,
        month: "short",
        year: "numeric",
      });
    case "year":
      return date.toLocaleDateString("en-GB", {
        ...options,
        year: "numeric",
      });
    default:
      return date.toLocaleDateString("en-GB", {
        ...options,
        day: "2-digit",
        month: "short",
        year: "numeric",
      });
  }
};
