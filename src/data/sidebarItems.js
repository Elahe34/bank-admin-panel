// src/data/sidebarItems.js
import {
  Home,
  Users,
  Banknote,
  CreditCard,
  BarChart2,
  Settings,
  LogOut,
} from "lucide-react";

export const sidebarItems = [
  {
    label: "داشبورد",
    icon: Home,
    path: "/dashboard",
  },
  {
    label: "مشتریان",
    icon: Users,
    path: "/customers",
  },
  {
    label: "تراکنش‌ها",
    icon: Banknote,
    path: "/transactions",
  },
  {
    label: "کارت‌ها",
    icon: CreditCard,
    path: "/cards",
  },
  {
    label: "گزارش‌ها",
    icon: BarChart2,
    path: "/reports",
  },
  {
    label: "تنظیمات",
    icon: Settings,
    path: "/settings",
  },
  {
    label: "خروج",
    icon: LogOut,
    path: "/logout",
  },
];
