"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { sound } from "@/utils/sound";
import { ChevronLeft, ChevronRight, ExternalLink } from "lucide-react";

interface ProjectSlide {
  id: string;
  title: string;
  subtitle: string;
  tag: string;
  iconSymbol: string;
  gradient: string;
  accent: string;
  graphicType: "omega" | "media" | "eco";
}

const SLIDES: ProjectSlide[] = [
  {
    id: "omega",
    title: "OMEGA NEXUS AI OS",
    subtitle: "Autonomous Multi-Agent OS",
    tag: "AI / Platform",
    iconSymbol: "Ω",
    gradient: "from-purple-950/80 via-black to-indigo-950/80",
    accent: "border-purple-500/50 text-purple-300",
    graphicType: "omega",
  },
  {
    id: "media",
    title: "MediaSphere AI",
    subtitle: "Media Planning Platform",
    tag: "SaaS",
    iconSymbol: "⬡",
    gradient: "from-cyan-950/80 via-black to-blue-950/80",
    accent: "border-cyan-500/50 text-cyan-300",
    graphicType: "media",
  },
  {
    id: "eco",
    title: "EcoGrid AI",
    subtitle: "Smart Green Future",
    tag: "Sustainability",
    iconSymbol: "⚡",
    gradient: "from-emerald-950/80 via-black to-teal-950/80",
    accent: "border-emerald-500/50 text-emerald-300",
    graphicType: "eco",
  },
];

function StackingProjectCard({
  slide,
  isSelected,
  onClick,
}: {
  slide: ProjectSlide;
  isSelected: boolean;
  onClick: () => void;
}) {
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setMousePos({ x, y });
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    setRotateX(((y - centerY) / centerY) * -12);
    setRotateY(((x - centerX) / centerX) * 12);
  };

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      onMouseEnter={() => {
        setIsHovered(true);
        sound.playHover();
      }}
      onMouseLeave={() => {
        setIsHovered(false);
        setRotateX(0);
        setRotateY(0);
      }}
      onClick={onClick}
      animate={{
        rotateX,
        rotateY,
        y: isHovered ? -6 : 0,
        scale: isHovered ? 1.025 : 1,
      }}
      transition={{
        type: "spring",
        stiffness: 380,
        damping: 24,
      }}
      style={{
        transformStyle: "preserve-3d",
      }}
      className={`rounded-2xl bg-gradient-to-b ${slide.gradient} border p-3 cursor-pointer transition-all duration-300 flex flex-col justify-between aspect-[4/5] sm:aspect-[3/4] relative overflow-hidden group select-none ${
        isSelected
          ? "border-cyan-400 shadow-[0_15px_35px_-5px_rgba(0,0,0,0.8),0_0_25px_rgba(6,182,212,0.4)]"
          : "border-white/10 hover:border-cyan-400/50 hover:shadow-[0_15px_35px_-5px_rgba(0,0,0,0.8),0_0_20px_rgba(139,92,246,0.3)]"
      }`}
    >
      {/* Specular Light Sheen */}
      {isHovered && (
        <div
          className="pointer-events-none absolute -inset-px transition-opacity duration-300 z-20"
          style={{
            background: `radial-gradient(220px circle at ${mousePos.x}px ${mousePos.y}px, rgba(255,255,255,0.15), rgba(0,240,255,0.08), transparent 70%)`,
          }}
        />
      )}

      {/* Graphic Mockup Thumbnail Area with 3D Depth */}
      <div
        style={{
          transform: isHovered ? "translateZ(30px)" : "translateZ(0px)",
          transition: "transform 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
        }}
        className="w-full aspect-[4/3] rounded-xl bg-black/60 border border-white/10 relative overflow-hidden flex items-center justify-center"
      >
        <div className="absolute inset-0 cyber-grid-bg opacity-40" />

        {slide.graphicType === "omega" && (
          <div className="relative z-10 flex flex-col items-center">
            <span className="text-4xl sm:text-5xl font-mono font-black text-purple-400 filter drop-shadow-[0_0_15px_#a855f7] group-hover:scale-110 transition-transform">
              Ω
            </span>
            <span className="text-[9px] font-mono text-purple-300/80 mt-1">
              MULTI-AGENT CORE
            </span>
          </div>
        )}

        {slide.graphicType === "media" && (
          <div className="relative z-10 grid grid-cols-2 gap-1.5 p-2 w-full">
            <div className="aspect-video rounded bg-cyan-900/40 border border-cyan-400/40 flex items-center justify-center text-[8px] font-mono text-cyan-300">
              AI_STREAM
            </div>
            <div className="aspect-video rounded bg-purple-900/40 border border-purple-400/40 flex items-center justify-center text-[8px] font-mono text-purple-300">
              STUDIO
            </div>
            <div className="aspect-video rounded bg-fuchsia-900/40 border border-fuchsia-400/40 flex items-center justify-center text-[8px] font-mono text-fuchsia-300">
              EDIT
            </div>
            <div className="aspect-video rounded bg-blue-900/40 border border-blue-400/40 flex items-center justify-center text-[8px] font-mono text-blue-300">
              RENDER
            </div>
          </div>
        )}

        {slide.graphicType === "eco" && (
          <div className="relative z-10 flex flex-col items-center">
            <div className="w-10 h-10 rounded-full border border-emerald-400/60 flex items-center justify-center bg-emerald-950/60 shadow-[0_0_15px_rgba(16,185,129,0.5)]">
              <span className="text-xl text-emerald-300">⚡</span>
            </div>
            <span className="text-[9px] font-mono text-emerald-300/90 mt-1">
              ECO_SMART_GRID
            </span>
          </div>
        )}
      </div>

      {/* Title & Subtitle with 3D Depth */}
      <div
        style={{
          transform: isHovered ? "translateZ(20px)" : "translateZ(0px)",
          transition: "transform 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
        }}
        className="pt-2 relative z-10"
      >
        <h4 className="text-xs sm:text-sm font-bold text-white group-hover:text-cyan-300 transition-colors line-clamp-1">
          {slide.title}
        </h4>
        <p className="text-[11px] text-gray-400 font-mono line-clamp-1 mt-0.5">
          {slide.subtitle}
        </p>

        {/* Badge Tag */}
        <div className="mt-2 flex items-center justify-between">
          <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-white/[0.05] border border-white/10 text-cyan-300">
            {slide.tag}
          </span>
          <ExternalLink className="w-3.5 h-3.5 text-gray-400 group-hover:text-cyan-300 transition-colors" />
        </div>
      </div>
    </motion.div>
  );
}

