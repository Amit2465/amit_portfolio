import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AppType } from '../types';
import AppIcon from './AppIcon';
import { ArrowLeft } from 'lucide-react';

interface MobileFrameProps {
  onAppSelect: (app: AppType | null) => void;
  selectedApp: AppType | null;
  renderApp: () => React.ReactNode;
}

const MobileFrame = ({ onAppSelect, selectedApp, renderApp }: MobileFrameProps) => {
  const apps = [
    { id: 'github' as const, name: 'Github', icon: '🐙', color: 'from-gray-700 to-gray-900' },
    { id: 'playstore' as const, name: 'Play Store', icon: '▶️', color: 'from-green-500 to-emerald-500' },
    { id: 'linkedin' as const, name: 'LinkedIn', icon: '💼', color: 'from-blue-600 to-blue-800' },
    { id: 'whatsapp' as const, name: 'WhatsApp', icon: '💬', color: 'from-green-400 to-green-600' },
    
    { id: 'tictactoe' as AppType, name: 'Tic Tac Toe', icon: '⭕', color: 'from-indigo-500 to-purple-500' },
    { id: 'calculator' as AppType, name: 'Calculator', icon: '🔢', color: 'from-gray-600 to-gray-800' },
    { id: 'device' as const, name: 'Device', icon: '🍎', color: 'from-gray-500 to-gray-700' },
  ];

  const gameApps = [
    { id: 'todo' as AppType, name: 'Todo', icon: '✅', color: 'from-green-500 to-emerald-500' },
    { id: 'music' as AppType, name: 'Music', icon: '🎵', color: 'from-purple-500 to-indigo-500' },
  ];

  const handleAppClick = (appId: string) => {
    if (['tictactoe', 'calculator', 'todo', 'music'].includes(appId)) {
      onAppSelect(appId as AppType);
    }
  };

  const handleBackClick = () => {
    onAppSelect(null);
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8, y: 50 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
      className="relative mx-auto"
      style={{ width: '300px', height: '600px' }}
    >
      {/* Phone Frame with enhanced styling */}
      <motion.div 
        className="absolute inset-0 bg-gradient-to-b from-gray-800 to-gray-900 rounded-[3rem] p-2 shadow-2xl"
        whileHover={{ scale: 1.02 }}
        transition={{ duration: 0.3 }}
      >
        {/* Glowing border effect */}
        <div className="absolute inset-0 rounded-[3rem] bg-gradient-to-r from-white/20 via-transparent to-white/20 opacity-50" />
        
        <div className="w-full h-full bg-black rounded-[2.5rem] overflow-hidden relative border border-white/10">
          {/* Enhanced Status Bar */}
          <motion.div 
            className="flex justify-between items-center px-6 py-3 text-white text-sm bg-black/50 backdrop-blur-sm"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.5 }}
          >
            <span className="font-medium">9:41</span>
            <div className="flex items-center gap-1">
              <motion.div 
                className="w-4 h-2 border border-white rounded-sm"
                animate={{ opacity: [1, 0.5, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <div className="w-3 h-1 bg-white rounded-sm"></div>
              </motion.div>
            </div>
          </motion.div>

          {/* App Content Area */}
          <div className="flex-1 relative" style={{ height: 'calc(100% - 60px)' }}>
            <AnimatePresence mode="wait">
              {selectedApp ? (
                <motion.div
                  key="app-content"
                  initial={{ x: 300, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{ x: -300, opacity: 0 }}
                  transition={{ duration: 0.4, ease: "easeInOut" }}
                  className="absolute inset-0 bg-black"
                >
                  {/* Enhanced Back Button */}
                  <div className="absolute top-4 left-4 z-10">
                    <motion.button
                      whileHover={{ scale: 1.1, x: -2 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={handleBackClick}
                      className="p-2 bg-white/10 backdrop-blur-sm rounded-full text-white border border-white/20 hover:bg-white/20 transition-all duration-300"
                    >
                      <ArrowLeft size={20} />
                    </motion.button>
                  </div>
                  
                  {/* App Content */}
                  <div className="h-full overflow-hidden">
                    {renderApp()}
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="home-screen"
                  initial={{ x: -300, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{ x: 300, opacity: 0 }}
                  transition={{ duration: 0.4, ease: "easeInOut" }}
                  className="absolute inset-0"
                >
                  {/* Enhanced Wallpaper with Apps */}
                  <div className="h-full p-6 relative bg-gradient-to-br from-gray-900/30 via-black to-gray-900/30">
                    {/* Animated background pattern */}
                    <div className="absolute inset-0 opacity-10">
                      {[...Array(10)].map((_, i) => (
                        <motion.div
                          key={i}
                          className="absolute w-1 h-1 bg-white rounded-full"
                          style={{
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                          }}
                          animate={{
                            opacity: [0, 1, 0],
                            scale: [0, 1, 0],
                          }}
                          transition={{
                            duration: 3,
                            repeat: Infinity,
                            delay: Math.random() * 2,
                          }}
                        />
                      ))}
                    </div>

                    {/* App Grid */}
                    <div className="grid grid-cols-5 gap-3 mt-4 relative z-10">
                      {apps.map((app, index) => (
                        <motion.div
                          key={app.id}
                          initial={{ opacity: 0, scale: 0, y: 20 }}
                          animate={{ opacity: 1, scale: 1, y: 0 }}
                          transition={{ 
                            duration: 0.6, 
                            delay: 1.2 + index * 0.08,
                            type: "spring",
                            stiffness: 200
                          }}
                          onClick={() => handleAppClick(app.id)}
                          className="cursor-pointer"
                        >
                          <AppIcon app={app} />
                        </motion.div>
                      ))}
                    </div>

                    {/* Enhanced Game Apps in Dock Area */}
                    <motion.div 
                      className="absolute bottom-20 left-6 right-6"
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 2, duration: 0.8 }}
                    >
                      <div className="bg-white/10 backdrop-blur-md rounded-2xl p-3 border border-white/20">
                        <div className="flex justify-center gap-4">
                          {gameApps.map((app, index) => (
                            <motion.div
                              key={app.id}
                              initial={{ opacity: 0, scale: 0 }}
                              animate={{ opacity: 1, scale: 1 }}
                              transition={{ 
                                delay: 2.2 + index * 0.1, 
                                duration: 0.5,
                                type: "spring",
                                stiffness: 200
                              }}
                              whileHover={{ scale: 1.1, y: -2 }}
                              whileTap={{ scale: 0.95 }}
                              onClick={() => handleAppClick(app.id)}
                              className="cursor-pointer"
                            >
                              <div className={`w-12 h-12 bg-gradient-to-r ${app.color} rounded-xl flex items-center justify-center shadow-lg border border-white/20`}>
                                <span className="text-lg">{app.icon}</span>
                              </div>
                            </motion.div>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Enhanced Home Indicator */}
          <motion.div 
            className="flex justify-center pb-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5, duration: 0.5 }}
          >
            <div className="w-32 h-1 bg-white/30 rounded-full"></div>
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default MobileFrame;