import React, { useState, useEffect } from "react";
import UserRoleTable from "../components/RoleAssignment/UserRoleTable";
import { useAuth } from "../context/AuthContext";
import { fetchUsers, updateUserRoles } from "../services/userService";

const RoleAssignmentPage = () => {
  const { user: currentUser } = useAuth(); // Get the currently logged-in user
  const [users, setUsers] = useState([]); // State to store users
  const [jpts] = useState(["Manager", "Developer", "admin", "Analyst"]); // Available roles
  const [selectedRoles, setSelectedRoles] = useState({}); // Track selected roles for each user

  // Fetch users from the backend
  useEffect(() => {
    const fetchUsersData = async () => {
      try {
        const data = await fetchUsers(currentUser.token);
        const filteredUsers = data.filter((user) => user._id !== currentUser._id);
        setUsers(filteredUsers);

        // Initialize selectedRoles state
        const initialSelectedRoles = {};
        filteredUsers.forEach((user) => {
          initialSelectedRoles[user._id] = user.roles;
        });
        setSelectedRoles(initialSelectedRoles);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsersData();
  }, [currentUser]);

  // Handle role assignment changes locally
  const handleRoleChange = (userId, role, isChecked) => {
    setSelectedRoles((prevSelectedRoles) => {
      const userRoles = prevSelectedRoles[userId] || [];
      const updatedRoles = isChecked
        ? [...userRoles, role] // Add role
        : userRoles.filter((r) => r !== role); // Remove role

      return {
        ...prevSelectedRoles,
        [userId]: updatedRoles,
      };
    });
  };

  // Save all role changes
  const saveRoleChanges = async () => {
    try {
      for (const userId in selectedRoles) {
        const roles = selectedRoles[userId];
        await updateUserRoles(userId, roles, currentUser.token);
      }

      // Fetch updated users after saving changes
      const data = await fetchUsers(currentUser.token);
      const filteredUsers = data.filter((user) => user._id !== currentUser._id);
      setUsers(filteredUsers);

      alert("Roles updated successfully!");
    } catch (error) {
      console.error("Error updating roles:", error);
      alert("Failed to update roles. Please try again.");
    }
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-2xl font-semibold text-gray-900 mb-6">
        Role Assignment
      </h1>
      <UserRoleTable
        users={users}
        jpts={jpts}
        selectedRoles={selectedRoles}
        onRoleChange={handleRoleChange}
      />
      <button
        onClick={saveRoleChanges}
        className="mt-4 px-4 py-2 bg-emerald-600 text-white rounded hover:bg-emerald-700"
      >
        Save Role Changes
      </button>
    </div>
  );
};

export default RoleAssignmentPage;