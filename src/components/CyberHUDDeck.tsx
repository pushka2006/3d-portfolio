"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { sound } from "@/utils/sound";
import { RadarScope } from "@/components/RadarScope";
import { HologramGlobe } from "@/components/HologramGlobe";
import { HologramCube } from "@/components/HologramCube";
import { ECGWave } from "@/components/ECGWave";
import { TerminalPrompt } from "@/components/TerminalPrompt";
import { CyberProjectSlider } from "@/components/CyberProjectSlider";
import { CyberTechGrid } from "@/components/CyberTechGrid";
import { InfiniteSpiral } from "@/components/effects/InfiniteSpiral";
import { FloatingHUD } from "@/components/effects/FloatingHUD";
import { ParallaxLayer } from "@/components/effects/ParallaxLayer";
import { ResumeModal } from "@/components/ResumeModal";
import { ProjectModal, ProjectData } from "@/components/ProjectModal";
import {
  GithubIcon,
  LinkedinIcon,
  TwitterIcon,
  YoutubeIcon,
  DiscordIcon,
} from "@/components/ui/BrandIcons";
import {
  Home,
  User,
  Code,
  Sparkles,
  Briefcase,
  Mail,
  ArrowRight,
  Download,
  Users,
  Trophy,
  Star,
  Cpu,
  Mouse,
} from "lucide-react";

const NAV_ITEMS = [
  { id: "home", label: "Home", icon: <Home className="w-4 h-4" /> },
  { id: "about", label: "About", icon: <User className="w-4 h-4" /> },
  { id: "projects", label: "Projects", icon: <Code className="w-4 h-4" /> },
  { id: "skills", label: "Skills", icon: <Sparkles className="w-4 h-4" /> },
  { id: "experience", label: "Experience", icon: <Briefcase className="w-4 h-4" /> },
  { id: "contact", label: "Contact", icon: <Mail className="w-4 h-4" /> },
];

const SLIDE_PROJECT_DETAILS: Record<string, ProjectData> = {
  omega: {
    id: "omega",
    title: "OMEGA NEXUS AI OS",
    subtitle: "Autonomous Multi-Agent Orchestration & Workflow Framework",
    category: "AI & Platform",
    badge: "MULTI-AGENT CORE",
    summary:
      "An enterprise-grade autonomous agent framework that coordinates specialized LLM agents to decompose, execute, verify, and complete complex software engineering and research tasks collaboratively.",
    problem:
      "Single-prompt LLMs fail when tackling multifaceted workflows that require iterative planning, tool execution, state persistence, and self-correcting validation loops.",
    solution:
      "Built a directed acyclic graph (DAG) execution engine featuring persistent vector memory, dynamic runtime sandbox execution, tool integration (APIs, search, code compilation), and automated critique reflection agents.",
    impact:
      "Reduced multi-step coding task completion time by 65% with zero human intervention required across complex multi-file codebase refactoring loops.",
    technologies: ["Python", "FastAPI", "OpenAI / Claude API", "ChromaDB", "LangGraph", "Docker"],
    metrics: [
      { label: "Autonomous Tasks Run", value: "15k+" },
      { label: "Agent Coordination", value: "8 Agents" },
      { label: "Memory Retrieval", value: "12ms" },
    ],
    githubUrl: "https://github.com",
    accentColor: "purple",
    bannerGradient: "from-purple-950 via-indigo-950 to-fuchsia-950",
  },
  media: {
    id: "media",
    title: "MediaSphere AI",
    subtitle: "AI-Powered Media Planning & Studio Suite",
    category: "SaaS Platform",
    badge: "CREATIVE AI",
    summary:
      "An intelligent cloud studio designed to automate video, graphics, and multi-channel campaign planning using deep generative AI models and real-time collaborative timelines.",
    problem:
      "Content creators and media agencies face severe pipeline fragmentation across ideation, asset synthesis, video rendering, and multi-platform distribution.",
    solution:
      "Engineered a unified WebGL timeline interface with serverless rendering queues, multimodal AI generation endpoints, and real-time collaborative state synchronization.",
    impact:
      "Accelerated media campaign production lifecycle by 4x, serving thousands of active creators with sub-second asset preview rendering.",
    technologies: ["Next.js", "TypeScript", "Node.js", "WebGL", "Redis", "AWS S3"],
    metrics: [
      { label: "Render Time", value: "< 2.4s" },
      { label: "Active Creators", value: "5,000+" },
      { label: "Uptime", value: "99.98%" },
    ],
    githubUrl: "https://github.com",
    accentColor: "cyan",
    bannerGradient: "from-cyan-950 via-blue-950 to-indigo-950",
  },
  eco: {
    id: "eco",
    title: "EcoGrid AI",
    subtitle: "Smart Green Energy Forecasting & Grid Optimization",
    category: "Sustainability & IoT",
    badge: "GREEN TECH",
    summary:
      "A next-generation environmental analytics and clean energy forecasting platform that models renewable microgrid outputs and minimizes grid carbon footprint.",
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
    githubUrl: "https://github.com",
    accentColor: "magenta",
    bannerGradient: "from-emerald-950 via-teal-950 to-black",
  },
};

