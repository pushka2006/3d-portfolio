"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { GlassCard } from "@/components/ui/GlassCard";
import { GlassBadge } from "@/components/ui/GlassBadge";
import { ParallaxLayer } from "@/components/effects/ParallaxLayer";
import { ProjectModal, ProjectData } from "@/components/ProjectModal";
import { sound } from "@/utils/sound";
import {
  Sparkles,
  ArrowUpRight,
  Eye,
  BarChart3,
} from "lucide-react";

const PROJECTS: ProjectData[] = [
  {
    id: "mplads-ai",
    title: "MPLADS AI Dashboard",
    subtitle: "AI-Powered Civic Expenditure & Predictive Governance Platform",
    category: "Full Stack & AI Analytics",
    badge: "FLAGSHIP",
    summary:
      "A comprehensive, intelligent analytics dashboard developed to bring radical transparency and algorithmic accountability to civic fund expenditures under the Members of Parliament Local Area Development Scheme (MPLADS).",
    problem:
      "Civic allocation tracking across districts suffered from fragmented datasets, delayed financial reporting, and inability to detect expenditure anomalies or stalled infrastructure projects early.",
    solution:
      "Engineered an end-to-end full stack architecture leveraging Next.js, FastAPI, and TensorFlow predictive regressors. Implemented automated geospatial GIS mapping, fund utilization forecasting, and anomaly detection algorithms.",
    impact:
      "Successfully automated auditing of 10,000+ public works allocations, accelerated fund bottleneck detection by 85%, and delivered interactive visualizations to civic stakeholders.",
    technologies: ["Next.js", "Python / FastAPI", "TensorFlow", "PostgreSQL", "Tailwind CSS", "Mapbox GL"],
    metrics: [
      { label: "Data Records Audited", value: "100k+" },
      { label: "Forecast Accuracy", value: "94.2%" },
      { label: "Query Latency", value: "< 45ms" },
    ],
    liveUrl: "https://github.com",
    githubUrl: "https://github.com",
    accentColor: "cyan",
    bannerGradient: "from-cyan-950 via-purple-950 to-blue-950",
  },
  {
    id: "omega-nexus",
    title: "Omega Nexus AI Platform",
    subtitle: "Autonomous Multi-Agent Orchestration & Workflow Framework",
    category: "Artificial Intelligence",
    badge: "AI PLATFORM",
    summary:
      "An enterprise-grade autonomous agent framework that coordinates specialized LLM agents to decompose, execute, verify, and complete complex software engineering and research tasks collaboratively.",
    problem:
      "Single-prompt LLMs fail when tackling multifaceted workflows that require iterative planning, tool execution, state persistence, and self-correcting validation loops.",
    solution:
      "Built a directed acyclic graph (DAG) execution engine featuring persistent vector memory, dynamic runtime sandbox execution, tool integration (APIs, search, code compilation), and automated critique reflection agents.",
    impact:
      "Reduced multi-step coding task completion time by 65% with zero human intervention required across complex multi-file codebase refactoring loops.",
    technologies: ["Python", "FastAPI", "OpenAI / Claude API", "ChromaDB Vector DB", "LangGraph", "Docker"],
    metrics: [
      { label: "Autonomous Tasks Run", value: "15k+" },
      { label: "Agent Coordination", value: "8 Agents" },
      { label: "Memory Retrieval", value: "12ms" },
    ],
    liveUrl: "https://github.com",
    githubUrl: "https://github.com",
    accentColor: "purple",
    bannerGradient: "from-purple-950 via-indigo-950 to-fuchsia-950",
  },
  {
    id: "anime-stream",
    title: "Anime Streaming Application",
    subtitle: "Next-Gen Cinematic Streaming Platform with AI Recommendations",
    category: "Creative Web & Media",
    badge: "CINEMATIC WEB",
    summary:
      "A lightning-fast, ad-free anime entertainment portal built with a custom video player, adaptive HLS bitrate streaming, synchronized multilingual subtitles, and neural taste recommendation.",
    problem:
      "Traditional streaming platforms are plagued with intrusive ads, sluggish buffering on high-latency connections, and cookie-cutter recommendation algorithms.",
    solution:
      "Created a modern Next.js client with customized Video.js player, serverless HLS transcoding endpoints, CDN edge caching, and a collaborative-filtering recommendation model trained on millions of ratings.",
    impact:
      "Delivers instant video start times under 300ms, smooth 1080p 60fps playback with zero buffering, and an immersive dark glassmorphic UI adored by community testers.",
    technologies: ["React 18", "Next.js", "HLS.js / Video.js", "Node.js", "Tailwind CSS", "Redis Cache"],
    metrics: [
      { label: "Time-to-First-Frame", value: "280ms" },
      { label: "Supported Titles", value: "5,000+" },
      { label: "User Satisfaction", value: "99.1%" },
    ],
    liveUrl: "https://github.com",
    githubUrl: "https://github.com",
    accentColor: "magenta",
    bannerGradient: "from-fuchsia-950 via-purple-950 to-pink-950",
  },
  {
    id: "ai-assistant",
    title: "CyberCore AI Assistant",
    subtitle: "Real-Time Voice, Vision & Code Synthesis Intelligence Hub",
    category: "AI & Systems",
    badge: "MULTIMODAL",
    summary:
      "A personal AI command station featuring real-time conversational voice synthesis, screen & camera vision reasoning, sandboxed code interpretation, and integrated developer tools.",
    problem:
      "Developers lose hours context-switching between search engines, documentation tabs, IDE terminals, and separate AI chat interfaces.",
    solution:
      "Developed a desktop-integrated assistant with low-latency WebSockets streaming, Whisper speech-to-text, fast TTS audio playback, and programmatic shell execution capabilities.",
    impact:
      "Achieved sub-500ms voice turn-taking and eliminated 80% of repetitive documentation lookup workflows for daily development tasks.",
    technologies: ["Python", "WebSockets", "Whisper", "PyTorch", "Electron / Next.js", "Ollama LLMs"],
    metrics: [
      { label: "Voice Latency", value: "480ms" },
      { label: "Functions Automated", value: "40+" },
      { label: "Local Offline Mode", value: "Yes" },
    ],
    liveUrl: "https://github.com",
    githubUrl: "https://github.com",
    accentColor: "cyan",
    bannerGradient: "from-cyan-950 via-slate-900 to-indigo-950",
  },
  {
    id: "game-dev",
    title: "Chronos Odyssey & Cyber Engine",
    subtitle: "3D Real-Time Physics Action RPG & Procedural Voxel Engine",
    category: "Game Development",
    badge: "3D ENGINES",
    summary:
      "A dual project showcasing advanced 3D mechanics: an action combat RPG featuring responsive swordplay, dodge physics, and dynamic lighting, paired with a custom procedural voxel terrain generator.",
    problem:
      "Creating seamless procedural infinite terrain while maintaining a smooth 60fps framerate on mid-tier hardware requires aggressive memory pooling and multi-threaded chunk generation.",
    solution:
      "Architected multithreaded compute shaders, custom HLSL lighting models, Marching Cubes mesh generation, and inverse kinematics character animation in Unity and Unreal Engine 5.",
    impact:
      "Maintains a locked 60+ FPS across complex terrains with 1M+ active polygons, featuring dynamic day-night volumetric lighting and real-time destructible physics.",
    technologies: ["Unreal Engine 5", "Unity", "C++", "C#", "HLSL Custom Shaders", "PhysX"],
    metrics: [
      { label: "Framerate Target", value: "60+ FPS" },
      { label: "Active Triangles", value: "1.2M" },
      { label: "Terrain Chunks", value: "Infinite" },
    ],
    liveUrl: "https://github.com",
    githubUrl: "https://github.com",
    accentColor: "purple",
    bannerGradient: "from-purple-950 via-zinc-950 to-cyan-950",
  },
];

