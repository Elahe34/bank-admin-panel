import React from "react";

const GenericTable = ({ columns, data, onEdit, onDelete, searchTerm }) => {
  const filteredData = data.filter((item) =>
    columns.some((col) =>
      item[col.key]?.toString().toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  return (
    <div dir="rtl" className="overflow-x-auto">
      <table className="w-full border border-gray-300 rounded table-auto">
        <thead className="bg-gray-200">
          <tr>
            <th className="p-3 text-center align-middle border border-gray-300" style={{ minWidth: "60px" }}>
              ردیف
            </th>
            {columns.map((col) => (
              <th
                key={col.key}
                className="p-3 text-center align-middle border border-gray-300"
                style={{ minWidth: "120px" }}
              >
                {col.label}
              </th>
            ))}
            <th
              className="p-3 text-center align-middle border border-gray-300"
              style={{ minWidth: "140px" }}
            >
              عملیات
            </th>
          </tr>
        </thead>
        <tbody>
          {filteredData.length === 0 ? (
            <tr>
              <td
                colSpan={columns.length + 2}
                className="text-center py-6"
              >
                هیچ داده‌ای یافت نشد
              </td>
            </tr>
          ) : (
            filteredData.map((item, index) => (
              <tr
                key={item.id}
                className="border-t border-gray-300 hover:bg-gray-100 cursor-pointer"
              >
                <td className="p-3 text-center align-middle border border-gray-300">
                  {index + 1}
                </td>
                {columns.map((col) => (
                  <td
                    key={col.key}
                    className="p-3 text-center align-middle border border-gray-300"
                  >
                    {item[col.key]}
                  </td>
                ))}
                <td className="p-3 text-center align-middle border border-gray-300 space-x-2">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onEdit(item);
                    }}
                    className="text-white px-3 py-1 rounded text-sm bg-yellow-500 hover:bg-yellow-600 transition cursor-pointer"
                  >
                    ویرایش
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onDelete(item.id);
                    }}
                    className="text-white px-3 py-1 rounded text-sm bg-red-700 hover:bg-red-800 transition cursor-pointer"
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
  );
};

export default GenericTable;
