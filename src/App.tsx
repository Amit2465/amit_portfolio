import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Header from './components/Header';
import MobileFrame from './components/MobileFrame';
import Hero from './components/Hero';
import About from './components/About';
import Projects from './components/Projects';
import Contact from './components/Contact';
import TicTacToe from './apps/TicTacToe';
import Calculator from './apps/Calculator';
import TodoApp from './apps/TodoApp';
import WeatherApp from './apps/WeatherApp';
import MusicPlayer from './apps/MusicPlayer';
import { AppType } from './types';

function App() {
  const [selectedApp, setSelectedApp] = useState<AppType | null>(null);

  const renderApp = () => {
    switch (selectedApp) {
      case 'tictactoe':
        return <TicTacToe />;
      case 'calculator':
        return <Calculator />;
      case 'todo':
        return <TodoApp />;
      case 'weather':
        return <WeatherApp />;
      case 'music':
        return <MusicPlayer />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden relative">
      {/* Animated background grid */}
      <div className="fixed inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px'
        }} />
      </div>

      {/* Floating particles */}
      <div className="fixed inset-0 pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full opacity-20"
            initial={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
            }}
            animate={{
              y: [null, -100, window.innerHeight + 100],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: Math.random() * 10 + 10,
              repeat: Infinity,
              delay: Math.random() * 5,
            }}
          />
        ))}
      </div>

      <Header />
      
      <main className="relative z-10">
        {/* Hero Section with Phone and Name Side by Side */}
        <section className="min-h-screen flex items-center px-8 py-16">
          <div className="w-full max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              {/* Left side - Mobile Frame */}
              <motion.div 
                className="flex justify-center lg:justify-start"
                initial={{ x: -100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <MobileFrame 
                  onAppSelect={setSelectedApp} 
                  selectedApp={selectedApp}
                  renderApp={renderApp}
                />
              </motion.div>
              
              {/* Right side - Hero Content */}
              <motion.div 
                initial={{ x: 100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                <Hero />
              </motion.div>
            </div>
          </div>
        </section>

        {/* Full Width Sections */}
        <div className="w-full space-y-0">
          {/* About Section */}
          <section className="w-full px-8 py-16">
            <div className="max-w-7xl mx-auto">
              <About />
            </div>
          </section>

          {/* Projects Section */}
          <section className="w-full px-8 py-16">
            <div className="max-w-7xl mx-auto">
              <Projects />
            </div>
          </section>

          {/* Contact Section */}
          <section className="w-full px-8 py-16">
            <div className="max-w-7xl mx-auto">
              <Contact />
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

export default App;