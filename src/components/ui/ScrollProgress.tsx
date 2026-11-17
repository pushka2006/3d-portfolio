"use client";

import { useEffect, useState } from "react";
import { motion, useScroll, useSpring } from "framer-motion";

export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  const [percent, setPercent] = useState(0);

  useEffect(() => {
    return scrollYProgress.on("change", (latest) => {
      setPercent(Math.round(latest * 100));
    });
  }, [scrollYProgress]);

  return (
    <div className="fixed top-0 left-0 right-0 z-50 pointer-events-none">
      {/* Glowing Progress Line */}
      <motion.div
        className="h-[3px] bg-gradient-to-r from-purple-500 via-cyan-400 to-fuchsia-500 origin-left shadow-[0_0_12px_#00f0ff]"
        style={{ scaleX }}
      />

      {/* Cyber HUD status tag on bottom-right of screen */}
      <div className="fixed bottom-6 right-6 z-40 hidden md:flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/60 border border-white/10 backdrop-blur-md text-[11px] font-mono text-gray-400 pointer-events-auto">
        <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse shadow-[0_0_8px_#22d3ee]" />
        <span>SCROLL // {percent.toString().padStart(3, "0")}%</span>
      </div>
    </div>
  );
}

