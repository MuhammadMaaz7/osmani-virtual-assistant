import jwt from "jsonwebtoken";

// Middleware to verify JWT token
export const verifyToken = (req, res, next) => {
  let token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    token = req.cookies.refreshToken;
  }

  if (!token) {
    return res.status(401).json({ message: "Access denied. No token provided." });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Attach user data to the request
    next();
  } catch (error) {
    console.error("Token verification error:", error);
    res.status(400).json({ message: "Invalid token." });
  }
};

// Middleware to check if user is an admin
export const isAdmin = (req, res, next) => {
  if (!req.user.roles.includes("admin")) {
    return res.status(403).json({ message: "Access denied. Admin role required." });
  }
  next();
};