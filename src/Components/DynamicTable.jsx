import React, { useState, useEffect, useRef } from "react";
import { EllipsisVertical } from "lucide-react";
import SearchBox from "./SearchBox";

const DynamicTable = ({
  storageKey = null,     
  initialData = [],       
  columns = [],          
  actions = [],         
  itemsPerPageOptions = [5, 10, 15, 20]
}) => {
  const [tableData, setTableData] = useState(() => {
    if (storageKey) {
      const saved = localStorage.getItem(storageKey);
      return saved ? JSON.parse(saved) : initialData;
    }
    return initialData;
  });

  const [openMenuIndex, setOpenMenuIndex] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(itemsPerPageOptions[0]);
  const menuRef = useRef(null);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    if (storageKey) {
      localStorage.setItem(storageKey, JSON.stringify(tableData));
    }
  }, [tableData, storageKey]);

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
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [openMenuIndex]);


  const filteredData = tableData.filter((item) =>
    columns.some((col) => {
      const val = item[col.key];
      return val && val.toString().toLowerCase().includes(searchTerm.toLowerCase());
    })
  );

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);

  const handleDelete = (id) => {
    if (!window.confirm("آیا از حذف این مورد مطمئن هستید؟")) return;
    setTableData((prev) => prev.filter((item) => item.id !== id));
  };

  const handleItemsPerPageChange = (e) => {
    setItemsPerPage(Number(e.target.value));
    setCurrentPage(1);
  };

  return (
    <div className={`w-[90%] mx-auto transition-all duration-300`}>
      <div className="flex justify-between items-center mb-4 px-4">
        <label className="text-sm">
          تعداد نمایش در هر صفحه:
          <select
            value={itemsPerPage}
            onChange={handleItemsPerPageChange}
            className="ml-2 border border-gray-300 rounded p-1 text-sm"
          >
            {itemsPerPageOptions.map((opt) => (
              <option key={opt} value={opt}>{opt}</option>
            ))}
          </select>
        </label>
        <div className="mr-3">
          <SearchBox value={searchTerm} onChange={setSearchTerm} />
        </div>
      </div>

      <table
        dir="rtl"
        className="w-full border-collapse text-center rounded overflow-hidden shadow-xl backdrop-blur-md bg-white/50 mt-1"
      >
        <thead className="bg-indigo-200/35 text-gray-800 font-semibold">
          <tr>
            <th className="p-3">ردیف</th>
            {columns.map(({ label }, idx) => (
              <th key={idx} className="p-3">{label}</th>
            ))}
            {actions.length > 0 && <th className="p-3">عملیات</th>}
          </tr>
        </thead>
        <tbody>
          {currentItems.map((item, index) => (
            <tr
              key={item.id || index}
              className="even:bg-white/30 odd:bg-indigo-100/20 hover:bg-indigo-200/30 transition dark:text-gray-950"
            >
              <td className="p-2 text-sm">{indexOfFirstItem + index + 1}</td>
              {columns.map(({ key, render }, idx) => (
                <td key={idx} className="p-2 text-sm">
                  {render ? render(item) : item[key]}
                </td>
              ))}
              {actions.length > 0 && (
                <td
                  ref={openMenuIndex === index ? menuRef : null}
                  className="p-2 flex justify-center items-center"
                >
                  {actions.map(({ label, onClick, colorClass }, idx) => (
                    <button
                      key={idx}
                      className={`mx-2 hover:opacity-80 cursor-pointer transition text-sm ${colorClass || ""}`}
                      onClick={() => {
                        onClick(item);
                        setOpenMenuIndex(null);
                      }}
                    >
                      {label}
                    </button>
                  ))}

                  {actions.length > 2 && (
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
                          {actions.slice(2).map(({ label, onClick, colorClass }, idx) => (
                            <button
                              key={idx}
                              className={`block w-full text-sm px-2 py-1 transition hover:opacity-80 ${colorClass || "text-gray-700"}`}
                              onClick={() => {
                                onClick(currentItems[openMenuIndex]);
                                setOpenMenuIndex(null);
                              }}
                            >
                              {label}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  )}
                </td>
              )}
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
    </div>
  );
};

export default DynamicTable;
