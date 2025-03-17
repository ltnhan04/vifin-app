import icons from "@/constants/icons";
import { CategoryType } from "@/types/category";
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

export const categories: CategoryType[] = [
  {
    label: "Food & Beverage",
    value: "food-beverage",
    parentIcon: icons.foodBeverage,
  },
  {
    label: "Bills & Utilities",
    value: "bill-utilities",
    parentIcon: icons.billUtils,
    children: [
      { label: "Rentals", value: "rentals", icon: icons.rentals },
      { label: "Water Bill", value: "water-bill", icon: icons.waterBill },
      { label: "Phone Bill", value: "phone-bill", icon: icons.phoneBill },
      {
        label: "Electricity Bill",
        value: "electricity-bill",
        icon: icons.electricityBill,
      },
      { label: "Gas Bill", value: "gas-bill", icon: icons.gasBill },
      {
        label: "Television Bill",
        value: "television-bill",
        icon: icons.television,
      },
      {
        label: "Internet Bill",
        value: "internet-bill",
        icon: icons.internetBill,
      },
      {
        label: "Other Utility Bills",
        value: "other-utility-bills",
        icon: icons.otherUtils,
      },
    ],
  },
  {
    label: "Shopping",
    value: "shopping",
    parentIcon: icons.shopping,
    children: [
      {
        label: "Personal Items",
        value: "personal-items",
        icon: icons.personalItem,
      },
      { label: "Houseware", value: "houseware", icon: icons.houseService },
      { label: "Makeup", value: "makeup", icon: icons.makeup },
    ],
  },
  {
    label: "Family",
    value: "family",
    parentIcon: icons.family,
  },
  {
    label: "Home Maintenance",
    value: "home-maintenance",
    parentIcon: icons.homeMaintenance,
  },
  {
    label: "Home Services",
    value: "home-services",
    parentIcon: icons.homeService,
  },
  {
    label: "Pets",
    value: "pets",
    parentIcon: icons.pets,
  },
  {
    label: "Transportation",
    value: "transportation",
    parentIcon: icons.transportation,
  },
  {
    label: "Vehicle Maintenance",
    value: "vehicle-maintenance",
    parentIcon: icons.vehicalMaintenance,
  },
  {
    label: "Health & Fitness",
    value: "health-fitness",
    parentIcon: icons.healthFitness,
    children: [
      {
        label: "Medical Check-up",
        value: "medical-checkup",
        icon: icons.medicalCheckup,
      },
      { label: "Fitness", value: "fitness", icon: icons.fitness },
    ],
  },
  {
    label: "Education",
    value: "education",
    parentIcon: icons.education,
  },
  {
    label: "Entertainment",
    value: "entertainment",
    parentIcon: icons.entertainment,
    children: [
      {
        label: "Streaming Service",
        value: "streaming-service",
        icon: icons.streamingService,
      },
      { label: "Fun Money", value: "fun-money", icon: icons.funMoney },
    ],
  },
  {
    label: "Gifts & Donations",
    value: "gifts-donations",
    parentIcon: icons.giftDonations,
  },
  {
    label: "Insurances",
    value: "insurances",
    parentIcon: icons.insurance,
  },
  {
    label: "Investment",
    value: "investment",
    parentIcon: icons.investment,
  },
  {
    label: "Other Expense",
    value: "other-expense",
    parentIcon: icons.otherExpense,
  },
  {
    label: "Outgoing Transfer",
    value: "outgoing-transfer",
    parentIcon: icons.outgoingTransfer,
  },
  {
    label: "Pay Interest",
    value: "pay-interest",
    parentIcon: icons.payInterest,
  },
  {
    label: "Uncategorized Expense",
    value: "uncategorized-expense",
    parentIcon: icons.uncategorizedExpense,
  },
];

export const walletData = [
  {
    icon: icons.walletIcon,
    label: "Momo Wallet",
    value: 500000,
  },
  {
    icon: icons.walletIcon,
    label: "Meme Wallet",
    value: 200000,
  },
];

export const transactionType: ITransactionType[] = [
  {
    icon: icons.expense,
    label: "Expense",
    value: "expense",
  },
  { icon: icons.dollar, label: "Income", value: "income" },
];

export const transactionsData = [
  {
    date: "2",
    day: "Saturday",
    monthYear: "Feb 2025",
    totalAmount: -200000,
    transactions: [
      {
        id: 1,
        category: "Food & Beverage",
        amount: 75000,
        icon: icons.foodBeverage,
      },
      {
        id: 2,
        category: "Transportation",
        amount: 55000,
        icon: icons.transportation,
      },
      {
        id: 3,
        category: "Shopping",
        amount: 70000,
        icon: icons.shopping,
      },
    ],
  },
];

export const chartList = [
  { icon: icons.columnChart },
  { icon: icons.pieChart },
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
