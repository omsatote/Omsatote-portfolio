import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Github, ExternalLink, Code2 } from 'lucide-react';
import { PROJECTS } from '../constants';
import { Project } from '../types';

const MotionDiv = motion.div as any;

const ProjectCard: React.FC<{ project: Project }> = ({ project }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div 
      className="relative w-full h-[400px] perspective-1000 group"
      onMouseEnter={() => setIsFlipped(true)}
      onMouseLeave={() => setIsFlipped(false)}
    >
      <MotionDiv
        className="w-full h-full relative preserve-3d transition-all duration-500"
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.6, type: "spring", stiffness: 260, damping: 20 }}
        style={{ transformStyle: 'preserve-3d' }}
      >
        {/* Front Face */}
        <div className="absolute inset-0 backface-hidden glass-panel rounded-xl overflow-hidden border border-slate-700">
           <div className="h-1/2 overflow-hidden relative">
               <div className="absolute inset-0 bg-green-500/20 mix-blend-overlay z-10"></div>
               <img src={project.imageUrl} alt={project.title} className="w-full h-full object-cover" />
           </div>
           <div className="p-6">
               <div className="flex justify-between items-center mb-2">
                    <span className="text-xs font-mono text-green-400 border border-green-500/30 px-2 py-1 rounded">
                        {project.category}
                    </span>
               </div>
               <h3 className="text-2xl font-bold font-tech text-white mb-2">{project.title}</h3>
               <p className="text-gray-400 text-sm line-clamp-3 font-mono">{project.description}</p>
               
               <div className="absolute bottom-6 right-6 text-green-500 text-xs font-mono animate-pulse">
                   HOVER_FOR_DETAILS &gt;&gt;
               </div>
           </div>
        </div>

        {/* Back Face */}
        <div 
            className="absolute inset-0 backface-hidden bg-slate-900 rounded-xl p-8 border border-green-500/50 flex flex-col justify-between"
            style={{ transform: 'rotateY(180deg)' }}
        >
            <div>
                <h3 className="text-xl font-bold text-green-400 mb-4 flex items-center gap-2">
                    <Code2 className="h-5 w-5" />
                    TECH_STACK
                </h3>
                <div className="flex flex-wrap gap-2 mb-6">
                    {project.techStack.map((tech) => (
                        <span key={tech} className="px-3 py-1 bg-slate-800 text-cyan-400 text-xs font-mono rounded border border-cyan-500/20">
                            {tech}
                        </span>
                    ))}
                </div>
                <div className="space-y-4">
                    <p className="text-sm text-gray-300 font-mono">
                        <span className="text-green-500">Problem:</span> {project.problem}
                    </p>
                    <p className="text-sm text-gray-300 font-mono">
                         <span className="text-green-500">Solution:</span> {project.solution}
                    </p>
                </div>
            </div>

            <div className="flex gap-4">
                <a href={project.githubUrl} className="flex-1 py-2 bg-slate-800 hover:bg-slate-700 text-white text-center rounded text-sm font-mono flex items-center justify-center gap-2 border border-slate-600 transition-colors">
                    <Github className="h-4 w-4" /> REPO
                </a>
                {project.demoUrl && (
                    <a href={project.demoUrl} className="flex-1 py-2 bg-green-600 hover:bg-green-500 text-black text-center rounded text-sm font-mono flex items-center justify-center gap-2 font-bold transition-colors">
                        <ExternalLink className="h-4 w-4" /> DEMO
                    </a>
                )}
            </div>
        </div>
      </MotionDiv>
    </div>
  );
};

const Projects: React.FC = () => {
  return (
    <section id="projects" className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <MotionDiv
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mb-12"
        >
             <h2 className="text-3xl md:text-4xl font-bold font-tech text-white mb-4">
                <span className="text-green-500">//</span> SELECTED_PROJECTS
            </h2>
            <div className="h-1 w-20 bg-green-500 rounded"></div>
        </MotionDiv>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {PROJECTS.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;