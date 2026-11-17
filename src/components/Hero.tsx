"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { sound } from "@/utils/sound";
import { GlowButton } from "@/components/ui/GlowButton";
import { GlassBadge } from "@/components/ui/GlassBadge";
import AnimeAvatar from "@/components/AnimeAvatar";
import { ResumeModal } from "@/components/ResumeModal";
import {
  Sparkles,
  ArrowDown,
  FileDown,
  Layers,
  Cpu,
  Globe,
  Flame,
} from "lucide-react";
import {
  GithubIcon,
  LinkedinIcon,
  YoutubeIcon,
  DiscordIcon,
  TwitterIcon,
} from "@/components/ui/BrandIcons";

const SOCIAL_LINKS = [
  {
    name: "GitHub",
    icon: <GithubIcon className="w-4 h-4" />,
    url: "https://github.com",
    hoverColor: "hover:border-purple-400 hover:text-purple-300 hover:shadow-[0_0_15px_rgba(139,92,246,0.4)]",
  },
  {
    name: "LinkedIn",
    icon: <LinkedinIcon className="w-4 h-4" />,
    url: "https://linkedin.com",
    hoverColor: "hover:border-cyan-400 hover:text-cyan-300 hover:shadow-[0_0_15px_rgba(6,182,212,0.4)]",
  },
  {
    name: "YouTube",
    icon: <YoutubeIcon className="w-4 h-4" />,
    url: "https://youtube.com",
    hoverColor: "hover:border-red-400 hover:text-red-300 hover:shadow-[0_0_15px_rgba(239,68,68,0.4)]",
  },
  {
    name: "Discord",
    icon: <DiscordIcon className="w-4 h-4" />,
    url: "https://discord.com",
    hoverColor: "hover:border-indigo-400 hover:text-indigo-300 hover:shadow-[0_0_15px_rgba(99,102,241,0.4)]",
  },
  {
    name: "X (Twitter)",
    icon: <TwitterIcon className="w-4 h-4" />,
    url: "https://x.com",
    hoverColor: "hover:border-blue-400 hover:text-blue-300 hover:shadow-[0_0_15px_rgba(59,130,246,0.4)]",
  },
];

export default function Hero() {
  const [resumeModalOpen, setResumeModalOpen] = useState(false);

  const scrollToSection = (id: string) => {
    sound.playClick();
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <section
        id="hero"
        className="relative min-h-screen w-full flex items-center justify-center pt-28 pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden"
      >
        <div className="max-w-7xl w-full mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
          {/* Left Column: Typography, Taglines & CTAs */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7 flex flex-col items-start space-y-6 text-left"
          >
            {/* Top Cyber Badge */}
            <div className="flex flex-wrap items-center gap-2">
              <GlassBadge variant="cyan" pulse icon={<Sparkles className="w-3.5 h-3.5" />}>
                Next-Gen Portfolio Experience
              </GlassBadge>
              <GlassBadge variant="purple" icon={<Flame className="w-3.5 h-3.5" />}>
                Awwwards Inspired
              </GlassBadge>
            </div>

            {/* Main Name & Titles with Split Gradient Typography */}
            <div className="space-y-2">
              <div className="text-xs sm:text-sm font-mono tracking-widest text-purple-400 uppercase">
                Hello World, I am
              </div>
              <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight leading-[1.08]">
                <span className="block text-white">Pushkar</span>
                <span className="block text-gradient-neon filter drop-shadow-[0_0_35px_rgba(139,92,246,0.35)]">
                  Balyan
                </span>
              </h1>
            </div>

            {/* Sub-heading / Role */}
            <div className="flex items-center gap-3">
              <div className="h-6 w-1 rounded-full bg-gradient-to-b from-cyan-400 to-purple-500" />
              <h2 className="text-lg sm:text-2xl font-semibold text-gray-200 tracking-wide">
                Full Stack Developer <span className="text-purple-400">&</span> AI Enthusiast
              </h2>
            </div>

            {/* Tagline */}
            <p className="text-base sm:text-lg text-gray-400 max-w-xl font-normal leading-relaxed">
              <span className="text-gray-200 font-medium">
                Turning Ideas Into Extraordinary Digital Experiences.
              </span>{" "}
              Crafting high-throughput full stack architectures, autonomous AI workflows, and immersive 3D web environments with pixel-level precision.
            </p>

            {/* Floating Highlights Badges Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 w-full max-w-lg pt-2">
              <div className="p-3 rounded-xl bg-white/[0.03] border border-white/10 backdrop-blur-md">
                <div className="flex items-center gap-2 text-purple-400 text-xs font-mono mb-1">
                  <Cpu className="w-3.5 h-3.5" /> AI / ML
                </div>
                <div className="text-xs font-semibold text-white">Autonomous Agents</div>
              </div>
              <div className="p-3 rounded-xl bg-white/[0.03] border border-white/10 backdrop-blur-md">
                <div className="flex items-center gap-2 text-cyan-400 text-xs font-mono mb-1">
                  <Globe className="w-3.5 h-3.5" /> Web3D
                </div>
                <div className="text-xs font-semibold text-white">Next.js & Three.js</div>
              </div>
              <div className="p-3 rounded-xl bg-white/[0.03] border border-white/10 backdrop-blur-md col-span-2 sm:col-span-1">
                <div className="flex items-center gap-2 text-fuchsia-400 text-xs font-mono mb-1">
                  <Layers className="w-3.5 h-3.5" /> Systems
                </div>
                <div className="text-xs font-semibold text-white">C++ & Python</div>
              </div>
            </div>

            {/* Magnetic CTA Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-4">
              <GlowButton
                variant="primary"
                onClick={() => scrollToSection("projects")}
                icon={<ArrowDown className="w-4 h-4 animate-bounce" />}
              >
                Explore My Work
              </GlowButton>

              <GlowButton
                variant="secondary"
                onClick={() => setResumeModalOpen(true)}
                icon={<FileDown className="w-4 h-4 text-cyan-400" />}
              >
                Download Resume
              </GlowButton>
            </div>

            {/* Social Links Bar */}
            <div className="pt-4 flex items-center gap-3">
              <span className="text-xs font-mono text-gray-500 uppercase tracking-widest hidden sm:inline">
                Connect:
              </span>
              <div className="flex items-center gap-2">
                {SOCIAL_LINKS.map((social) => (
                  <a
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    title={social.name}
                    onMouseEnter={() => sound.playHover()}
                    className={`p-2.5 rounded-xl bg-white/[0.03] border border-white/10 text-gray-400 transition-all duration-300 hover:scale-110 ${social.hoverColor}`}
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right Column: Anime Protagonist Cyber Art Composition */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, x: 40 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ duration: 0.9, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 flex justify-center items-center relative"
          >
            <AnimeAvatar />
          </motion.div>
        </div>

        {/* Scroll Indicator at bottom */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-gray-500 pointer-events-none">
          <span className="text-[10px] font-mono tracking-widest uppercase">Scroll Down</span>
          <div className="w-5 h-8 rounded-full border border-white/20 flex items-start justify-center p-1">
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
              className="w-1.5 h-1.5 rounded-full bg-cyan-400 shadow-[0_0_8px_#22d3ee]"
            />
          </div>
        </div>
      </section>

      {/* Resume Modal */}
      <ResumeModal isOpen={resumeModalOpen} onClose={() => setResumeModalOpen(false)} />
    </>
  );
}

