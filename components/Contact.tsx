import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Linkedin, Github, Send, CheckCircle, AlertCircle } from 'lucide-react';
import emailjs from '@emailjs/browser';

const MotionDiv = motion.div as any;
const MotionForm = motion.form as any;

// EmailJS Configuration - Set these in .env.local file
const EMAILJS_SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const EMAILJS_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
const EMAILJS_PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

const Contact: React.FC = () => {
  const [formState, setFormState] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormState('submitting');
    setErrorMessage('');

    try {
      await emailjs.sendForm(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        formRef.current!,
        EMAILJS_PUBLIC_KEY
      );
      setFormState('success');
      formRef.current?.reset();
    } catch (error: any) {
      setFormState('error');
      setErrorMessage(error?.text || 'Failed to send message. Please try again.');
    }
  };

  return (
    <section id="contact" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-16">
          
          <div>
            <h2 className="text-3xl md:text-4xl font-bold font-tech text-white mb-6">
                ESTABLISH_CONNECTION
            </h2>
            <p className="text-gray-400 mb-8 font-mono">
                Currently open for new opportunities and collaborations. 
                Transmission channels are open.
            </p>
            
            <div className="space-y-6">
                <a href="mailto:omsatote142005@gmail.com" className="flex items-center gap-4 text-gray-300 hover:text-green-400 transition-colors group">
                    <div className="w-12 h-12 bg-slate-900 rounded-full flex items-center justify-center border border-slate-700 group-hover:border-green-500 group-hover:box-glow transition-all">
                        <Mail className="h-5 w-5" />
                    </div>
                    <span className="font-mono">omsatote142005@gmail.com</span>
                </a>
                <a href="https://github.com/omsatote" target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 text-gray-300 hover:text-cyan-400 transition-colors group">
                    <div className="w-12 h-12 bg-slate-900 rounded-full flex items-center justify-center border border-slate-700 group-hover:border-cyan-500 group-hover:box-glow transition-all">
                        <Github className="h-5 w-5" />
                    </div>
                    <span className="font-mono">github.com/omsatote</span>
                </a>
                <a href="https://www.linkedin.com/in/om-satote-a7aa6a325/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 text-gray-300 hover:text-purple-400 transition-colors group">
                    <div className="w-12 h-12 bg-slate-900 rounded-full flex items-center justify-center border border-slate-700 group-hover:border-purple-500 group-hover:box-glow transition-all">
                        <Linkedin className="h-5 w-5" />
                    </div>
                    <span className="font-mono">linkedin.com/in/om-satote</span>
                </a>
            </div>
          </div>

          <div className="glass-panel p-8 rounded-xl border border-slate-700">
             <AnimatePresence mode="wait">
                {formState === 'success' ? (
                    <MotionDiv 
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="h-full flex flex-col items-center justify-center text-center py-10"
                    >
                        <CheckCircle className="h-16 w-16 text-green-500 mb-4" />
                        <h3 className="text-2xl font-bold text-white mb-2">TRANSMISSION_SENT</h3>
                        <p className="text-gray-400 font-mono">We will be in touch shortly.</p>
                        <button 
                            onClick={() => setFormState('idle')}
                            className="mt-6 text-sm text-green-500 underline"
                        >
                            Send another message
                        </button>
                    </MotionDiv>
                ) : formState === 'error' ? (
                    <MotionDiv 
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="h-full flex flex-col items-center justify-center text-center py-10"
                    >
                        <AlertCircle className="h-16 w-16 text-red-500 mb-4" />
                        <h3 className="text-2xl font-bold text-white mb-2">TRANSMISSION_FAILED</h3>
                        <p className="text-gray-400 font-mono">{errorMessage}</p>
                        <button 
                            onClick={() => setFormState('idle')}
                            className="mt-6 text-sm text-red-500 underline"
                        >
                            Try again
                        </button>
                    </MotionDiv>
                ) : (
                    <MotionForm 
                        ref={formRef}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onSubmit={handleSubmit} 
                        className="space-y-6"
                    >
                        <div>
                            <label className="block text-green-500 font-mono text-sm mb-2">&lt;name /&gt;</label>
                            <input type="text" name="user_name" required className="w-full bg-slate-950 border border-slate-700 rounded p-3 text-white focus:outline-none focus:border-green-500 transition-colors font-mono" placeholder="Enter identity..." />
                        </div>
                        <div>
                            <label className="block text-green-500 font-mono text-sm mb-2">&lt;email /&gt;</label>
                            <input type="email" name="user_email" required className="w-full bg-slate-950 border border-slate-700 rounded p-3 text-white focus:outline-none focus:border-green-500 transition-colors font-mono" placeholder="Enter frequency..." />
                        </div>
                        <div>
                            <label className="block text-green-500 font-mono text-sm mb-2">&lt;message /&gt;</label>
                            <textarea rows={4} name="message" required className="w-full bg-slate-950 border border-slate-700 rounded p-3 text-white focus:outline-none focus:border-green-500 transition-colors font-mono" placeholder="Enter data packet..."></textarea>
                        </div>
                        
                        <button 
                            type="submit" 
                            disabled={formState === 'submitting'}
                            className="w-full bg-green-600/20 hover:bg-green-600/40 border border-green-500 text-green-400 py-3 rounded font-bold font-mono transition-all flex items-center justify-center gap-2 group"
                        >
                            {formState === 'submitting' ? (
                                <span className="animate-pulse">UPLOADING...</span>
                            ) : (
                                <>
                                    EXECUTE_SEND <Send className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                                </>
                            )}
                        </button>
                    </MotionForm>
                )}
             </AnimatePresence>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Contact;