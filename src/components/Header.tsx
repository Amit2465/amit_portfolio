import React from 'react';
import { motion } from 'framer-motion';
import { Download, Github, Linkedin, Mail } from 'lucide-react';

const Header = () => {
  return (
    <motion.header 
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-xl border-b border-white/10"
    >
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <motion.div 
            whileHover={{ scale: 1.05 }}
            className="text-2xl font-bold text-white relative"
          >
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              Sugith
            </motion.span>
            <motion.div
              className="absolute -bottom-1 left-0 h-0.5 bg-white"
              initial={{ width: 0 }}
              animate={{ width: '100%' }}
              transition={{ delay: 1, duration: 0.8 }}
            />
          </motion.div>
          
          <div className="flex items-center gap-4">
            <motion.a
              whileHover={{ scale: 1.1, y: -2 }}
              whileTap={{ scale: 0.95 }}
              href="/Priyanshu_Resume.pdf"
              download
              className="flex items-center gap-2 px-6 py-3 bg-white text-black rounded-lg hover:bg-gray-100 transition-all duration-300 font-medium"
            >
              <Download size={16} />
              <span className="hidden sm:inline">Resume</span>
            </motion.a>
            
            <div className="flex items-center gap-2">
              {[
                { icon: Github, href: "https://github.com", delay: 0.1 },
                { icon: Linkedin, href: "https://linkedin.com", delay: 0.2 },
                { icon: Mail, href: "mailto:contact@example.com", delay: 0.3 }
              ].map(({ icon: Icon, href, delay }, index) => (
                <motion.a
                  key={index}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: delay + 0.5 }}
                  whileHover={{ scale: 1.2, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 text-white/70 hover:text-white transition-colors rounded-lg hover:bg-white/5"
                >
                  <Icon size={20} />
                </motion.a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.header>
  );
};

export default Header;