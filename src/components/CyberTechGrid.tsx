"use client";

import { motion } from "framer-motion";
import { sound } from "@/utils/sound";
import {
  NextjsIcon,
  ReactIcon,
  TypescriptIcon,
  PythonIcon,
  TailwindIcon,
  FastApiIcon,
  MongodbIcon,
  AwsIcon,
  DockerIcon,
  RedisIcon,
  GitIcon,
  LinuxIcon,
} from "@/components/ui/BrandIcons";

interface TechTile {
  name: string;
  icon: React.ReactNode;
  glow: string;
}

const TECH_ITEMS: TechTile[] = [
  { name: "Next.js", icon: <NextjsIcon className="w-5 h-5 text-white" />, glow: "hover:border-white/50" },
  { name: "React", icon: <ReactIcon className="w-5 h-5 text-[#61DAFB]" />, glow: "hover:border-cyan-400/50" },
  { name: "TypeScript", icon: <TypescriptIcon className="w-5 h-5 text-[#3178C6]" />, glow: "hover:border-blue-400/50" },
  { name: "Python", icon: <PythonIcon className="w-5 h-5 text-[#3776AB]" />, glow: "hover:border-yellow-400/50" },

  { name: "Tailwind", icon: <TailwindIcon className="w-5 h-5 text-[#06B6D4]" />, glow: "hover:border-cyan-400/50" },
  { name: "FastAPI", icon: <FastApiIcon className="w-5 h-5 text-[#059669]" />, glow: "hover:border-emerald-400/50" },
  { name: "MongoDB", icon: <MongodbIcon className="w-5 h-5 text-[#47A248]" />, glow: "hover:border-green-500/50" },
  { name: "AWS", icon: <AwsIcon className="w-5 h-5 text-[#FF9900]" />, glow: "hover:border-amber-400/50" },

  { name: "Docker", icon: <DockerIcon className="w-5 h-5 text-[#2496ED]" />, glow: "hover:border-blue-400/50" },
  { name: "Redis", icon: <RedisIcon className="w-5 h-5 text-[#DC382D]" />, glow: "hover:border-red-500/50" },
  { name: "Git", icon: <GitIcon className="w-5 h-5 text-[#F05032]" />, glow: "hover:border-orange-500/50" },
  { name: "Linux", icon: <LinuxIcon className="w-5 h-5 text-[#FCC624]" />, glow: "hover:border-yellow-300/50" },
];

export function CyberTechGrid() {
  return (
    <div className="grid grid-cols-4 gap-2.5">
      {TECH_ITEMS.map((tech) => (
        <motion.div
          key={tech.name}
          whileHover={{ scale: 1.05, y: -2 }}
          onMouseEnter={() => sound.playHover()}
          className={`aspect-square rounded-xl bg-[#0a0720]/80 border border-white/10 p-2 flex flex-col items-center justify-center gap-1.5 cursor-pointer transition-all duration-300 hover:shadow-[0_0_15px_rgba(6,182,212,0.25)] ${tech.glow}`}
        >
          <div className="flex items-center justify-center">{tech.icon}</div>
          <span className="text-[10px] font-mono text-gray-300 tracking-tight text-center line-clamp-1">
            {tech.name}
          </span>
        </motion.div>
      ))}
    </div>
  );
}


