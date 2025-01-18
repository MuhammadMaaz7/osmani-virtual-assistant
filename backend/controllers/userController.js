// backend/controllers/userController.js
import User from "../models/User.js";

// @desc    Get all users
// @route   GET /api/users
// @access  Private/Admin
export const getUsers = async (req, res) => {
  try {
    const users = await User.find({}, { password: 0 }); // Exclude passwords
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// @desc    Update user roles
// @route   PUT /api/users/:userId/roles
// @access  Private/Admin
export const updateUserRoles = async (req, res) => {
  const { userId } = req.params;
  const { roles } = req.body;

  try {
    const user = await User.findByIdAndUpdate(
      userId,
      { roles },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({ message: "Roles updated successfully", user });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};