import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 w-full bg-white/90 backdrop-blur-sm z-50 shadow-sm">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="text-2xl font-bold text-emerald-600 hover:text-emerald-700 transition-colors">
            Osmani AI
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              to="/"
              className="text-gray-700 hover:text-emerald-600 transition-colors font-medium"
            >
              Home
            </Link>
            <Link
              to="/about"
              className="text-gray-700 hover:text-emerald-600 transition-colors font-medium"
            >
              About
            </Link>
            <Link
              to="/role"
              className="text-gray-700 hover:text-emerald-600 transition-colors font-medium"
            >
              Role
            </Link>
            <Link
              to="/chat"
              className="bg-emerald-600 text-white px-6 py-2 rounded-full hover:bg-emerald-700 transition-colors font-medium"
            >
              Try AI Assistant
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 text-gray-700 hover:text-emerald-600 transition-colors"
          >
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: isOpen ? 1 : 0, y: isOpen ? 0 : -20 }}
          transition={{ duration: 0.3 }}
          className={`md:hidden ${isOpen ? 'block' : 'hidden'} bg-white/95 backdrop-blur-sm shadow-lg`}
        >
          <div className="px-4 pt-4 pb-6 space-y-2">
            <Link
              to="/"
              className="block px-4 py-3 text-gray-700 hover:text-emerald-600 hover:bg-gray-50 rounded-lg transition-colors font-medium"
            >
              Home
            </Link>
            <Link
              to="/about"
              className="block px-4 py-3 text-gray-700 hover:text-emerald-600 hover:bg-gray-50 rounded-lg transition-colors font-medium"
            >
              About
            </Link>
            <Link
              to="/chat"
              className="block px-4 py-3 text-gray-700 hover:text-emerald-600 hover:bg-gray-50 rounded-lg transition-colors font-medium"
            >
              Try AI Assistant
            </Link>
          </div>
        </motion.div>
      </div>
    </nav>
  );
}