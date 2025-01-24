import { refreshAccessToken } from "./authService";
import { jwtDecode } from "jwt-decode";

// Helper function to refresh the token if it's expired
const refreshTokenIfExpired = async (token) => {
  const decoded = jwtDecode(token);
  if (decoded.exp * 1000 < Date.now()) {
    // Token is expired, refresh it
    const newToken = await refreshAccessToken();
    localStorage.setItem("accessToken", newToken.accessToken); // Update the token in localStorage
    return newToken.accessToken;
  }
  return token; // Token is still valid
};

// Fetch users from the backend
export const fetchUsers = async (token) => {
  try {
    // Refresh the token if it's expired
    token = await refreshTokenIfExpired(token);

    const response = await fetch("http://localhost:5000/api/users", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Failed to fetch users: ${response.statusText}. Response: ${errorText}`);
    }

    const contentType = response.headers.get("content-type");
    if (!contentType || !contentType.includes("application/json")) {
      const errorText = await response.text();
      throw new Error(`Expected JSON but received: ${errorText}`);
    }

    return response.json();
  } catch (error) {
    console.error("Error in fetchUsers:", error);
    throw error;
  }
};

// Update user roles
export const updateUserRoles = async (userId, roles, token) => {
  try {
    // Refresh the token if it's expired
    token = await refreshTokenIfExpired(token);

    const response = await fetch(`http://localhost:5000/api/users/${userId}/roles`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ roles }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Failed to update roles: ${response.statusText}. Response: ${errorText}`);
    }

    return response.json();
  } catch (error) {
    console.error("Error in updateUserRoles:", error);
    throw error;
  }
};