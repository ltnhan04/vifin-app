import icons from "@/constants/icons";
import { CategoryType } from "@/types/category";
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
