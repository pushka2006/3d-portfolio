"use client";

import { sound } from "@/utils/sound";
import { ArrowUp, Terminal, Mail, Sparkles } from "lucide-react";
import {
  GithubIcon,
  LinkedinIcon,
  TwitterIcon,
  YoutubeIcon,
  DiscordIcon,
} from "@/components/ui/BrandIcons";

const FOOTER_NAV = [
  { name: "Home", href: "#home" },
  { name: "About", href: "#about" },
  { name: "Projects", href: "#projects" },
  { name: "Skills", href: "#skills" },
  { name: "Experience", href: "#experience" },
  { name: "Contact", href: "#contact" },
];

export default function Footer() {
  const scrollToTop = () => {
    sound.playWarp();
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleNavClick = (href: string) => {
    sound.playClick();
    const el = document.querySelector(href);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <footer className="relative border-t border-cyan-500/20 bg-[#040114]/90 backdrop-blur-2xl pt-14 pb-8 px-4 sm:px-6 lg:px-8 overflow-hidden z-20">
      {/* Background ambient lighting */}
      <div className="absolute top-0 left-1/4 w-96 h-32 bg-purple-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-0 right-1/4 w-96 h-32 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto space-y-10">
        {/* Terminal Status Banner (Section 14 Prompt Requirement) */}
        <div className="rounded-2xl bg-[#07041a]/90 border border-cyan-500/30 p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-[0_0_25px_rgba(6,182,212,0.12)]">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-cyan-500/10 border border-cyan-400/30 text-cyan-300">
              <Terminal className="w-4 h-4" />
            </div>
            <div className="font-mono text-xs space-y-0.5">
              <div className="text-emerald-400 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                <span>&gt; SYSTEM STATUS: ONLINE // PRODUCTION CORE</span>
              </div>
              <div className="text-gray-300">
                <span>&gt; BUILDING THE FUTURE WITH AI &amp; 3D COMPUTING</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 text-xs font-mono text-purple-300 bg-purple-950/40 px-3 py-1.5 rounded-xl border border-purple-500/30">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            <span>LATENCY: 12ms // 60 FPS NOMINAL</span>
          </div>
        </div>

        {/* Middle Navigation & Branding Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start pt-2">
          {/* Col 1: Identity */}
          <div className="md:col-span-5 space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-600 via-pink-600 to-cyan-500 p-[1.5px] shadow-[0_0_15px_rgba(139,92,246,0.5)]">
                <div className="w-full h-full bg-[#050214] rounded-[10px] flex items-center justify-center font-mono font-bold text-sm text-cyan-300">
                  PB
                </div>
              </div>
              <div>
                <h4 className="text-base font-bold text-white tracking-wide">Pushkar Balyan</h4>
                <p className="text-xs font-mono text-gray-400">
                  Full Stack Developer &amp; AI Engineer
                </p>
              </div>
            </div>

            <p className="text-xs text-gray-400 leading-relaxed max-w-sm">
              Fusing autonomous multi-agent intelligence, scalable cloud architectures, and cinematic real-time 3D graphics into extraordinary digital products.
            </p>

            <div className="pt-2 flex items-center gap-2">
              <a
                href="https://github.com/pushka2006"
                target="_blank"
                rel="noopener noreferrer"
                title="GitHub"
                className="p-2 rounded-lg bg-white/[0.04] border border-white/10 text-gray-300 hover:text-purple-300 hover:border-purple-400 transition-colors"
              >
                <GithubIcon className="w-4 h-4" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                title="LinkedIn"
                className="p-2 rounded-lg bg-white/[0.04] border border-white/10 text-gray-300 hover:text-cyan-300 hover:border-cyan-400 transition-colors"
              >
                <LinkedinIcon className="w-4 h-4" />
              </a>
              <a
                href="https://x.com"
                target="_blank"
                rel="noopener noreferrer"
                title="X (Twitter)"
                className="p-2 rounded-lg bg-white/[0.04] border border-white/10 text-gray-300 hover:text-blue-300 hover:border-blue-400 transition-colors"
              >
                <TwitterIcon className="w-4 h-4" />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                title="YouTube"
                className="p-2 rounded-lg bg-white/[0.04] border border-white/10 text-gray-300 hover:text-red-300 hover:border-red-400 transition-colors"
              >
                <YoutubeIcon className="w-4 h-4" />
              </a>
              <a
                href="https://discord.com"
                target="_blank"
                rel="noopener noreferrer"
                title="Discord"
                className="p-2 rounded-lg bg-white/[0.04] border border-white/10 text-gray-300 hover:text-indigo-300 hover:border-indigo-400 transition-colors"
              >
                <DiscordIcon className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Col 2: Navigation Links */}
          <div className="md:col-span-4 space-y-3">
            <span className="text-xs font-mono text-cyan-400 uppercase tracking-widest">
              NAVIGATION_MATRIX
            </span>
            <div className="grid grid-cols-2 gap-2 text-xs font-mono">
              {FOOTER_NAV.map((item) => (
                <button
                  key={item.name}
                  onClick={() => handleNavClick(item.href)}
                  className="text-left text-gray-400 hover:text-cyan-300 transition-colors flex items-center gap-1.5 py-1"
                >
                  <span className="text-purple-400 text-[10px]">&gt;</span>
                  <span>{item.name}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Col 3: Direct Uplink & Back to Top */}
          <div className="md:col-span-3 space-y-3 text-left md:text-right">
            <span className="text-xs font-mono text-cyan-400 uppercase tracking-widest block">
              TRANSMISSION_UPLINK
            </span>
            <div className="text-xs font-mono text-gray-300 flex items-center gap-1.5 md:justify-end">
              <Mail className="w-3.5 h-3.5 text-cyan-400" />
              <span>pushkarbalyan@gmail.com</span>
            </div>
            <div className="text-[11px] font-mono text-gray-500">
              India (IST // UTC +5:30)
            </div>

            <div className="pt-2 md:flex md:justify-end">
              <button
                onClick={scrollToTop}
                onMouseEnter={() => sound.playHover()}
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/[0.04] border border-white/10 hover:border-cyan-400/50 hover:bg-white/[0.08] text-xs font-mono text-cyan-300 transition-all duration-300 group shadow-[0_0_15px_rgba(6,182,212,0.15)]"
              >
                <span>RETURN TO TOP</span>
                <ArrowUp className="w-3.5 h-3.5 group-hover:-translate-y-1 transition-transform" />
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Copyright Bar */}
        <div className="pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-gray-400">
          <div>© {new Date().getFullYear()} Pushkar Balyan. All rights reserved.</div>
          <div className="text-[11px] text-gray-500">
            Engineered with Next.js 14, Three.js, WebGL &amp; Framer Motion
          </div>
        </div>
      </div>
    </footer>
  );
}


