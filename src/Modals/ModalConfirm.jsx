import React from "react";

const ModalConfirm = ({ show, onConfirm, onCancel, message }) => {
  if (!show) return null; 

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-80 shadow-lg text-right">
        <h3 className=" font-bold text-sm mb-4">{message || "آیا مطمئن هستید؟"}</h3>
        <div className="flex justify-between">
          <button
            onClick={onConfirm}
            className="px-4 py-2 bg-red-600 text-sm text-white rounded hover:bg-red-700"
          >
            بله، حذف کن
          </button>
          <button
            onClick={onCancel}
            className="px-4 py-2 bg-gray-300 text-sm rounded hover:bg-gray-400"
          >
            انصراف
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalConfirm;
