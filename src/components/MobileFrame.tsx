import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AppType } from '../types';
import { ArrowLeft } from 'lucide-react';

interface MobileFrameProps {
  onAppSelect: (app: AppType | null) => void;
  selectedApp: AppType | null;
  renderApp: () => React.ReactNode;
}

const MobileFrame = ({ onAppSelect, selectedApp, renderApp }: MobileFrameProps) => {
  const apps = [
    { 
      id: 'github' as const, 
      name: 'GitHub', 
      image: 'https://github.githubassets.com/assets/GitHub-Mark-ea2971cee799.png',
      color: 'from-gray-700 to-gray-900' 
    },
    { 
      id: 'playstore' as const, 
      name: 'Play Store', 
      image: 'https://play.google.com/intl/en_us/badges/static/images/badges/en_badge_web_generic.png',
      color: 'from-green-500 to-emerald-500' 
    },
    { 
      id: 'linkedin' as const, 
      name: 'LinkedIn', 
      image: 'https://content.linkedin.com/content/dam/me/business/en-us/amp/brand-site/v2/bg/LI-Bug.svg.original.svg',
      color: 'from-blue-600 to-blue-800' 
    },
    { 
      id: 'whatsapp' as const, 
      name: 'WhatsApp', 
      image: 'https://static.whatsapp.net/rsrc.php/v3/yz/r/ujTY9i_3-1_.png',
      color: 'from-green-400 to-green-600' 
    },
    
    { 
      id: 'tictactoe' as AppType, 
      name: 'Tic Tac Toe', 
      image: 'https://is1-ssl.mzstatic.com/image/thumb/Purple126/v4/6e/5a/e1/6e5ae1b1-7b1e-4c89-9d42-5a3d8b2c5f1a/AppIcon-0-0-1x_U007emarketing-0-0-0-7-0-0-sRGB-0-0-0-GLES2_U002c0-512MB-85-220-0-0.png/512x512bb.jpg',
      color: 'from-indigo-500 to-purple-500' 
    },
    { 
      id: 'calculator' as AppType, 
      name: 'Calculator', 
      image: 'https://is1-ssl.mzstatic.com/image/thumb/Purple126/v4/bc/b3/4d/bcb34d1c-7c8e-4c89-9d42-5a3d8b2c5f1a/Calculator.png/512x512bb.jpg',
      color: 'from-gray-600 to-gray-800' 
    },
    { 
      id: 'todo' as AppType, 
      name: 'Reminders', 
      image: 'https://is1-ssl.mzstatic.com/image/thumb/Purple126/v4/8f/8e/8d/8f8e8d1c-7c8e-4c89-9d42-5a3d8b2c5f1a/Reminders.png/512x512bb.jpg',
      color: 'from-green-500 to-emerald-500' 
    },
    { 
      id: 'music' as AppType, 
      name: 'Music', 
      image: 'https://is1-ssl.mzstatic.com/image/thumb/Purple126/v4/fd/7e/8c/fd7e8c1c-7c8e-4c89-9d42-5a3d8b2c5f1a/Music.png/512x512bb.jpg',
      color: 'from-purple-500 to-indigo-500' 
    },
    
    { 
      id: 'weather' as AppType, 
      name: 'Weather', 
      image: 'https://is1-ssl.mzstatic.com/image/thumb/Purple126/v4/4e/3d/2c/4e3d2c1b-7c8e-4c89-9d42-5a3d8b2c5f1a/Weather.png/512x512bb.jpg',
      color: 'from-blue-400 to-sky-500' 
    },
  ];

  const handleAppClick = (appId: string) => {
    if (['tictactoe', 'calculator', 'todo', 'music', 'weather'].includes(appId)) {
      onAppSelect(appId as AppType);
    }
  };

  const handleBackClick = () => {
    onAppSelect(null);
  };

  const AppIcon = ({ app, index }: { app: any, index: number }) => {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ 
          duration: 0.6, 
          delay: 1.2 + index * 0.08,
          type: "spring",
          stiffness: 200
        }}
        whileHover={{ scale: 1.1, y: -2 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => handleAppClick(app.id)}
        className="flex flex-col items-center cursor-pointer"
      >
        <div className="w-14 h-14 rounded-2xl overflow-hidden shadow-lg border border-white/20 hover:shadow-xl transition-all duration-300 mb-2 bg-white relative">
          <img 
            src={app.image} 
            alt={app.name}
            className="w-full h-full object-cover"
            onError={(e) => {
              // Fallback to Apple-style gradient background if image fails to load
              const target = e.target as HTMLImageElement;
              target.style.display = 'none';
              const parent = target.parentElement!;
              parent.className = parent.className.replace('bg-white', `bg-gradient-to-br ${app.color}`);
              parent.innerHTML = `<div class="w-full h-full flex items-center justify-center text-white font-bold text-lg">${getAppIcon(app.id)}</div>`;
            }}
          />
        </div>
        <span className="text-white text-xs text-center leading-tight max-w-[60px] truncate">{app.name}</span>
      </motion.div>
    );
  };

  const getAppIcon = (appId: string) => {
    const iconMap: { [key: string]: string } = {
      'github': '🐙',
      'playstore': '▶️',
      'linkedin': '💼',
      'whatsapp': '💬',
      'tictactoe': '⭕',
      'calculator': '🔢',
      'todo': '✅',
      'music': '🎵',
      'weather': '🌤️'
    };
    return iconMap[appId] || '📱';
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

                    {/* App Grid - 4 icons per row with names */}
                    <div className="grid grid-cols-4 gap-4 mt-8 relative z-10 justify-items-center">
                      {apps.map((app, index) => (
                        <AppIcon key={app.id} app={app} index={index} />
                      ))}
                    </div>
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