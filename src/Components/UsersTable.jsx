import React, { useState, useEffect, useRef } from "react";
import { TableItems } from "../data/TableItems";
import { EditIcon, EllipsisVertical, Trash2, ChevronUp, ChevronDown } from "lucide-react";
import SearchBox from "./SearchBox";
import EditClaimModal from "../Modals/EditClaimModal";

const UsersTable = ({ isSidebarOpen, setIsSidebarOpen }) => {
  const [openMenuIndex, setOpenMenuIndex] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [tableData, setTableData] = useState(() => {
    const savedData = localStorage.getItem("claims");
    return savedData ? JSON.parse(savedData) : TableItems;
  });
  const menuRef = useRef(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedClaim, setSelectedClaim] = useState(null);

  // --- سورتینگ ---
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });

  const handleSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });

    const sortedData = [...tableData].sort((a, b) => {
      const valA = a[key]?.toString().toLowerCase() ?? "";
      const valB = b[key]?.toString().toLowerCase() ?? "";
      if (valA < valB) return direction === "asc" ? -1 : 1;
      if (valA > valB) return direction === "asc" ? 1 : -1;
      return 0;
    });
    setTableData(sortedData);
  };

  const getSortIcon = (key) => {
    if (sortConfig.key !== key) return null;
    return sortConfig.direction === "asc" ? (
      <ChevronUp className="inline w-4 h-4 ml-1" />
    ) : (
      <ChevronDown className="inline w-4 h-4 ml-1" />
    );
  };

  useEffect(() => {
    localStorage.setItem("claims", JSON.stringify(tableData));
  }, [tableData]);

  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setOpenMenuIndex(null);
      }
    }

    if (openMenuIndex !== null) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [openMenuIndex]);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = tableData.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(tableData.length / itemsPerPage);

  const handlePageChange = (direction) => {
    if (direction === "prev" && currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    } else if (direction === "next" && currentPage < totalPages) {
      setCurrentPage((prev) => prev + 1);
    }
  };
  const handleItemsPerPageChange = (e) => {
    setItemsPerPage(Number(e.target.value));
    setCurrentPage(1);
  };

  const handleSaveEditedClaim = (updatedClaim) => {
    const updatedData = tableData.map((item) =>
      item.id === updatedClaim.id ? { ...item, ...updatedClaim } : item
    );
    setTableData(updatedData);
    localStorage.setItem("claims", JSON.stringify(updatedData));
    setIsEditModalOpen(false);
  };

  const handleDelete = (id) => {
    const confirmed = window.confirm("آیا از حذف این مورد مطمئن هستید؟");
    if (!confirmed) return;
    const updateData = tableData.filter((item) => item.id !== id);
    setTableData(updateData);
  };

  return (
    <div className="p-6 bg-white rounded-xl shadow-md max-w-full">
      <h2 className="text-3xl font-semibold mb-6 text-right text-gray-800">
        کاربران
      </h2>

      <div className="flex justify-between items-center mb-5 px-2">
        <label className="text-sm">
          تعداد نمایش در هر صفحه:
          <select
            value={itemsPerPage}
            onChange={handleItemsPerPageChange}
            className="ml-2 border border-gray-300 rounded p-1 text-sm"
          >
            <option value={5}>۵</option>
            <option value={10}>۱۰</option>
            <option value={15}>۱۵</option>
            <option value={20}>۲۰</option>
          </select>
        </label>
        <SearchBox />
      </div>
      <div dir="rtl" className="overflow-x-auto rounded-lg shadow-sm border border-gray-200">
        <table className="min-w-full text-sm text-right text-gray-800 border-collapse">
          <thead>
            <tr className="bg-gray-100 border-b border-gray-300">
              <th className="py-3 px-5 font-semibold text-gray-800 border-r border-gray-300">#</th>
              <th
                className="py-3 px-5 font-semibold text-gray-800 border-r border-gray-300 cursor-pointer"
                onClick={() => handleSort("nationalId")}
              >
                کد ملی {getSortIcon("nationalId")}
              </th>
              <th
                className="py-3 px-5 font-semibold text-gray-800 border-r border-gray-300 cursor-pointer"
                onClick={() => handleSort("username")}
              >
                نام کاربری {getSortIcon("username")}
              </th>
              <th
                className="py-3 px-5 font-semibold text-gray-800 border-r border-gray-300 cursor-pointer"
                onClick={() => handleSort("firstName")}
              >
                نام {getSortIcon("firstName")}
              </th>
              <th
                className="py-3 px-5 font-semibold text-gray-800 border-r border-gray-300 cursor-pointer"
                onClick={() => handleSort("lastName")}
              >
                نام خانوادگی {getSortIcon("lastName")}
              </th>
              <th
                className="py-3 px-5 font-semibold text-gray-800 border-r border-gray-300 cursor-pointer"
                onClick={() => handleSort("status")}
              >
                وضعیت {getSortIcon("status")}
              </th>
              <th className="py-3 px-5 font-semibold text-gray-800">عملیات</th>
            </tr>
          </thead>

          <tbody>
            {currentItems.map((item, index) => {
              const { id, nationalId, username, firstName, lastName, status } = item;
              return (
                <tr
                  key={id}
                  className="border-b border-gray-200 hover:bg-blue-50 transition-colors duration-200"
                >
                  <td className="py-3 px-5 border-r border-gray-200">
                    {indexOfFirstItem + index + 1}
                  </td>
                  <td className="py-3 px-5 border-r border-gray-200">{nationalId}</td>
                  <td className="py-3 px-5 border-r border-gray-200">{username}</td>
                  <td className="py-3 px-5 border-r border-gray-200">{firstName}</td>
                  <td className="py-3 px-5 border-r border-gray-200">{lastName}</td>
                  <td
                    className={`py-3 px-5 border-r border-gray-200 ${
                      status ? "text-green-600" : "text-gray-500"
                    }`}
                  >
                    {status ? "فعال" : "غیرفعال"}
                  </td>

                  <td
                    ref={openMenuIndex === index ? menuRef : null}
                    className="py-3 px-5 border-r border-gray-200 text-center relative"
                  >
                    <button
                      onClick={() => handleDelete(id)}
                      className="text-white px-3 py-1 rounded text-sm bg-red-700 hover:bg-red-800 transition mx-1"
                    >
                      حذف
                    </button>

                    <button
                      className="text-white px-3 py-1 rounded text-sm bg-yellow-500 hover:bg-yellow-600 transition mx-1"
                      onClick={() => {
                        setSelectedClaim(item);
                        setIsEditModalOpen(true);
                      }}
                    >
                      ویرایش
                    </button>

                    <button
                      onClick={() =>
                        setOpenMenuIndex(openMenuIndex === index ? null : index)
                      }
                      className="cursor-pointer text-gray-600 hover:text-gray-800"
                    >
                      <EllipsisVertical size={17} />
                    </button>

                    {openMenuIndex === index && (
                      <div className="absolute left-0 top-full mt-2 bg-white shadow-lg rounded p-2 text-right z-50 w-36 border border-gray-200">
                        <button
                          className="block w-full text-sm text-gray-700 hover:text-green-600 px-2 py-1 transition"
                          onClick={() => {
                            setSelectedClaim(item);
                            setIsEditModalOpen(true);
                            setOpenMenuIndex(null);
                          }}
                        >
                          ویرایش Claim
                        </button>
                        <button
                          className="block w-full text-sm text-gray-700 hover:text-red-600 px-2 py-1 transition"
                          onClick={() => {
                            handleDelete(item.id);
                            setOpenMenuIndex(null);
                          }}
                        >
                          حذف Claim
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* صفحه‌بندی */}
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

      <EditClaimModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        claimData={selectedClaim}
        onSave={handleSaveEditedClaim}
      />
    </div>
  );
};

export default UsersTable;
