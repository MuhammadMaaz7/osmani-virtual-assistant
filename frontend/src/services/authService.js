const API_BASE_URL = "http://localhost:5000/api/auth";

// Signup user
export const signup = async (name, email, password) => {
  const response = await fetch(`${API_BASE_URL}/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name, email, password }),
    credentials: "include", // Include cookies
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Signup failed");
  }

  return response.json();
};

// Login user
export const login = async (email, password) => {
  const response = await fetch(`${API_BASE_URL}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
    credentials: "include", // Include cookies
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Login failed");
  }

  return response.json();
};

// Refresh access token
// Refresh access token
export const refreshAccessToken = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/refresh-token`, {
      method: "POST",
      credentials: "include", // Include cookies
    });

    if (!response.ok) {
      throw new Error("Failed to refresh access token");
    }

    return response.json();
  } catch (error) {
    console.error("Error refreshing token:", error);
    throw error;
  }
};

// Logout user
// Logout user
export const logout = async (token) => {
  try {
    const response = await fetch(`${API_BASE_URL}/logout`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      credentials: "include", // Include cookies
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to logout");
    }

    return response.json();
  } catch (error) {
    console.error("Logout error:", error);
    throw error;
  }
};
