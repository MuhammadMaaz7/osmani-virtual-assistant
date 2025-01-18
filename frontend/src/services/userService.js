// services/userService.js
export const fetchUsers = async (token) => {
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
};

export const updateUserRoles = async (userId, roles, token) => {
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
};