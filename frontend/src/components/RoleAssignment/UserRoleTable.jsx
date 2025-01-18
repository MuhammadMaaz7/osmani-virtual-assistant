import React from "react";
import RoleCheckbox from "./RoleCheckbox";

const UserRoleTable = ({ users, jpts, selectedRoles, onRoleChange }) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white border border-gray-200">
        <thead>
          <tr>
            <th className="px-4 py-2 border-b border-gray-200 text-left">User</th>
            {jpts.map((jpt) => (
              <th
                key={jpt}
                className="px-4 py-2 border-b border-gray-200 text-left"
              >
                {jpt}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user._id}>
              <td className="px-4 py-2 border-b border-gray-200">{user.name}</td>
              {jpts.map((jpt) => (
                <td key={jpt} className="px-4 py-2 border-b border-gray-200">
                  <RoleCheckbox
                    userId={user._id}
                    role={jpt}
                    isChecked={selectedRoles[user._id]?.includes(jpt)}
                    onChange={onRoleChange}
                  />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserRoleTable;