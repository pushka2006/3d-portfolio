"use client";

import { motion } from "framer-motion";

export function RadarScope() {
  return (
    <div className="relative w-11 h-11 rounded-full bg-[#08041c] border border-cyan-500/40 p-1 flex items-center justify-center shadow-[0_0_15px_rgba(6,182,212,0.3)]">
      {/* Outer ticks */}
      <div className="absolute inset-0 rounded-full border border-dashed border-purple-500/30" />

      {/* Rotating Radar Sweep Line */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
        className="absolute inset-0 rounded-full"
        style={{
          background: "conic-gradient(from 0deg, rgba(6,182,212,0.5) 0deg, transparent 60deg, transparent 360deg)",
        }}
      />

      {/* Crosshairs */}
      <div className="absolute inset-x-1.5 h-[1px] bg-cyan-400/40" />
      <div className="absolute inset-y-1.5 w-[1px] bg-cyan-400/40" />

      {/* Inner Glowing Target Center */}
      <div className="w-2.5 h-2.5 rounded-full bg-cyan-400 shadow-[0_0_8px_#00f0ff] z-10 animate-pulse" />

      {/* HUD Index Tag */}
      <span className="absolute -top-1 -right-1 text-[8px] font-mono text-cyan-300 bg-black/80 px-1 rounded border border-cyan-500/40">
        01
      </span>
    </div>
  );
}

