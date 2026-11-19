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
  Cpu,
} from "lucide-react";

const PROJECTS: ProjectData[] = [
  {
    id: "omega-nexus",
    title: "Omega Nexus AI OS",
    subtitle: "Autonomous Multi-Agent Orchestration & Workflow Framework",
    category: "Artificial Intelligence",
    badge: "FLAGSHIP AI",
    summary:
      "An enterprise-grade autonomous multi-agent operating system that orchestrates teams of specialized LLM agents to decompose, execute, verify, and complete complex software engineering and research workflows with zero human intervention.",
    problem:
      "Single-prompt LLMs fail when tackling multifaceted engineering workflows that require iterative planning, tool execution, state persistence, and self-correcting validation loops.",
    solution:
      "Engineered a directed acyclic graph (DAG) execution engine featuring persistent vector memory, dynamic runtime sandbox execution, tool integration (APIs, search, code compilation), and automated critique reflection agents.",
    impact:
      "Reduced multi-step coding task completion time by 65% with zero human intervention required across complex multi-file codebase refactoring loops.",
    technologies: ["Python", "FastAPI", "OpenAI / Claude API", "ChromaDB Vector DB", "LangGraph", "Docker"],
    metrics: [
      { label: "Autonomous Tasks Run", value: "15k+" },
      { label: "Agent Coordination", value: "8 Agents" },
      { label: "Memory Retrieval", value: "12ms" },
    ],
    liveUrl: "https://github.com/pushka2006",
    githubUrl: "https://github.com/pushka2006",
    accentColor: "purple",
    bannerGradient: "from-purple-950 via-indigo-950 to-cyan-950",
  },
  {
    id: "mediasphere-ai",
    title: "MediaSphere AI",
    subtitle: "AI-Powered Media Planning & Creative Studio Suite",
    category: "Creative AI & SaaS",
    badge: "CREATIVE AI",
    summary:
      "An intelligent cloud studio designed to automate video, graphics, and multi-channel campaign planning using deep generative AI models and real-time collaborative timelines.",
    problem:
      "Content creators and media agencies face severe pipeline fragmentation across ideation, asset synthesis, video rendering, and multi-platform distribution.",
    solution:
      "Engineered a unified WebGL timeline interface with serverless rendering queues, multimodal AI generation endpoints, and real-time collaborative state synchronization.",
    impact:
      "Accelerated media campaign production lifecycle by 4x, serving thousands of active creators with sub-second asset preview rendering.",
    technologies: ["Next.js 14", "TypeScript", "Node.js", "WebGL", "Redis", "AWS S3"],
    metrics: [
      { label: "Render Time", value: "< 2.4s" },
      { label: "Active Creators", value: "5,000+" },
      { label: "Platform Uptime", value: "99.98%" },
    ],
    liveUrl: "https://github.com/pushka2006",
    githubUrl: "https://github.com/pushka2006",
    accentColor: "cyan",
    bannerGradient: "from-cyan-950 via-blue-950 to-purple-950",
  },
  {
    id: "ecogrid-ai",
    title: "EcoGrid AI",
    subtitle: "Smart Green Energy Forecasting & Grid Optimization",
    category: "Sustainability & IoT",
    badge: "GREEN TECH",
    summary:
      "A next-generation environmental analytics and clean energy forecasting platform that models renewable microgrid outputs and minimizes grid carbon footprint using deep time-series neural networks.",
    problem:
      "Unpredictable weather patterns lead to severe curtailment and inefficient load distribution in solar and wind renewable energy microgrids.",
    solution:
      "Implemented transformer-based time-series forecasting models that predict wind and solar energy yield 72 hours in advance with extreme precision.",
    impact:
      "Optimized battery energy storage utilization by 28% and prevented over 1,200 metric tons of carbon emissions across pilot deployments.",
    technologies: ["Python", "PyTorch", "FastAPI", "Next.js", "PostgreSQL", "Tailwind CSS"],
    metrics: [
      { label: "Yield Accuracy", value: "96.4%" },
      { label: "Carbon Saved", value: "1.2k Tons" },
      { label: "Grid Latency", value: "35ms" },
    ],
    liveUrl: "https://github.com/pushka2006",
    githubUrl: "https://github.com/pushka2006",
    accentColor: "cyan",
    bannerGradient: "from-emerald-950 via-teal-950 to-cyan-950",
  },
  {
    id: "mplads-ai",
    title: "MPLADS AI Dashboard",
    subtitle: "AI-Powered Civic Expenditure & Predictive Governance Platform",
    category: "Full Stack & AI Analytics",
    badge: "HACKATHON WINNER",
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
    liveUrl: "https://github.com/pushka2006",
    githubUrl: "https://github.com/pushka2006",
    accentColor: "blue",
    bannerGradient: "from-cyan-950 via-purple-950 to-blue-950",
  },
  {
    id: "game-dev",
    title: "Chronos Odyssey & 3D Voxel Engine",
    subtitle: "3D Real-Time Physics Action RPG & Procedural Voxel Engine",
    category: "Game Development & 3D",
    badge: "3D GRAPHICS",
    summary:
      "A showcase of advanced 3D mechanics: an action combat RPG featuring responsive swordplay, dodge physics, and dynamic lighting, paired with a custom procedural voxel terrain generator.",
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
    liveUrl: "https://github.com/pushka2006",
    githubUrl: "https://github.com/pushka2006",
    accentColor: "purple",
    bannerGradient: "from-purple-950 via-zinc-950 to-cyan-950",
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
    liveUrl: "https://github.com/pushka2006",
    githubUrl: "https://github.com/pushka2006",
    accentColor: "cyan",
    bannerGradient: "from-cyan-950 via-slate-900 to-indigo-950",
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

            {/* Visual Graphic Representation: Omega Nexus Neural Core */}
            <div className="lg:col-span-5 aspect-[4/3] rounded-2xl bg-gradient-to-br from-purple-950/70 via-[#0a0624] to-cyan-950/70 border border-purple-500/30 p-6 flex flex-col justify-between relative overflow-hidden group-hover:border-cyan-400/50 transition-colors">
              <div className="absolute inset-0 cyber-grid-bg opacity-40" />

              <div className="flex items-center justify-between text-xs font-mono text-cyan-300 relative z-10">
                <span className="flex items-center gap-1.5">
                  <Cpu className="w-4 h-4 text-purple-400 animate-pulse" /> NEURAL_DAG_ENGINE
                </span>
                <span className="text-emerald-400">8 AGENTS SYNCED</span>
              </div>

              {/* Neural Network Nodes & Autonomous Agent Mesh */}
              <div className="relative z-10 space-y-2.5 py-3">
                <div className="w-full h-9 rounded-lg bg-purple-950/40 border border-purple-500/40 flex items-center px-3 justify-between">
                  <span className="text-[11px] font-mono text-purple-200 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-purple-400 animate-ping" />
                    Agent Orchestrator // Lead LLM
                  </span>
                  <span className="text-[11px] font-mono text-cyan-300">ACTIVE</span>
                </div>
                <div className="w-11/12 h-9 rounded-lg bg-cyan-950/40 border border-cyan-500/40 flex items-center px-3 justify-between">
                  <span className="text-[11px] font-mono text-cyan-200 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-cyan-400" />
                    Vector Memory (ChromaDB)
                  </span>
                  <span className="text-[11px] font-mono text-purple-300">12ms RETRIEVAL</span>
                </div>
                <div className="w-10/12 h-9 rounded-lg bg-indigo-950/40 border border-indigo-500/40 flex items-center px-3 justify-between">
                  <span className="text-[11px] font-mono text-indigo-200 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-400" />
                    Critique &amp; Validation Loop
                  </span>
                  <span className="text-[11px] font-mono text-emerald-400">VERIFIED</span>
                </div>
              </div>

              <div className="text-[10px] font-mono text-gray-500 relative z-10">
                CLICK TO OPEN FULL SYSTEM SPEC // OMEGA NEXUS AI
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

