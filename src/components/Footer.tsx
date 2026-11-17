"use client";

import { sound } from "@/utils/sound";
import { ArrowUp } from "lucide-react";

export default function Footer() {
  const scrollToTop = () => {
    sound.playWarp();
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative border-t border-white/10 bg-[#040114]/80 backdrop-blur-2xl py-12 px-4 sm:px-6 lg:px-8 overflow-hidden z-20">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Left: Branding & Status */}
        <div className="flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-600 to-cyan-500 p-[1.5px] shadow-[0_0_15px_rgba(139,92,246,0.4)]">
            <div className="w-full h-full bg-[#050214] rounded-[10px] flex items-center justify-center font-mono font-bold text-sm text-cyan-300">
              PB
            </div>
          </div>
          <div>
            <div className="text-sm font-bold text-white tracking-wide">PUSHKAR BALYAN</div>
            <div className="text-xs text-gray-400 font-mono flex items-center gap-2 justify-center sm:justify-start">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span>SYSTEMS: ONLINE // 60 FPS NOMINAL</span>
            </div>
          </div>
        </div>

        {/* Center: Copyright & Attribution */}
        <div className="text-center text-xs text-gray-400 font-mono">
          <div>© {new Date().getFullYear()} Pushkar Balyan. All rights reserved.</div>
          <div className="text-gray-500 text-[11px] mt-1 flex items-center justify-center gap-1">
            Engineered with Next.js, Three.js & Framer Motion
          </div>
        </div>

        {/* Right: Back to Top Button */}
        <div>
          <button
            onClick={scrollToTop}
            onMouseEnter={() => sound.playHover()}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 hover:border-cyan-400/50 hover:bg-white/[0.08] text-xs font-mono text-cyan-300 transition-all duration-300 group shadow-[0_0_15px_rgba(6,182,212,0.15)]"
          >
            <span>RETURN TO TOP</span>
            <ArrowUp className="w-3.5 h-3.5 group-hover:-translate-y-1 transition-transform" />
          </button>
        </div>
      </div>
    </footer>
  );
}

