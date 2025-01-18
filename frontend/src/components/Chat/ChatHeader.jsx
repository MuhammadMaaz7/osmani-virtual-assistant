import { motion } from 'framer-motion';
import { LogIn, UserPlus, LogOut } from 'lucide-react';
import { useState } from 'react';

export default function ChatHeader({ isLoggedIn, user, onLogout }) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="p-4 bg-gray-50 flex items-center justify-between"
    >
      {/* Title on the Left */}
      <h1 className="text-2xl font-semibold text-gray-900 ml-4">Osmani AI</h1>

      {/* Login/Signup or User Profile on the Right */}
      <div className="flex items-center space-x-3 mr-4">
        {isLoggedIn && user ? ( // Only show profile if user is logged in and user object exists
          // If logged in, show user profile with dropdown
          <div className="relative">
            <button
              onClick={toggleDropdown}
              className="flex items-center justify-center w-10 h-10 bg-emerald-600 text-white rounded-full hover:bg-emerald-700 transition-colors"
            >
              {/* Display user's initial */}
              {user.name.charAt(0).toUpperCase()}
            </button>

            {/* Dropdown Menu */}
            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200">
                <button
                  onClick={onLogout}
                  className="w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center gap-2"
                >
                  <LogOut className="h-4 w-4" />
                  Logout
                </button>
              </div>
            )}
          </div>
        ) : (
          // If not logged in, show login and signup buttons
          <>
            {/* Login Button */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => (window.location.href = '/login')}
              className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
            >
              <LogIn className="h-4 w-4" />
              Login
            </motion.button>

            {/* Signup Button */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => (window.location.href = '/signup')}
              className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-emerald-600 rounded-lg hover:bg-emerald-700 transition-colors"
            >
              <UserPlus className="h-4 w-4" />
              Sign Up
            </motion.button>
          </>
        )}
      </div>
    </motion.div>
  );
}