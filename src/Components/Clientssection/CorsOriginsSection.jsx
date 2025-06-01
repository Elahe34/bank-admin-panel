import React from "react";

const CorsOriginsSection = ({ corsOrigins }) => {
  if (!corsOrigins || corsOrigins.length === 0) {
    return (
      <div className="mb-4">
        <h3 className="font-semibold mb-2">CORS Origins</h3>
        <p className="text-sm text-gray-500">هیچ originی تعریف نشده است.</p>
      </div>
    );
  }

  return (
    <div className="mb-4">
      <h3 className="font-semibold mb-2">CORS Origins</h3>
      <ul className="list-disc pr-5 text-sm text-gray-800">
        {corsOrigins.map((origin, index) => (
          <li key={index}>{origin}</li>
        ))}
      </ul>
    </div>
  );
};

export default CorsOriginsSection;
