import { AnimatePresence, motion } from 'framer-motion';
import FileAttachment from './FileAttachment';

export default function FileAttachmentList({ attachments, onRemoveAttachment }) {
  return (
    <div className="flex flex-wrap gap-2">
      <AnimatePresence>
        {attachments.map((file, index) => (
          <FileAttachment
            key={index}
            file={file}
            onRemove={() => onRemoveAttachment(index)}
          />
        ))}
      </AnimatePresence>
    </div>
  );
}