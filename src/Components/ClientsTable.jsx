import React, { useState, useEffect, useRef } from 'react';
import { TableItems } from '../data/TableItems';
import { EllipsisVertical } from 'lucide-react';
import SearchBox from './SearchBox';
import EditClaimModal from '../Modals/EditClaimModal';

const ClientsTable = ({ isSidebarOpen, setIsSidebarOpen }) => {
  const [openMenuIndex, setOpenMenuIndex] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [tableData, setTableData] = useState(TableItems);
  const menuRef = useRef(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedClaim, setSelectedClaim] = useState(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setOpenMenuIndex(null);
      }
    }

    if (openMenuIndex !== null) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [openMenuIndex]);
  

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = tableData.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(tableData.length / itemsPerPage);

  const handlePageChange = (direction) => {
    if (direction === 'prev' && currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    } else if (direction === 'next' && currentPage < totalPages) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const handleItemsPerPageChange = (e) => {
    setItemsPerPage(Number(e.target.value));
    setCurrentPage(1);
  };
  const handleSaveEditedClaim = (updatedClaim) => {
  setTableData(prevData =>
    prevData.map(item => item.id === updatedClaim.id ? { ...item, ...updatedClaim } : item)
  );
  setIsEditModalOpen(false); 
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
            const { id, nationalId, username, firstName, lastName, status } = item;
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
                <td className={`p-2 text-sm ${status ? 'text-green-600' : 'text-gray-500'}`}>
                  {status ? 'فعال' : 'غیرفعال'}
                </td>
                <td
                  ref={openMenuIndex === index ? menuRef : null}
                  className="p-2 flex justify-center items-center"
                >
                  <button className="mx-2 hover:text-red-600 cursor-pointer transition text-sm">
                    حذف
                  </button>
                  <button className="mx-2 hover:text-green-600 cursor-pointer transition text-sm">
                    ویرایش
                  </button>
                  <div className="relative">
                    <button
                      onClick={() =>
                        setOpenMenuIndex(openMenuIndex === index ? null : index)
                      }
                      className="cursor-pointer"
                    >
                      <EllipsisVertical />
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
                        <button className="block w-full text-sm text-gray-700 hover:text-red-600 px-2 py-1 transition">
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
                ? 'bg-indigo-500 text-white'
                : 'bg-indigo-100 hover:bg-indigo-200'
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

export default ClientsTable;
