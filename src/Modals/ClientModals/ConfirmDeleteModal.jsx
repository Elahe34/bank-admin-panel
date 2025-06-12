import React from "react";
import Modal from "../Modal";
import { Trash2 } from "lucide-react";

const ConfirmDeleteModal = ({ isOpen, onClose, onConfirm, title }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="flex flex-col items-center text-center gap-4">
        <Trash2 className="text-red-500 w-7 h-7+" />
        <p className="text-gray-800 text-lg font-medium">{title}</p>
        <div className="flex justify-center gap-4 mt-4">
          <button
            onClick={onClose}
            className="px-4 py-2 border border-gray-500 bg-gray-500 rounded-md text-gray-100 hover:bg-gray-700 transition"
          >
            لغو
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 bg-red-600 text-gray-100 rounded-md hover:bg-red-700 transition"
          >
            حذف
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default ConfirmDeleteModal;
