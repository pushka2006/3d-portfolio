"use client";

import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import { Terminal, Cpu } from "lucide-react";

export default function AnimeAvatar() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [rotX, setRotX] = useState(0);
  const [rotY, setRotY] = useState(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    setRotX(-(y / rect.height) * 16);
    setRotY((x / rect.width) * 16);
  };

  const handleMouseLeave = () => {
    setRotX(0);
    setRotY(0);
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative w-full max-w-[460px] aspect-square flex items-center justify-center select-none perspective-[1200px]"
    >
      <motion.div
        animate={{ rotateX: rotX, rotateY: rotY }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
        style={{ transformStyle: "preserve-3d" }}
        className="relative w-full h-full flex items-center justify-center"
      >
        {/* Background Energy Vortex */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-purple-600/20 via-cyan-500/15 to-fuchsia-500/20 blur-3xl animate-pulse-slow" />

        {/* Outer Cyber HUD Ring 1 - Counter Clockwise */}
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ repeat: Infinity, duration: 40, ease: "linear" }}
          className="absolute w-[92%] h-[92%] rounded-full border border-dashed border-cyan-400/25 pointer-events-none"
        />

        {/* Outer Cyber HUD Ring 2 - Clockwise with Tech Markings */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 55, ease: "linear" }}
          className="absolute w-[82%] h-[82%] rounded-full border border-purple-500/30 pointer-events-none"
          style={{
            borderWidth: "1.5px",
            borderStyle: "dashed",
            strokeDasharray: "8 16",
          }}
        />

        {/* Glowing Geometric Hexagon Frame */}
        <div className="absolute w-[76%] h-[76%] rounded-3xl bg-gradient-to-br from-white/[0.08] to-purple-900/[0.25] backdrop-blur-2xl border border-white/20 shadow-[0_0_50px_rgba(139,92,246,0.3)] overflow-hidden flex items-center justify-center">
          {/* Subtle Grid inside frame */}
          <div className="absolute inset-0 cyber-grid-bg opacity-30" />

          {/* Holographic Anime Cyber Protagonist Artwork (Vector Illustrated) */}
          <svg
            viewBox="0 0 500 500"
            className="w-full h-full relative z-10 filter drop-shadow-[0_10px_20px_rgba(0,0,0,0.5)]"
          >
            <defs>
              <linearGradient id="cyberNeonGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#00f0ff" />
                <stop offset="50%" stopColor="#8b5cf6" />
                <stop offset="100%" stopColor="#ec4899" />
              </linearGradient>
              <linearGradient id="hairGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#1e1035" />
                <stop offset="50%" stopColor="#311956" />
                <stop offset="100%" stopColor="#6366f1" />
              </linearGradient>
              <linearGradient id="jacketGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#0b0819" />
                <stop offset="50%" stopColor="#18113c" />
                <stop offset="100%" stopColor="#090514" />
              </linearGradient>
              <linearGradient id="visorGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#00f0ff" />
                <stop offset="100%" stopColor="#7c3aed" />
              </linearGradient>
              <filter id="neonVisorGlow" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="8" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            {/* Aura Energy Flare in Background */}
            <circle cx="250" cy="220" r="140" fill="url(#cyberNeonGrad)" opacity="0.15" />

            {/* Back Hair Strands (Anime Spikes) */}
            <path
              d="M170 180 L130 110 L195 145 L220 70 L260 135 L300 75 L320 135 L370 100 L340 180 Z"
              fill="url(#hairGrad)"
            />

            {/* Cyber Neck & Tech Collar */}
            <path
              d="M210 270 L250 295 L290 270 L290 330 L210 330 Z"
              fill="#120c27"
              stroke="#8b5cf6"
              strokeWidth="2"
            />
            {/* Tech neck circuit line */}
            <line x1="250" y1="295" x2="250" y2="330" stroke="#00f0ff" strokeWidth="2" />

            {/* Anime Jaw & Face Outline */}
            <path
              d="M190 200 C190 270 230 300 250 305 C270 300 310 270 310 200 C310 160 290 150 250 150 C210 150 190 160 190 200 Z"
              fill="#1c1635"
              stroke="#3b2d69"
              strokeWidth="2"
            />

            {/* Tech High-Collared Cyber Jacket */}
            <path
              d="M130 360 L180 300 L230 325 L250 335 L270 325 L320 300 L370 360 L400 480 L100 480 Z"
              fill="url(#jacketGrad)"
              stroke="#2e1f5e"
              strokeWidth="3"
            />

            {/* Jacket Neon Trim Lines */}
            <path
              d="M180 300 L230 325 L250 480"
              fill="none"
              stroke="#00f0ff"
              strokeWidth="3"
              strokeLinecap="round"
            />
            <path
              d="M320 300 L270 325 L250 480"
              fill="none"
              stroke="#ec4899"
              strokeWidth="3"
              strokeLinecap="round"
            />

            {/* Front Anime Hair Strands & Bangs */}
            <path
              d="M185 170 L210 220 L230 180 L250 235 L265 175 L285 225 L315 170 L295 140 L205 140 Z"
              fill="#2e1a52"
            />
            <path
              d="M230 140 L245 205 L260 145 Z"
              fill="#432874"
            />
            <path
              d="M175 160 L195 210 L210 165 Z"
              fill="#432874"
            />

            {/* Cybernetic HUD Visor across Eyes */}
            <path
              d="M195 205 L305 205 L295 228 L205 228 Z"
              fill="url(#visorGrad)"
              filter="url(#neonVisorGlow)"
              opacity="0.9"
            />

            {/* Visor Glint Reflection & Digital HUD Data Lines */}
            <line x1="210" y1="213" x2="290" y2="213" stroke="#ffffff" strokeWidth="1.5" strokeOpacity="0.8" />
            <circle cx="285" cy="216" r="3" fill="#ffffff" />
            <line x1="230" y1="222" x2="270" y2="222" stroke="#00f0ff" strokeWidth="1" strokeDasharray="3 3" />

            {/* Cybernetic Ear Module / Headset */}
            <rect x="175" y="195" width="16" height="32" rx="4" fill="#090616" stroke="#00f0ff" strokeWidth="2" />
            <circle cx="183" cy="211" r="3" fill="#00f0ff" />
            <rect x="309" y="195" width="16" height="32" rx="4" fill="#090616" stroke="#8b5cf6" strokeWidth="2" />
            <circle cx="317" cy="211" r="3" fill="#ec4899" />

            {/* Shoulder Armour Plates */}
            <path d="M100 420 L150 360 L170 380 L120 460 Z" fill="#1e1442" stroke="#8b5cf6" strokeWidth="2" />
            <path d="M400 420 L350 360 L330 380 L380 460 Z" fill="#1e1442" stroke="#00f0ff" strokeWidth="2" />

            {/* Chest Cyber Core Emblem */}
            <polygon
              points="250,360 270,380 250,400 230,380"
              fill="#00f0ff"
              filter="url(#neonVisorGlow)"
            />
            <circle cx="250" cy="380" r="4" fill="#ffffff" />
          </svg>

          {/* Cyber Kanji / Digital Crafting Subtitle */}
          <div className="absolute bottom-4 left-0 right-0 flex justify-center items-center gap-2 pointer-events-none z-20">
            <span className="text-[10px] font-mono tracking-widest text-cyan-300/70 bg-black/60 px-2.5 py-0.5 rounded-full border border-cyan-500/20 backdrop-blur-md">
              創始者 // NEXUS-01
            </span>
          </div>
        </div>

        {/* Floating Glassmorphic Cyber HUD Cards around Avatar */}
        {/* Top-Right Badge: AI Intelligence */}
        <motion.div
          animate={{ y: [-4, 6, -4] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          style={{ transform: "translateZ(60px)" }}
          className="absolute -top-3 -right-3 z-20 hidden sm:flex items-center gap-2 px-3.5 py-2 rounded-xl bg-[#0e0928]/80 border border-purple-500/40 backdrop-blur-xl shadow-[0_0_20px_rgba(139,92,246,0.4)]"
        >
          <div className="w-7 h-7 rounded-lg bg-purple-500/20 border border-purple-400/40 flex items-center justify-center text-purple-300">
            <Cpu className="w-4 h-4 animate-pulse" />
          </div>
          <div>
            <div className="text-[10px] font-mono text-purple-300 tracking-wider">AI_ARCHITECTURE</div>
            <div className="text-xs font-semibold text-white">Multi-Agent Systems</div>
          </div>
        </motion.div>

        {/* Bottom-Left Badge: Full Stack Core */}
        <motion.div
          animate={{ y: [6, -5, 6] }}
          transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
          style={{ transform: "translateZ(50px)" }}
          className="absolute -bottom-4 -left-4 z-20 hidden sm:flex items-center gap-2 px-3.5 py-2 rounded-xl bg-[#091026]/80 border border-cyan-500/40 backdrop-blur-xl shadow-[0_0_20px_rgba(6,182,212,0.4)]"
        >
          <div className="w-7 h-7 rounded-lg bg-cyan-500/20 border border-cyan-400/40 flex items-center justify-center text-cyan-300">
            <Terminal className="w-4 h-4" />
          </div>
          <div>
            <div className="text-[10px] font-mono text-cyan-300 tracking-wider">CORE_STACK</div>
            <div className="text-xs font-semibold text-white">Next.js & Python</div>
          </div>
        </motion.div>

        {/* Bottom-Right Mini Pulse Status */}
        <motion.div
          animate={{ y: [-3, 5, -3] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          style={{ transform: "translateZ(40px)" }}
          className="absolute bottom-6 -right-5 z-20 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/70 border border-emerald-500/30 backdrop-blur-md text-[11px] font-mono text-emerald-400"
        >
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
          <span>STATUS: ONLINE</span>
        </motion.div>
      </motion.div>
    </div>
  );
}

