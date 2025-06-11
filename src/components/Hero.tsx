import React from 'react';
import { motion } from 'framer-motion';
import { Github, Linkedin, Mail, FileText, Play } from 'lucide-react';

const Hero = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  };

  return (
    <div className="h-full flex flex-col justify-center">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div variants={itemVariants} className="mb-8">
          <motion.h1 
            className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 flex items-center gap-4"
          >
            <motion.span 
              className="text-4xl md:text-6xl"
              animate={{ 
                rotate: [0, 14, -8, 14, -4, 10, 0],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                repeatDelay: 3
              }}
            >
              👋
            </motion.span>
            <span className="text-white">I'm Sugith</span>
          </motion.h1>
        </motion.div>
        
        <motion.div 
          variants={itemVariants}
          className="text-3xl md:text-5xl lg:text-6xl font-bold mb-8 text-gray-400"
        >
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1, duration: 0.8 }}
          >
            Flutter Developer +
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.2, duration: 0.8 }}
          >
            UI/UX Designer
          </motion.div>
        </motion.div>
        
        <motion.div 
          variants={itemVariants}
          className="text-lg text-gray-300 mb-8 max-w-2xl"
        >
          <motion.div 
            className="mb-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5, duration: 0.8 }}
          >
            Welcome to my digital playground!
          </motion.div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.7, duration: 0.8 }}
          >
            Software developer by day, UI/UX developer by night.
          </motion.div>
        </motion.div>

        <motion.div 
          variants={itemVariants}
          className="flex flex-wrap items-center gap-4 mb-12"
        >
          <motion.button 
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-2 px-6 py-3 bg-white text-black rounded-lg hover:bg-gray-100 transition-all duration-300 font-medium"
          >
            <FileText size={16} />
            Connect Me
          </motion.button>
          
          <div className="flex items-center gap-3">
            {[
              { icon: Github, href: "https://github.com", delay: 0 },
              { icon: Linkedin, href: "https://linkedin.com", delay: 0.1 },
              { icon: Mail, href: "mailto:contact@example.com", delay: 0.2 },
              { icon: Play, href: "#", delay: 0.3 }
            ].map(({ icon: Icon, href, delay }, index) => (
              <motion.a
                key={index}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 2 + delay, duration: 0.5 }}
                whileHover={{ scale: 1.2, y: -2 }}
                whileTap={{ scale: 0.95 }}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-white/5 hover:bg-white/10 rounded-lg transition-all duration-300 border border-white/10 hover:border-white/20"
              >
                <Icon size={20} />
              </motion.a>
            ))}
          </div>
        </motion.div>

        {/* Stats */}
        <motion.div 
          variants={itemVariants}
          className="grid grid-cols-2 md:grid-cols-4 gap-8"
        >
          {[
            { number: "2.5+", label: "Years of Experience" },
            { number: "10+", label: "Projects Completed" },
            { number: "5+", label: "Happy Clients" },
            { number: "10+", label: "UI/UX Designs" }
          ].map((stat, index) => (
            <motion.div
              key={index}
              className="text-center group"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 2.5 + index * 0.1, duration: 0.8 }}
              whileHover={{ scale: 1.05 }}
            >
              <motion.div 
                className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-2"
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 0.3 }}
              >
                {stat.number}
              </motion.div>
              <div className="text-sm text-gray-400 group-hover:text-gray-300 transition-colors">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Hero;