"use client";

import { motion } from "framer-motion";
import { GlassCard } from "@/components/ui/GlassCard";
import { GlassBadge } from "@/components/ui/GlassBadge";
import { ParallaxLayer } from "@/components/effects/ParallaxLayer";
import { FloatingHUD } from "@/components/effects/FloatingHUD";
import {
  Code2,
  Cpu,
  Gamepad2,
  Palette,
  Sparkles,
  Terminal,
  Zap,
  CheckCircle2,
} from "lucide-react";

const STATS = [
  {
    number: "04+",
    label: "Years of Coding",
    detail: "Relentless problem solving & continuous shipping",
    badge: "EXP",
    color: "from-purple-500 to-indigo-500",
  },
  {
    number: "25+",
    label: "Projects Completed",
    detail: "Production web applications, AI models & games",
    badge: "SHIPPED",
    color: "from-cyan-400 to-blue-500",
  },
  {
    number: "18+",
    label: "Technologies Mastered",
    detail: "Full stack, deep learning & real-time graphics",
    badge: "STACK",
    color: "from-pink-500 to-purple-500",
  },
  {
    number: "100%",
    label: "Curiosity Level",
    detail: "Constantly exploring cutting-edge frontiers",
    badge: "INFINITE",
    color: "from-emerald-400 to-cyan-500",
    isInfinite: true,
  },
];

const PILLARS = [
  {
    id: "fullstack",
    title: "Full Stack Development",
    icon: <Code2 className="w-6 h-6 text-cyan-400" />,
    gradient: "from-cyan-500/20 to-blue-600/10",
    borderGlow: "cyan" as const,
    description:
      "Architecting end-to-end cloud platforms with Next.js, React, Node.js, and TypeScript. Specializing in high-throughput APIs, modern state machines, and microsecond rendering speed.",
    skills: ["Next.js (App Router)", "TypeScript", "Node.js / Express", "MySQL & PostgreSQL", "REST & GraphQL"],
  },
  {
    id: "ai",
    title: "Artificial Intelligence",
    icon: <Cpu className="w-6 h-6 text-purple-400" />,
    gradient: "from-purple-500/20 to-indigo-600/10",
    borderGlow: "purple" as const,
    description:
      "Building autonomous multi-agent orchestration, neural network architectures with TensorFlow & PyTorch, and context-augmented RAG workflows that automate real-world intelligence.",
    skills: ["TensorFlow & PyTorch", "LLM Orchestration", "Vector Databases", "Computer Vision", "Predictive Analytics"],
  },
  {
    id: "game",
    title: "Game Development",
    icon: <Gamepad2 className="w-6 h-6 text-fuchsia-400" />,
    gradient: "from-fuchsia-500/20 to-purple-600/10",
    borderGlow: "magenta" as const,
    description:
      "Crafting 3D real-time interactive physics simulations, procedural level generation, and shader pipelines in Unity and Unreal Engine with C++ and C#.",
    skills: ["Unity Engine", "Unreal Engine 5", "C++ / C# Scripting", "HLSL Custom Shaders", "Physics Simulation"],
  },
  {
    id: "design",
    title: "Creative Design & 3D Web",
    icon: <Palette className="w-6 h-6 text-emerald-400" />,
    gradient: "from-emerald-500/20 to-cyan-600/10",
    borderGlow: "blue" as const,
    description:
      "Merging art direction with web engineering. Creating fluid Awwwards-worthy micro-interactions, custom WebGL/Three.js shaders, and responsive glassmorphic design systems.",
    skills: ["Three.js & WebGL", "Framer Motion", "Tailwind CSS", "UI/UX Architecture", "Sound Design"],
  },
];

