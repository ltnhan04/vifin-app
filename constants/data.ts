import icons from "@/constants/icons";
import { ITransactionType } from "@/types/transaction";

export const languages = [
  { label: "English", value: "en" },
  { label: "Vietnamese", value: "vn" },
];
export const units = [
  { label: "USD", value: "usd" },
  { label: "VND", value: "vnd" },
];

export const switchItem = [
  {
    id: 1,
    label: "Week",
    value: "week",
  },
  {
    id: 2,
    label: "Month",
    value: "month",
  },
];

export const chartList = [
  { icon: icons.columnChart },
  { icon: icons.pieChart },
];
export const transactionType: ITransactionType[] = [
  {
    icon: icons.expense,
    label: "Expense",
    value: "expense",
  },
  { icon: icons.dollar, label: "Income", value: "income" },
];

export const columnData = [
  { value: 500000, label: "4" },
  { value: 200000, label: "5" },
  { value: 400000, label: "6" },
  { value: 400000, label: "7" },
  { value: 500000, label: "8" },
  { value: 500000, label: "9" },
  { value: 250000, label: "10" },
];

export const pieData = [
  { value: 40, color: "#AED581", text: "40%", icon: icons.homeMaintenance },
  { value: 28, color: "#81D4FA", text: "28%", icon: icons.shopping },
  { value: 17, color: "#FFAB91", text: "17%", icon: icons.entertainment },
  { value: 10, color: "#CE93D8", text: "10%", icon: icons.giftDonations },
  { value: 5, color: "#FFF59D", text: "5%", icon: icons.medicalCheckup },
];
export const categoryColors = [
  { category: "Outgoing Transfer", color: "#FFCDD2" },
  { category: "Investment", color: "#C5E1A5" },
  { category: "Insurances", color: "#80CBC4" },
  { category: "Shopping", color: "#81D4FA" },
  { category: "Houseware", color: "#B39DDB" },
  { category: "Makeup", color: "#F48FB1" },
  { category: "Personal Items", color: "#E57373" },
  { category: "Gifts & Donations", color: "#CE93D8" },
  { category: "Pets", color: "#FFCC80" },
  { category: "Transportation", color: "#A1887F" },
  { category: "Food & Beverage", color: "#FFAB91" },
  { category: "Home Services", color: "#AED581" },
  { category: "Vehicle Maintenance", color: "#B0BEC5" },
  { category: "Health & Fitness", color: "#4DB6AC" },
  { category: "Medical Check-up", color: "#FFF59D" },
  { category: "Fitness", color: "#4FC3F7" },
  { category: "Home Maintenance", color: "#AED581" },
  { category: "Other Expense", color: "#FF8A65" },
  { category: "Uncategorized Expense", color: "#9E9E9E" },
  { category: "Family", color: "#7986CB" },
  { category: "Pay Interest", color: "#FF7043" },
  { category: "Entertainment", color: "#FFAB91" },
  { category: "Streaming Service", color: "#90CAF9" },
  { category: "Fun Money", color: "#FFCCBC" },
  { category: "Bills & Utilities", color: "#FFD54F" },
  { category: "Electricity Bill", color: "#FFEE58" },
  { category: "Other Utility Bills", color: "#FFECB3" },
  { category: "Gas Bill", color: "#A5D6A7" },
  { category: "Water Bill", color: "#4FC3F7" },
  { category: "Rentals", color: "#BCAAA4" },
  { category: "Television Bill", color: "#81C784" },
  { category: "Phone Bill", color: "#64B5F6" },
  { category: "Internet Bill", color: "#BA68C8" },
];
