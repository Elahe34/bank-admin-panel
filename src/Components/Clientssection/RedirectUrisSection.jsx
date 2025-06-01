import React from "react";

const RedirectUrisSection = ({ redirectUris }) => {
  if (!redirectUris || redirectUris.length === 0) {
    return (
      <div className="mb-4">
        <h3 className="font-semibold mb-2">Redirect URIs</h3>
        <p className="text-sm text-gray-500">هیچ آدرسی ثبت نشده است.</p>
      </div>
    );
  }

  return (
    <div className="mb-4">
      <h3 className="font-semibold mb-2">Redirect URIs</h3>
      <ul className="list-disc pr-5 text-sm text-gray-800">
        {redirectUris.map((uri, index) => (
          <li key={index}>{uri}</li>
        ))}
      </ul>
    </div>
  );
};

export default RedirectUrisSection;