export function CyberProjectSlider({
  onSelectProject,
}: {
  onSelectProject?: (id: string) => void;
}) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const prev = () => {
    sound.playClick();
    setCurrentIndex((prev) => (prev === 0 ? SLIDES.length - 1 : prev - 1));
  };

  const next = () => {
    sound.playClick();
    setCurrentIndex((prev) => (prev === SLIDES.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="relative w-full">
      {/* Cards Display Grid with 3D Stacking */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {SLIDES.map((slide, idx) => (
          <StackingProjectCard
            key={slide.id}
            slide={slide}
            isSelected={idx === currentIndex}
            onClick={() => {
              setCurrentIndex(idx);
              if (onSelectProject) onSelectProject(slide.id);
            }}
          />
        ))}
      </div>

      {/* Navigation Arrows & Pagination Dots */}
      <div className="mt-3 flex items-center justify-center gap-4">
        <button
          onClick={prev}
          aria-label="Previous project"
          className="p-1 rounded-full bg-white/[0.04] border border-white/10 text-gray-400 hover:text-white hover:border-cyan-400/50 transition-colors cursor-pointer"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>

        <div className="flex items-center gap-1.5">
          {SLIDES.map((_, idx) => (
            <span
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              className={`h-1.5 rounded-full transition-all cursor-pointer ${
                idx === currentIndex
                  ? "w-5 bg-gradient-to-r from-purple-500 to-cyan-400 shadow-[0_0_8px_#00f0ff]"
                  : "w-1.5 bg-white/20 hover:bg-white/40"
              }`}
            />
          ))}
        </div>

        <button
          onClick={next}
          aria-label="Next project"
          className="p-1 rounded-full bg-white/[0.04] border border-white/10 text-gray-400 hover:text-white hover:border-cyan-400/50 transition-colors cursor-pointer"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
