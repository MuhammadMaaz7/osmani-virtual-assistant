import React from "react";

const RoleCheckbox = ({ userId, role, isChecked, onChange }) => {
  const handleChange = (e) => {
    onChange(userId, role, e.target.checked);
  };

  return (
    <input
      type="checkbox"
      checked={isChecked}
      onChange={handleChange}
      className="form-checkbox h-5 w-5 text-emerald-600 rounded focus:ring-emerald-500"
    />
  );
};

export default RoleCheckbox;