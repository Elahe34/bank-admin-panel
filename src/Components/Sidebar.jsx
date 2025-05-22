import React from 'react';
import { sidebarItems } from '../data/sidebarItems';

const Sidebar = () => {
  return (
    <div className="w-60 h-screen bg-[#223369] dark:bg-[#181B23] text-blue-50 p-2 md:p-4 shadow-md dark:shadow-xl dark:drop-shadow-[0_4px_3px_rgba(255,255,255,0.5)] transition-all ease-in-out duration-300">
      <div className="flex justify-between items-center">
        <span className="text-xs md:text-base">Admin</span>
        <img
          className="w-10 h-10 md:w-16 md:h-16"
          src="../../public/assets/Logo.png"
          alt="Logo"
        />
      </div>

      <ul className="mt-8 md:mt-12">
        {sidebarItems.map((item, index) => {
          const { label } = item;
          const Icon = item.icon;
          return (
            <li
              key={index}
              className="flex items-center justify-around mt-7 px-2 w-full h-12 hover:text-amber-700 hover:scale-110 cursor-pointer transition-all duration-200"
            >
              <Icon className="hidden md:inline w-5 h-5" />
              <span className="text-sm md:text-md">{label}</span>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Sidebar;
