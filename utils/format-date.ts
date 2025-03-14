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

export const formatDueDate = (dueDate: DueDate): string => {
  const date = new Date(dueDate._seconds * 1000);
  return date.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
};
