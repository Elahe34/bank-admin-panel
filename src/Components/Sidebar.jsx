import React from "react";
import { sidebarItems } from "../data/sidebarItems";
import { Link } from "react-router-dom";

const Sidebar = ({ isSidebarOpen }) => {
  return (
    <div
      className={`h-full bg-[#223369] dark:bg-[#181B23] text-blue-50 transition-all duration-300 flex flex-col items-center ${
        isSidebarOpen ? "w-60 px-4 py-4" : "w-20 px-2 py-4"
      }`}
    >
      {/* بالای سایدبار */}
      <div
        className={`flex items-center justify-between w-full border-b border-blue-800 pb-3 mb-4 transition-all duration-300 ${
          isSidebarOpen ? "px-0" : "flex-col"
        }`}
      >
        <span
          className={`text-sm md:text-lg font-semibold transition-all duration-300 ${
            isSidebarOpen ? "block" : "hidden"
          }`}
        >
          ادمین
        </span>
        <img
          className="w-10 h-10 md:w-12 md:h-12 rounded-full"
          src="/assets/Logo.png"
          alt="Logo"
        />
      </div>

      {/* آیتم‌ها */}
      <ul className="mt-2 space-y-3 w-full">
        {sidebarItems.map((item, index) => {
          const { label, path, icon: Icon } = item;
          return (
            <li key={index}>
              <Link
                to={path}
                className={`flex items-center rounded-lg hover:bg-blue-600 hover:text-white transition-all duration-200 ${
                  isSidebarOpen
                    ? "justify-start gap-3 px-3 py-3 flex-row-reverse"
                    : "justify-center py-3"
                }`}
              >
                <Icon className="w-5 h-5 min-w-[20px]" />
                {isSidebarOpen && (
                  <span
                    className="text-sm md:text-base block text-right truncate"
                    title={label}
                  >
                    {label}
                  </span>
                )}
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Sidebar;
