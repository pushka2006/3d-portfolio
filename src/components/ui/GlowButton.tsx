"use client";

import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import { sound } from "@/utils/sound";

interface GlowButtonProps {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "outline" | "cyan";
  className?: string;
  onClick?: () => void;
  href?: string;
  external?: boolean;
  icon?: React.ReactNode;
}

export function GlowButton({
  children,
  variant = "primary",
  className = "",
  onClick,
  href,
  external = false,
  icon,
}: GlowButtonProps) {
  const btnRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!btnRef.current) return;
    const { clientX, clientY } = e;
    const { left, top, width, height } = btnRef.current.getBoundingClientRect();
    const x = (clientX - (left + width / 2)) * 0.35;
    const y = (clientY - (top + height / 2)) * 0.35;
    setPosition({ x, y });
  };

  const handleMouseEnter = () => {
    sound.playHover();
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
  };

  const handleClick = () => {
    sound.playClick();
    if (onClick) onClick();
  };

  const baseStyles =
    "relative inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl font-medium text-sm transition-all duration-300 overflow-hidden cursor-pointer select-none active:scale-95";

  const variantStyles = {
    primary:
      "bg-gradient-to-r from-purple-600 via-indigo-600 to-cyan-500 text-white shadow-[0_0_25px_rgba(139,92,246,0.5)] hover:shadow-[0_0_35px_rgba(6,182,212,0.7)] border border-white/20",
    secondary:
      "bg-white/[0.05] hover:bg-white/[0.1] text-gray-200 border border-purple-500/30 hover:border-cyan-400/50 backdrop-blur-md shadow-[0_0_15px_rgba(139,92,246,0.15)]",
    outline:
      "bg-transparent text-gray-300 border border-white/20 hover:border-cyan-400 hover:text-cyan-300 hover:shadow-[0_0_20px_rgba(6,182,212,0.3)]",
    cyan:
      "bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-[0_0_25px_rgba(6,182,212,0.5)] hover:shadow-[0_0_35px_rgba(139,92,246,0.7)] border border-white/20",
  };

  const content = (
    <motion.div
      ref={btnRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: "spring", stiffness: 350, damping: 20, mass: 0.2 }}
      className={`${baseStyles} ${variantStyles[variant]} ${className}`}
      onClick={handleClick}
    >
      {/* Dynamic Sheen sweep */}
      <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full hover:translate-x-full transition-transform duration-1000 ease-in-out pointer-events-none" />

      {icon && <span className="relative z-10">{icon}</span>}
      <span className="relative z-10 tracking-wide font-semibold">{children}</span>
    </motion.div>
  );

  if (href) {
    return (
      <a
        href={href}
        target={external ? "_blank" : undefined}
        rel={external ? "noopener noreferrer" : undefined}
        className="inline-block"
      >
        {content}
      </a>
    );
  }

  return content;
}

