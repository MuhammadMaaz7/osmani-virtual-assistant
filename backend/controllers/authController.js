import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

// Helper function to generate JWT tokens
const generateAccessToken = (id, roles) => {
  return jwt.sign({ id, roles }, process.env.JWT_SECRET, {
    expiresIn: "10s", // Short-lived access token
  });
};

const generateRefreshToken = (id, roles) => {
  return jwt.sign({ id, roles }, process.env.JWT_REFRESH_SECRET, {
    expiresIn: "7d", // Long-lived refresh token
  });
};

// @desc    Register a new user
// @route   POST /api/auth/signup
// @access  Public
export const signup = async (req, res) => {
  const { name, email, password, roles } = req.body;

  try {
    // Check if user already exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create user
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      roles: roles || ["User"], // Default to ["User"] if roles are not provided
    });

    // Generate tokens
    const accessToken = generateAccessToken(user._id, user.roles);
    const refreshToken = generateRefreshToken(user._id, user.roles);

    // Set refresh token in an HTTP-only cookie
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // Use secure cookies in production
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      roles: user.roles,
      accessToken,
    });
  } catch (error) {
    console.error("Signup error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// @desc    Login user
// @route   POST /api/auth/login
// @access  Public
export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Generate tokens
    const accessToken = generateAccessToken(user._id, user.roles);
    const refreshToken = generateRefreshToken(user._id, user.roles);

    // Set refresh token in an HTTP-only cookie
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // Use secure cookies in production
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      roles: user.roles,
      accessToken,
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// @desc    Refresh access token
// @route   POST /api/auth/refresh-token
// @access  Public
export const refreshToken = async (req, res) => {
  const refreshToken = req.cookies.refreshToken;

  if (!refreshToken) {
    return res.status(401).json({ message: "No refresh token provided." });
  }

  try {
    // Verify the refresh token
    const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);

    // Generate a new access token
    const accessToken = generateAccessToken(decoded.id, decoded.roles);

    res.status(200).json({ accessToken });
  } catch (error) {
    console.error("Refresh token error:", error);
    res.status(403).json({ message: "Invalid refresh token." });
  }
};

// @desc    Logout user
// @route   POST /api/auth/logout
// @access  Private
export const logout = async (req, res) => {
  // Clear the refresh token cookie
  res.clearCookie("refreshToken", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
  });

  res.status(200).json({ message: "Logged out successfully." });
};