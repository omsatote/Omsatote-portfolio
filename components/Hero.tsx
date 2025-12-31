import React, { useRef, useState, useEffect } from 'react';
import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion';

const MotionDiv = motion.div as any;

const TypingEffect: React.FC<{ text: string; speed?: number }> = ({ text, speed = 100 }) => {
  const [displayedText, setDisplayedText] = useState('');

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      setDisplayedText((prev) => {
        if (index >= text.length) {
          clearInterval(interval);
          return prev;
        }
        index++;
        return text.slice(0, index);
      });
    }, speed);
    return () => clearInterval(interval);
  }, [text, speed]);

  return (
    <span className="border-r-2 border-green-500 animate-pulse pr-1">
      {displayedText}
    </span>
  );
};

const TiltCard: React.FC = () => {
    const x = useMotionValue(0);
    const y = useMotionValue(0);
  
    const rotateX = useTransform(y, [-100, 100], [30, -30]);
    const rotateY = useTransform(x, [-100, 100], [-30, 30]);
    
    // Smooth out the physics
    const springConfig = { damping: 25, stiffness: 150 };
    const springRotateX = useSpring(rotateX, springConfig);
    const springRotateY = useSpring(rotateY, springConfig);
  
    function handleMouseMove(event: React.MouseEvent<HTMLDivElement, MouseEvent>) {
      const rect = event.currentTarget.getBoundingClientRect();
      const width = rect.width;
      const height = rect.height;
      const mouseX = event.clientX - rect.left;
      const mouseY = event.clientY - rect.top;
      const xPct = mouseX / width - 0.5;
      const yPct = mouseY / height - 0.5;
      x.set(xPct * 200);
      y.set(yPct * 200);
    }
  
    function handleMouseLeave() {
      x.set(0);
      y.set(0);
    }
  
    return (
      <MotionDiv
        style={{
          rotateX: springRotateX,
          rotateY: springRotateY,
          transformStyle: "preserve-3d",
        }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="relative w-64 h-80 md:w-80 md:h-96 rounded-xl bg-gradient-to-br from-slate-900 to-slate-800 border border-green-500/30 p-2 cursor-pointer box-glow group"
      >
        <div 
          className="absolute inset-0 rounded-xl overflow-hidden transform translate-z-10"
          style={{ transform: "translateZ(20px)" }}
        >
             <img src="/components/image/om.jpg" alt="Hacker Profile" className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-300" />
             <div className="absolute inset-0 bg-green-500/10 mix-blend-overlay"></div>
             {/* Glitch Overlay */}
             <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60"></div>
        </div>
        
        {/* Floating Badge */}
        <div 
            className="absolute -bottom-6 -right-6 bg-slate-950 border border-green-500 text-green-400 px-4 py-2 rounded-lg font-mono text-sm shadow-lg z-20"
            style={{ transform: "translateZ(50px)" }}
        >
            DevilLucifer
        </div>
      </MotionDiv>
    );
};

const Hero: React.FC = () => {
  return (
    <section id="hero" className="min-h-screen flex items-center justify-center pt-16 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="flex flex-col md:flex-row items-center justify-between gap-12">
          
          <div className="flex-1 text-center md:text-left z-10">
            <MotionDiv 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="inline-block px-3 py-1 mb-4 border border-green-500/50 rounded-full bg-green-500/10 text-green-400 font-mono text-sm"
            >
                SYSTEM_READY_V2.0
            </MotionDiv>
            
            <h1 className="text-4xl md:text-6xl font-bold font-tech text-white mb-6 leading-tight">
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-cyan-500">
              OM.SATOTE
              </span>
              <span className="text-2xl md:text-3xl text-gray-400 mt-2 block font-mono">
                <TypingEffect text=" Full-Stack Developer|Gen AI" speed={50} />
              </span>
            </h1>

            <p className="text-gray-400 max-w-lg mb-8 font-mono text-sm md:text-base leading-relaxed">
             Architecting scalable full-stack solutions and seamless web experiences.
             Turning complex problems into clean, efficient code.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <a href="#projects" className="px-8 py-3 bg-green-600 hover:bg-green-500 text-black font-bold rounded flex items-center justify-center gap-2 transition-all hover:shadow-[0_0_20px_rgba(34,197,94,0.5)]">
                VIEW_PROJECTS
              </a>
              <a href="#contact" className="px-8 py-3 border border-green-500 text-green-400 hover:bg-green-500/10 rounded font-mono flex items-center justify-center transition-all">
                INIT_CONTACT
              </a>
            </div>
          </div>

          <div className="flex-1 flex justify-center perspective-1000 z-10 mt-10 md:mt-0">
            <TiltCard />
          </div>

        </div>
      </div>
    </section>
  );
};

export default Hero;