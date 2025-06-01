import React from "react";

const SecretsSection = ({ secrets }) => {
  if (!secrets || secrets.length === 0) {
    return (
      <div className="mb-4">
        <h3 className="font-semibold mb-2">Secrets</h3>
        <p className="text-sm text-gray-500">هیچ کلید مخفی‌ای تعریف نشده است.</p>
      </div>
    );
  }

  return (
    <div className="mb-4">
      <h3 className="font-semibold mb-2">Secrets</h3>
      <table className="w-full text-sm text-right border rounded">
        <thead className="bg-gray-100">
          <tr>
            <th className="border px-2 py-1">نوع</th>
            <th className="border px-2 py-1">مقدار هش‌شده</th>
            <th className="border px-2 py-1">تاریخ انقضا</th>
          </tr>
        </thead>
        <tbody>
          {secrets.map((secret, index) => (
            <tr key={index}>
              <td className="border px-2 py-1">{secret.type}</td>
              <td className="border px-2 py-1 break-all">{secret.value}</td>
              <td className="border px-2 py-1">
                {secret.expiration ? new Date(secret.expiration).toLocaleDateString("fa-IR") : "ندارد"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SecretsSection;
