import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthForm from "../components/SignupLogin/AuthForm";
import { signup } from "../services/authService";
import { useAuth } from "../context/AuthContext";

const SignupPage = () => {
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const { login: authLogin } = useAuth();

  const handleSignup = async (data) => {
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
        const response = await signup(data.name, data.email, data.password);
        console.log("Signup successful:", response);
        // Update auth context
        authLogin(response, response.token);
        // Redirect to dashboard or home page
        navigate("/login");
      } catch (error) {
        setErrors({ general: error.message });
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96">
        <h1 className="text-2xl font-semibold text-gray-900 mb-6">Sign Up</h1>
        <AuthForm isLogin={false} onSubmit={handleSignup} errors={errors} />
        <div className="mt-4 text-center">
          <span className="text-sm text-gray-600">Already have an account? </span>
          <Link
            to="/login"
            className="text-sm text-emerald-600 hover:text-emerald-700"
          >
            Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;