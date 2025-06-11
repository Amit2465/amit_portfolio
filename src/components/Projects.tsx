import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Github } from 'lucide-react';

const Projects = () => {
  const projects = [
    {
      title: 'E-Commerce Mobile App',
      description: 'A full-featured e-commerce app built with Flutter, featuring user authentication, product catalog, and payment integration.',
      tech: ['Flutter', 'Firebase', 'Stripe'],
      image: 'https://images.pexels.com/photos/3584994/pexels-photo-3584994.jpeg?auto=compress&cs=tinysrgb&w=400',
      github: '#',
      demo: '#'
    },
    {
      title: 'Task Management Dashboard',
      description: 'A responsive web dashboard for project management with real-time collaboration features.',
      tech: ['React', 'Node.js', 'Socket.io'],
      image: 'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=400',
      github: '#',
      demo: '#'
    },
    {
      title: 'Weather Forecast App',
      description: 'Beautiful weather app with location-based forecasts and interactive maps.',
      tech: ['Flutter', 'OpenWeather API', 'Maps'],
      image: 'https://images.pexels.com/photos/1118873/pexels-photo-1118873.jpeg?auto=compress&cs=tinysrgb&w=400',
      github: '#',
      demo: '#'
    }
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
        Featured Projects
      </motion.h2>
      
      <div className="space-y-12">
        {projects.map((project, index) => (
          <motion.div
            key={project.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.2 }}
            viewport={{ once: true }}
            whileHover={{ y: -5 }}
            className="bg-white/5 rounded-2xl p-8 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-500 group"
          >
            <div className="flex flex-col lg:flex-row gap-8">
              <motion.div 
                className="lg:w-1/3"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
              >
                <div className="relative overflow-hidden rounded-xl">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-all duration-500" />
                </div>
              </motion.div>
              
              <div className="lg:w-2/3">
                <motion.h3 
                  className="text-2xl font-semibold text-white mb-4 group-hover:text-gray-100 transition-colors"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + index * 0.1, duration: 0.8 }}
                  viewport={{ once: true }}
                >
                  {project.title}
                </motion.h3>
                
                <motion.p 
                  className="text-white/70 mb-6 group-hover:text-white/80 transition-colors text-lg"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ delay: 0.4 + index * 0.1, duration: 0.8 }}
                  viewport={{ once: true }}
                >
                  {project.description}
                </motion.p>
                
                <motion.div 
                  className="flex flex-wrap gap-3 mb-6"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 + index * 0.1, duration: 0.8 }}
                  viewport={{ once: true }}
                >
                  {project.tech.map((tech, techIndex) => (
                    <motion.span
                      key={tech}
                      initial={{ opacity: 0, scale: 0 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.6 + index * 0.1 + techIndex * 0.05, duration: 0.5 }}
                      viewport={{ once: true }}
                      whileHover={{ scale: 1.1 }}
                      className="px-4 py-2 bg-white/10 text-white border border-white/20 rounded-full hover:bg-white/20 transition-all duration-300"
                    >
                      {tech}
                    </motion.span>
                  ))}
                </motion.div>
                
                <motion.div 
                  className="flex gap-4"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7 + index * 0.1, duration: 0.8 }}
                  viewport={{ once: true }}
                >
                  <motion.a
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    href={project.github}
                    className="flex items-center gap-2 px-6 py-3 bg-white/10 text-white rounded-lg hover:bg-white/20 transition-all duration-300 border border-white/20 hover:border-white/40"
                  >
                    <Github size={18} />
                    Code
                  </motion.a>
                  <motion.a
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    href={project.demo}
                    className="flex items-center gap-2 px-6 py-3 bg-white text-black rounded-lg hover:bg-gray-100 transition-all duration-300 font-medium"
                  >
                    <ExternalLink size={18} />
                    Demo
                  </motion.a>
                </motion.div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
};

export default Projects;