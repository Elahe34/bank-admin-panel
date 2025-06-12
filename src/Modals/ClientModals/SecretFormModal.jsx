// Modals/SecretFormModal.jsx
import React, { useState, useEffect } from "react";

const SecretFormModal = ({ isOpen, onClose, onSubmit, initialData }) => {
  const [type, setType] = useState("SharedSecret");
  const [value, setValue] = useState("");
  const [expiration, setExpiration] = useState("");

  useEffect(() => {
    if (initialData) {
      setType(initialData.type || "SharedSecret");
      setValue(initialData.value || "");
      setExpiration(initialData.expiration || "");
    } else {
      setType("SharedSecret");
      setValue("");
      setExpiration("");
    }
  }, [initialData]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      id: initialData?.id || Date.now().toString(),
      type,
      value,
      expiration: expiration || null,
    });
  };

  if (!isOpen) return null;

  return (
    <div dir="rtl" className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-lg p-6 w-96 shadow-lg">
        <h3 className="text-lg font-bold mb-4">{initialData ? " Edit Secret" : " Add Secret"}</h3>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <label>
            نوع:
            <select value={type} onChange={(e) => setType(e.target.value)} className="border p-1 w-full mt-1">
              <option value="SharedSecret">SharedSecret</option>
              <option value="OtherType">OtherType</option>
    
            </select>
          </label>

          <label>
            مقدار:
            <input
              type="text"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              className="border p-1 w-full mt-1"
              required
            />
          </label>

          <label>
            انقضا:
            <input
              type="date"
              value={expiration || ""}
              onChange={(e) => setExpiration(e.target.value)}
              className="border p-1 w-full mt-1"
            />
          </label>

          <div className="flex justify-end gap-4 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border rounded hover:bg-gray-200"
            >
              انصراف
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              ذخیره
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SecretFormModal;
