"use client";

import { motion } from "framer-motion";
import { Activity, Terminal, Wifi } from "lucide-react";

interface FloatingHUDProps {
  children?: React.ReactNode;
  title?: string;
  className?: string;
  variant?: "telemetry" | "scanner" | "coordinates";
}

export function FloatingHUD({
  children,
  title = "NEXUS_TELEMETRY",
  className = "",
  variant = "telemetry",
}: FloatingHUDProps) {
  return (
    <motion.div
      animate={{
        y: [-6, 6, -6],
        rotateX: [2, -2, 2],
        rotateY: [-3, 3, -3],
      }}
      transition={{
        duration: 7,
        repeat: Infinity,
        ease: "easeInOut",
      }}
      style={{
        transformStyle: "preserve-3d",
      }}
      className={`relative rounded-xl bg-[#090624]/75 backdrop-blur-xl border border-cyan-500/40 p-3 text-xs font-mono shadow-[0_0_25px_rgba(6,182,212,0.2)] overflow-hidden select-none pointer-events-none ${className}`}
    >
      {/* Animated Horizontal Laser Scan Line */}
      <div className="absolute inset-x-0 h-[1.5px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent animate-hud-scan opacity-70 pointer-events-none" />

      {/* Cyber Corner Reticles */}
      <div className="absolute top-0 left-0 w-2 h-2 border-t-2 border-l-2 border-cyan-400" />
      <div className="absolute top-0 right-0 w-2 h-2 border-t-2 border-r-2 border-purple-400" />
      <div className="absolute bottom-0 left-0 w-2 h-2 border-b-2 border-l-2 border-purple-400" />
      <div className="absolute bottom-0 right-0 w-2 h-2 border-b-2 border-r-2 border-cyan-400" />

      {/* Header Bar */}
      <div className="flex items-center justify-between pb-1.5 mb-2 border-b border-white/10 text-[10px]">
        <div className="flex items-center gap-1.5 text-cyan-300">
          <Terminal className="w-3 h-3 text-cyan-400" />
          <span className="tracking-wider uppercase">{title}</span>
        </div>
        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
      </div>

      {children ? (
        children
      ) : variant === "telemetry" ? (
        <div className="space-y-1 text-[10px] text-gray-300">
          <div className="flex justify-between gap-3">
            <span className="text-gray-400">CORE_LOAD:</span>
            <span className="text-cyan-300">12.4% // NOMINAL</span>
          </div>
          <div className="flex justify-between gap-3">
            <span className="text-gray-400">NEURAL_BUFFER:</span>
            <span className="text-purple-300">1024 / 1024 MB</span>
          </div>
          <div className="flex justify-between gap-3">
            <span className="text-gray-400">LATENCY:</span>
            <span className="text-emerald-400 flex items-center gap-1">
              <Wifi className="w-2.5 h-2.5" /> 8ms
            </span>
          </div>
        </div>
      ) : (
        <div className="space-y-1 text-[10px] text-gray-300">
          <div className="flex justify-between gap-3">
            <span className="text-gray-400">GRID_LOC:</span>
            <span className="text-cyan-300">28.61° N, 77.20° E</span>
          </div>
          <div className="flex justify-between gap-3">
            <span className="text-gray-400">AI_SYNC:</span>
            <span className="text-purple-300 flex items-center gap-1">
              <Activity className="w-2.5 h-2.5" /> 100% ONLINE
            </span>
          </div>
        </div>
      )}
    </motion.div>
  );
}

