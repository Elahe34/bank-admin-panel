import React, { useState, useEffect, useRef } from "react";
import { TableItems } from "../data/TableItems";
import { Edit2, Edit2Icon, Edit3, EditIcon, EllipsisVertical, Trash2 } from "lucide-react";
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
    const confirmed = window.confirm("آیا از حذف این مورد مطمین هستید؟");
    if (!confirmed) return;
    const updateData = tableData.filter((item) => item.id !== id);
    setTableData(updateData);
  };

  return (
    <div className={`w-[90%] mx-auto transition-all duration-300`}>
      <div className="flex justify-between items-center">
        <div className="flex justify-between items-center mb-4 px-4">
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
        </div>
        <div className="mr-3">
          <SearchBox />
        </div>
      </div>

      <table
        dir="rtl"
        className="w-full border-collapse text-center rounded overflow-hidden shadow-xl backdrop-blur-md bg-white/50 mt-1"
      >
        <thead className="bg-indigo-200/35 text-gray-800 font-semibold">
          <tr>
            <th className="p-3">ردیف</th>
            <th className="p-3">کدملی</th>
            <th className="p-3">نام کاربری</th>
            <th className="p-3">نام</th>
            <th className="p-3">نام خانوادگی</th>
            <th className="p-3">وضعیت</th>
            <th className="p-3">عملیات</th>
          </tr>
        </thead>
        <tbody>
          {currentItems.map((item, index) => {
            const { id, nationalId, username, firstName, lastName, status } =
              item;
            return (
              <tr
                key={id}
                className="even:bg-white/30 odd:bg-indigo-100/20 hover:bg-indigo-200/30 transition dark:text-gray-950"
              >
                <td className="p-2 text-sm">{indexOfFirstItem + index + 1}</td>
                <td className="p-2 text-sm">{nationalId}</td>
                <td className="p-2 text-sm">{username}</td>
                <td className="p-2 text-sm">{firstName}</td>
                <td className="p-2 text-sm">{lastName}</td>
                <td
                  className={`p-2 text-sm ${
                    status ? "text-green-600" : "text-gray-500"
                  }`}
                >
                  {status ? "فعال" : "غیرفعال"}
                </td>
                <td
                  ref={openMenuIndex === index ? menuRef : null}
                  className="p-2 flex justify-center items-center"
                >
                  <button
                    onClick={() => handleDelete(id)}
                    className="mx-2 hover:text-red-600 cursor-pointer transition text-sm"
                  >
                    <Trash2 color="#EF4444" size={17} /> 
                  </button>
                  <button
                    className="mx-2 hover:text-green-600 cursor-pointer transition text-sm"
                    onClick={() => {
                      setSelectedClaim(item);
                      setIsEditModalOpen(true);
                    }}
                  >
                    <EditIcon color="#3B82F6" size={17} />
                  </button>

                  <div className="relative ">
                    <button
                      onClick={() =>
                        setOpenMenuIndex(openMenuIndex === index ? null : index)
                      }
                      className="cursor-pointer"
                    >
                      <EllipsisVertical size={17} />
                    </button>
                    {openMenuIndex === index && (
                      <div className="absolute left-0 top-full mt-2 bg-white shadow-lg rounded p-2 text-right z-50 w-32">
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
                  </div>
                </td>
              </tr>
            );
          })}
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
