import React from "react";
import { Link } from "react-router-dom";
import clients from "../data/ClientsData";

const ClientsTable = () => {
  return (
    <div className="p-6 bg-white rounded-xl shadow-md max-w-full">
      <h2 className="text-3xl font-semibold mb-6 text-right text-gray-800">
        لیست کلاینت‌ها
      </h2>
      <div dir="rtl" className="overflow-x-auto rounded-lg shadow-sm border border-gray-200">
        <table className="min-w-full text-sm text-right text-gray-800 border-collapse">
          <thead >
            <tr className="bg-gray-100 border-b border-gray-300">
              <th className="py-3 px-5 font-semibold text-gray-800 border-r border-gray-300 select-none">#</th>
              <th className="py-3 px-5 font-semibold text-gray-800 border-r border-gray-300 select-none">نام کلاینت</th>
              <th className="py-3 px-5 font-semibold text-gray-800 border-r border-gray-300 select-none">Client ID</th>
              <th className="py-3 px-5 font-semibold text-gray-800 border-r border-gray-300 select-none">توضیحات</th>
              <th className="py-3 px-5 font-semibold text-gray-800 border-r border-gray-300 select-none">Redirect URI</th>
              <th className="py-3 px-5 font-semibold text-gray-800 border-r border-gray-300 select-none">وضعیت</th>
              <th className="py-3 px-5 font-semibold text-gray-800 select-none">جزییات</th>
            </tr>
          </thead>
          <tbody>
            {clients.map((client, index) => (
              <tr
                key={client.id}
                className="border-b border-gray-200 hover:bg-blue-50 transition-colors duration-200 cursor-pointer"
              >
                <td className="py-3 px-5 border-r border-gray-200">{index + 1}</td>
                <td className="py-3 px-5 border-r border-gray-200 font-medium text-gray-800">{client.clientName}</td>
                <td className="py-3 px-5 border-r border-gray-200 font-mono text-gray-800">{client.clientId}</td>
                <td
                  className="py-3 px-5 border-r border-gray-200 text-gray-800 truncate max-w-xs"
                  title={client.description || "-"}
                >
                  {client.description || "-"}
                </td>
                <td
                  className="py-3 px-5 border-r border-gray-200 text-gray-800 truncate max-w-xs"
                  title={client.redirectUris[0]}
                >
                  {client.redirectUris[0]}
                </td>
                <td className="py-3 px-5 border-r border-gray-200">
                  <span
                    className={`inline-block px-3 py-1 rounded text-sm font-semibold ${
                      client.enabled
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    } select-none`}
                  >
                    {client.enabled ? "فعال" : "غیرفعال"}
                  </span>
                </td>
                <td className="py-3 px-5 text-center">
                  <Link
                    to={`/clients/${client.clientId}`}
                    className="text-blue-600 hover:text-blue-900  transition-colors duration-150 font-semibold"
                  >
                    مشاهده جزییات
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ClientsTable;