export default function About() {
  return (
    <section id="about" className="relative py-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Floating Holographic Telemetry HUD Panel */}
      <div className="hidden xl:block absolute top-12 right-8 z-20">
        <FloatingHUD title="QUANTUM_CORE" variant="telemetry" className="w-56" />
      </div>

      {/* Section Header */}
      <ParallaxLayer speed={0.15}>
        <div className="flex flex-col items-center text-center space-y-4 mb-20">
          <GlassBadge variant="purple" icon={<Sparkles className="w-3.5 h-3.5" />}>
            Philosophy & Background
          </GlassBadge>
          <h2 className="text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white">
            Dream Big. <span className="text-gradient-neon">Build Bigger.</span>
          </h2>
          <p className="max-w-2xl text-gray-400 text-sm sm:text-base leading-relaxed">
            Behind every breakthrough piece of software is an obsession with craft, curiosity, and execution. Here is a glimpse into how I turn high-dimensional imagination into production code.
          </p>
        </div>
      </ParallaxLayer>

      {/* Narrative & Profile Holo Showcase */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch mb-20">
        {/* Left: Pushkar's Story */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="lg:col-span-7 flex flex-col justify-between"
        >
          <GlassCard glowColor="purple" className="h-full flex flex-col justify-between space-y-6 p-8">
            <div className="space-y-5">
              <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 uppercase tracking-wider">
                <Terminal className="w-4 h-4" /> Pushkar Balyan // Origin & Mission
              </div>

              <h3 className="text-2xl sm:text-3xl font-bold text-white leading-snug">
                Where algorithmic engineering meets cinematic visual storytelling.
              </h3>

              <div className="space-y-4 text-gray-300 text-sm sm:text-base leading-relaxed">
                <p>
                  I am a passionate software engineer, AI researcher, and creative technologist based in India. My journey began with an insatiable hunger to understand how machines think and how digital worlds are formed from lines of text.
                </p>
                <p>
                  Today, that curiosity has translated into shipping robust production full-stack systems, engineering autonomous AI agent systems, developing game mechanics in Unreal and Unity, and pushing the boundaries of web interactivity with 3D shaders and glassmorphism.
                </p>
                <p>
                  Whether optimizing an AI dashboard handling millions of records, orchestrating multi-agent LLM teams, or fine-tuning a 60fps WebGL particle simulation, I build with one standard: <span className="text-cyan-300 font-semibold">uncompromising excellence.</span>
                </p>
              </div>
            </div>

            {/* Core Values / Tags */}
            <div className="pt-6 border-t border-white/10 flex flex-wrap gap-2.5">
              <span className="px-3 py-1.5 rounded-lg bg-purple-500/10 border border-purple-500/20 text-xs font-mono text-purple-300">
                #FullStackCraftsmanship
              </span>
              <span className="px-3 py-1.5 rounded-lg bg-cyan-500/10 border border-cyan-500/20 text-xs font-mono text-cyan-300">
                #AIAgentArchitect
              </span>
              <span className="px-3 py-1.5 rounded-lg bg-pink-500/10 border border-pink-500/20 text-xs font-mono text-pink-300">
                #3DRealtimeEngines
              </span>
              <span className="px-3 py-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-xs font-mono text-emerald-300">
                #PerformanceFirst
              </span>
            </div>
          </GlassCard>
        </motion.div>

        {/* Right: Anime Holo HUD Identity Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="lg:col-span-5"
        >
          <GlassCard glowColor="cyan" className="h-full flex flex-col justify-between p-8 relative overflow-hidden">
            {/* Ambient background glow */}
            <div className="absolute top-0 right-0 w-48 h-48 bg-cyan-500/20 rounded-full blur-3xl pointer-events-none" />

            <div className="space-y-6 relative z-10">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono text-purple-400">OPERATING_SYSTEM</span>
                <span className="text-xs font-mono text-cyan-300 bg-cyan-950/60 px-2 py-0.5 rounded border border-cyan-500/30">
                  SYSTEM_V4.2
                </span>
              </div>

              {/* Cyber anime emblem visual */}
              <div className="w-full aspect-[4/3] rounded-2xl bg-gradient-to-br from-purple-900/40 via-black to-cyan-950/40 border border-white/10 p-6 flex flex-col items-center justify-center relative overflow-hidden group">
                <div className="absolute inset-0 cyber-grid-bg opacity-40" />

                {/* Animated Cyber Core Ring */}
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                  className="w-32 h-32 rounded-full border border-dashed border-cyan-400/40 flex items-center justify-center p-3"
                >
                  <div className="w-full h-full rounded-full border border-purple-500/50 flex items-center justify-center">
                    <Zap className="w-8 h-8 text-cyan-300 animate-pulse" />
                  </div>
                </motion.div>

                <div className="mt-4 text-center">
                  <div className="text-sm font-bold text-white tracking-wider">PUSHKAR BALYAN</div>
                  <div className="text-[11px] font-mono text-purple-300">CORE ARCHITECT // INDIA</div>
                </div>
              </div>

              {/* Status List */}
              <div className="space-y-2.5 font-mono text-xs text-gray-300">
                <div className="flex items-center justify-between p-2 rounded-lg bg-white/[0.03]">
                  <span className="text-gray-400">LOCATION:</span>
                  <span className="text-cyan-300">India (UTC +5:30)</span>
                </div>
                <div className="flex items-center justify-between p-2 rounded-lg bg-white/[0.03]">
                  <span className="text-gray-400">AVAILABILITY:</span>
                  <span className="text-emerald-400 flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                    Open for Visionary Roles
                  </span>
                </div>
                <div className="flex items-center justify-between p-2 rounded-lg bg-white/[0.03]">
                  <span className="text-gray-400">LANGUAGE MATRIX:</span>
                  <span className="text-purple-300">English, Hindi</span>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-white/10 text-[11px] font-mono text-gray-500 text-center">
              PUSHKAR_BALYAN // DIGITAL CRAFTSMAN // 2026
            </div>
          </GlassCard>
        </motion.div>
      </div>

      {/* Animated Statistics Banner */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-24">
        {STATS.map((stat, idx) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: idx * 0.1 }}
          >
            <GlassCard glowColor="purple" tilt={false} className="p-6 text-center">
              <div className="text-[10px] font-mono text-cyan-400 tracking-widest uppercase mb-2">
                [{stat.badge}]
              </div>
              <div
                className={`text-4xl sm:text-5xl font-extrabold tracking-tight bg-gradient-to-r ${stat.color} bg-clip-text text-transparent mb-2`}
              >
                {stat.isInfinite ? (
                  <span className="inline-flex items-center gap-1">
                    100<span className="text-2xl text-cyan-400">%</span>
                  </span>
                ) : (
                  stat.number
                )}
              </div>
              <div className="text-sm font-semibold text-white mb-1">{stat.label}</div>
              <div className="text-[11px] text-gray-400 leading-tight">{stat.detail}</div>
            </GlassCard>
          </motion.div>
        ))}
      </div>

      {/* 4 Pillars of Pushkar's Craft */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-2xl sm:text-3xl font-bold text-white">Engineering Pillars</h3>
            <p className="text-xs sm:text-sm text-gray-400">Core architectural disciplines driving every project</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {PILLARS.map((pillar, idx) => (
            <motion.div
              key={pillar.id}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
            >
              <GlassCard glowColor={pillar.borderGlow} className="h-full flex flex-col justify-between p-7">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="p-3 rounded-xl bg-white/[0.04] border border-white/10">
                      {pillar.icon}
                    </div>
                    <span className="text-xs font-mono text-gray-500">PILLAR // 0{idx + 1}</span>
                  </div>

                  <h4 className="text-xl font-bold text-white">{pillar.title}</h4>
                  <p className="text-sm text-gray-300 leading-relaxed">{pillar.description}</p>
                </div>

                {/* Subskills pills */}
                <div className="pt-6 mt-4 border-t border-white/10 flex flex-wrap gap-2">
                  {pillar.skills.map((skill) => (
                    <span
                      key={skill}
                      className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-white/[0.03] border border-white/10 text-xs text-gray-300 font-mono"
                    >
                      <CheckCircle2 className="w-3 h-3 text-cyan-400" />
                      {skill}
                    </span>
                  ))}
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

