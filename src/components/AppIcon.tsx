import React from 'react';
import { motion } from 'framer-motion';

interface AppIconProps {
  app: {
    id: string;
    name: string;
    icon: any;
    color: string;
  };
}

const AppIcon = ({ app }: AppIconProps) => {
  const IconComponent = app.icon;
  
  return (
    <motion.div
      whileHover={{ scale: 1.1, y: -2 }}
      whileTap={{ scale: 0.95 }}
      className="flex flex-col items-center cursor-pointer"
    >
      <div className={`w-14 h-14 bg-gradient-to-r ${app.color} rounded-2xl flex items-center justify-center shadow-lg border border-white/20 hover:shadow-xl transition-all duration-300`}>
        <IconComponent className="text-white" size={24} />
      </div>
    </motion.div>
  );
};

export default AppIcon;