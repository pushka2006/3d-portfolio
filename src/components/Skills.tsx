"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { GlassCard } from "@/components/ui/GlassCard";
import { GlassBadge } from "@/components/ui/GlassBadge";
import { FloatingHUD } from "@/components/effects/FloatingHUD";
import { ParallaxLayer } from "@/components/effects/ParallaxLayer";
import { sound } from "@/utils/sound";
import {
  Search,
  Sparkles,
  Layers,
  Cpu,
  Code2,
  Database,
  Gamepad2,
  Terminal,
  Activity,
  Flame,
} from "lucide-react";

interface SkillItem {
  name: string;
  category: "frontend" | "backend" | "ai" | "languages" | "database" | "devops" | "game";
  level: number; // 0 to 100
  iconText: string;
  color: string;
  accentGlow: "purple" | "cyan" | "magenta" | "blue";
  description: string;
  tags: string[];
}

const ALL_SKILLS: SkillItem[] = [
  {
    name: "React",
    category: "frontend",
    level: 95,
    iconText: "⚛️",
    color: "#61DAFB",
    accentGlow: "cyan",
    description: "Component architecture, Custom Hooks, Concurrent Mode, Virtual DOM performance optimization.",
    tags: ["React 18", "Hooks", "Context", "SSR"],
  },
  {
    name: "Next.js",
    category: "frontend",
    level: 94,
    iconText: "▲",
    color: "#ffffff",
    accentGlow: "cyan",
    description: "App Router, Server Components (RSC), Edge Middleware, Dynamic Routing, ISR & SEO engine.",
    tags: ["Next 14/15", "RSC", "Server Actions", "Turbopack"],
  },
  {
    name: "TypeScript",
    category: "languages",
    level: 93,
    iconText: "TS",
    color: "#3178C6",
    accentGlow: "blue",
    description: "Strict typing, generic interfaces, algebraic types, compiler API, and AST static analysis.",
    tags: ["Generics", "Type Safety", "Utility Types", "AST"],
  },
  {
    name: "Python",
    category: "languages",
    level: 92,
    iconText: "🐍",
    color: "#3776AB",
    accentGlow: "blue",
    description: "Scientific computing, asynchronous microservices, data scraping, model fine-tuning & automation.",
    tags: ["FastAPI", "NumPy", "Pandas", "AsyncIO"],
  },
  {
    name: "AI & Machine Learning",
    category: "ai",
    level: 90,
    iconText: "🧠",
    color: "#a855f7",
    accentGlow: "purple",
    description: "Autonomous Agent workflows, Large Language Models (LLMs), RAG pipelines, Vector Search embeddings.",
    tags: ["Autonomous Agents", "RAG", "Embeddings", "LangChain"],
  },
  {
    name: "TensorFlow & PyTorch",
    category: "ai",
    level: 87,
    iconText: "⚡",
    color: "#FF6F00",
    accentGlow: "magenta",
    description: "Deep neural networks, CNNs for computer vision, sequential LSTM models, and model quantization.",
    tags: ["PyTorch", "Deep Learning", "CNN", "Transformers"],
  },
  {
    name: "C++",
    category: "languages",
    level: 88,
    iconText: "⚙️",
    color: "#00599C",
    accentGlow: "blue",
    description: "High-performance systems programming, memory management, STL algorithms, multithreading.",
    tags: ["C++20", "Memory Pointers", "Multithreading", "Algorithms"],
  },
  {
    name: "Java",
    category: "languages",
    level: 87,
    iconText: "☕",
    color: "#ED8B00",
    accentGlow: "magenta",
    description: "Enterprise backend architecture, Object-Oriented design patterns, JVM tuning, Spring Boot APIs.",
    tags: ["Spring Boot", "OOP", "JVM", "Microservices"],
  },
  {
    name: "FastAPI & Express",
    category: "backend",
    level: 91,
    iconText: "🟢",
    color: "#059669",
    accentGlow: "cyan",
    description: "High-throughput async REST endpoints, OpenAPI docs, WebSocket streams, and JWT authentication.",
    tags: ["FastAPI", "Express", "Pydantic", "WebSockets"],
  },
  {
    name: "Node.js",
    category: "backend",
    level: 91,
    iconText: "🌐",
    color: "#339933",
    accentGlow: "cyan",
    description: "Scalable event-driven I/O, WebSockets real-time servers, RESTful endpoints, worker threads.",
    tags: ["Express", "WebSockets", "Event Loop", "JWT Auth"],
  },
  {
    name: "Tailwind CSS",
    category: "frontend",
    level: 96,
    iconText: "🌊",
    color: "#06B6D4",
    accentGlow: "cyan",
    description: "Design systems, fluid responsive typography, JIT compilation, glassmorphism, keyframe animations.",
    tags: ["Tailwind", "Responsive Design", "Glassmorphism", "CSS3"],
  },
  {
    name: "MySQL & PostgreSQL",
    category: "database",
    level: 89,
    iconText: "🐬",
    color: "#4479A1",
    accentGlow: "blue",
    description: "Relational database schema modeling, indexing optimization, transactions (ACID), Prisma ORM.",
    tags: ["PostgreSQL", "MySQL", "Indexing", "Prisma ORM"],
  },
  {
    name: "Redis & Vector DBs",
    category: "database",
    level: 86,
    iconText: "🟥",
    color: "#DC382D",
    accentGlow: "magenta",
    description: "In-memory caching, sub-millisecond Pub/Sub streams, ChromaDB vector embeddings for semantic retrieval.",
    tags: ["Redis", "ChromaDB", "Vector Search", "Pub/Sub"],
  },
  {
    name: "Docker & AWS",
    category: "devops",
    level: 86,
    iconText: "🐋",
    color: "#2496ED",
    accentGlow: "blue",
    description: "Multi-stage container builds, CI/CD pipelines, AWS S3 asset delivery, and cloud edge serverless deployments.",
    tags: ["Docker", "AWS S3", "Vercel", "CI/CD"],
  },
  {
    name: "Git & Linux",
    category: "devops",
    level: 92,
    iconText: "🐧",
    color: "#FCC624",
    accentGlow: "cyan",
    description: "Version control workflows, interactive rebasing, Bash scripting, systemd service daemon configurations.",
    tags: ["Git", "Linux", "Bash", "SSH/Security"],
  },
  {
    name: "Unity & Unreal Engine",
    category: "game",
    level: 84,
    iconText: "🎮",
    color: "#222C37",
    accentGlow: "purple",
    description: "3D physics systems, raycasting mechanics, Shader Graph visual shaders, and UE5 Lumen/Nanite pipelines.",
    tags: ["Unity", "UE5", "C# / C++", "PhysX"],
  },
  {
    name: "Three.js & WebGL",
    category: "game",
    level: 88,
    iconText: "🪐",
    color: "#00f0ff",
    accentGlow: "cyan",
    description: "Perspective cameras, procedural particle simulations, custom GLSL vertex/fragment shaders, 60fps rendering.",
    tags: ["Three.js", "WebGL", "GLSL Shaders", "3D Math"],
  },
];

