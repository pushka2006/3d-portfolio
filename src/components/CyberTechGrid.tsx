"use client";

import { motion } from "framer-motion";
import { sound } from "@/utils/sound";

interface TechTile {
  name: string;
  icon: string;
  color: string;
  glow: string;
}

const TECH_ITEMS: TechTile[] = [
  { name: "Next.js", icon: "▲", color: "text-white", glow: "hover:border-white/50" },
  { name: "React", icon: "⚛️", color: "text-cyan-400", glow: "hover:border-cyan-400/50" },
  { name: "TypeScript", icon: "TS", color: "text-blue-400", glow: "hover:border-blue-400/50" },
  { name: "Python", icon: "🐍", color: "text-yellow-400", glow: "hover:border-yellow-400/50" },

  { name: "Tailwind", icon: "🌊", color: "text-cyan-400", glow: "hover:border-cyan-400/50" },
  { name: "FastAPI", icon: "⚡", color: "text-emerald-400", glow: "hover:border-emerald-400/50" },
  { name: "MongoDB", icon: "🍃", color: "text-green-500", glow: "hover:border-green-500/50" },
  { name: "AWS", icon: "☁️", color: "text-amber-400", glow: "hover:border-amber-400/50" },

  { name: "Docker", icon: "🐋", color: "text-blue-400", glow: "hover:border-blue-400/50" },
  { name: "Redis", icon: "🟥", color: "text-red-500", glow: "hover:border-red-500/50" },
  { name: "Git", icon: "🌱", color: "text-orange-500", glow: "hover:border-orange-500/50" },
  { name: "Linux", icon: "🐧", color: "text-yellow-300", glow: "hover:border-yellow-300/50" },
];

export function CyberTechGrid() {
  return (
    <div className="grid grid-cols-4 gap-2.5">
      {TECH_ITEMS.map((tech) => (
        <motion.div
          key={tech.name}
          whileHover={{ scale: 1.05, y: -2 }}
          onMouseEnter={() => sound.playHover()}
          className={`aspect-square rounded-xl bg-[#0a0720]/80 border border-white/10 p-2 flex flex-col items-center justify-center gap-1 cursor-pointer transition-all duration-300 hover:shadow-[0_0_15px_rgba(6,182,212,0.25)] ${tech.glow}`}
        >
          <span className={`text-xl font-mono font-bold ${tech.color} filter drop-shadow-[0_0_8px_currentColor]`}>
            {tech.icon}
          </span>
          <span className="text-[10px] font-mono text-gray-300 tracking-tight text-center line-clamp-1">
            {tech.name}
          </span>
        </motion.div>
      ))}
    </div>
  );
}

