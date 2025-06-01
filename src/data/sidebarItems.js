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
    path: '/ClietsList',
  },
  {
    label: 'لیست نقش ها',
    icon: UserCheck,
    path: '/RolesList',
  },
  {
    label: 'مدیریت کلاینت',
    icon: CreditCard,
    path: '/Clientsinformation',
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
