import { motion, AnimatePresence } from "framer-motion";
import { Search, Plus, Settings, ChevronLeft } from "lucide-react"; // Import only necessary icons
import logo from "../../assets/logo.png";

export default function ChatSidebar({ isOpen, onToggle }) {
  // Hardcoded chat history grouped by time
  const chatHistory = {
    Today: [
      { id: 1, title: "Project Information", isActive: true },
      { id: 2, title: "Company Services" },
    ],
    Yesterday: [{ id: 3, title: "Team Expertise" }],
    "Previous 7 Days": [
      { id: 4, title: "Client Feedback" },
      { id: 5, title: "Project Timeline" },
    ],
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Mobile Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/20 z-20 lg:hidden"
            onClick={onToggle}
          />

          {/* Sidebar */}
          <motion.aside
            initial={{ x: -300 }}
            animate={{ x: 0 }}
            exit={{ x: -300 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed lg:sticky top-0 left-0 w-64 bg-white/90 backdrop-blur-sm border-r border-gray-200 z-30 flex flex-col h-screen shadow-lg"
          >
            {/* Close Sidebar Button */}
            <button
              onClick={onToggle}
              className="fixed right-0 top-1/2 transform -translate-y-1/2 z-20 p-2 bg-white text-emerald-600 rounded-l-full shadow-lg hover:bg-emerald-700 transition-colors hover:shadow-xl"
            >
              <ChevronLeft className="h-5 w-5" /> {/* Arrow pointing left */}
            </button>

            {/* Header */}
            <div className="p-4 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <img src={logo} alt="Osmani" className="h-8 w-auto" />
                  <h2 className="ml-2 text-lg font-semibold text-gray-900">
                    Chats
                  </h2>
                </div>
                {/* New Chat Icon */}
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="p-2 hover:bg-gray-100 rounded-lg"
                >
                  <Plus className="h-5 w-5 text-gray-700" />
                </motion.button>
              </div>
            </div>

            {/* Search */}
            <div className="p-4 border-b border-gray-200">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <input
                  type="text"
                  placeholder="Search..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-gray-50 text-sm"
                />
              </div>
            </div>

            {/* Chat List */}
            <div className="flex-1 overflow-y-auto p-4 space-y-6">
              {Object.entries(chatHistory).map(([group, chats]) => (
                <div key={group}>
                  <h3 className="text-xs font-semibold text-gray-500 uppercase mb-2">
                    {group}
                  </h3>
                  <div className="space-y-1">
                    {chats.map((chat) => (
                      <motion.div
                        key={chat.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.4 }}
                        className={`p-2 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors ${
                          chat.isActive ? "bg-emerald-50/50" : ""
                        }`}
                      >
                        <p className="text-sm text-gray-700 truncate">
                          {chat.title}
                        </p>
                      </motion.div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Settings Button */}
            <div className="p-4">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="w-full flex items-center justify-center p-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
              >
                <Settings className="h-5 w-5" />
                {isOpen && <span className="ml-2 text-sm">Settings</span>}
              </motion.button>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
