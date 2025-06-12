import React, { useState, useEffect } from "react";

const GrantTypeFormModal = ({ isOpen, onClose, onSubmit, initialData = null, isEdit }) => {
  const [allowedGrantTypesText, setAllowedGrantTypesText] = useState("");

  useEffect(() => {
    if (initialData && initialData.allowedGrantTypes) {
      setAllowedGrantTypesText(initialData.allowedGrantTypes.join(", "));
    } else {
      setAllowedGrantTypesText("");
    }
  }, [initialData]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    const arr = allowedGrantTypesText
      .split(",")
      .map((item) => item.trim())
      .filter((item) => item !== "");
    if (arr.length === 0) return;

    onSubmit({ allowedGrantTypes: arr });
  };

  return (
    <>
      <div
        onClick={onClose}
        className="fixed inset-0 bg-black bg-opacity-50 z-40"
      ></div>

      <div className="fixed inset-0 flex items-center justify-center z-50">
        <form
          onSubmit={handleSubmit}
          className="bg-white rounded p-6 w-96 max-w-full shadow-lg"
          onClick={(e) => e.stopPropagation()}
        >
          <h2 className="text-lg font-semibold mb-4">
            {isEdit ? "ویرایش Grant Type" : "افزودن Grant Type جدید"}
          </h2>

          <label className="block mb-2 font-medium">Grant Types (با کاما جدا کنید)</label>
          <input
            type="text"
            value={allowedGrantTypesText}
            onChange={(e) => setAllowedGrantTypesText(e.target.value)}
            placeholder="مثال: authorization_code, client_credentials"
            className="w-full border border-gray-300 rounded px-3 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
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
    </>
  );
};

export default GrantTypeFormModal;
