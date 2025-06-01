import React from "react";

const PropertiesSection = ({ properties }) => {
  if (!properties || Object.keys(properties).length === 0) {
    return (
      <div className="mb-4">
        <h3 className="font-semibold mb-2">Properties</h3>
        <p className="text-sm text-gray-500">هیچ ویژگی‌ای ثبت نشده است.</p>
      </div>
    );
  }

  return (
    <div className="mb-4">
      <h3 className="font-semibold mb-2">Properties</h3>
      <ul className="list-disc pr-5 text-sm text-gray-800">
        {Object.entries(properties).map(([key, value], index) => (
          <li key={index}>
            <strong>{key}:</strong> {value}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PropertiesSection;
