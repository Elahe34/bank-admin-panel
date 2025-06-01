import React, { useState, useEffect } from 'react';

const EditRoleModal = ({ isOpen, onClose, onSave, roleData }) => {
  const [roleName, setRoleName] = useState('');
  const [permissions, setPermissions] = useState([]);

  useEffect(() => {
    if (roleData) {
      setRoleName(roleData.roleName || '');
      setPermissions(roleData.permissions || []);
    } else {
      setRoleName('');
      setPermissions([]);
    }
  }, [roleData]);

  const permissionOptions = ['read', 'write', 'delete', 'admin'];

  const togglePermission = (perm) => {
    if (permissions.includes(perm)) {
      setPermissions(permissions.filter(p => p !== perm));
    } else {
      setPermissions([...permissions, perm]);
    }
  };

  const handleSave = () => {
    if (!roleName.trim()) {
      alert('نام نقش را وارد کنید');
      return;
    }
    if (permissions.length === 0) {
      alert('حداقل یک دسترسی انتخاب کنید');
      return;
    }
    onSave({ roleName, permissions });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg w-96 p-6">
        <h2 className="text-xl font-semibold mb-4">ویرایش نقش</h2>

        <label className="block mb-2 font-medium">نام نقش</label>
        <input
          type="text"
          className="w-full border border-gray-300 rounded px-3 py-2 mb-4"
          value={roleName}
          onChange={e => setRoleName(e.target.value)}
          placeholder="مثلا: مدیر، کاربر عادی"
        />

        <label className="block mb-2 font-medium">دسترسی‌ها</label>
        <div className="mb-4 space-y-2">
          {permissionOptions.map(perm => (
            <div key={perm} className="flex items-center">
              <input
                type="checkbox"
                id={perm}
                checked={permissions.includes(perm)}
                onChange={() => togglePermission(perm)}
                className="mr-2"
              />
              <label htmlFor={perm} className="capitalize">
                {perm === 'read' && 'خواندن'}
                {perm === 'write' && 'نوشتن'}
                {perm === 'delete' && 'حذف'}
                {perm === 'admin' && 'مدیریت'}
              </label>
            </div>
          ))}
        </div>

        <div className="flex justify-end space-x-3">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400"
          >
            انصراف
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700"
          >
            ذخیره
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditRoleModal;
