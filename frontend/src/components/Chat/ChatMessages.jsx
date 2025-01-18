import { motion } from 'framer-motion';

export default function ChatMessages({ messages }) {
  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-6">
      {messages.map((message, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1, duration: 0.4 }}
          className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
        >
          <motion.div
            whileHover={{ scale: 1.02 }}
            className={`max-w-[80%] rounded-2xl px-6 py-4 shadow-sm ${
              message.type === 'user'
                ? 'bg-emerald-600 text-white'
                : 'bg-gray-100 text-gray-800'
            }`}
          >
            {message.content}
          </motion.div>
        </motion.div>
      ))}
    </div>
  );
}