import React from "react";
import Navbar from "../Components/Navbar";
import Sidebar from "../Components/Sidebar";

const AdminLayout = () => {
  return (
    <div className="flex bg-[#eff4f7] ">
      <div className="flex-1 flex flex-col">
        <Navbar />
        <div className="flex-1 p-4">
          <p>content</p>
        </div>
      </div>
      <Sidebar />
    </div>
  );
};

export default AdminLayout;
