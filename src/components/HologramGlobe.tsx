"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export function HologramGlobe() {
  return (
    <motion.div
      animate={{
        scale: [0.97, 1.03, 0.97],
      }}
      transition={{
        duration: 3.5,
        repeat: Infinity,
        ease: "easeInOut",
      }}
      className="relative w-20 h-14 sm:w-24 sm:h-16 flex items-center justify-center shrink-0 select-none"
    >
      <Image
        src="/holo-globe-art.png"
        alt="Hologram Telemetry Globe"
        width={96}
        height={56}
        priority
        unoptimized
        quality={100}
        className="object-contain filter drop-shadow-[0_0_16px_rgba(0,240,255,0.65)] hover:scale-105 transition-transform"
      />
      <div className="absolute inset-0 bg-cyan-500/20 rounded-full blur-xl pointer-events-none" />
    </motion.div>
  );
}

