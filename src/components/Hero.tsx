import React, { useEffect, useState, useRef } from "react";
import {
  Download,
  Mail,
  Github,
  Linkedin,
  Terminal,
  Code2,
} from "lucide-react";
import { motion, useScroll, useTransform } from "framer-motion";

const Hero: React.FC = () => {
  const [displayText, setDisplayText] = useState("");
  const fullText = "Full Stack Engineer(MERN)";
  const containerRef = useRef<HTMLDivElement>(null);

  // Mouse spotlight effect state
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const updateMousePosition = (ev: MouseEvent) => {
      setMousePosition({ x: ev.clientX, y: ev.clientY });
    };
    window.addEventListener("mousemove", updateMousePosition);
    return () => window.removeEventListener("mousemove", updateMousePosition);
  }, []);

  useEffect(() => {
    let index = 0;
    const timer = setInterval(() => {
      if (index <= fullText.length) {
        setDisplayText(fullText.slice(0, index));
        index++;
      } else {
        clearInterval(timer);
      }
    }, 100);
    return () => clearInterval(timer);
  }, []);

  // Parallax effect for the code card
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 200]);

  return (
    <section
      ref={containerRef}
      id="home"
      className="min-h-screen w-full relative flex items-center justify-center overflow-hidden bg-[#030014]"
    >
      {/* --- DYNAMIC BACKGROUND --- */}

      {/* 1. The Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>

      {/* 2. The Mouse Spotlight (Glow follows cursor) */}
      <div
        className="pointer-events-none fixed inset-0 z-30 transition-opacity duration-300"
        style={{
          background: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(29, 78, 216, 0.15), transparent 40%)`,
        }}
      />

      {/* 3. Top Center Glow */}
      <div className="absolute top-[-20%] left-0 right-0 h-[500px] w-full bg-purple-900/20 blur-[120px] rounded-full pointer-events-none" />

      {/* --- CONTENT --- */}
      <div className="max-w-7xl w-full mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center relative z-20 pt-20">
        {/* LEFT SIDE: Typography */}
        <div className="text-left">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-2 mb-6"
          >
            <span className="px-3 py-1 rounded-full border border-purple-500/30 bg-purple-500/10 text-purple-300 text-xs font-semibold tracking-wider uppercase">
              Open to Work
            </span>
            <span className="h-px w-10 bg-purple-500/30"></span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-xl md:text-2xl font-mono text-cyan-400 mb-4 tracking-tight"
          >
            Hello, I am Purab Singla
          </motion.h2>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight"
          >
            Crafting <br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600">
              Digital Experiences
            </span>
          </motion.h1>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="h-8 mb-8"
          >
            <p className="text-2xl font-mono text-slate-400">
              &gt; {displayText}
              <span className="animate-pulse text-cyan-400">|</span>
            </p>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="text-slate-400 text-lg max-w-lg mb-10 leading-relaxed"
          >
            I build accessible, pixel-perfect, performant, and responsible web
            applications. Specialized in the MERN ecosystem.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
            className="flex flex-wrap gap-4"
          >
            <a href={"resume/PURABRESUME.pdf"} target="_blank">
              <button className="group relative px-8 py-4 bg-white text-black font-bold rounded-full overflow-hidden hover:scale-105 transition-transform duration-300">
                <div className="absolute inset-0 bg-linear-to-r from-cyan-400 to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300 mix-blend-overlay"></div>
                <span className="relative flex items-center gap-2">
                  <Download size={18} /> Download CV
                </span>
              </button>
            </a>

            <button
              onClick={() =>
                document
                  .getElementById("contact")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
              className="px-8 py-4 rounded-full border border-white/10 bg-white/5 text-white backdrop-blur-sm hover:bg-white/10 transition-colors flex items-center gap-2"
            >
              <Mail size={18} /> Contact Me
            </button>
          </motion.div>

          {/* Socials */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
            className="mt-12 flex items-center gap-6 text-slate-500"
          >
            <Github className="hover:text-white cursor-pointer transition-colors" />
            <Linkedin className="hover:text-white cursor-pointer transition-colors" />
            <div className="h-px w-20 bg-slate-800"></div>
          </motion.div>
        </div>

        {/* RIGHT SIDE: The "Tech Card" (Replacing the 3D Blob) */}
        <motion.div style={{ y: y1 }} className="hidden lg:block relative">
          {/* Abstract Glow behind the card */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-cyan-500/20 blur-[100px] rounded-full"></div>

          {/* The Main Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8, rotateY: -20 }}
            animate={{ opacity: 1, scale: 1, rotateY: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="relative z-10 bg-slate-900/80 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-6 shadow-2xl transform perspective-1000"
          >
            {/* Card Header */}
            <div className="flex items-center justify-between mb-6 border-b border-slate-700/50 pb-4">
              <div className="flex gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
                <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
              </div>
              <div className="text-xs text-slate-500 font-mono">
                developer.tsx
              </div>
            </div>

            {/* Code Snippet Content */}
            <div className="font-mono text-sm space-y-3">
              <div className="flex gap-2">
                <span className="text-pink-400">const</span>
                <span className="text-yellow-300">developer</span>
                <span className="text-slate-300">=</span>
                <span className="text-blue-400">{`{`}</span>
              </div>
              <div className="pl-4 flex gap-2">
                <span className="text-slate-400">name:</span>
                <span className="text-green-400">'Purab Singla'</span>,
              </div>
              <div className="pl-4 flex gap-2">
                <span className="text-slate-400">skills:</span>
                <span className="text-blue-400">
                  ['React', 'Node', 'Mongo']
                </span>
                ,
              </div>
              <div className="pl-4 flex gap-2">
                <span className="text-slate-400">hardWorker:</span>
                <span className="text-orange-400">true</span>,
              </div>
              <div className="pl-4 flex gap-2">
                <span className="text-slate-400">problemSolver:</span>
                <span className="text-orange-400">true</span>,
              </div>
              <div className="pl-4 flex gap-2">
                <span className="text-slate-400">hireable:</span>
                <span className="text-orange-400">function</span>
                <span className="text-blue-300">()</span>
                <span className="text-blue-400">{` {`}</span>
              </div>
              <div className="pl-8">
                <span className="text-pink-400">return</span>
                <span className="text-green-400"> "Ready to start!"</span>;
              </div>
              <div className="pl-4">
                <span className="text-blue-400">{`}`}</span>
              </div>
              <div>
                <span className="text-blue-400">{`}`}</span>
              </div>
            </div>

            {/* Floating Badges */}
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -right-12 -top-8 p-4 bg-[#1a1a1a] border border-slate-700 rounded-xl shadow-xl"
            >
              <Terminal className="text-cyan-400" size={32} />
            </motion.div>
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 1,
              }}
              className="absolute -left-8 -bottom-8 p-4 bg-[#1a1a1a] border border-slate-700 rounded-xl shadow-xl"
            >
              <Code2 className="text-purple-400" size={32} />
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
