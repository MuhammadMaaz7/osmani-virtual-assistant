import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Mic, X } from 'lucide-react';

export default function VoiceInput({ onTranscript, isRecording, setIsRecording }) {
  const [recognition, setRecognition] = useState(null);

  useEffect(() => {
    if (typeof window !== 'undefined' && window.webkitSpeechRecognition) {
      const recognitionInstance = new window.webkitSpeechRecognition();
      recognitionInstance.continuous = false;
      recognitionInstance.interimResults = true;
      recognitionInstance.lang = 'en-US';

      recognitionInstance.onresult = (event) => {
        let finalTranscript = '';
        let interimTranscript = '';

        for (let i = event.resultIndex; i < event.results.length; i++) {
          const transcript = event.results[i][0].transcript;
          if (event.results[i].isFinal) {
            finalTranscript += transcript + ' ';
          } else {
            interimTranscript += transcript;
          }
        }

        if (finalTranscript) {
          onTranscript(finalTranscript);
        }

        if (interimTranscript) {
          onTranscript(interimTranscript, true);
        }
      };

      recognitionInstance.onerror = (event) => {
        console.error('Speech recognition error:', event.error);
        setIsRecording(false);
      };

      recognitionInstance.onend = () => {
        setIsRecording(false);
      };

      setRecognition(recognitionInstance);
    } else {
      console.warn('Speech recognition not supported in this browser.');
    }
  }, []);

  const toggleRecording = () => {
    if (isRecording) {
      recognition.stop();
    } else {
      recognition.start();
    }
    setIsRecording(!isRecording);
  };

  return (
    <motion.button
      type="button"
      onClick={toggleRecording}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      className={`p-2 rounded-lg transition-colors ${
        isRecording
          ? 'bg-red-50 text-red-600 hover:bg-red-100'
          : 'hover:bg-gray-100 text-gray-600'
      }`}
    >
      {isRecording ? <X className="h-5 w-5" /> : <Mic className="h-5 w-5" />}
    </motion.button>
  );
}