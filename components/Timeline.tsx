import React from 'react';
import { motion } from 'framer-motion';
import { EXPERIENCE } from '../constants';
import { Briefcase } from 'lucide-react';

const MotionDiv = motion.div as any;

const Timeline: React.FC = () => {
  return (
    <section id="experience" className="py-20 relative overflow-hidden">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl md:text-4xl font-bold font-tech text-white mb-16 text-center">
            <span className="text-cyan-500">##</span> CAREER_LOGS
        </h2>

        <div className="relative">
            {/* Center Line */}
            <div className="absolute left-0 md:left-1/2 transform md:-translate-x-1/2 h-full w-0.5 bg-gradient-to-b from-green-500 via-cyan-500 to-slate-900 opacity-50"></div>

            <div className="space-y-12">
                {EXPERIENCE.map((exp, index) => (
                    <MotionDiv 
                        key={exp.id}
                        initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: index * 0.2 }}
                        className={`relative flex flex-col md:flex-row ${index % 2 === 0 ? 'md:flex-row-reverse' : ''} items-center`}
                    >
                        {/* Dot */}
                        <div className="absolute left-0 md:left-1/2 transform -translate-x-1/2 md:-translate-x-1/2 w-4 h-4 bg-slate-950 border-2 border-green-500 rounded-full z-10 box-glow"></div>
                        
                        {/* Content Spacer */}
                        <div className="flex-1 w-full md:w-1/2"></div>
                        
                        {/* Card */}
                        <div className={`flex-1 w-full md:w-1/2 pl-8 md:pl-0 ${index % 2 === 0 ? 'md:pr-12' : 'md:pl-12'}`}>
                            <div className="glass-panel p-6 rounded-lg border-l-4 border-green-500 relative group hover:bg-slate-800/50 transition-colors">
                                <span className="absolute -top-3 right-4 bg-slate-900 border border-green-900 text-green-400 text-xs px-2 py-1 rounded font-mono">
                                    {exp.date}
                                </span>
                                <h3 className="text-xl font-bold text-white flex items-center gap-2">
                                    <Briefcase className="h-4 w-4 text-cyan-400" />
                                    {exp.role}
                                </h3>
                                <div className="text-cyan-500 font-mono text-sm mb-2">@{exp.company}</div>
                                <p className="text-gray-400 text-sm mb-4">{exp.description}</p>
                                <div className="flex flex-wrap gap-2">
                                    {exp.skills.map(s => (
                                        <span key={s} className="text-xs text-gray-500 border border-gray-700 px-2 py-1 rounded-full">
                                            #{s}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </MotionDiv>
                ))}
            </div>
        </div>
      </div>
    </section>
  );
};

export default Timeline;