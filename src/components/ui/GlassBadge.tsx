"use client";

import React from "react";

interface GlassBadgeProps {
  children: React.ReactNode;
  icon?: React.ReactNode;
  variant?: "purple" | "cyan" | "emerald" | "amber";
  className?: string;
  pulse?: boolean;
}

export function GlassBadge({
  children,
  icon,
  variant = "purple",
  className = "",
  pulse = false,
}: GlassBadgeProps) {
  const variantStyles = {
    purple: "text-purple-300 border-purple-500/30 bg-purple-500/10 shadow-[0_0_15px_rgba(139,92,246,0.15)]",
    cyan: "text-cyan-300 border-cyan-500/30 bg-cyan-500/10 shadow-[0_0_15px_rgba(6,182,212,0.15)]",
    emerald: "text-emerald-300 border-emerald-500/30 bg-emerald-500/10 shadow-[0_0_15px_rgba(16,185,129,0.15)]",
    amber: "text-amber-300 border-amber-500/30 bg-amber-500/10 shadow-[0_0_15px_rgba(245,158,11,0.15)]",
  };

  const dotColors = {
    purple: "bg-purple-400 shadow-[0_0_8px_#c084fc]",
    cyan: "bg-cyan-400 shadow-[0_0_8px_#22d3ee]",
    emerald: "bg-emerald-400 shadow-[0_0_8px_#34d399]",
    amber: "bg-amber-400 shadow-[0_0_8px_#fbbf24]",
  };

  return (
    <span
      className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-mono uppercase tracking-wider backdrop-blur-md border ${variantStyles[variant]} ${className}`}
    >
      {pulse && (
        <span className="relative flex h-2 w-2">
          <span
            className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${dotColors[variant]}`}
          />
          <span className={`relative inline-flex rounded-full h-2 w-2 ${dotColors[variant]}`} />
        </span>
      )}
      {icon && <span>{icon}</span>}
      <span>{children}</span>
    </span>
  );
}

