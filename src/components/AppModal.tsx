import React from 'react';
import { motion } from 'framer-motion';
import { X } from 'lucide-react';

interface AppModalProps {
  children: React.ReactNode;
  onClose: () => void;
}

const AppModal = ({ children, onClose }: AppModalProps) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        transition={{ type: "spring", damping: 25, stiffness: 300 }}
        className="relative bg-white rounded-3xl shadow-2xl max-w-md w-full max-h-[80vh] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 bg-gray-100 hover:bg-gray-200 rounded-full transition-colors"
        >
          <X size={20} />
        </button>
        
        <div className="h-full overflow-auto">
          {children}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default AppModal;