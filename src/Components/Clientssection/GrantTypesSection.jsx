import React from "react";

const GrantTypesSection = ({ grantTypes }) => {
  if (!grantTypes || grantTypes.length === 0) {
    return (
      <div className="mb-4">
        <h3 className="font-semibold mb-2">Grant Types</h3>
        <p className="text-sm text-gray-500">هیچ نوع دسترسی ثبت نشده است.</p>
      </div>
    );
  }

  return (
    <div className="mb-4">
      <h3 className="font-semibold mb-2">Grant Types</h3>
      <ul className="list-disc pr-5 text-sm text-gray-800">
        {grantTypes.map((type, index) => (
          <li key={index}>{type}</li>
        ))}
      </ul>
    </div>
  );
};

export default GrantTypesSection;
