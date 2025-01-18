import { motion } from 'framer-motion';
import { ArrowRight, Mic, Headphones } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700 overflow-hidden">
      {/* Animated Gradient Overlay */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: [0.4, 0.6, 0.4] }}
        transition={{ duration: 5, repeat: Infinity }}
        className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,_rgba(255,255,255,0.1),_rgba(255,255,255,0))]"
      />

      {/* Content */}
      <div className="relative z-20 text-center px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold text-white mb-6 leading-tight">
            Meet the <span className="text-emerald-400">Osmani AI Assistant</span>
          </h1>
          <p className="text-xl sm:text-2xl text-gray-300 mb-12 max-w-2xl mx-auto">
            Your intelligent companion for all queries related to Osmani & Company. Get instant answers about our services, projects, and expertise.
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-6">
            <Link
              to="/chat"
              className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold rounded-full text-gray-900 bg-emerald-400 hover:bg-emerald-500 transition-colors group"
            >
              Try AI Assistant
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              to="/login"
              className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold rounded-full text-white border-2 border-emerald-400 hover:bg-emerald-400 hover:text-gray-900 transition-colors"
            >
              Sign In
            </Link>
          </div>
        </motion.div>

        {/* Voice Input/Output Icons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-16 flex justify-center gap-8"
        >
          <div className="flex items-center gap-3 text-gray-300 hover:text-emerald-400 transition-colors cursor-pointer">
            <Mic className="h-7 w-7" />
            <span className="text-lg">Voice Input</span>
          </div>
          <div className="flex items-center gap-3 text-gray-300 hover:text-emerald-400 transition-colors cursor-pointer">
            <Headphones className="h-7 w-7" />
            <span className="text-lg">Voice Output</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}