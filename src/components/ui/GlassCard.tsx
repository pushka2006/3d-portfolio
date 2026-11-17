"use client";

import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import { sound } from "@/utils/sound";

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  tilt?: boolean;
  glowColor?: "purple" | "cyan" | "magenta" | "blue";
  onClick?: () => void;
  stackLift?: boolean;
}

export function GlassCard({
  children,
  className = "",
  tilt = true,
  glowColor = "purple",
  onClick,
  stackLift = true,
}: GlassCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current || !tilt) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    setMousePos({ x, y });

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotX = ((y - centerY) / centerY) * -10;
    const rotY = ((x - centerX) / centerX) * 10;

    setRotateX(rotX);
    setRotateY(rotY);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
    sound.playHover();
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setRotateX(0);
    setRotateY(0);
  };

  const glowStyles = {
    purple:
      "hover:border-purple-400/60 hover:shadow-[0_20px_50px_-10px_rgba(0,0,0,0.8),0_0_35px_rgba(139,92,246,0.35)]",
    cyan:
      "hover:border-cyan-300/60 hover:shadow-[0_20px_50px_-10px_rgba(0,0,0,0.8),0_0_35px_rgba(6,182,212,0.4)]",
    magenta:
      "hover:border-fuchsia-400/60 hover:shadow-[0_20px_50px_-10px_rgba(0,0,0,0.8),0_0_35px_rgba(217,70,239,0.35)]",
    blue:
      "hover:border-blue-400/60 hover:shadow-[0_20px_50px_-10px_rgba(0,0,0,0.8),0_0_35px_rgba(59,130,246,0.35)]",
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      animate={{
        rotateX: tilt ? rotateX : 0,
        rotateY: tilt ? rotateY : 0,
        y: stackLift && isHovered ? -8 : 0,
        scale: stackLift && isHovered ? 1.015 : 1,
      }}
      transition={{
        type: "spring",
        stiffness: 380,
        damping: 24,
        mass: 0.5,
      }}
      style={{
        transformStyle: "preserve-3d",
      }}
      className={`glass-card relative rounded-2xl bg-[#0d0a24]/75 backdrop-blur-xl border border-white/10 p-6 transition-all duration-300 overflow-hidden ${
        glowStyles[glowColor]
      } ${className}`}
    >
      {/* Specular Holographic Reflection Highlight */}
      {isHovered && (
        <div
          className="pointer-events-none absolute -inset-px transition-opacity duration-300 z-10"
          style={{
            background: `radial-gradient(400px circle at ${mousePos.x}px ${mousePos.y}px, rgba(255, 255, 255, 0.12), rgba(0, 240, 255, 0.08), transparent 75%)`,
          }}
        />
      )}

      {/* Cyber Corner HUD accents */}
      <div className="absolute top-0 left-0 w-2.5 h-2.5 border-t border-l border-cyan-400/60 rounded-tl-sm pointer-events-none z-20" />
      <div className="absolute top-0 right-0 w-2.5 h-2.5 border-t border-r border-purple-400/60 rounded-tr-sm pointer-events-none z-20" />
      <div className="absolute bottom-0 left-0 w-2.5 h-2.5 border-b border-l border-purple-400/60 rounded-bl-sm pointer-events-none z-20" />
      <div className="absolute bottom-0 right-0 w-2.5 h-2.5 border-b border-r border-cyan-400/60 rounded-br-sm pointer-events-none z-20" />

      {/* Card Content with 3D Depth Layering */}
      <div
        style={{
          transform: isHovered ? "translateZ(30px)" : "translateZ(0px)",
          transition: "transform 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
        }}
        className="relative z-10"
      >
        {children}
      </div>
    </motion.div>
  );
}
