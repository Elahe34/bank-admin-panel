import React from "react";
import { sidebarItems } from "../data/sidebarItems";
import { Menu } from "lucide-react";

const Sidebar = () => {
  return (
    <div className="w-56 h-screen md:w-48 bg-[#223369] text-white p-4 ">
      <div>
        <Menu />
      </div>
      <ul className="mt-12">
        {sidebarItems.map((item, index) => {
          const { label } = item;
          const Icon = item.icon;
          return (
            <li
              className="flex mt-11 px-2 w-full h-12 hover:text-amber-700 hover:scale-110 justify-between items-center cursor-pointer"
              key={index}
            >
              <Icon className="w-5 h-5" />
              <span className="text-md">{label}</span>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Sidebar;
