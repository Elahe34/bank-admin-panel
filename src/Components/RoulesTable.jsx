import React, { useEffect, useRef, useState } from "react";
import { EditIcon, EllipsisVertical, Trash2 } from "lucide-react";
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

  const handleDelete = (id) => {
    const confirmDelete = window.confirm("آیا از حذف این نقش مطمئن هستید؟");
    if (!confirmDelete) return;
    const updated = rolesData.filter((role) => role.id !== id);
    setRolesData(updated);
  };

  const handleSaveEditedRole = (updatedRole) => {
    const updated = rolesData.map((role) =>
      role.id === updatedRole.id ? { ...role, ...updatedRole } : role
    );
    setRolesData(updated);
    setIsEditModalOpen(false);
  };

  return (
    <div className="w-[90%] mx-auto">
      <div className="flex justify-between items-center mb-4 px-4">
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

      <table
        dir="rtl"
        className="w-full border-collapse text-center rounded overflow-hidden shadow-xl backdrop-blur-md bg-white/50"
      >
        <thead className="bg-indigo-200/35 text-gray-800 font-semibold">
          <tr>
            <th className="p-3">ردیف</th>
            <th className="p-3">نام نقش</th>
            <th className="p-3">عنوان فارسی</th>
            <th className="p-3">توضیحات</th>
            <th className="p-3">وضعیت</th>
            <th className="p-3">عملیات</th>
          </tr>
        </thead>
        <tbody>
          {currentItems.map((role, index) => (
            <tr
              key={role.id}
              className="even:bg-white/30 odd:bg-indigo-100/20 hover:bg-indigo-200/30 transition dark:text-gray-950"
            >
              <td className="p-2 text-sm">{indexOfFirstItem + index + 1}</td>
              <td className="p-2 text-sm">{role.roleName}</td>
              <td className="p-2 text-sm">{role.persianName}</td>
              <td className="p-2 text-sm">{role.description}</td>
              <td
                className={`p-2 text-sm ${
                  role.status === "فعال" ? "text-green-600" : "text-gray-500"
                }`}
              >
                {role.status}
              </td>
              <td
                ref={openMenuIndex === index ? menuRef : null}
                className="p-2 flex justify-center items-center"
              >
                  <button
                  className="mx-2 text-sm hover:text-red-600 transition"
                  onClick={() => handleDelete(role.id)}
                >
                  <Trash2 color="#EF4444" size={17} />
                </button>
                <button
                  className="mx-2 text-sm hover:text-green-600 transition"
                  onClick={() => {
                    setSelectedRole(role);
                    setIsEditModalOpen(true);
                  }}
                >
                  <EditIcon color="#3B82F6" size={17} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

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
          onClick={() =>
            setCurrentPage((prev) => Math.min(prev + 1, totalPages))
          }
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
