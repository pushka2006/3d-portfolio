"use client";

import SmoothScroll from "@/components/SmoothScroll";
import Navbar from "@/components/Navbar";
import { ElectricCursor } from "@/components/effects/ElectricCursor";
import { DriftWall } from "@/components/effects/DriftWall";
import CosmicBackground from "@/components/CosmicBackground";
import { CyberHUDDeck } from "@/components/CyberHUDDeck";
import About from "@/components/About";
import Skills from "@/components/Skills";
import Projects from "@/components/Projects";
import Experience from "@/components/Experience";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import { ScrollProgress } from "@/components/ui/ScrollProgress";
import { EffectsStatusHUD } from "@/components/effects/EffectsStatusHUD";

export default function Home() {
  return (
    <SmoothScroll>
      <div className="relative min-h-screen bg-[#030014] text-white selection:bg-cyan-500/30 selection:text-cyan-200 overflow-x-hidden">
        {/* Advanced Electric Lightning Cursor */}
        <ElectricCursor />

        {/* Scroll Progress Bar & HUD */}
        <ScrollProgress />

        {/* Sticky Command Glass Navigation Bar */}
        <Navbar />

        {/* 10/10 FX Engine Live Status Readout */}
        <EffectsStatusHUD />

        {/* 3D WebGL Cosmic Particle Constellation Background */}
        <CosmicBackground />

        {/* Drift Wall Effect: Infinite Multi-Layer Cyber Depth Layer */}
        <DriftWall />

        {/* Master Futuristic HUD Deck (Matching Reference Design Exactly) */}
        <div id="home" className="pt-3 sm:pt-6 pb-6 relative z-10">
          <CyberHUDDeck />
        </div>

        {/* Deep Dive Sections with 3D Stacking Cards & Parallax */}
        <main className="relative z-10 flex flex-col space-y-12 sm:space-y-20">
          <About />
          <Skills />
          <Projects />
          <Experience />
          <Contact />
        </main>

        {/* Cyberpunk Footer */}
        <Footer />
      </div>
    </SmoothScroll>
  );
}
