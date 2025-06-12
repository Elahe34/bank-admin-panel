import React, { useState, useEffect } from "react";
import Modal from "../Modal";

const PropertyFormModal = ({ isOpen, onClose, onSubmit, initialData }) => {
  const [form, setForm] = useState({ supportEmail: "", department: "" });

  useEffect(() => {
    if (initialData) {
      setForm(initialData);
    } else {
      setForm({ supportEmail: "", department: "" });
    }
  }, [initialData]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    if (form.supportEmail && form.department) {
      onSubmit(form);
      onClose();
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Property">
      <div className="flex flex-col gap-4 p-4">
        <input
          name="supportEmail"
          type="email"
          value={form.supportEmail}
          onChange={handleChange}
          placeholder="Support Email"
          className="border rounded px-3 py-2"
        />
        <input
          name="department"
          value={form.department}
          onChange={handleChange}
          placeholder="Department"
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

export default PropertyFormModal;
