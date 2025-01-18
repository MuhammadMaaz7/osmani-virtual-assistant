import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import ChatSidebar from '../components/Chat/ChatSidebar';
import ChatHeader from '../components/Chat/ChatHeader';
import ChatMessages from '../components/Chat/ChatMessages';
import ChatInput from '../components/Chat/ChatInput';
import QuickPrompts from '../components/Chat/QuickPrompts';
import { useAuth } from '../context/AuthContext'; // Import useAuth

export default function ChatPage() {
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true); // Sidebar state
  const { user, isAuthenticated, logout } = useAuth(); // Use AuthContext

  const handleSend = async (message) => {
    if (!message.trim()) return;

    const newMessage = { type: 'user', content: message };
    setMessages((prev) => [...prev, newMessage]);
    setIsLoading(true);

    // Simulate AI response - replace with actual API call
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          type: 'assistant',
          content: 'This is a sample response from the Osmani AI Assistant.',
        },
      ]);
      setIsLoading(false);
    }, 1000);
  };

  const handlePromptSelect = (prompt) => {
    handleSend(prompt);
  };

  return (
    <div className="h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <div
        className={`h-screen transition-all duration-300 ${
          isSidebarOpen ? 'w-64' : 'w-0'
        }`}
      >
        <ChatSidebar
          isOpen={isSidebarOpen}
          onToggle={() => setIsSidebarOpen(!isSidebarOpen)}
        />
      </div>

      {/* Floating Button to Open Sidebar */}
      {!isSidebarOpen && (
        <button
          onClick={() => setIsSidebarOpen(true)}
          className="fixed left-0 top-1/2 transform -translate-y-1/2 z-20 p-2 bg-white text-emerald-600 rounded-r-full shadow-lg hover:bg-emerald-700 transition-colors hover:shadow-xl"
        >
          <ChevronRight className="h-5 w-5" /> {/* Arrow pointing right */}
        </button>
      )}

      {/* Main Chat Layout */}
      <div
        className={`flex-1 flex flex-col overflow-hidden transition-all duration-300 ${
          isSidebarOpen ? 'w-[calc(100%-16rem)]' : 'w-full'
        }`}
      >
        {/* Chat Header */}
        <ChatHeader
          onMenuClick={() => setIsSidebarOpen(!isSidebarOpen)}
          isSidebarOpen={isSidebarOpen}
          isLoggedIn={isAuthenticated} // Pass isAuthenticated
          user={user} // Pass user data
          onLogout={logout} // Pass logout function
        />

        {/* Chat Content */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Chat Messages or Quick Prompts */}
          <div className="flex-1 overflow-y-auto bg-white">
            {messages.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center p-4 sm:p-8 bg-gray-50">
                <h2 className="text-2xl sm:text-3xl font-semibold text-gray-900 mb-8 text-center">
                  Welcome to Osmani AI Assistant
                </h2>
                <QuickPrompts onPromptSelect={handlePromptSelect} />
              </div>
            ) : (
              <ChatMessages messages={messages} />
            )}
          </div>

          {/* Chat Input */}
          <div className="border-t border-gray-200">
            <ChatInput onSend={handleSend} isLoading={isLoading} />
          </div>
        </div>
      </div>
    </div>
  );
}