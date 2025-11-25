import React, { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { fetchGithubStatsREST } from "./GithubStats";
import {
  Github,
  GitCommit,
  GitPullRequest,
  Star,
  Cpu,
  Terminal,
  Activity,
} from "lucide-react";

export interface Gitstats {
  activeRepos: number;
  repoStars: number;
  pullRequests: number;
  totalCommits: number;
}

const GitHubActivity: React.FC = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  // --- MOCK DATA GENERATORS ---

  // 1. Contribution Data (The "Heatmap")
  const weeks = 52;
  const days = 7;
  const contributionData = Array.from({ length: weeks * days }).map(() => {
    const chance = Math.random();
    if (chance > 0.8) return 3; // High
    if (chance > 0.5) return 2; // Medium
    if (chance > 0.2) return 1; // Low
    return 0; // None
  });

  // 2. Fake Terminal Logs
  const terminalLogs = [
    "> git push origin master",
    "  Compressing objects: 100% (12/12)",
    "  Writing objects: 100% (12/12), 3.21 KiB",
    "  remote: Resolving deltas: 100% (4/4)",
    "> SYSTEM_UPDATE: Dependencies optimized",
    "> DEPLOYMENT_STATUS: STABLE",
    "> git checkout -b feat/cyber-ui",
    "> npm install framer-motion",
    "  added 4 packages, removed 1",
    "> Traffic spike detected: PORT_3000",
  ];

  const [Stats, setStats] = useState<Gitstats>({
    activeRepos: 0,
    repoStars: 0,
    pullRequests: 0,
    totalCommits: 0,
  });

  useEffect(() => {
    fetchGithubStatsREST().then((data: Gitstats) => setStats(data));
  }, []);

  // 3. Stats Data
  const stats = [
    {
      label: "TOTAL_COMMITS",
      value: Stats.totalCommits,
      icon: GitCommit,
      color: "green",
    },
    {
      label: "PULL_REQUESTS",
      value: Stats.pullRequests,
      icon: GitPullRequest,
      color: "purple",
    },
    {
      label: "REPO_STARS",
      value: Stats.repoStars,
      icon: Star,
      color: "yellow",
    },
    {
      label: "ACTIVE_REPOS",
      value: Stats.activeRepos,
      icon: Cpu,
      color: "cyan",
    },
  ];

  return (
    <section
      ref={ref}
      id="github"
      className="py-32 relative bg-void-black overflow-hidden"
    >
      {/* --- BACKGROUND GRID --- */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-size-[24px_24px]"></div>
      <div className="absolute top-0 left-0 w-full h-px bg-linear-to-r from-transparent via-green-500/50 to-transparent" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* HEADER */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-6">
          <div>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              className="flex items-center gap-2 mb-4"
            >
              <Activity className="text-green-500" size={20} />
              <span className="text-green-500 font-mono text-sm tracking-widest uppercase">
                System_Activity.log
              </span>
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-5xl font-bold text-white tracking-tight"
            >
              OPEN SOURCE{" "}
              <span className="text-transparent bg-clip-text bg-linear-to-r from-green-400 to-emerald-600">
                CONTRIBUTIONS
              </span>
            </motion.h2>
          </div>

          <a
            href="https://github.com/Purabsingla"
            target="_blank"
            className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors font-mono text-sm border-b border-slate-800 hover:border-green-500 pb-1"
          >
            <Github size={16} />
            github.com/purab-singla
          </a>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* --- COLUMN 1: STATS MODULES --- */}
          <div className="lg:col-span-2 space-y-8">
            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-4">
              {stats.map((stat, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: idx * 0.1 }}
                  className="relative group p-6 bg-slate-900/50 border border-slate-800 hover:border-green-500/50 transition-all duration-300 overflow-hidden"
                >
                  {/* Hover Glow */}
                  <div
                    className={`absolute inset-0 bg-${stat.color}-500/5 opacity-0 group-hover:opacity-100 transition-opacity`}
                  />

                  <div className="relative z-10 flex flex-col justify-between h-full">
                    <div className="flex justify-between items-start mb-4">
                      <stat.icon
                        size={24}
                        className={`text-${stat.color}-500`}
                      />
                      <div
                        className={`w-2 h-2 rounded-full bg-${stat.color}-500 animate-pulse`}
                      />
                    </div>
                    <div>
                      <div className="text-3xl font-bold text-white mb-1 font-mono">
                        {stat.value}
                      </div>
                      <div className="text-xs text-slate-500 font-mono tracking-wider">
                        {stat.label}
                      </div>
                    </div>
                  </div>

                  {/* Corner Accent */}
                  <div
                    className={`absolute bottom-0 right-0 w-0 h-0 border-b-20 border-r-20 border-b-transparent border-r-${stat.color}-500/20 group-hover:border-r-${stat.color}-500 transition-colors`}
                  />
                </motion.div>
              ))}
            </div>

            {/* THE CONTRIBUTION GRAPH (HEATMAP) */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 0.4 }}
              className="p-1 border border-slate-800 bg-black/40 backdrop-blur-sm"
            >
              <div className="flex flex-wrap gap-1">
                {contributionData.map((level, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0 }}
                    animate={isInView ? { opacity: 1 } : {}}
                    transition={{ delay: i * 0.002 }}
                    className={`w-2.5 h-2.5 md:w-3 md:h-3 rounded-[1px] ${
                      level === 0
                        ? "bg-slate-900"
                        : level === 1
                        ? "bg-green-900"
                        : level === 2
                        ? "bg-green-600"
                        : "bg-green-400 shadow-[0_0_5px_#4ade80]"
                    }`}
                  />
                ))}
              </div>
              <div className="flex justify-between items-center mt-3 px-2">
                <span className="text-[10px] font-mono text-slate-600">
                  LESS
                </span>
                <div className="flex gap-1">
                  <div className="w-3 h-3 bg-slate-900 rounded-[1px]" />
                  <div className="w-3 h-3 bg-green-900 rounded-[1px]" />
                  <div className="w-3 h-3 bg-green-600 rounded-[1px]" />
                  <div className="w-3 h-3 bg-green-400 rounded-[1px]" />
                </div>
                <span className="text-[10px] font-mono text-slate-600">
                  MORE
                </span>
              </div>
            </motion.div>
          </div>

          {/* --- COLUMN 2: LIVE TERMINAL --- */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.6 }}
            className="h-full min-h-[300px] bg-black border border-slate-800 p-4 font-mono text-xs md:text-sm relative overflow-hidden flex flex-col"
          >
            {/* Terminal Header */}
            <div className="flex items-center justify-between mb-4 border-b border-slate-800 pb-2">
              <div className="flex items-center gap-2 text-slate-400">
                <Terminal size={14} />
                <span>bash --active</span>
              </div>
              <div className="flex gap-1.5">
                <div className="w-2 h-2 rounded-full bg-slate-700" />
                <div className="w-2 h-2 rounded-full bg-slate-700" />
              </div>
            </div>
            {/* Logs */}
            <div className="space-y-2 flex-1 overflow-hidden relative">
              {terminalLogs.map((log, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.8 + i * 0.1 }}
                  className={`${
                    log.startsWith(">") ? "text-green-400" : "text-slate-500"
                  }`}
                >
                  {log}
                </motion.div>
              ))}
              <motion.div
                animate={{ opacity: [0, 1, 0] }}
                transition={{ repeat: Infinity, duration: 0.8 }}
                className="w-2 h-4 bg-green-500 mt-2"
              />

              {/* CRT Scanline Effect */}
              <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] z-20 bg-size-[100%_2px,3px_100%] pointer-events-none opacity-20" />
            </div>
            {/* Bottom Status */}
            <div className="mt-4 pt-2 border-t border-slate-800 flex justify-between text-[10px] text-slate-600">
              <span>CPU: 12%</span>
              <span>MEM: 440MB</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default GitHubActivity;
