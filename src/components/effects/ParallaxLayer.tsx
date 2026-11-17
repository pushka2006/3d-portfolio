"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";

interface ParallaxLayerProps {
  children: React.ReactNode;
  speed?: number; // e.g. -0.2 (slower) to 0.4 (faster)
  className?: string;
  enableMouseTilt?: boolean;
}

export function ParallaxLayer({
  children,
  speed = 0.15,
  className = "",
}: ParallaxLayerProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const rawY = useTransform(scrollYProgress, [0, 1], [-60 * speed, 60 * speed]);
  const y = useSpring(rawY, { stiffness: 120, damping: 25 });

  return (
    <motion.div
      ref={ref}
      style={{ y, willChange: "transform" }}
      className={`relative ${className}`}
    >
      {children}
    </motion.div>
  );
}

