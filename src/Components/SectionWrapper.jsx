import React, { useState } from "react";

const SectionWrapper = ({
  title,
  onAddClick,
  searchTerm,
  setSearchTerm,
  children,
}) => {
  return (
    <div dir="rtl" className="bg-white rounded-xl shadow p-4 mb-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">{title}</h2>
        <button
          onClick={onAddClick}
          className="bg-blue-600 text-white px-4 py-1 rounded cursor-pointer"
        >
          افزودن
        </button>
      </div>
      <input
        type="text"
        placeholder="جستجو..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full p-2 border border-gray-300 rounded mb-4 focus:outline-none focus:border-gray-400 focus:ring-2 focus:ring-gray-300"
      />
      {children}
    </div>
  );
};

export default SectionWrapper;
