import React, { useState } from 'react';
import Navbar from '../Components/Navbar';
import Sidebar from '../Components/Sidebar';
import ClientsTable from '../Components/ClientsTable';
import UserList from '../Components/UserList';

const AdminLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex bg-white dark:bg-black dark:text-blue-50 text-gray-900 min-h-screen">
      <div
        className={`flex-1 flex flex-col transition-all duration-300 ${
          isSidebarOpen ? 'pr-60' : 'pr-0'
        }`}
      >
        <Navbar
          isSidebarOpen={isSidebarOpen}
          setIsSidebarOpen={setIsSidebarOpen}
        />
        <div className="flex-1 p-4 pt-28 min-h-screen">
          <ClientsTable
            isSidebarOpen={isSidebarOpen}
            setIsSidebarOpen={setIsSidebarOpen}
          />
          <UserList/>
        </div>
      </div>
      <div
        className={`fixed top-16 right-0 h-[calc(100vh-4rem)] w-60 bg-white dark:bg-[#222633] shadow-lg overflow-y-auto transition-transform duration-400 ease-in-out ${
          isSidebarOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <Sidebar />
      </div>
    </div>
  );
};

export default AdminLayout;
