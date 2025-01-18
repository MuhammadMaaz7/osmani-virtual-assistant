import { motion } from 'framer-motion';
import { Building, Users, FileText, Briefcase } from 'lucide-react';

export default function QuickPrompts({ onPromptSelect }) {
  const prompts = [
    {
      icon: <Building className="h-5 w-5" />,
      text: "Tell me about your latest projects",
    },
    {
      icon: <Users className="h-5 w-5" />,
      text: "What services do you offer?",
    },
    {
      icon: <FileText className="h-5 w-5" />,
      text: "How can I request a proposal?",
    },
    {
      icon: <Briefcase className="h-5 w-5" />,
      text: "What are your areas of expertise?",
    },
  ];

  return (
    <div className="w-full max-w-3xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-4 p-4">
      {prompts.map((prompt, index) => (
        <motion.button
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1, duration: 0.4 }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => onPromptSelect(prompt.text)}
          className="flex items-center space-x-3 p-4 rounded-xl border border-gray-200 hover:border-emerald-500 hover:bg-emerald-50 transition-colors text-left w-full bg-white shadow-sm"
        >
          <div className="text-emerald-600 flex-shrink-0">{prompt.icon}</div>
          <span className="text-sm text-gray-700">{prompt.text}</span>
        </motion.button>
      ))}
    </div>
  );
}