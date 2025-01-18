import { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, Mic, ImageIcon, Paperclip, X } from 'lucide-react';

export default function ChatInput({ onSend, isLoading }) {
  const [input, setInput] = useState('');
  const [isRecording, setIsRecording] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!input.trim() && !isRecording) return;
    onSend(input);
    setInput('');
  };

  const toggleRecording = () => {
    setIsRecording(!isRecording);
    // Add actual voice recording logic here
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="border-t border-gray-200 bg-white/90 backdrop-blur-sm p-4 shadow-sm"
    >
      <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
        <div className="flex items-center space-x-2">
          <motion.button
            type="button"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <Paperclip className="h-5 w-5 text-gray-600" />
          </motion.button>
          <motion.button
            type="button"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <ImageIcon className="h-5 w-5 text-gray-600" />
          </motion.button>
          <div className="flex-1 relative">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask anything about Osmani & Company..."
              className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 pr-24"
              disabled={isRecording}
            />
            <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex items-center space-x-2">
              <motion.button
                type="button"
                onClick={toggleRecording}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className={`p-2 rounded-lg transition-colors ${
                  isRecording
                    ? 'bg-red-50 text-red-600'
                    : 'hover:bg-gray-100 text-gray-600'
                }`}
              >
                {isRecording ? <X className="h-5 w-5" /> : <Mic className="h-5 w-5" />}
              </motion.button>
              <motion.button
                type="submit"
                disabled={(!input.trim() && !isRecording) || isLoading}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="p-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <Send className="h-5 w-5" />
              </motion.button>
            </div>
          </div>
        </div>
        {isRecording && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center justify-center text-sm text-red-600"
          >
            Recording... Click the X to cancel
          </motion.div>
        )}
      </form>
    </motion.div>
  );
}