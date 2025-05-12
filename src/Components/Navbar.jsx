import React from "react";
import { BellRing, Search, Mail, Cog, Sun, Moon } from "lucide-react";

const Navbar = () => {
  return (
    <div className="h-16 w-full bg-[#f5f4f4] shadow-md flex items-center justify-between px-6">
      <div className="flex items-center gap-3">
        <BellRing className="text-orange-500 w-5 h-5 hover:scale-110 transition cursor-pointer" />
        <Search className="text-green-600 w-5 h-5 hover:scale-110 transition cursor-pointer" />
        <Mail className="text-blue-500 w-5 h-5 hover:scale-110 transition cursor-pointer" />
        <Cog className="text-gray-700 w-5 h-5 hover:scale-110 transition cursor-pointer" />
        <Sun className="text-yellow-500 w-5 h-5 hover:rotate-12 transition cursor-pointer" />
        <Moon className="text-purple-500 w-5 h-5 hover:rotate-12 transition cursor-pointer" />
      </div>
      <div className="text-2xl font-semibold text-gray-800">🏦 Bank Panel</div>
    </div>
  );
};

export default Navbar;
