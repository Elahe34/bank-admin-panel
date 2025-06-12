import React, { useEffect, useState } from "react";

const RedirectUriFormModal = ({ isOpen, onClose, onSubmit, initialData, isEdit }) => {
  const [uri, setUri] = useState("");

  useEffect(() => {
    if (initialData) {
      setUri(initialData.uri);
    } else {
      setUri("");
    }
  }, [initialData]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!uri.trim()) return;
    onSubmit({ uri });
  };

  if (!isOpen) return null;

  return (
    <div dir="rtl" className="fixed inset-0 z-50 bg-black bg-opacity-40 flex items-center justify-center">
      <div className="bg-white rounded-xl w-full max-w-md p-6 shadow-lg relative">
        <h2 className="text-lg font-semibold mb-4">
          {isEdit ? "Edir Redirect Uri" : "Add Redirect Uri"}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">آدرس URI:</label>
            <input
              type="text"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={uri}
              onChange={(e) => setUri(e.target.value)}
            />
          </div>

          <div className="flex justify-end space-x-3">
            <button
              type="button"
              className="px-4 py-2 rounded-lg bg-gray-200 text-gray-700 hover:bg-gray-300"
              onClick={onClose}
            >
              انصراف
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700"
            >
              {isEdit ? "ویرایش" : "افزودن"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RedirectUriFormModal;
