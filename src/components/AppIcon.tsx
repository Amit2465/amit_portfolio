import React from 'react';
import { motion } from 'framer-motion';

interface AppIconProps {
  app: {
    id: string;
    name: string;
    icon: string;
    color: string;
  };
}

const AppIcon = ({ app }: AppIconProps) => {
  return (
    <motion.div
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      className="flex flex-col items-center cursor-pointer"
    >
      <div className={`w-10 h-10 bg-gradient-to-r ${app.color} rounded-xl flex items-center justify-center shadow-lg mb-1`}>
        <span className="text-sm">{app.icon}</span>
      </div>
      <span className="text-white text-xs text-center leading-tight max-w-[50px] truncate">{app.name}</span>
    </motion.div>
  );
};

export default AppIcon;