import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  Database,
  Server,
  Globe,
  Terminal,
  Cpu,
  ShieldCheck,
} from "lucide-react";

const Skills: React.FC = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const skillCategories = [
    {
      title: "FRONTEND_ARCH",
      icon: Globe,
      id: "SYS_01",
      skills: [
        { name: "React.js", level: 95 },
        { name: "Next.js", level: 85 },
        { name: "Tailwind CSS", level: 95 },
        { name: "shadcn/ui", level: 90 },
      ],
    },
    {
      title: "BACKEND_INFRA",
      icon: Server,
      id: "SYS_02",
      skills: [
        { name: "Node.js", level: 85 },
        { name: "Express.js", level: 85 },
        { name: "TypeScript", level: 80 },
        { name: "Socket.io", level: 80 }, // Included from your Project/Objective
      ],
    },
    {
      title: "DATABASE_CORE",
      icon: Database,
      id: "SYS_03",
      skills: [
        { name: "MongoDB", level: 90 },
        { name: "MySQL", level: 75 },
        { name: "SQLite", level: 70 },
      ],
    },
    {
      title: "TOOLS", // Renamed slightly to fit your "Tools" section
      icon: Cpu,
      id: "SYS_04",
      skills: [
        { name: "Git/GitHub", level: 90 },
        { name: "Vite", level: 85 },
        { name: "Bun", level: 75 },
        { name: "NPM", level: 85 },
        { name: "Electron.js", level: 70 },
      ],
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.5 },
    },
  };

  // Helper to render segmented bars (Cyberpunk style)
  const renderSegments = (level: number) => {
    const segments = 10;
    const filled = Math.floor((level / 100) * segments);
    return (
      <div className="flex gap-1 h-2 w-full">
        {[...Array(segments)].map((_, i) => (
          <div
            key={i}
            className={`h-full flex-1 transform -skew-x-12 ${
              i < filled
                ? "bg-cyan-400 shadow-[0_0_10px_rgba(34,211,238,0.5)]"
                : "bg-slate-800/50"
            }`}
          />
        ))}
      </div>
    );
  };

  return (
    <section
      ref={ref}
      id="skills"
      className="py-24 relative overflow-hidden bg-void-black"
    >
      {/* --- BACKGROUND GRID & DECORATION --- */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-size-[24px_24px]"></div>
      <div className="absolute top-0 left-0 w-full h-px bg-linear-to-r from-transparent via-cyan-500/50 to-transparent" />
      <div className="absolute bottom-0 right-0 w-64 h-64 bg-purple-500/10 blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* --- HEADER --- */}
        <div className="text-center mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            className="inline-flex items-center gap-2 mb-4 px-3 py-1 bg-cyan-950/30 border border-cyan-500/30 text-cyan-400 text-xs font-mono tracking-widest"
          >
            <Terminal size={14} />
            <span>SYSTEM_CAPABILITIES.EXE</span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight"
          >
            TECHNICAL{" "}
            <span className="text-transparent bg-clip-text bg-linear-to-r from-cyan-400 to-purple-500">
              ARSENAL
            </span>
          </motion.h2>
        </div>

        {/* --- SKILLS GRID --- */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid md:grid-cols-2 gap-8"
        >
          {skillCategories.map((category, idx) => (
            <motion.div
              key={idx}
              variants={itemVariants}
              className="relative group"
            >
              {/* Mechanical Borders (The Brackets) */}
              <div className="absolute -top-1 -left-1 w-8 h-8 border-t-2 border-l-2 border-cyan-500/30 group-hover:border-cyan-400 transition-colors duration-300" />
              <div className="absolute -top-1 -right-1 w-8 h-8 border-t-2 border-r-2 border-cyan-500/30 group-hover:border-cyan-400 transition-colors duration-300" />
              <div className="absolute -bottom-1 -left-1 w-8 h-8 border-b-2 border-l-2 border-cyan-500/30 group-hover:border-cyan-400 transition-colors duration-300" />
              <div className="absolute -bottom-1 -right-1 w-8 h-8 border-b-2 border-r-2 border-cyan-500/30 group-hover:border-cyan-400 transition-colors duration-300" />

              {/* Card Body */}
              <div
                className="h-full p-8 bg-slate-900/80 border border-slate-800/50 backdrop-blur-sm relative overflow-hidden"
                style={{
                  clipPath: "polygon(0 0, 100% 0, 100% 90%, 95% 100%, 0 100%)",
                }} // Cut corner effect
              >
                {/* Active Scanline Effect */}
                <div className="absolute inset-0 bg-linear-to-b from-cyan-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                <div className="absolute top-0 left-0 w-full h-px bg-cyan-400/50 transform -translate-y-full group-hover:translate-y-[400px] transition-transform duration-[1.5s] ease-linear" />

                {/* Header */}
                <div className="flex items-center justify-between mb-8 pb-4 border-b border-slate-800">
                  <div className="flex items-center gap-4">
                    <div className="p-2 bg-cyan-500/10 text-cyan-400 rounded-sm">
                      <category.icon size={24} />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-white font-mono tracking-wider">
                        {category.title}
                      </h3>
                      <span className="text-[10px] text-slate-500 font-mono">
                        ID: {category.id}
                      </span>
                    </div>
                  </div>
                  <ShieldCheck
                    size={18}
                    className="text-slate-600 group-hover:text-cyan-500 transition-colors"
                  />
                </div>

                {/* Skills List */}
                <div className="space-y-6">
                  {category.skills.map((skill, sIdx) => (
                    <div key={sIdx} className="group/skill">
                      <div className="flex justify-between mb-2 text-xs font-mono">
                        <span className="text-slate-400 group-hover/skill:text-cyan-300 transition-colors">
                          {">"} {skill.name}
                        </span>
                        <span className="text-cyan-500">{skill.level}%</span>
                      </div>

                      {/* Segmented Progress Bar */}
                      {renderSegments(skill.level)}
                    </div>
                  ))}
                </div>

                {/* Decorative Bottom Data */}
                <div className="absolute bottom-2 right-4 text-[10px] text-slate-600 font-mono">
                  SYNCED_
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;
