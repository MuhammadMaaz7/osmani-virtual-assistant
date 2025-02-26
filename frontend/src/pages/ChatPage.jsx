import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import ChatSidebar from '../components/Chat/ChatSidebar';
import ChatHeader from '../components/Chat/ChatHeader';
import ChatMessages from '../components/Chat/ChatMessages';
import ChatInput from '../components/Chat/ChatInput';
import QuickPrompts from '../components/Chat/QuickPrompts';
import { useAuth } from '../context/AuthContext';
import { askQuestion } from '../services/askService'; // Import the service function

export default function ChatPage() {
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [conversationHistory, setConversationHistory] = useState([]); // Add conversation history
  const { user, isAuthenticated, logout } = useAuth();

  const handleSend = async (message) => {
    if (!message.trim()) return;

    const newMessage = { type: 'user', content: message };
    setMessages((prev) => [...prev, newMessage]);
    setIsLoading(true);

    try {
      // Call the API to get the AI response
      const response = await askQuestion(message, conversationHistory);
      const { answer, conversation_history } = response;

      // Update conversation history
      setConversationHistory(conversation_history);

      // Add the assistant's response to messages
      setMessages((prev) => [
        ...prev,
        { type: 'assistant', content: answer },
      ]);
    } catch (error) {
      console.error("Error fetching answer:", error);
      setMessages((prev) => [
        ...prev,
        { type: 'assistant', content: "Sorry, I couldn't fetch the answer. Please try again." },
      ]);
    } finally {
      setIsLoading(false);
    }
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
          isLoggedIn={isAuthenticated}
          user={user}
          onLogout={logout}
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
              <ChatMessages messages={messages} isLoading={isLoading} />
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