"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { sound } from "@/utils/sound";
import { GlowButton } from "@/components/ui/GlowButton";
import {
  Menu,
  X,
  Volume2,
  VolumeX,
  Sparkles,
  ArrowUpRight,
} from "lucide-react";

const NAV_ITEMS = [
  { name: "Home", href: "#hero" },
  { name: "About", href: "#about" },
  { name: "Skills", href: "#skills" },
  { name: "Projects", href: "#projects" },
  { name: "Experience", href: "#experience" },
  { name: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [activeSection, setActiveSection] = useState("Home");
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isMuted, setIsMuted] = useState(true);

  useEffect(() => {
    setIsMuted(sound.getMuted());

    const handleScroll = () => {
      if (window.scrollY > 40) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }

      // Detect active section
      const sections = NAV_ITEMS.map((item) => item.href.substring(1));
      const scrollPosition = window.scrollY + 200;

      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el && el.offsetTop <= scrollPosition) {
          setActiveSection(NAV_ITEMS[i].name);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (name: string, href: string) => {
    setActiveSection(name);
    setMobileMenuOpen(false);
    sound.playClick();

    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const toggleAudio = () => {
    const muted = sound.toggleMute();
    setIsMuted(muted);
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 py-4 px-4 sm:px-8 flex justify-center ${
          isScrolled ? "pt-3" : "pt-6"
        }`}
      >
        <div
          className={`relative max-w-6xl w-full flex items-center justify-between px-5 py-3 rounded-2xl transition-all duration-500 border ${
            isScrolled
              ? "bg-[#09061c]/80 backdrop-blur-2xl border-purple-500/30 shadow-[0_10px_35px_-10px_rgba(0,0,0,0.8),0_0_20px_rgba(139,92,246,0.15)]"
              : "bg-white/[0.03] backdrop-blur-md border-white/10"
          }`}
        >
          {/* Logo PB */}
          <a
            href="#hero"
            onClick={(e) => {
              e.preventDefault();
              handleNavClick("Home", "#hero");
            }}
            className="group flex items-center gap-2.5 cursor-pointer select-none"
          >
            <div className="relative w-10 h-10 rounded-xl bg-gradient-to-br from-purple-600 via-indigo-600 to-cyan-500 p-[1.5px] transition-transform duration-300 group-hover:scale-105 shadow-[0_0_15px_rgba(139,92,246,0.5)]">
              <div className="w-full h-full bg-[#050214] rounded-[10px] flex items-center justify-center">
                <span className="font-mono font-black text-sm tracking-tighter bg-gradient-to-r from-purple-300 via-white to-cyan-300 bg-clip-text text-transparent">
                  PB
                </span>
              </div>
              <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-cyan-400 animate-ping opacity-75" />
            </div>
            <div className="hidden sm:flex flex-col">
              <span className="text-sm font-bold tracking-wider text-white group-hover:text-cyan-300 transition-colors">
                PUSHKAR BALYAN
              </span>
              <span className="text-[10px] font-mono tracking-widest text-purple-400">
                DEV & AI SPECIALIST
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1 bg-white/[0.03] border border-white/[0.08] p-1.5 rounded-xl backdrop-blur-xl">
            {NAV_ITEMS.map((item) => {
              const isActive = activeSection === item.name;
              return (
                <button
                  key={item.name}
                  onClick={() => handleNavClick(item.name, item.href)}
                  onMouseEnter={() => sound.playHover()}
                  className={`relative px-4 py-1.5 rounded-lg text-xs font-medium tracking-wide transition-colors duration-200 ${
                    isActive ? "text-white" : "text-gray-400 hover:text-gray-200"
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeNavIndicator"
                      className="absolute inset-0 bg-gradient-to-r from-purple-600/40 via-indigo-600/40 to-cyan-500/40 border border-cyan-400/50 rounded-lg shadow-[0_0_15px_rgba(6,182,212,0.3)]"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10">{item.name}</span>
                </button>
              );
            })}
          </nav>

          {/* Right Action Buttons */}
          <div className="flex items-center gap-3">
            {/* Audio Toggle Button */}
            <button
              onClick={toggleAudio}
              title={isMuted ? "Enable futuristic sound effects" : "Mute sound effects"}
              className={`p-2.5 rounded-xl border transition-all duration-300 ${
                isMuted
                  ? "bg-white/[0.03] border-white/10 text-gray-400 hover:text-white hover:border-purple-500/40"
                  : "bg-cyan-500/10 border-cyan-400/50 text-cyan-300 shadow-[0_0_15px_rgba(6,182,212,0.4)]"
              }`}
            >
              {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
            </button>

            {/* Let's Talk CTA */}
            <div className="hidden lg:block">
              <GlowButton
                variant="primary"
                onClick={() => handleNavClick("Contact", "#contact")}
                icon={<Sparkles className="w-3.5 h-3.5" />}
                className="py-2.5 px-4 text-xs font-semibold"
              >
                Let&apos;s Talk
              </GlowButton>
            </div>

            {/* Mobile Hamburger Menu Button */}
            <button
              onClick={() => {
                setMobileMenuOpen(!mobileMenuOpen);
                sound.playClick();
              }}
              className="md:hidden p-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-gray-300 hover:text-white"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-x-4 top-24 z-40 md:hidden bg-[#0a0624]/95 backdrop-blur-2xl border border-purple-500/40 rounded-2xl p-6 shadow-[0_20px_50px_rgba(0,0,0,0.8),0_0_30px_rgba(139,92,246,0.3)]"
          >
            <div className="flex flex-col gap-2">
              {NAV_ITEMS.map((item, index) => (
                <button
                  key={item.name}
                  onClick={() => handleNavClick(item.name, item.href)}
                  className={`flex items-center justify-between p-3 rounded-xl text-left text-sm font-medium transition-all ${
                    activeSection === item.name
                      ? "bg-gradient-to-r from-purple-600/30 to-cyan-500/30 text-white border border-cyan-400/40"
                      : "text-gray-300 hover:bg-white/[0.04] hover:text-white"
                  }`}
                >
                  <span className="flex items-center gap-2">
                    <span className="text-xs font-mono text-purple-400">0{index + 1}</span>
                    <span>{item.name}</span>
                  </span>
                  <ArrowUpRight className="w-4 h-4 text-gray-400" />
                </button>
              ))}

              <div className="mt-4 pt-4 border-t border-white/10 flex flex-col gap-3">
                <GlowButton
                  variant="primary"
                  onClick={() => handleNavClick("Contact", "#contact")}
                  className="w-full justify-center"
                >
                  Let&apos;s Talk
                </GlowButton>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

