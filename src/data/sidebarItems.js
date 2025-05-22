import {
  Users,
  UserCheck,
  ShieldCheck,
  CreditCard,
  BarChart2,
  Settings,
  LogOut,
} from 'lucide-react';

export const sidebarItems = [
  {
    label: 'لیست کاربران',
    icon: Users,
    path: '/dashboard',
  },
  {
    label: 'لیست نقش ها',
    icon: UserCheck,
    path: '/customers',
  },
  {
    label: 'مدیریت کلاینت',
    icon: CreditCard,
    path: '/transactions',
  },
  {
    label: 'مدیریت سیاست های امنیتی',
    icon: ShieldCheck,
    path: '/cards',
  },
  {
    label: 'گزارش‌ها',
    icon: BarChart2,
    path: '/reports',
  },
  {
    label: 'تنظیمات',
    icon: Settings,
    path: '/settings',
  },
  {
    label: 'خروج',
    icon: LogOut,
    path: '/logout',
  },
];