export default function Projects() {
  const [selectedProject, setSelectedProject] = useState<ProjectData | null>(null);
  const [filter, setFilter] = useState<string>("all");

  const filteredProjects = PROJECTS.filter((p) => {
    if (filter === "all") return true;
    if (filter === "ai") return p.category.includes("AI");
    if (filter === "web") return p.category.includes("Full Stack") || p.category.includes("Web");
    if (filter === "game") return p.category.includes("Game");
    return true;
  });

  return (
    <section id="projects" className="relative py-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Section Header with Parallax */}
      <ParallaxLayer speed={0.15}>
        <div className="flex flex-col items-center text-center space-y-4 mb-14">
          <GlassBadge variant="purple" icon={<Sparkles className="w-3.5 h-3.5" />}>
            Portfolio Showcase
          </GlassBadge>
          <h2 className="text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white">
            Featured <span className="text-gradient-neon">Creations</span>
          </h2>
          <p className="max-w-2xl text-gray-400 text-sm sm:text-base leading-relaxed">
            A curated exhibition of production full-stack systems, neural AI engines, and real-time interactive experiences built with deep architectural rigour.
          </p>
        </div>
      </ParallaxLayer>

      {/* Filter Tabs */}
      <div className="flex justify-center items-center gap-2 mb-12">
        {[
          { id: "all", label: "All Projects" },
          { id: "ai", label: "AI & ML" },
          { id: "web", label: "Full Stack Web" },
          { id: "game", label: "Game Dev & 3D" },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => {
              setFilter(tab.id);
              sound.playClick();
            }}
            onMouseEnter={() => sound.playHover()}
            className={`px-4 py-2 rounded-xl text-xs font-medium transition-all ${
              filter === tab.id
                ? "bg-gradient-to-r from-purple-600 to-cyan-500 text-white shadow-[0_0_15px_rgba(139,92,246,0.4)] border border-white/20"
                : "bg-white/[0.04] text-gray-400 hover:text-white border border-white/[0.08]"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Featured Project Spotlight (Hero Card) */}
      <div className="mb-12">
        <GlassCard
          glowColor="cyan"
          tilt={false}
          className="p-8 sm:p-10 border-cyan-500/30 relative overflow-hidden group cursor-pointer"
          onClick={() => {
            sound.playWarp();
            setSelectedProject(PROJECTS[0]);
          }}
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 space-y-5 text-left">
              <div className="flex items-center gap-3">
                <GlassBadge variant="cyan" pulse>
                  ⭐ FEATURED SPOTLIGHT
                </GlassBadge>
                <span className="text-xs font-mono text-purple-300">
                  {PROJECTS[0].category}
                </span>
              </div>

              <h3 className="text-2xl sm:text-4xl font-extrabold text-white group-hover:text-cyan-300 transition-colors">
                {PROJECTS[0].title}
              </h3>

              <p className="text-xs sm:text-sm text-gray-300 leading-relaxed font-normal">
                {PROJECTS[0].summary}
              </p>

              {/* Metrics Highlights */}
              <div className="grid grid-cols-3 gap-2 py-2">
                {PROJECTS[0].metrics.map((m) => (
                  <div key={m.label} className="p-3 rounded-xl bg-white/[0.03] border border-white/10">
                    <div className="text-base sm:text-xl font-bold font-mono text-cyan-300">
                      {m.value}
                    </div>
                    <div className="text-[10px] font-mono text-gray-400 uppercase mt-0.5">
                      {m.label}
                    </div>
                  </div>
                ))}
              </div>

              {/* Technologies */}
              <div className="flex flex-wrap gap-2 pt-2">
                {PROJECTS[0].technologies.map((t) => (
                  <span
                    key={t}
                    className="px-2.5 py-1 rounded-md text-xs font-mono bg-purple-500/10 text-purple-300 border border-purple-500/20"
                  >
                    {t}
                  </span>
                ))}
              </div>

              {/* Action */}
              <div className="pt-2 flex items-center gap-4">
                <div className="flex items-center gap-2 text-cyan-400 text-sm font-semibold group-hover:translate-x-1 transition-transform">
                  <span>Explore Architecture Breakdown</span>
                  <ArrowUpRight className="w-4 h-4" />
                </div>
              </div>
            </div>

            {/* Visual Graphic Representation */}
            <div className="lg:col-span-5 aspect-[4/3] rounded-2xl bg-gradient-to-br from-cyan-950/60 via-purple-950/60 to-black border border-white/10 p-6 flex flex-col justify-between relative overflow-hidden group-hover:border-cyan-400/50 transition-colors">
              <div className="absolute inset-0 cyber-grid-bg opacity-40" />

              <div className="flex items-center justify-between text-xs font-mono text-cyan-300 relative z-10">
                <span className="flex items-center gap-1.5">
                  <BarChart3 className="w-4 h-4" /> ANALYTICS_CORE
                </span>
                <span className="text-emerald-400">99.8% ACCURACY</span>
              </div>

              {/* Mockup visual elements */}
              <div className="relative z-10 space-y-2 py-4">
                <div className="w-full h-8 rounded-lg bg-white/[0.06] border border-white/10 flex items-center px-3 justify-between">
                  <span className="text-[11px] font-mono text-gray-300">Expenditure Geo-Forecast</span>
                  <span className="text-[11px] font-mono text-cyan-400">LIVE</span>
                </div>
                <div className="w-3/4 h-8 rounded-lg bg-white/[0.04] border border-white/10 flex items-center px-3 justify-between">
                  <span className="text-[11px] font-mono text-gray-400">District Fund Allocation</span>
                  <span className="text-[11px] font-mono text-purple-400">OPTIMAL</span>
                </div>
                <div className="w-5/6 h-8 rounded-lg bg-white/[0.03] border border-white/10 flex items-center px-3 justify-between">
                  <span className="text-[11px] font-mono text-gray-400">Civic Anomaly Detection</span>
                  <span className="text-[11px] font-mono text-emerald-400">0 CRITICAL</span>
                </div>
              </div>

              <div className="text-[10px] font-mono text-gray-500 relative z-10">
                CLICK TO OPEN FULL SYSTEM SPEC
              </div>
            </div>
          </div>
        </GlassCard>
      </div>

      {/* Projects Grid for Remaining Works */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {filteredProjects.slice(1).map((project, idx) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: idx * 0.1 }}
          >
            <GlassCard
              glowColor={project.accentColor}
              className="h-full flex flex-col justify-between p-7 cursor-pointer group"
              onClick={() => {
                sound.playWarp();
                setSelectedProject(project);
              }}
            >
              <div className="space-y-4">
                {/* Header Mockup */}
                <div
                  className={`w-full aspect-video rounded-xl bg-gradient-to-r ${project.bannerGradient} p-5 relative overflow-hidden flex flex-col justify-between border border-white/10 group-hover:border-white/20 transition-all`}
                >
                  <div className="absolute inset-0 cyber-grid-bg opacity-30" />

                  <div className="flex items-center justify-between relative z-10">
                    <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-black/60 text-cyan-300 border border-white/10">
                      {project.badge}
                    </span>
                    <div className="w-7 h-7 rounded-lg bg-black/60 flex items-center justify-center text-white/80 group-hover:text-cyan-300 transition-colors">
                      <ArrowUpRight className="w-4 h-4" />
                    </div>
                  </div>

                  <div className="relative z-10">
                    <div className="text-lg font-bold text-white group-hover:text-cyan-300 transition-colors">
                      {project.title}
                    </div>
                    <div className="text-xs text-gray-400 line-clamp-1">{project.subtitle}</div>
                  </div>
                </div>

                {/* Summary */}
                <p className="text-xs sm:text-sm text-gray-300 leading-relaxed line-clamp-3">
                  {project.summary}
                </p>

                {/* Tech Pills */}
                <div className="flex flex-wrap gap-1.5 pt-2">
                  {project.technologies.slice(0, 4).map((tech) => (
                    <span
                      key={tech}
                      className="px-2 py-0.5 rounded text-[11px] font-mono bg-white/[0.04] text-purple-300 border border-white/5"
                    >
                      {tech}
                    </span>
                  ))}
                  {project.technologies.length > 4 && (
                    <span className="px-2 py-0.5 rounded text-[11px] font-mono bg-white/[0.04] text-gray-400">
                      +{project.technologies.length - 4} more
                    </span>
                  )}
                </div>
              </div>

              {/* Bottom Card Bar */}
              <div className="pt-5 mt-4 border-t border-white/10 flex items-center justify-between text-xs font-mono text-gray-400">
                <span className="flex items-center gap-1.5 text-cyan-400">
                  <Eye className="w-3.5 h-3.5" /> View Project Specs
                </span>
                <span className="text-gray-500">2026 RELEASE</span>
              </div>
            </GlassCard>
          </motion.div>
        ))}
      </div>

      {/* Project Detail Modal */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </section>
  );
}

