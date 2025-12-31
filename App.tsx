import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ThreeBackground from './components/ThreeBackground';
import About from './components/About';
import Projects from './components/Projects';
import Timeline from './components/Timeline';
import Contact from './components/Contact';

const Footer: React.FC = () => (
  <footer className="bg-slate-950 border-t border-slate-900 py-8 text-center text-gray-500 text-sm font-mono z-10 relative">
    <p>&copy; {new Date().getFullYear()} CYBERNODE. All systems operational.</p>
  </footer>
);

const App: React.FC = () => {
  return (
    <div className="relative min-h-screen text-slate-200 selection:bg-green-500/30 selection:text-green-200">
      {/* Immersive 3D Background */}
      <ThreeBackground />
      
      {/* Main Interface */}
      <div className="relative z-10">
        <Navbar />
        
        <main>
          <Hero />
          <About />
          <Projects />
          <Timeline />
          <Contact />
        </main>

        <Footer />
      </div>
    </div>
  );
};

export default App;