const CATEGORIES = [
  { id: "all", label: "All Technologies", icon: <Layers className="w-3.5 h-3.5" /> },
  { id: "frontend", label: "Frontend", icon: <Code2 className="w-3.5 h-3.5" /> },
  { id: "backend", label: "Backend", icon: <Terminal className="w-3.5 h-3.5" /> },
  { id: "ai", label: "AI & ML", icon: <Cpu className="w-3.5 h-3.5" /> },
  { id: "languages", label: "Languages", icon: <Code2 className="w-3.5 h-3.5" /> },
  { id: "database", label: "Databases", icon: <Database className="w-3.5 h-3.5" /> },
  { id: "devops", label: "Cloud & DevOps", icon: <Terminal className="w-3.5 h-3.5" /> },
  { id: "game", label: "3D & Game Dev", icon: <Gamepad2 className="w-3.5 h-3.5" /> },
];

export default function Skills() {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredSkills = ALL_SKILLS.filter((skill) => {
    const matchesCategory =
      selectedCategory === "all" || skill.category === selectedCategory;
    const matchesSearch =
      skill.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      skill.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  return (
    <section id="skills" className="relative py-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Floating Holographic HUD Indicator */}
      <div className="hidden xl:block absolute top-12 right-8 z-20">
        <FloatingHUD title="MATRIX_TELEMETRY" variant="scanner" className="w-56" />
      </div>

      {/* Section Header with Parallax */}
      <ParallaxLayer speed={0.15}>
        <div className="flex flex-col items-center text-center space-y-4 mb-16">
          <GlassBadge variant="cyan" icon={<Sparkles className="w-3.5 h-3.5" />}>
            Futuristic Tech Matrix
          </GlassBadge>
          <h2 className="text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white">
            Architectural <span className="text-gradient-cyan">Arsenal</span>
          </h2>
          <p className="max-w-2xl text-gray-400 text-sm sm:text-base leading-relaxed">
            An interactive radar of battle-tested languages, frameworks, neural platforms, and real-time engines mastered through hands-on production code.
          </p>
        </div>
      </ParallaxLayer>

      {/* Orbit Visualization Card */}
      <div className="mb-14">
        <GlassCard glowColor="purple" tilt={false} className="p-8 relative overflow-hidden">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="space-y-4 max-w-md text-left">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-ping" />
                <span className="text-xs font-mono text-cyan-300 uppercase tracking-widest">
                  TECH_RADAR // ACTIVE
                </span>
              </div>
              <h3 className="text-2xl font-bold text-white">
                Synergistic High-Performance Stack
              </h3>
              <p className="text-xs sm:text-sm text-gray-300 leading-relaxed">
                From sub-millisecond C++ algorithms and distributed Python neural models to reactive Next.js client experiences, every tool connects seamlessly to build resilient digital platforms.
              </p>
              <div className="flex items-center gap-3 pt-2 font-mono text-xs text-purple-300">
                <Activity className="w-4 h-4 text-cyan-400" />
                <span>OVERALL EFFICIENCY: 98.4%</span>
              </div>
            </div>

            {/* Futuristic Tech Orbit Visualizer */}
            <div className="relative w-64 h-64 sm:w-72 sm:h-72 flex items-center justify-center">
              {/* Outer Ring */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 rounded-full border border-dashed border-cyan-400/30 flex items-center justify-center"
              >
                {/* Orbiting Satellite Dots */}
                <div className="absolute -top-3 w-6 h-6 rounded-full bg-purple-600/80 border border-purple-400 flex items-center justify-center text-[10px]">
                  ⚛️
                </div>
                <div className="absolute -bottom-3 w-6 h-6 rounded-full bg-cyan-600/80 border border-cyan-400 flex items-center justify-center text-[10px]">
                  🐍
                </div>
                <div className="absolute -left-3 w-6 h-6 rounded-full bg-pink-600/80 border border-pink-400 flex items-center justify-center text-[10px]">
                  ⚙️
                </div>
                <div className="absolute -right-3 w-6 h-6 rounded-full bg-blue-600/80 border border-blue-400 flex items-center justify-center text-[10px]">
                  🎮
                </div>
              </motion.div>

              {/* Inner Counter-Rotating Ring */}
              <motion.div
                animate={{ rotate: -360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="absolute w-44 h-44 rounded-full border border-purple-500/40 flex items-center justify-center"
              >
                <div className="absolute -top-2 w-5 h-5 rounded-full bg-cyan-500/80 border border-cyan-300 flex items-center justify-center text-[9px]">
                  ▲
                </div>
                <div className="absolute -bottom-2 w-5 h-5 rounded-full bg-purple-500/80 border border-purple-300 flex items-center justify-center text-[9px]">
                  🧠
                </div>
              </motion.div>

              {/* Core Pulsing Node */}
              <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-purple-600 via-indigo-600 to-cyan-500 p-[1.5px] shadow-[0_0_30px_rgba(139,92,246,0.6)]">
                <div className="w-full h-full bg-[#07041a] rounded-[14px] flex flex-col items-center justify-center">
                  <Flame className="w-6 h-6 text-cyan-300 animate-pulse" />
                  <span className="text-[10px] font-mono font-bold text-white tracking-widest mt-0.5">
                    CORE
                  </span>
                </div>
              </div>
            </div>
          </div>
        </GlassCard>
      </div>

      {/* Interactive Controls Bar: Category Filter + Search */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-10">
        {/* Category Pills */}
        <div className="flex flex-wrap items-center justify-center md:justify-start gap-2">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => {
                setSelectedCategory(cat.id);
                sound.playClick();
              }}
              onMouseEnter={() => sound.playHover()}
              className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-medium transition-all duration-200 ${
                selectedCategory === cat.id
                  ? "bg-gradient-to-r from-purple-600 to-cyan-500 text-white shadow-[0_0_15px_rgba(139,92,246,0.4)] border border-white/20"
                  : "bg-white/[0.04] text-gray-400 hover:text-white hover:bg-white/[0.08] border border-white/[0.08]"
              }`}
            >
              {cat.icon}
              <span>{cat.label}</span>
            </button>
          ))}
        </div>

        {/* Search input */}
        <div className="relative w-full md:w-64">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search technology..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 rounded-xl bg-white/[0.04] border border-white/10 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400 focus:shadow-[0_0_15px_rgba(6,182,212,0.3)] transition-all"
          />
        </div>
      </div>

      {/* Skills Grid */}
      <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <AnimatePresence>
          {filteredSkills.map((skill) => (
            <motion.div
              layout
              key={skill.name}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3 }}
            >
              <GlassCard glowColor={skill.accentGlow} className="h-full flex flex-col justify-between p-6">
                <div className="space-y-4">
                  {/* Top Bar: Icon & Level */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-white/[0.05] border border-white/10 flex items-center justify-center text-xl font-bold font-mono">
                        {skill.iconText}
                      </div>
                      <div>
                        <h4 className="text-base font-bold text-white">{skill.name}</h4>
                        <span className="text-[11px] font-mono uppercase text-gray-400">
                          {skill.category}
                        </span>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="text-sm font-mono font-bold text-cyan-300">
                        {skill.level}%
                      </span>
                    </div>
                  </div>

                  {/* Animated Progress Bar */}
                  <div className="w-full h-1.5 rounded-full bg-white/10 overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${skill.level}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, ease: "easeOut" }}
                      className="h-full rounded-full bg-gradient-to-r from-purple-500 via-indigo-500 to-cyan-400 shadow-[0_0_8px_#00f0ff]"
                    />
                  </div>

                  {/* Description */}
                  <p className="text-xs text-gray-300 leading-relaxed">
                    {skill.description}
                  </p>
                </div>

                {/* Sub-tags */}
                <div className="pt-4 mt-3 border-t border-white/10 flex flex-wrap gap-1.5">
                  {skill.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-0.5 rounded text-[10px] font-mono bg-white/[0.04] text-purple-300 border border-white/5"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </section>
  );
}

