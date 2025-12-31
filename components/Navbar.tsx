import React, { useState, useEffect, useRef } from 'react';
import { Menu, X, Terminal, Volume2, VolumeX } from 'lucide-react';
import { NAV_ITEMS } from '../constants';
import { motion, AnimatePresence } from 'framer-motion';

const MotionDiv = motion.div as any;

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  
  // Audio State
  const [isPlaying, setIsPlaying] = useState(false);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const masterGainRef = useRef<GainNode | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleAudio = async () => {
    // Initialize Audio Context on first user interaction
    if (!audioCtxRef.current) {
      const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
      const ctx = new AudioContext();
      audioCtxRef.current = ctx;

      // Master Gain for volume control
      const masterGain = ctx.createGain();
      masterGain.gain.value = 0; // Start silent
      masterGain.connect(ctx.destination);
      masterGainRef.current = masterGain;

      // Oscillator 1: Sub Bass (Sine) - The foundation
      const osc1 = ctx.createOscillator();
      osc1.type = 'sine';
      osc1.frequency.setValueAtTime(50, ctx.currentTime); // 50Hz hum
      const gain1 = ctx.createGain();
      gain1.gain.value = 0.4;
      osc1.connect(gain1).connect(masterGain);

      // Oscillator 2: Texture (Sawtooth) - The grit
      // Slightly detuned (50.5Hz) to create a slow "binaural" beat effect
      const osc2 = ctx.createOscillator();
      osc2.type = 'sawtooth';
      osc2.frequency.setValueAtTime(50.5, ctx.currentTime);
      const filter2 = ctx.createBiquadFilter();
      filter2.type = 'lowpass';
      filter2.frequency.setValueAtTime(120, ctx.currentTime); // Filter out harsh highs
      const gain2 = ctx.createGain();
      gain2.gain.value = 0.15;
      osc2.connect(filter2).connect(gain2).connect(masterGain);

      // Oscillator 3: Presence (Triangle) - The technological hum
      const osc3 = ctx.createOscillator();
      osc3.type = 'triangle';
      osc3.frequency.setValueAtTime(100, ctx.currentTime); // Octave up
      const gain3 = ctx.createGain();
      gain3.gain.value = 0.05;
      osc3.connect(gain3).connect(masterGain);

      // Start all oscillators
      osc1.start();
      osc2.start();
      osc3.start();
    }

    if (audioCtxRef.current?.state === 'suspended') {
      await audioCtxRef.current.resume();
    }

    if (isPlaying) {
      // Smooth fade out
      const currentTime = audioCtxRef.current!.currentTime;
      masterGainRef.current?.gain.cancelScheduledValues(currentTime);
      masterGainRef.current?.gain.setTargetAtTime(0, currentTime, 0.5);
      setIsPlaying(false);
    } else {
      // Smooth fade in to avoiding popping
      const currentTime = audioCtxRef.current!.currentTime;
      masterGainRef.current?.gain.cancelScheduledValues(currentTime);
      masterGainRef.current?.gain.setTargetAtTime(0.1, currentTime, 1);
      setIsPlaying(true);
    }
  };

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-slate-950/90 backdrop-blur-md border-b border-green-900' : 'bg-transparent'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-2">
            <Terminal className="h-6 w-6 text-green-500 animate-pulse" />
            <span className="text-xl font-bold font-tech tracking-widest text-white">
              OS<span className="text-green-500">.</span>dev
            </span>
          </div>
          
          <div className="hidden md:flex items-center gap-8">
            <div className="flex items-baseline space-x-8">
              {NAV_ITEMS.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="text-gray-300 hover:text-green-400 px-3 py-2 rounded-md text-sm font-medium font-mono transition-colors duration-200 relative group"
                >
                  {item.label}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-green-500 transition-all duration-300 group-hover:w-full"></span>
                </a>
              ))}
            </div>
            
            {/* Desktop Audio Toggle */}
            <button
                onClick={toggleAudio}
                className={`p-2 rounded-full border transition-all duration-300 ${isPlaying ? 'border-green-500 text-green-400 box-glow' : 'border-slate-700 text-gray-500 hover:text-green-400 hover:border-green-500/50'}`}
                title={isPlaying ? "Mute Ambient Sound" : "Enable Ambient Sound"}
            >
                {isPlaying ? <Volume2 className="h-5 w-5" /> : <VolumeX className="h-5 w-5" />}
            </button>
          </div>
          
          <div className="md:hidden flex items-center gap-4">
             {/* Mobile Audio Toggle */}
            <button
                onClick={toggleAudio}
                className={`p-1.5 rounded-full border transition-all duration-300 ${isPlaying ? 'border-green-500 text-green-400' : 'border-slate-700 text-gray-500'}`}
            >
                {isPlaying ? <Volume2 className="h-5 w-5" /> : <VolumeX className="h-5 w-5" />}
            </button>

            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-400 hover:text-white focus:outline-none"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <MotionDiv
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-slate-950 border-b border-green-900"
          >
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              {NAV_ITEMS.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className="text-gray-300 hover:text-green-400 block px-3 py-2 rounded-md text-base font-medium font-mono"
                >
                  {item.label}
                </a>
              ))}
            </div>
          </MotionDiv>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;