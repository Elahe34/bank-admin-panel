import React, { useState, useEffect } from "react";
import Modal from "../Modal";

const UriFormModal = ({ isOpen, onClose, onSubmit, initialData }) => {
  const [uri, setUri] = useState("");

  useEffect(() => {
    if (initialData) {
      setUri(initialData);
    } else {
      setUri("");
    }
  }, [initialData]);

  const handleSubmit = () => {
    if (uri.trim()) {
      onSubmit(uri.trim());
      onClose();
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Post Logout URI">
      <div className="flex flex-col gap-4 p-4">
        <input
          value={uri}
          onChange={(e) => setUri(e.target.value)}
          placeholder="مثال: https://example.com/logout"
          className="border rounded px-3 py-2"
        />
        <button
          onClick={handleSubmit}
          className="bg-blue-500 text-white rounded px-4 py-2"
        >
          ثبت
        </button>
      </div>
    </Modal>
  );
};

export default UriFormModal;
