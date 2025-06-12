import React, { useState, useEffect } from "react";
import Modal from "../Modal";

const ClaimFormModal = ({ isOpen, onClose, onSubmit, initialData }) => {
  const [form, setForm] = useState({ type: "", value: "" });

  useEffect(() => {
    if (initialData) {
      setForm(initialData);
    } else {
      setForm({ type: "", value: "" });
    }
  }, [initialData]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    if (form.type && form.value) {
      onSubmit(form);
      onClose();
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Claim">
      <div dir="rtl" className="flex flex-col gap-4 p-4">
        <input
          name="type"
          value={form.type}
          onChange={handleChange}
          placeholder="نوع"
          className="border rounded px-3 py-2"
        />
        <input
          name="value"
          value={form.value}
          onChange={handleChange}
          placeholder="مقدار"
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

export default ClaimFormModal;
