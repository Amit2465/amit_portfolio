import React from 'react';
import { motion } from 'framer-motion';
import { Code, Palette, Smartphone, Users } from 'lucide-react';

const About = () => {
  const skills = [
    { name: 'Flutter', level: 90, color: 'bg-white' },
    { name: 'React', level: 85, color: 'bg-white' },
    { name: 'UI/UX Design', level: 80, color: 'bg-white' },
    { name: 'Node.js', level: 75, color: 'bg-white' },
  ];

  const services = [
    { icon: Smartphone, title: "Mobile App Development", color: "bg-white/5" },
    { icon: Palette, title: "UI/UX Design", color: "bg-white/5" },
    { icon: Code, title: "Web Development", color: "bg-white/5" },
    { icon: Users, title: "Team Collaboration", color: "bg-white/5" }
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
        className="text-4xl md:text-5xl font-bold text-white mb-8"
        initial={{ opacity: 0, x: -30 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.2, duration: 0.8 }}
        viewport={{ once: true }}
      >
        About Me
      </motion.h2>
      
      <motion.p 
        className="text-white/80 text-xl leading-relaxed mb-12 max-w-4xl"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.8 }}
        viewport={{ once: true }}
      >
        I'm a passionate Flutter developer and UI/UX designer with over 2.5 years of experience 
        creating beautiful, functional mobile applications. I love turning ideas into reality 
        through clean code and intuitive design.
      </motion.p>

      <div className="grid lg:grid-cols-2 gap-12 mb-12">
        <div>
          <motion.h3 
            className="text-2xl font-semibold text-white mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            viewport={{ once: true }}
          >
            What I Do
          </motion.h3>
          <div className="space-y-6">
            {services.map((service, index) => (
              <motion.div
                key={service.title}
                className="flex items-center gap-4 group"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.8 + index * 0.1, duration: 0.8 }}
                viewport={{ once: true }}
                whileHover={{ x: 10 }}
              >
                <motion.div 
                  className={`w-12 h-12 ${service.color} rounded-lg flex items-center justify-center border border-white/10 group-hover:border-white/30 transition-all duration-300`}
                  whileHover={{ scale: 1.1, rotate: 5 }}
                >
                  <service.icon className="text-white" size={24} />
                </motion.div>
                <span className="text-white/80 group-hover:text-white transition-colors text-lg">
                  {service.title}
                </span>
              </motion.div>
            ))}
          </div>
        </div>

        <div>
          <motion.h3 
            className="text-2xl font-semibold text-white mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            viewport={{ once: true }}
          >
            Skills
          </motion.h3>
          <div className="space-y-6">
            {skills.map((skill, index) => (
              <motion.div
                key={skill.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 1 + index * 0.1, duration: 0.8 }}
                viewport={{ once: true }}
              >
                <div className="flex justify-between mb-3">
                  <span className="text-white/80 text-lg">{skill.name}</span>
                  <motion.span 
                    className="text-white/60"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: 1.5 + index * 0.1, duration: 0.8 }}
                    viewport={{ once: true }}
                  >
                    {skill.level}%
                  </motion.span>
                </div>
                <div className="w-full bg-white/10 rounded-full h-3 overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${skill.level}%` }}
                    transition={{ duration: 1.5, delay: 1.2 + index * 0.1, ease: "easeOut" }}
                    viewport={{ once: true }}
                    className={`h-3 rounded-full ${skill.color} relative`}
                  >
                    <motion.div
                      className="absolute inset-0 bg-white/20 rounded-full"
                      animate={{ x: ['-100%', '100%'] }}
                      transition={{ 
                        duration: 2, 
                        repeat: Infinity, 
                        ease: "linear",
                        delay: 2 + index * 0.2
                      }}
                    />
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </motion.section>
  );
};

export default About;