import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send } from 'lucide-react';

const Contact = () => {
  const contactInfo = [
    { icon: Mail, label: "Email", value: "contact@sugith.dev", color: "text-white" },
    { icon: Phone, label: "Phone", value: "+91 98765 43210", color: "text-white" },
    { icon: MapPin, label: "Location", value: "India", color: "text-white" }
  ];

  return (
    <motion.section
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
      className="w-full bg-white/5 backdrop-blur-sm rounded-3xl p-12 border border-white/10 hover:border-white/20 transition-all duration-500"
    >
      <motion.h2 
        className="text-4xl md:text-5xl font-bold text-white mb-12"
        initial={{ opacity: 0, x: -30 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.2, duration: 0.8 }}
        viewport={{ once: true }}
      >
        Get In Touch
      </motion.h2>
      
      <div className="grid lg:grid-cols-2 gap-12">
        <div>
          <motion.p 
            className="text-white/80 text-xl mb-8"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            viewport={{ once: true }}
          >
            I'm always open to discussing new opportunities and interesting projects. 
            Let's create something amazing together!
          </motion.p>
          
          <div className="space-y-6">
            {contactInfo.map((info, index) => (
              <motion.div
                key={info.label}
                className="flex items-center gap-6 group"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 + index * 0.1, duration: 0.8 }}
                viewport={{ once: true }}
                whileHover={{ x: 10 }}
              >
                <motion.div 
                  className="w-14 h-14 bg-white/10 rounded-lg flex items-center justify-center border border-white/20 group-hover:border-white/40 transition-all duration-300"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                >
                  <info.icon className={info.color} size={24} />
                </motion.div>
                <div>
                  <p className="text-white font-medium text-lg">{info.label}</p>
                  <p className="text-white/70 group-hover:text-white/90 transition-colors">{info.value}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
        
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.8, duration: 0.8 }}
          viewport={{ once: true }}
        >
          <form className="space-y-6">
            {[
              { placeholder: "Your Name", type: "text" },
              { placeholder: "Your Email", type: "email" }
            ].map((field, index) => (
              <motion.div
                key={field.placeholder}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 1 + index * 0.1, duration: 0.8 }}
                viewport={{ once: true }}
              >
                <input
                  type={field.type}
                  placeholder={field.placeholder}
                  className="w-full px-6 py-4 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-white/40 focus:bg-white/15 transition-all duration-300 text-lg"
                />
              </motion.div>
            ))}
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2, duration: 0.8 }}
              viewport={{ once: true }}
            >
              <textarea
                rows={5}
                placeholder="Your Message"
                className="w-full px-6 py-4 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-white/40 focus:bg-white/15 transition-all duration-300 resize-none text-lg"
              />
            </motion.div>
            
            <motion.button
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.4, duration: 0.8 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              className="w-full flex items-center justify-center gap-3 px-8 py-4 bg-white text-black rounded-lg hover:bg-gray-100 transition-all duration-300 font-medium text-lg"
            >
              <Send size={20} />
              Send Message
            </motion.button>
          </form>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default Contact;