import React from 'react';
import { motion } from 'framer-motion';
import { User, Cpu, Code, Globe } from 'lucide-react';

const MotionDiv = motion.div as any;

const TerminalLine: React.FC<{ prefix?: string; content: string; color?: string }> = ({ prefix = ">", content, color = "text-gray-300" }) => (
  <div className="mb-2 font-mono text-sm md:text-base">
    <span className="text-green-500 mr-2">{prefix}</span>
    <span className={color}>{content}</span>
  </div>
);

const About: React.FC = () => {
  return (
    <section id="about" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <MotionDiv
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid md:grid-cols-2 gap-12 items-center"
        >
          {/* Left: Terminal UI */}
          <div className="glass-panel rounded-lg overflow-hidden shadow-2xl border border-slate-700">
            <div className="bg-slate-900 px-4 py-2 flex items-center gap-2 border-b border-slate-700">
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
              <span className="ml-4 text-xs text-gray-400 font-mono">user@dev-terminal:~</span>
            </div>
            <div className="p-6 bg-slate-950/80 min-h-[400px]">
              <TerminalLine content="neofetch" color="text-green-400" />
              <div className="mt-4 flex gap-4">
                 <div className="text-cyan-500 hidden sm:block">
<pre className="text-xs leading-none">
{`
       .---.
      /     \\
      |  O  |
      \\     /
       '---'
`}
</pre>
                 </div>
                 <div className="flex-1">
                    <TerminalLine prefix="OS:" content="Ubuntu 22.04 LTS (Cyber_Edition)" />
                    <TerminalLine prefix="Host:" content="Neural_Network_v9" />
                    <TerminalLine prefix="Kernel:" content="5.15.0-generic" />
                    <TerminalLine prefix="Uptime:" content="4 years, 3 months, 12 days" />
                    <TerminalLine prefix="Shell:" content="zsh 5.8" />
                    <TerminalLine prefix="Role:" content="Full Stack developer" />
                    <TerminalLine prefix="Mission:" content="Building the decentralized web" />
                    <br />
                    <TerminalLine content="cat about_me.txt" color="text-green-400" />
                    <p className="text-gray-300 font-mono text-sm mt-2 leading-relaxed">
                     I’m a full-stack developer focused on security and performance.
Fascinated by how systems break—and how to build them resiliently.
I enjoy turning complex problems into clean, scalable solutions.
Currently exploring WebAssembly and Rust.
                    </p>
                    <div className="mt-4 animate-pulse h-4 w-2 bg-green-500"></div>
                 </div>
              </div>
            </div>
          </div>

          {/* Right: 3D Cards / Skills */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
             {[
                 { icon: Code, title: "Frontend", desc: "React, Vue, Three.js", color: "text-blue-400" },
                 { icon: Cpu, title: "Backend", desc: "Node, Go, Rust", color: "text-purple-400" },
                 { icon: Globe, title: "Infrastructure", desc: "AWS, Docker, K8s", color: "text-orange-400" },
                 { icon: User, title: "Soft Skills", desc: "Leadership, Agile", color: "text-green-400" },
             ].map((skill, idx) => (
                 <MotionDiv
                    key={idx}
                    whileHover={{ scale: 1.05, rotateZ: 2 }}
                    className="glass-panel p-6 rounded-xl border border-slate-700/50 hover:border-green-500/50 transition-colors group cursor-crosshair"
                 >
                     <skill.icon className={`h-8 w-8 ${skill.color} mb-4 group-hover:animate-spin-slow`} />
                     <h3 className="text-xl font-bold font-tech text-white mb-2">{skill.title}</h3>
                     <p className="text-gray-400 font-mono text-sm">{skill.desc}</p>
                 </MotionDiv>
             ))}
          </div>

        </MotionDiv>
      </div>
    </section>
  );
};

export default About;