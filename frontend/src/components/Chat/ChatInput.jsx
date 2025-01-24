import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Paperclip } from 'lucide-react';
import FileAttachmentList from './ChatInput/FileAttachmentList';
import VoiceInput from './ChatInput/VoiceInput';

export default function ChatInput({ onSend, isLoading }) {
  const [input, setInput] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [interimTranscript, setInterimTranscript] = useState('');
  const [attachments, setAttachments] = useState([]);
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setAttachments((prev) => [...prev, ...files]);
  };

  const removeAttachment = (index) => {
    setAttachments((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!input.trim() && !isRecording && attachments.length === 0) return;
    onSend(input, attachments);
    setInput('');
    setAttachments([]);
  };

  const handleTranscript = (transcript, isInterim = false) => {
    if (isInterim) {
      setInterimTranscript(transcript);
    } else {
      setInput((prev) => prev + transcript);
      setInterimTranscript('');
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="border-t border-gray-200 bg-white/90 backdrop-blur-sm p-4 shadow-sm"
    >
      <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
        {/* Display Attachments */}
        {attachments.length > 0 && (
          <FileAttachmentList
            attachments={attachments}
            onRemoveAttachment={removeAttachment}
          />
        )}

        <div className="flex items-center space-x-2">
          {/* File Attachment Button */}
          <motion.button
            type="button"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => fileInputRef.current.click()}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <Paperclip className="h-5 w-5 text-gray-600" />
          </motion.button>
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            className="hidden"
            multiple
          />

          {/* Input Field */}
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
              {/* Voice Input Button */}
              <VoiceInput
                onTranscript={handleTranscript}
                isRecording={isRecording}
                setIsRecording={setIsRecording}
              />

              {/* Send Button */}
              <motion.button
                type="submit"
                disabled={(!input.trim() && !isRecording && attachments.length === 0) || isLoading}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="p-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <Send className="h-5 w-5" />
              </motion.button>
            </div>
          </div>
        </div>

        {/* Recording Indicator */}
        <AnimatePresence>
          {isRecording && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="flex items-center justify-center space-x-2"
            >
              <div className="w-2 h-2 bg-red-600 rounded-full animate-pulse" />
              <span className="text-sm text-red-600">Listening...</span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Real-Time Transcription */}
        <AnimatePresence>
          {interimTranscript && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="text-sm text-gray-500 italic"
            >
              <span className="font-semibold">You said:</span> {interimTranscript}
            </motion.div>
          )}
        </AnimatePresence>
      </form>
    </motion.div>
  );
}