"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { sound } from "@/utils/sound";
import { Zap, Activity, ChevronUp, ChevronDown } from "lucide-react";

interface EffectStatus {
  id: number;
  name: string;
  category: string;
  status: "ACTIVE" | "ONLINE";
}

const ALL_10_EFFECTS: EffectStatus[] = [
  { id: 1, name: "Electric Lightning Cursor & Magnetic Arcs", category: "Canvas Physics", status: "ACTIVE" },
  { id: 2, name: "Infinite Spiral 3D Logarithmic Tunnel", category: "Three.js WebGL", status: "ONLINE" },
  { id: 3, name: "Infinite Drift Wall Technical Matrix", category: "CSS 3D Motion", status: "ONLINE" },
  { id: 4, name: "Floating Holographic Telemetry HUD Panels", category: "Glassmorphism", status: "ONLINE" },
  { id: 5, name: "Multi-Layer Mouse & Scroll Parallax", category: "Framer Motion", status: "ACTIVE" },
  { id: 6, name: "3D Stacking Cards with Specular Tilt", category: "Perspective 3D", status: "ACTIVE" },
  { id: 7, name: "Cosmic Particle Constellation & Dust", category: "Three.js Particles", status: "ONLINE" },
  { id: 8, name: "3D Hologram Cube & Rotating Wireframe Globe", category: "WebGL Shaders", status: "ONLINE" },
  { id: 9, name: "Real-Time ECG Oscilloscope & Radar Scope", category: "Procedural Canvas", status: "ONLINE" },
  { id: 10, name: "Lenis Smooth Scroll & Cyber Terminal", category: "Engine Core", status: "ONLINE" },
];

export function EffectsStatusHUD() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = () => {
    sound.playClick();
    setIsOpen(!isOpen);
  };

  return (
    <div className="fixed bottom-4 right-4 z-40 select-none flex flex-col items-end">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 15, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 15, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 350, damping: 25 }}
            className="mb-3 w-80 sm:w-96 rounded-2xl bg-[#090624]/95 border border-cyan-500/40 p-4 shadow-[0_0_35px_rgba(6,182,212,0.35),inset_0_1px_2px_rgba(255,255,255,0.15)] backdrop-blur-2xl text-xs font-mono"
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-cyan-500/20 pb-2 mb-3">
              <div className="flex items-center gap-2 text-cyan-300">
                <Zap className="w-4 h-4 text-cyan-400 animate-pulse" />
                <span className="font-bold tracking-wider uppercase">
                  NEXUS FX ENGINE // 10/10 ONLINE
                </span>
              </div>
              <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-[10px] text-emerald-300">
                100% OPERATIONAL
              </span>
            </div>

            {/* List of 10 Effects */}
            <div className="space-y-1.5 max-h-72 overflow-y-auto pr-1">
              {ALL_10_EFFECTS.map((fx) => (
                <div
                  key={fx.id}
                  className="flex items-center justify-between p-2 rounded-lg bg-black/40 border border-white/[0.06] hover:border-cyan-400/30 transition-colors"
                >
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] text-gray-500 font-bold">{fx.id.toString().padStart(2, "0")}</span>
                    <div>
                      <div className="text-[11px] font-medium text-white line-clamp-1">{fx.name}</div>
                      <div className="text-[9px] text-cyan-400/70">{fx.category}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 text-[10px] text-emerald-400 shrink-0">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                    <span>{fx.status}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Footer */}
            <div className="mt-3 pt-2 border-t border-white/10 flex items-center justify-between text-[10px] text-gray-400">
              <span className="flex items-center gap-1">
                <Activity className="w-3 h-3 text-cyan-400" /> 60 FPS Engine
              </span>
              <span className="text-purple-300">Pushkar Balyan Portfolio Core</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Toggle Pill */}
      <motion.button
        onClick={toggleOpen}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onMouseEnter={() => sound.playHover()}
        className="flex items-center gap-2.5 px-3.5 py-2 rounded-full bg-[#0a0624]/90 border border-cyan-400/50 hover:border-cyan-300 text-xs font-mono text-cyan-300 shadow-[0_0_20px_rgba(6,182,212,0.35)] backdrop-blur-xl transition-all cursor-pointer"
      >
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
          <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
        </span>
        <span className="font-semibold tracking-wider">10/10 FX ONLINE</span>
        {isOpen ? <ChevronDown className="w-3.5 h-3.5" /> : <ChevronUp className="w-3.5 h-3.5" />}
      </motion.button>
    </div>
  );
}

