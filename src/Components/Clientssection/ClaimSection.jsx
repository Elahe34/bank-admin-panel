import React from "react";

const ClaimsSection = ({ claims }) => {
  if (!claims || claims.length === 0) {
    return (
      <div className="mb-4">
        <h3 className="font-semibold mb-2">Claims</h3>
        <p className="text-sm text-gray-500">هیچ claimی ثبت نشده است.</p>
      </div>
    );
  }

  return (
    <div className="mb-4">
      <h3 className="font-semibold mb-2">Claims</h3>
      <ul className="list-disc pr-5 text-sm text-gray-800">
        {claims.map((claim, index) => (
          
          <li key={index}>{claim.value}</li>
        ))}
      </ul>
    </div>
  );
};

export default ClaimsSection;
