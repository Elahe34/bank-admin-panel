import React, { useState, useRef } from "react";
import Navbar from "../Components/Navbar";
import Sidebar from "../Components/Sidebar";
import { Outlet } from "react-router-dom";

const AdminLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true); 
  const sidebarRef = useRef(null);

  return (
    <div className="flex bg-white dark:bg-black dark:text-blue-50 text-gray-900 min-h-screen">
      {/* بخش سایدبار */}
      <div
        ref={sidebarRef}
        className={`fixed top-16 right-0 h-[calc(100vh-4rem)] bg-white dark:bg-[#222633] shadow-lg overflow-y-auto transition-all duration-300 ease-in-out 
          ${isSidebarOpen ? "w-60" : "w-20"}
        `}
      >
        <Sidebar isSidebarOpen={isSidebarOpen} />
      </div>

      {/* بخش اصلی */}
      <div
        className={`flex-1 flex flex-col transition-all duration-300 ${
          isSidebarOpen ? "pr-60" : "pr-20"
        }`}
      >
        <Navbar
          isSidebarOpen={isSidebarOpen}
          setIsSidebarOpen={setIsSidebarOpen}
        />
        <div className="flex-1 p-4 pt-28 min-h-screen">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
