import React from "react";
import { ShieldCheck, KeyRound, Lock, History, Network, Timer, Eye, Smartphone, Link } from "lucide-react";

const SecurityPolicies = () => {
  const securityCards = [
    { title: "احراز هویت دو مرحله‌ای", icon: <ShieldCheck />, color: "bg-blue-500", linkColor: "bg-blue-600" },
    { title: "تنظیمات رمز عبور", icon: <KeyRound />, color: "bg-green-500", linkColor: "bg-green-600" },
    { title: "مدیریت نقش‌ها و دسترسی‌ها", icon: <Lock />, color: "bg-yellow-400", linkColor: "bg-yellow-500" },
    { title: "لاگ‌های امنیتی", icon: <History />, color: "bg-red-500", linkColor: "bg-red-600" },
    { title: "محدودیت IP", icon: <Network />, color: "bg-purple-500", linkColor: "bg-purple-600" },
    { title: "مدت زمان نشست", icon: <Timer />, color: "bg-teal-500", linkColor: "bg-teal-600" },
    { title: "مدیریت نشست‌های فعال", icon: <Eye />, color: "bg-pink-500", linkColor: "bg-pink-600" },
    { title: "مدیریت دستگاه‌ها", icon: <Smartphone />, color: "bg-orange-500", linkColor: "bg-orange-600" },
  ];

  return (
    <div className="mt-6">
      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 transition-all duration-300 ease-in-out">
        {securityCards.map((card, index) => (
          <div
            key={index}
            className={`group flex flex-col justify-between rounded-xl ${card.color} text-white transition-all duration-300 ease-in-out hover:shadow-lg min-h-[180px]`}
          >
          
            <div className="flex justify-end mt-3 mr-2">
              {React.cloneElement(card.icon, { className: "w-14 h-14 text-white opacity-80 transition-transform duration-300 group-hover:scale-125" })}
            </div>

  
            <div className="flex flex-1 items-start justify-center mt-4">
              <h1 className="text-xl font-semibold text-center">{card.title}</h1>
            </div>
            
            <div className={`flex h-8 items-center justify-center rounded-b-xl ${card.linkColor} text-xs cursor-pointer hover:opacity-90`}>
              <Link className="ml-1 w-4 h-4" />
              <span>اطلاعات بیشتر</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SecurityPolicies;
