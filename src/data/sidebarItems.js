import {
  Users,
  LayoutDashboard,
  UserCheck,
  ShieldCheck,
  CreditCard,
  BarChart2,
  Settings,
  LogOut,
 MessageSquareMore,
} from 'lucide-react';

export const sidebarItems = [
    {
    label: 'داشبورد',
    icon: LayoutDashboard,
    path: '/ClietsList',
  },
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
    label: 'سیاست های امنیتی',
    icon: ShieldCheck,
    path: '/security',
  },
  {
    label: 'گزارش‌ها',
    icon: BarChart2,
    path: '/reports',
  },
   {
    label: 'پیام ها',
    icon: MessageSquareMore,
    path: '/massages',
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
