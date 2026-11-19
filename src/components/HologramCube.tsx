"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export function HologramCube() {
  return (
    <motion.div
      animate={{
        y: [-4, 4, -4],
        rotateZ: [-0.8, 0.8, -0.8],
      }}
      transition={{
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut",
      }}
      className="relative w-44 h-40 flex items-center justify-center select-none cursor-pointer"
    >
      <Image
        src="/holo-cube-art.png"
        alt="Quantum AI Hologram Cube"
        width={160}
        height={150}
        priority
        className="object-contain filter drop-shadow-[0_0_24px_rgba(0,240,255,0.6)] hover:scale-105 transition-transform duration-300"
      />
      {/* Dynamic ambient energy glow */}
      <div className="absolute inset-0 bg-cyan-500/15 rounded-full blur-2xl pointer-events-none -z-10" />
      <div className="absolute -bottom-2 w-32 h-6 bg-purple-500/20 rounded-full blur-xl pointer-events-none -z-10" />
    </motion.div>
  );
}

