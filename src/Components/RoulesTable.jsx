import React, { useEffect, useRef, useState } from "react";
import { EditIcon, Trash2, ChevronUp, ChevronDown } from "lucide-react";
import SearchBox from "./SearchBox";
import EditRoleModal from "../Modals/EditRoleModal";
import { initialRoles } from "../data/RolesTableItems";

const RolesTable = () => {
  const [rolesData, setRolesData] = useState(() => {
    const saved = localStorage.getItem("roles");
    return saved ? JSON.parse(saved) : initialRoles;
  });

  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [openMenuIndex, setOpenMenuIndex] = useState(null);
  const [selectedRole, setSelectedRole] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });

  const menuRef = useRef(null);

  useEffect(() => {
    localStorage.setItem("roles", JSON.stringify(rolesData));
  }, [rolesData]);

  useEffect(() => {
    function handleClickOutside(e) {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setOpenMenuIndex(null);
      }
    }

    if (openMenuIndex !== null) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [openMenuIndex]);

  const filteredRoles = rolesData.filter((role) =>
    role.persianName.includes(searchTerm)
  );

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredRoles.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredRoles.length / itemsPerPage);

  // --- تابع سورتینگ ---
  const handleSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });

    const sortedRoles = [...rolesData].sort((a, b) => {
      const extractNumber = (str) => {
        const match = str?.toString().match(/\d+/);
        return match ? parseInt(match[0], 10) : str?.toString().toLowerCase() ?? "";
      };

      const valA = extractNumber(a[key]);
      const valB = extractNumber(b[key]);

      if (valA < valB) return direction === "asc" ? -1 : 1;
      if (valA > valB) return direction === "asc" ? 1 : -1;
      return 0;
    });

    setRolesData(sortedRoles);
  };

  const getSortIcon = (key) => {
    if (sortConfig.key !== key) return null;
    return sortConfig.direction === "asc" ? (
      <ChevronUp className="inline w-4 h-4 ml-1" />
    ) : (
      <ChevronDown className="inline w-4 h-4 ml-1" />
    );
  };

  const handleDelete = (id) => {
    const confirmDelete = window.confirm("آیا از حذف این نقش مطمئن هستید؟");
    if (!confirmDelete) return;
    setRolesData(rolesData.filter((role) => role.id !== id));
  };

  const handleSaveEditedRole = (updatedRole) => {
    setRolesData(
      rolesData.map((role) =>
        role.id === updatedRole.id ? { ...role, ...updatedRole } : role
      )
    );
    setIsEditModalOpen(false);
  };

  return (
    <div className="p-6 bg-white rounded-xl shadow-md max-w-full">
      <h2 className="text-3xl font-semibold mb-6 text-right text-gray-800">
        نقش‌ها
      </h2>

      <div className="flex justify-between items-center mb-5 px-2">
        <label className="text-sm">
          تعداد نمایش در هر صفحه:
          <select
            value={itemsPerPage}
            onChange={(e) => {
              setItemsPerPage(Number(e.target.value));
              setCurrentPage(1);
            }}
            className="ml-2 border border-gray-300 rounded p-1 text-sm"
          >
            <option value={5}>۵</option>
            <option value={10}>۱۰</option>
            <option value={15}>۱۵</option>
            <option value={20}>۲۰</option>
          </select>
        </label>
        <SearchBox
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div dir="rtl" className="overflow-x-auto rounded-lg shadow-sm border border-gray-200">
        <table className="min-w-full text-sm text-right text-gray-800 border-collapse">
          <thead>
            <tr className="bg-gray-100 border-b border-gray-300">
              <th className="py-3 px-5 font-semibold text-gray-800 border-r border-gray-300 cursor-pointer">
                #
              </th>
              <th
                className="py-3 px-5 font-semibold text-gray-800 border-r border-gray-300 cursor-pointer hover:bg-gray-300 transition"
                onClick={() => handleSort("roleName")}
              >
                نام نقش {getSortIcon("roleName")}
              </th>
              <th
                className="py-3 px-5 font-semibold text-gray-800 border-r border-gray-300 cursor-pointer hover:bg-gray-300 transition"
                onClick={() => handleSort("persianName")}
              >
                عنوان فارسی {getSortIcon("persianName")}
              </th>
              <th
                className="py-3 px-5 font-semibold text-gray-800 border-r border-gray-300 cursor-pointer hover:bg-gray-300 transition"
                onClick={() => handleSort("description")}
              >
                توضیحات {getSortIcon("description")}
              </th>
              <th
                className="py-3 px-5 font-semibold text-gray-800 border-r border-gray-300 cursor-pointer hover:bg-gray-300 transition"
                onClick={() => handleSort("status")}
              >
                وضعیت {getSortIcon("status")}
              </th>
              <th className="py-3 px-5 font-semibold text-gray-800">عملیات</th>
            </tr>
          </thead>

          <tbody>
            {currentItems.length === 0 ? (
              <tr>
                <td colSpan="6" className="text-center py-6 text-gray-600">
                  هیچ داده‌ای یافت نشد
                </td>
              </tr>
            ) : (
              currentItems.map((role, index) => (
                <tr
                  key={role.id}
                  className="border-b border-gray-200 hover:bg-blue-50 transition-colors duration-200"
                >
                  <td className="py-3 px-5 border-r border-gray-200">
                    {indexOfFirstItem + index + 1}
                  </td>
                  <td className="py-3 px-5 border-r border-gray-200">{role.roleName}</td>
                  <td className="py-3 px-5 border-r border-gray-200">{role.persianName}</td>
                  <td className="py-3 px-5 border-r border-gray-200">{role.description}</td>
                  <td
                    className={`py-3 px-5 border-r border-gray-200 ${
                      role.status === "فعال" ? "text-green-600" : "text-gray-500"
                    }`}
                  >
                    {role.status}
                  </td>
                  <td
                    ref={openMenuIndex === index ? menuRef : null}
                    className="py-3 px-5 border-r border-gray-200 text-center"
                  >
                    <button
                      className="text-white px-3 py-1 rounded text-sm bg-yellow-500 hover:bg-yellow-600 transition mx-1"
                      onClick={() => {
                        setSelectedRole(role);
                        setIsEditModalOpen(true);
                      }}
                    >
                      ویرایش
                    </button>
                    <button
                      className="text-white px-3 py-1 rounded text-sm bg-red-700 hover:bg-red-800 transition mx-1"
                      onClick={() => handleDelete(role.id)}
                    >
                      حذف
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <div className="flex justify-center mt-6 gap-2">
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          className="px-3 py-1 bg-indigo-200 rounded hover:bg-indigo-300 disabled:opacity-50"
        >
          قبلی
        </button>
        {[...Array(totalPages)].map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrentPage(i + 1)}
            className={`px-3 py-1 rounded ${
              currentPage === i + 1
                ? "bg-indigo-500 text-white"
                : "bg-indigo-100 hover:bg-indigo-200"
            }`}
          >
            {i + 1}
          </button>
        ))}
        <button
          onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
          disabled={currentPage === totalPages}
          className="px-3 py-1 bg-indigo-200 rounded hover:bg-indigo-300 disabled:opacity-50"
        >
          بعدی
        </button>
      </div>

      <EditRoleModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        roleData={selectedRole}
        onSave={handleSaveEditedRole}
      />
    </div>
  );
};

export default RolesTable;
