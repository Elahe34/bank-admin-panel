import React, { useState, useEffect } from "react";

const CorsOriginFormModal = ({
  isOpen,
  onClose,
  onSubmit,
  initialData,
  isEdit,
}) => {
  const [value, setValue] = useState("");

  useEffect(() => {
    if (initialData) {
      setValue(initialData);
    } else {
      setValue("");
    }
  }, [initialData]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(value.trim());
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded shadow-md w-80"
      >
        <h2 className="text-lg font-bold mb-4">
          {isEdit ? "ویرایش آدرس" : "افزودن آدرس"}
        </h2>
        <input
          type="text"
          placeholder="https://example.com"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          className="border border-gray-300 rounded px-3 py-2 w-full mb-4"
          required
        />
        <div className="flex justify-end gap-2">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded border border-gray-400"
          >
            انصراف
          </button>
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            {isEdit ? "ذخیره" : "افزودن"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CorsOriginFormModal;
