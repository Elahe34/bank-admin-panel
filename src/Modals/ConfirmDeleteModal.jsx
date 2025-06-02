import React from "react";

const ConfirmDeleteModal = ({ isOpen, onClose, onConfirm, title }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-6 max-w-sm w-full">
        <h2 className="text-lg font-bold mb-4">{title}</h2>
        <div className="flex justify-end space-x-4">
          <button onClick={onClose} className="text-gray-600">لغو</button>
          <button onClick={onConfirm} className="text-red-600">حذف</button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDeleteModal;
