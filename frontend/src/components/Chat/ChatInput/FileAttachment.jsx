import { motion } from 'framer-motion';
import { File, FileText, Image, FileCode, X } from 'lucide-react';

export default function FileAttachment({ file, onRemove }) {
  // Function to get the file icon based on file type
  const getFileIcon = (fileName) => {
    const extension = fileName.split('.').pop().toLowerCase();
    switch (extension) {
      case 'pdf':
        return <FileText className="h-4 w-4 text-red-600" />;
      case 'png':
      case 'jpg':
      case 'jpeg':
      case 'gif':
        return <Image className="h-4 w-4 text-emerald-600" />;
      case 'txt':
        return <FileText className="h-4 w-4 text-gray-600" />;
      case 'html':
      case 'css':
      case 'js':
        return <FileCode className="h-4 w-4 text-blue-600" />;
      default:
        return <File className="h-4 w-4 text-gray-600" />;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className="flex items-center space-x-2 bg-gray-100 rounded-lg px-3 py-2"
    >
      {/* File Icon */}
      {getFileIcon(file.name)}

      {/* File Name */}
      <span className="text-sm text-gray-700 truncate max-w-[150px]">
        {file.name}
      </span>

      {/* Remove Button */}
      <button
        type="button"
        onClick={onRemove}
        className="p-1 hover:bg-gray-200 rounded-full transition-colors"
      >
        <X className="h-4 w-4 text-gray-600" />
      </button>
    </motion.div>
  );
}