import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthForm from "../components/SignupLogin/AuthForm";
import { login } from "../services/authService";
import { useAuth } from "../context/AuthContext";

const LoginPage = () => {
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const { login: authLogin } = useAuth();

  const handleLogin = async (data) => {
    // Validate email and password
    const newErrors = {};
    if (!data.email || !/\S+@\S+\.\S+/.test(data.email)) {
      newErrors.email = "Please enter a valid email address.";
    }
    if (!data.password || data.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters.";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
    } else {
      setErrors({});
      try {
        const response = await login(data.email, data.password);
        console.log("Login successful:", response);

        // Extract userData and token from the response
        const userData = {
          _id: response._id,
          name: response.name,
          email: response.email,
          roles: response.roles,
        };
        const token = response.accessToken;

        // Update auth context with userData and token
        authLogin(userData, token);

        // Redirect based on role
        if (response.roles.includes("admin")) {
          navigate("/role"); // Redirect admin to the role assignment page
        } else {
          navigate("/chat"); // Redirect non-admin users to the chat page
        }
      } catch (error) {
        setErrors({ general: error.message });
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96">
        <h1 className="text-2xl font-semibold text-gray-900 mb-6">Login</h1>
        <AuthForm isLogin={true} onSubmit={handleLogin} errors={errors} />
        <div className="mt-4 text-center">
          <span className="text-sm text-gray-600">Don't have an account? </span>
          <Link
            to="/signup"
            className="text-sm text-emerald-600 hover:text-emerald-700"
          >
            Sign Up
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;