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
  Home,
  User,
  Code,
  Briefcase,
  Mail,
} from "lucide-react";

const NAV_ITEMS = [
  { name: "Home", href: "#home", icon: <Home className="w-3.5 h-3.5" /> },
  { name: "About", href: "#about", icon: <User className="w-3.5 h-3.5" /> },
  { name: "Projects", href: "#projects", icon: <Code className="w-3.5 h-3.5" /> },
  { name: "Skills", href: "#skills", icon: <Sparkles className="w-3.5 h-3.5" /> },
  { name: "Experience", href: "#experience", icon: <Briefcase className="w-3.5 h-3.5" /> },
  { name: "Contact", href: "#contact", icon: <Mail className="w-3.5 h-3.5" /> },
];

export default function Navbar() {
  const [activeSection, setActiveSection] = useState("Home");
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isMuted, setIsMuted] = useState(true);

  useEffect(() => {
    setIsMuted(sound.getMuted());

    const handleScroll = () => {
      if (window.scrollY > 80) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }

      // Detect active section
      const sections = ["home", "about", "projects", "skills", "experience", "contact"];
      const scrollPosition = window.scrollY + 250;

      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el && el.offsetTop <= scrollPosition) {
          const match = NAV_ITEMS.find((item) => item.href === `#${sections[i]}`);
          if (match) setActiveSection(match.name);
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
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 py-3 px-3 sm:px-6 flex justify-center ${
          isScrolled
            ? "opacity-100 translate-y-0 pointer-events-auto"
            : "opacity-0 -translate-y-4 pointer-events-none md:opacity-0 md:-translate-y-4 md:pointer-events-none"
        }`}
      >
        <div
          className="relative max-w-5xl w-full flex items-center justify-between px-4 py-2.5 rounded-2xl transition-all duration-500 border bg-[#08051e]/90 backdrop-blur-2xl border-cyan-500/35 shadow-[0_10px_35px_-10px_rgba(0,0,0,0.8),0_0_25px_rgba(6,182,212,0.2)]"
        >
          {/* Logo PB */}
          <a
            href="#home"
            onClick={(e) => {
              e.preventDefault();
              handleNavClick("Home", "#home");
            }}
            className="group flex items-center gap-2.5 cursor-pointer select-none"
          >
            <div className="relative w-8 h-8 rounded-xl bg-gradient-to-br from-purple-600 via-pink-600 to-cyan-500 p-[1.5px] transition-transform duration-300 group-hover:scale-105 shadow-[0_0_15px_rgba(139,92,246,0.5)]">
              <div className="w-full h-full bg-[#050214] rounded-[10px] flex items-center justify-center">
                <span className="font-mono font-black text-xs tracking-tighter bg-gradient-to-r from-purple-300 via-white to-cyan-300 bg-clip-text text-transparent">
                  PB
                </span>
              </div>
              <span className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-cyan-400 animate-ping opacity-75" />
            </div>
            <div className="hidden sm:flex flex-col">
              <span className="text-xs font-bold tracking-wider text-white group-hover:text-cyan-300 transition-colors">
                Pushkar Balyan
              </span>
              <span className="text-[9px] font-mono tracking-widest text-purple-400">
                COMMAND_NAV // ONLINE
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1 bg-black/40 border border-white/10 p-1 rounded-xl backdrop-blur-xl">
            {NAV_ITEMS.map((item) => {
              const isActive = activeSection === item.name;
              return (
                <button
                  key={item.name}
                  onClick={() => handleNavClick(item.name, item.href)}
                  onMouseEnter={() => sound.playHover()}
                  className={`relative flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-medium tracking-wide transition-colors duration-200 ${
                    isActive ? "text-white" : "text-gray-400 hover:text-gray-200"
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeStickyNavIndicator"
                      className="absolute inset-0 bg-gradient-to-r from-purple-600 via-pink-600 to-purple-500 rounded-lg shadow-[0_0_15px_rgba(217,70,239,0.7)] border border-pink-300/40"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10 flex items-center gap-1.5">
                    {item.icon}
                    <span>{item.name}</span>
                  </span>
                </button>
              );
            })}
          </nav>

          {/* Right Action Buttons */}
          <div className="flex items-center gap-2.5">
            {/* Audio Toggle Button */}
            <button
              onClick={toggleAudio}
              title={isMuted ? "Enable futuristic sound effects" : "Mute sound effects"}
              className={`p-2 rounded-xl border transition-all duration-300 ${
                isMuted
                  ? "bg-white/[0.03] border-white/10 text-gray-400 hover:text-white hover:border-purple-500/40"
                  : "bg-cyan-500/10 border-cyan-400/50 text-cyan-300 shadow-[0_0_15px_rgba(6,182,212,0.4)]"
              }`}
            >
              {isMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
            </button>

            {/* Let's Talk CTA */}
            <div className="hidden sm:block">
              <GlowButton
                variant="primary"
                onClick={() => handleNavClick("Contact", "#contact")}
                icon={<Sparkles className="w-3 h-3" />}
                className="py-1.5 px-3 text-xs font-semibold"
              >
                Let&apos;s Connect
              </GlowButton>
            </div>

            {/* Mobile Hamburger Menu Button */}
            <button
              onClick={() => {
                setMobileMenuOpen(!mobileMenuOpen);
                sound.playClick();
              }}
              className="md:hidden p-2 rounded-xl bg-white/[0.04] border border-white/10 text-gray-300 hover:text-white"
            >
              {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
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
            className="fixed inset-x-4 top-20 z-50 md:hidden bg-[#090520]/95 backdrop-blur-2xl border border-cyan-500/40 rounded-2xl p-5 shadow-[0_20px_50px_rgba(0,0,0,0.8),0_0_30px_rgba(6,182,212,0.3)]"
          >
            <div className="flex flex-col gap-2">
              {NAV_ITEMS.map((item, index) => (
                <button
                  key={item.name}
                  onClick={() => handleNavClick(item.name, item.href)}
                  className={`flex items-center justify-between p-2.5 rounded-xl text-left text-xs font-medium transition-all ${
                    activeSection === item.name
                      ? "bg-gradient-to-r from-purple-600/40 via-pink-600/40 to-cyan-500/40 text-white border border-cyan-400/50 shadow-[0_0_15px_rgba(6,182,212,0.3)]"
                      : "text-gray-300 hover:bg-white/[0.04] hover:text-white"
                  }`}
                >
                  <span className="flex items-center gap-2">
                    <span className="text-[10px] font-mono text-cyan-400">0{index + 1}</span>
                    {item.icon}
                    <span>{item.name}</span>
                  </span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-gray-400" />
                </button>
              ))}

              <div className="mt-3 pt-3 border-t border-white/10 flex flex-col gap-2">
                <GlowButton
                  variant="primary"
                  onClick={() => handleNavClick("Contact", "#contact")}
                  className="w-full justify-center py-2 text-xs"
                >
                  Let&apos;s Connect
                </GlowButton>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