const HERO_ROLES = [
  "Full Stack Developer | AI Engineer | Creative Technologist",
  "Autonomous Multi-Agent Systems Architect",
  "3D WebGL & Real-Time Graphics Specialist",
  "Production Cloud & Deep Learning Engineer",
];

export function CyberHUDDeck() {
  const [activeTab, setActiveTab] = useState("home");
  const [resumeOpen, setResumeOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<ProjectData | null>(null);
  const [heroMouse, setHeroMouse] = useState({ x: 0, y: 0 });
  const [roleIndex, setRoleIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setRoleIndex((prev) => (prev + 1) % HERO_ROLES.length);
    }, 3400);
    return () => clearInterval(interval);
  }, []);

  const handleHeroMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setHeroMouse({ x, y });
  };

  const handleNav = (id: string) => {
    setActiveTab(id);
    sound.playClick();
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <div className="relative w-full max-w-[1540px] mx-auto p-2 sm:p-4 select-none">
        {/* Outer Cyberpunk HUD Wrapper Container */}
        <div className="relative rounded-[28px] bg-[#050316]/88 backdrop-blur-2xl border border-cyan-500/40 p-3 sm:p-5 md:p-6 shadow-[0_0_60px_rgba(6,182,212,0.25),inset_0_1px_3px_rgba(255,255,255,0.15)] overflow-hidden">
          {/* Cyber Corner Bezel Brackets */}
          <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-cyan-400 rounded-tl-2xl pointer-events-none shadow-[0_0_15px_#00f0ff]" />
          <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-cyan-400 rounded-tr-2xl pointer-events-none shadow-[0_0_15px_#00f0ff]" />
          <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-cyan-400 rounded-bl-2xl pointer-events-none shadow-[0_0_15px_#00f0ff]" />
          <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-cyan-400 rounded-br-2xl pointer-events-none shadow-[0_0_15px_#00f0ff]" />

          {/* HUD Content Layout: Left Sidebar + Main Command Deck */}
          <div className="flex gap-4 md:gap-5 relative z-10">
            {/* 1. Left Vertical Cyber Dock (matching reference image) */}
            <aside className="hidden md:flex flex-col items-center justify-between py-1 shrink-0">
              {/* Top Radar Scope Dial */}
              <div className="mb-5">
                <RadarScope />
              </div>

              {/* Vertical Navigation Pill Strip */}
              <nav className="flex flex-col items-center gap-3 py-4 px-2 rounded-2xl bg-[#090624]/90 border border-purple-500/40 backdrop-blur-xl shadow-[0_0_25px_rgba(139,92,246,0.25)]">
                {NAV_ITEMS.map((item) => {
                  const isActive = activeTab === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => handleNav(item.id)}
                      onMouseEnter={() => sound.playHover()}
                      title={item.label}
                      className={`flex flex-col items-center justify-center p-2.5 rounded-xl transition-all duration-300 ${
                        isActive
                          ? "bg-gradient-to-r from-purple-600 via-pink-600 to-purple-500 text-white shadow-[0_0_20px_rgba(217,70,239,0.8)] border border-pink-300"
                          : "text-gray-400 hover:text-white hover:bg-white/[0.08]"
                      }`}
                    >
                      {item.icon}
                      <span className="text-[9px] font-mono mt-1 font-semibold">
                        {item.label}
                      </span>
                    </button>
                  );
                })}
              </nav>

              {/* Bottom Mouse Scroll Explorer */}
              <div className="mt-5 flex flex-col items-center gap-1.5 text-gray-400">
                <div className="p-1.5 rounded-lg border border-cyan-500/40 bg-black/70 shadow-[0_0_12px_rgba(6,182,212,0.35)]">
                  <Mouse className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
                </div>
                <span className="text-[8px] font-mono text-cyan-300 uppercase tracking-widest text-center">
                  Scroll Explore
                </span>
                <div className="w-[1.5px] h-8 bg-gradient-to-b from-cyan-400 to-transparent" />
              </div>
            </aside>

            {/* 2. Main Command Deck Area */}
            <div className="flex-1 flex flex-col space-y-5">
              {/* TOP HEADER BAR */}
              <header className="flex flex-wrap items-center justify-between gap-4 py-1.5 border-b border-cyan-500/20 pb-4">
                {/* Logo & Identity */}
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-600 via-pink-600 to-cyan-500 p-[1.5px] shadow-[0_0_20px_rgba(139,92,246,0.6)]">
                    <div className="w-full h-full bg-[#050218] rounded-[10px] flex items-center justify-center">
                      <span className="font-mono font-black text-sm tracking-tighter bg-gradient-to-r from-purple-300 via-white to-cyan-300 bg-clip-text text-transparent">
                        PB
                      </span>
                    </div>
                  </div>
                  <div>
                    <h1 className="text-base sm:text-lg font-bold tracking-wide text-white">
                      Pushkar Balyan
                    </h1>
                    <p className="text-[11px] font-mono text-gray-400">
                      Developer • AI Engineer
                    </p>
                  </div>
                </div>

                {/* Center Navigation Pills (Matching Image) */}
                <nav className="hidden lg:flex items-center gap-1.5 p-1 rounded-2xl bg-[#0a0724]/90 border border-purple-500/35 backdrop-blur-md">
                  {NAV_ITEMS.map((item) => {
                    const isActive = activeTab === item.id;
                    return (
                      <button
                        key={item.id}
                        onClick={() => handleNav(item.id)}
                        onMouseEnter={() => sound.playHover()}
                        className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-medium transition-all ${
                          isActive
                            ? "bg-gradient-to-r from-purple-600 via-pink-600 to-purple-500 text-white shadow-[0_0_18px_rgba(217,70,239,0.7)] border border-pink-400/50"
                            : "text-gray-400 hover:text-white hover:bg-white/[0.06]"
                        }`}
                      >
                        {item.icon}
                        <span>{item.label}</span>
                      </button>
                    );
                  })}
                </nav>

                {/* Right CTA Button */}
                <button
                  onClick={() => handleNav("contact")}
                  className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/[0.04] border border-cyan-400/40 hover:border-cyan-300 text-xs font-mono text-cyan-300 hover:shadow-[0_0_18px_rgba(6,182,212,0.4)] transition-all"
                >
                  <span>Let&apos;s Connect</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </header>

              {/* HERO SECTION DECK */}
              <div
                onMouseMove={handleHeroMouseMove}
                onMouseLeave={() => setHeroMouse({ x: 0, y: 0 })}
                className="relative rounded-2xl bg-gradient-to-br from-[#0c0828]/80 via-[#07041d]/75 to-[#040212]/80 backdrop-blur-md border border-cyan-500/35 p-6 sm:p-8 overflow-hidden min-h-[430px] flex flex-col justify-between shadow-[0_0_40px_rgba(6,182,212,0.15)]"
              >
                {/* Infinite Spiral Tunnel Effect (Mesmerizing Depth Behind Character) */}
                <InfiniteSpiral className="opacity-80" />

                {/* Anime Hero & Cyber City Layer with 3D Mouse Parallax */}
                <motion.div
                  animate={{
                    x: heroMouse.x * 24,
                    y: heroMouse.y * 14,
                  }}
                  transition={{ type: "spring", stiffness: 220, damping: 28 }}
                  className="absolute right-0 top-0 bottom-0 w-[55%] max-w-[580px] overflow-hidden pointer-events-none hidden md:block z-10"
                >
                  <Image
                    src="/anime-character.png"
                    alt="Pushkar Balyan Cyber Avatar"
                    width={580}
                    height={430}
                    priority
                    className="w-full h-full object-cover object-left-top opacity-90 filter drop-shadow-[0_0_30px_rgba(139,92,246,0.4)]"
                    style={{
                      maskImage: "linear-gradient(to right, transparent 0%, rgba(0,0,0,0.85) 28%, black 100%)",
                      WebkitMaskImage: "linear-gradient(to right, transparent 0%, rgba(0,0,0,0.85) 28%, black 100%)",
                    }}
                  />
                </motion.div>

                {/* Top-Right Quote Box with 3D Mouse Parallax */}
                <motion.div
                  animate={{
                    x: heroMouse.x * 18,
                    y: heroMouse.y * -14,
                  }}
                  transition={{ type: "spring", stiffness: 220, damping: 28 }}
                  className="absolute top-5 right-5 hidden xl:flex flex-col items-end z-20"
                >
                  <ParallaxLayer speed={0.2}>
                    <div className="px-3 py-1.5 rounded-xl bg-black/70 border border-purple-500/40 backdrop-blur-md text-right shadow-[0_0_15px_rgba(139,92,246,0.25)]">
                      <div className="text-[11px] font-mono text-purple-300 font-semibold">
                        &ldquo; Dream • Code • Innovate &rdquo;
                      </div>
                      <div className="text-[9px] font-mono text-gray-400">
                        Building the Future
                      </div>
                    </div>
                  </ParallaxLayer>
                </motion.div>

                {/* Floating Glowing Code Bracket Symbol </> with Inverted 3D Parallax */}
                <motion.div
                  animate={{
                    x: heroMouse.x * -36,
                    y: heroMouse.y * -22,
                  }}
                  transition={{ type: "spring", stiffness: 240, damping: 24 }}
                  className="absolute left-[51%] top-1/2 -translate-y-1/2 hidden lg:flex items-center justify-center pointer-events-none z-10"
                >
                  <ParallaxLayer speed={0.35}>
                    <span className="text-6xl font-mono font-black text-cyan-300 filter drop-shadow-[0_0_30px_#00f0ff] opacity-90 animate-pulse">
                      &lt;/&gt;
                    </span>
                  </ParallaxLayer>
                </motion.div>

                {/* Floating Holographic Telemetry HUD Panel with Parallax */}
                <motion.div
                  animate={{
                    x: heroMouse.x * -20,
                    y: heroMouse.y * 18,
                  }}
                  transition={{ type: "spring", stiffness: 220, damping: 28 }}
                  className="absolute bottom-6 right-6 hidden lg:block z-20"
                >
                  <FloatingHUD title="NEXUS_SYNC" variant="telemetry" className="w-52" />
                </motion.div>

                {/* Left Hero Content */}
                <div className="relative z-20 max-w-lg space-y-4">
                  {/* Status Tag */}
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-black/70 border border-emerald-500/40 text-[11px] font-mono text-emerald-400 shadow-[0_0_10px_rgba(16,185,129,0.25)]">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                    <span>{"// Welcome to my portfolio"}</span>
                  </div>

                  {/* Main Title Pushkar Balyan */}
                  <h2 className="text-4xl sm:text-6xl font-black tracking-tight leading-none text-white">
                    Pushkar{" "}
                    <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent filter drop-shadow-[0_0_30px_rgba(217,70,239,0.6)]">
                      Balyan
                    </span>
                  </h2>

                  {/* Dynamic Role / Title Animation */}
                  <div className="flex items-center gap-2 text-sm sm:text-base md:text-lg font-bold text-gray-100 min-h-[28px]">
                    <span className="text-cyan-400 font-mono text-xs uppercase tracking-widest bg-cyan-950/60 border border-cyan-500/30 px-2 py-0.5 rounded">
                      ROLE
                    </span>
                    <span className="text-purple-300 transition-all duration-300">
                      {HERO_ROLES[roleIndex]}
                    </span>
                    <span className="w-2 h-4 bg-cyan-400 animate-pulse shrink-0" />
                  </div>

                  {/* Tagline Description */}
                  <p className="text-xs sm:text-sm text-gray-300 leading-relaxed font-normal max-w-lg">
                    Architecting intelligent systems, autonomous multi-agent workflows, and immersive 3D web experiences with cutting-edge engineering precision.
                  </p>

                  {/* Action CTA Buttons (Explore My Work, Download Resume, Contact Me) */}
                  <div className="flex flex-wrap items-center gap-3 pt-2">
                    <button
                      onClick={() => handleNav("projects")}
                      className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-400 via-indigo-600 to-purple-600 text-white font-bold text-xs sm:text-sm shadow-[0_0_30px_rgba(0,240,255,0.7)] border border-cyan-200 hover:shadow-[0_0_40px_rgba(139,92,246,0.9)] transition-all cursor-pointer"
                    >
                      <span>Explore My Work</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>

                    <button
                      onClick={() => setResumeOpen(true)}
                      className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/20 hover:border-cyan-400 text-xs sm:text-sm font-medium text-gray-200 backdrop-blur-md transition-all hover:bg-white/[0.08] cursor-pointer"
                    >
                      <span>Download Resume</span>
                      <Download className="w-4 h-4 text-cyan-400" />
                    </button>

                    <button
                      onClick={() => handleNav("contact")}
                      className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-purple-500/10 border border-purple-500/30 hover:border-purple-400 text-xs sm:text-sm font-medium text-purple-300 backdrop-blur-md transition-all hover:bg-purple-500/20 cursor-pointer"
                    >
                      <span>Contact Me</span>
                      <Mail className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>

              {/* MIDDLE STATS & TELEMETRY BANNER (Matching Reference Image) */}
              <div className="relative rounded-2xl bg-[#090620]/95 border border-cyan-500/35 p-3.5 sm:p-4 flex flex-wrap items-center justify-between gap-6 shadow-[0_0_35px_rgba(6,182,212,0.15)]">
                {/* Left 3D Hologram Rotating Globe */}
                <div className="flex items-center gap-2 shrink-0">
                  <HologramGlobe />
                </div>

                {/* 4 Stats Badges */}
                <div className="flex-1 grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
                  {/* Stat 1: 10+ Projects */}
                  <motion.div
                    whileHover={{ y: -3, scale: 1.04 }}
                    transition={{ type: "spring", stiffness: 400, damping: 25 }}
                    className="flex items-center gap-2.5 p-1 rounded-xl cursor-default transition-all"
                  >
                    <div className="w-9 h-9 rounded-xl bg-purple-600/25 border border-purple-500/50 flex items-center justify-center text-purple-300 shadow-[0_0_12px_rgba(139,92,246,0.3)]">
                      <Trophy className="w-4 h-4 text-purple-400" />
                    </div>
                    <div>
                      <div className="text-lg sm:text-2xl font-black font-mono text-white leading-tight">10+</div>
                      <div className="text-[10px] font-mono text-gray-400 uppercase">Projects Completed</div>
                    </div>
                  </motion.div>

                  {/* Stat 2: 5K+ Happy Users */}
                  <motion.div
                    whileHover={{ y: -3, scale: 1.04 }}
                    transition={{ type: "spring", stiffness: 400, damping: 25 }}
                    className="flex items-center gap-2.5 p-1 rounded-xl cursor-default transition-all"
                  >
                    <div className="w-9 h-9 rounded-xl bg-pink-600/25 border border-pink-500/50 flex items-center justify-center text-pink-300 shadow-[0_0_12px_rgba(236,72,153,0.3)]">
                      <Users className="w-4 h-4 text-pink-400" />
                    </div>
                    <div>
                      <div className="text-lg sm:text-2xl font-black font-mono text-white leading-tight">5K+</div>
                      <div className="text-[10px] font-mono text-gray-400 uppercase">Happy Users</div>
                    </div>
                  </motion.div>

                  {/* Stat 3: 4.9/5 Rating */}
                  <motion.div
                    whileHover={{ y: -3, scale: 1.04 }}
                    transition={{ type: "spring", stiffness: 400, damping: 25 }}
                    className="flex items-center gap-2.5 p-1 rounded-xl cursor-default transition-all"
                  >
                    <div className="w-9 h-9 rounded-xl bg-amber-600/25 border border-amber-500/50 flex items-center justify-center text-amber-300 shadow-[0_0_12px_rgba(245,158,11,0.3)]">
                      <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                    </div>
                    <div>
                      <div className="text-lg sm:text-2xl font-black font-mono text-white leading-tight">4.9/5</div>
                      <div className="text-[10px] font-mono text-gray-400 uppercase">Client Rating</div>
                    </div>
                  </motion.div>

                  {/* Stat 4: 36+ AI Agents Built */}
                  <motion.div
                    whileHover={{ y: -3, scale: 1.04 }}
                    transition={{ type: "spring", stiffness: 400, damping: 25 }}
                    className="flex items-center gap-2.5 p-1 rounded-xl cursor-default transition-all"
                  >
                    <div className="w-9 h-9 rounded-xl bg-cyan-600/25 border border-cyan-500/50 flex items-center justify-center text-cyan-300 shadow-[0_0_12px_rgba(6,182,212,0.3)]">
                      <Cpu className="w-4 h-4 text-cyan-400" />
                    </div>
                    <div>
                      <div className="text-lg sm:text-2xl font-black font-mono text-white leading-tight">36+</div>
                      <div className="text-[10px] font-mono text-gray-400 uppercase">AI Agents Built</div>
                    </div>
                  </motion.div>
                </div>

                {/* Right Live System Telemetry Box */}
                <div className="flex items-center gap-4 pl-4 border-l border-white/10 shrink-0">
                  <div className="text-[10px] font-mono space-y-1">
                    <div className="flex items-center gap-1.5 text-emerald-400">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                      <span>System Online</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-cyan-300">
                      <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                      <span>All Systems Operational</span>
                    </div>
                  </div>
                  <ECGWave />
                </div>
              </div>

              {/* BOTTOM 3-PANEL GRID (About Me //, My Projects //, Tech Stack //) */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
                {/* 1. Left Panel: About Me // */}
                <motion.div
                  whileHover={{ y: -6, scale: 1.012 }}
                  transition={{ type: "spring", stiffness: 350, damping: 25 }}
                  className="lg:col-span-4 rounded-2xl bg-[#090624]/90 border border-purple-500/35 hover:border-purple-400/80 p-5 flex flex-col justify-between shadow-[0_0_25px_rgba(139,92,246,0.15)] hover:shadow-[0_15px_35px_-5px_rgba(139,92,246,0.35),0_0_25px_rgba(139,92,246,0.25)] transition-all"
                >
                  <div className="space-y-3">
                    <span className="text-xs font-mono text-cyan-400 uppercase tracking-widest">
                      About Me //
                    </span>
                    <h3 className="text-xl font-bold text-white leading-snug">
                      Crafting the Future <br /> with{" "}
                      <span className="text-purple-400">Code &amp; AI</span>
                    </h3>
                    <p className="text-xs text-gray-300 leading-relaxed font-normal">
                      I&apos;m a passionate developer who loves building intelligent systems, exploring AI, and creating solutions that make an impact. With expertise in modern technologies and a vision for innovation, I strive to push the boundaries of what&apos;s possible.
                    </p>
                  </div>

                  {/* 3D Rotating Cyber Cube on Pedestal */}
                  <div className="my-2 flex justify-center">
                    <HologramCube />
                  </div>

                  <button
                    onClick={() => handleNav("about")}
                    className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 via-pink-600 to-cyan-500 text-white font-semibold text-xs shadow-[0_0_20px_rgba(139,92,246,0.5)] hover:shadow-[0_0_25px_rgba(6,182,212,0.7)] transition-all cursor-pointer"
                  >
                    <span>Know More</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </motion.div>

                {/* 2. Center Panel: My Projects // */}
                <motion.div
                  whileHover={{ y: -6, scale: 1.012 }}
                  transition={{ type: "spring", stiffness: 350, damping: 25 }}
                  className="lg:col-span-5 rounded-2xl bg-[#090624]/90 border border-cyan-500/35 hover:border-cyan-400/80 p-5 flex flex-col justify-between shadow-[0_0_25px_rgba(6,182,212,0.15)] hover:shadow-[0_15px_35px_-5px_rgba(6,182,212,0.35),0_0_25px_rgba(6,182,212,0.25)] transition-all"
                >
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-mono text-cyan-400 uppercase tracking-widest">
                      My Projects //
                    </span>
                    <button
                      onClick={() => handleNav("projects")}
                      className="text-xs font-mono text-gray-400 hover:text-cyan-300 flex items-center gap-1 transition-colors cursor-pointer"
                    >
                      <span>View All</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  </div>

                  {/* Project Slider Cards */}
                  <CyberProjectSlider
                    onSelectProject={(id) => {
                      if (SLIDE_PROJECT_DETAILS[id]) {
                        setSelectedProject(SLIDE_PROJECT_DETAILS[id]);
                      }
                    }}
                  />
                </motion.div>

                {/* 3. Right Panel: Tech Stack // */}
                <motion.div
                  whileHover={{ y: -6, scale: 1.012 }}
                  transition={{ type: "spring", stiffness: 350, damping: 25 }}
                  className="lg:col-span-3 rounded-2xl bg-[#090624]/90 border border-purple-500/35 hover:border-purple-400/80 p-5 flex flex-col justify-between shadow-[0_0_25px_rgba(139,92,246,0.15)] hover:shadow-[0_15px_35px_-5px_rgba(139,92,246,0.35),0_0_25px_rgba(139,92,246,0.25)] transition-all"
                >
                  <div className="mb-3">
                    <span className="text-xs font-mono text-cyan-400 uppercase tracking-widest">
                      Tech Stack //
                    </span>
                  </div>

                  {/* 3x4 Tech Stack Grid */}
                  <CyberTechGrid />

                  <div className="pt-3 text-[10px] font-mono text-gray-500 text-center">
                    CORE_STACK // FULL SPECTRUM
                  </div>
                </motion.div>
              </div>

              {/* BOTTOM COMMAND LINE TERMINAL & SOCIAL HUD BAR */}
              <div className="rounded-2xl bg-[#08041e]/95 border border-cyan-500/35 p-4 flex flex-wrap items-center justify-between gap-4 shadow-[0_0_25px_rgba(6,182,212,0.15)]">
                {/* Left Live Interactive Mini Terminal */}
                <div className="w-full lg:w-auto">
                  <TerminalPrompt />
                </div>

                {/* Center Runic Motto */}
                <div className="hidden xl:flex items-center gap-2 font-mono text-xs tracking-wider text-purple-300">
                  <span className="text-cyan-400">{"///"}</span>
                  <span>Innovation</span>
                  <span>•</span>
                  <span>Intelligence</span>
                  <span>•</span>
                  <span>Impact</span>
                  <span className="text-cyan-400">&gt;&gt;</span>
                </div>

                {/* Right Follow Me + Get in Touch */}
                <div className="flex items-center gap-4 flex-wrap">
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] font-mono text-gray-400 uppercase mr-1">
                      Follow Me
                    </span>
                    <a
                      href="https://github.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-lg bg-white/[0.04] border border-white/10 text-gray-300 hover:text-purple-300 hover:border-purple-400 transition-colors"
                    >
                      <GithubIcon className="w-4 h-4" />
                    </a>
                    <a
                      href="https://linkedin.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-lg bg-white/[0.04] border border-white/10 text-gray-300 hover:text-cyan-300 hover:border-cyan-400 transition-colors"
                    >
                      <LinkedinIcon className="w-4 h-4" />
                    </a>
                    <a
                      href="https://x.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-lg bg-white/[0.04] border border-white/10 text-gray-300 hover:text-blue-300 hover:border-blue-400 transition-colors"
                    >
                      <TwitterIcon className="w-4 h-4" />
                    </a>
                    <a
                      href="https://youtube.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-lg bg-white/[0.04] border border-white/10 text-gray-300 hover:text-red-300 hover:border-red-400 transition-colors"
                    >
                      <YoutubeIcon className="w-4 h-4" />
                    </a>
                    <a
                      href="https://discord.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-lg bg-white/[0.04] border border-white/10 text-gray-300 hover:text-indigo-300 hover:border-indigo-400 transition-colors"
                    >
                      <DiscordIcon className="w-4 h-4" />
                    </a>
                  </div>

                  {/* Get in Touch CTA Button */}
                  <button
                    onClick={() => handleNav("contact")}
                    className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 via-pink-600 to-cyan-500 text-white font-semibold text-xs shadow-[0_0_20px_rgba(139,92,246,0.6)] border border-white/20 hover:shadow-[0_0_25px_rgba(6,182,212,0.8)] transition-all cursor-pointer"
                  >
                    <Mail className="w-3.5 h-3.5" />
                    <span>Get In Touch</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Resume Modal */}
      <ResumeModal isOpen={resumeOpen} onClose={() => setResumeOpen(false)} />

      {/* Project Detail Modal */}
      <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
    </>
  );
}
