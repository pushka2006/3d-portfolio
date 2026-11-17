"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import confetti from "canvas-confetti";
import { GlassCard } from "@/components/ui/GlassCard";
import { GlowButton } from "@/components/ui/GlowButton";
import { GlassBadge } from "@/components/ui/GlassBadge";
import { FloatingHUD } from "@/components/effects/FloatingHUD";
import { ParallaxLayer } from "@/components/effects/ParallaxLayer";
import { sound } from "@/utils/sound";
import {
  MapPin,
  Clock,
  Copy,
  Check,
  Send,
  Sparkles,
  CheckCircle2,
} from "lucide-react";
import {
  GithubIcon,
  LinkedinIcon,
  InstagramIcon,
  TwitterIcon,
  DiscordIcon,
} from "@/components/ui/BrandIcons";

const SOCIAL_PROFILES = [
  {
    name: "GitHub",
    icon: <GithubIcon className="w-5 h-5" />,
    url: "https://github.com",
    handle: "@pushkar-balyan",
    color: "hover:border-purple-400 hover:text-purple-300",
  },
  {
    name: "LinkedIn",
    icon: <LinkedinIcon className="w-5 h-5" />,
    url: "https://linkedin.com",
    handle: "Pushkar Balyan",
    color: "hover:border-cyan-400 hover:text-cyan-300",
  },
  {
    name: "Instagram",
    icon: <InstagramIcon className="w-5 h-5" />,
    url: "https://instagram.com",
    handle: "@pushkarbalyan",
    color: "hover:border-pink-400 hover:text-pink-300",
  },
  {
    name: "Discord",
    icon: <DiscordIcon className="w-5 h-5" />,
    url: "https://discord.com",
    handle: "pushkar#0001",
    color: "hover:border-indigo-400 hover:text-indigo-300",
  },
  {
    name: "X (Twitter)",
    icon: <TwitterIcon className="w-5 h-5" />,
    url: "https://x.com",
    handle: "@pushkarbalyan",
    color: "hover:border-blue-400 hover:text-blue-300",
  },
];

export default function Contact() {
  const [copied, setCopied] = useState(false);
  const [currentTime, setCurrentTime] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    projectType: "Full Stack Web App",
    subject: "",
    message: "",
  });

  // Keep live India time updated
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const options: Intl.DateTimeFormatOptions = {
        timeZone: "Asia/Kolkata",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: true,
      };
      setCurrentTime(new Intl.DateTimeFormat("en-US", options).format(now));
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const copyEmail = () => {
    sound.playClick();
    navigator.clipboard.writeText("pushkarbalyan@gmail.com");
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    sound.playClick();
    setIsSubmitting(true);

    // Simulate futuristic transmission delay
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      sound.playSuccess();
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ["#06b6d4", "#8b5cf6", "#ec4899", "#ffffff"],
      });
    }, 1200);
  };

  return (
    <section id="contact" className="relative py-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Floating Holographic Transmission Beacon HUD */}
      <div className="hidden xl:block absolute top-12 right-8 z-20">
        <FloatingHUD title="QUANTUM_UPLINK" variant="coordinates" className="w-56" />
      </div>

      {/* Section Header with Parallax */}
      <ParallaxLayer speed={0.15}>
        <div className="flex flex-col items-center text-center space-y-4 mb-16">
          <GlassBadge variant="cyan" icon={<Sparkles className="w-3.5 h-3.5" />}>
            Initiate Transmission
          </GlassBadge>
          <h2 className="text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white">
            Let&apos;s Create Something{" "}
            <span className="text-gradient-cyan">Extraordinary</span>
          </h2>
          <p className="max-w-2xl text-gray-400 text-sm sm:text-base leading-relaxed">
            Have an ambitious project, an AI architecture challenge, or a visionary venture? I am always eager to collaborate with bold creators and forward-thinking engineering teams.
          </p>
        </div>
      </ParallaxLayer>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left: Contact Info & Status Cards */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="lg:col-span-5 space-y-6"
        >
          {/* Main Direct Email Card */}
          <GlassCard glowColor="purple" className="p-7 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono text-purple-400 uppercase tracking-widest">
                DIRECT FREQUENCY
              </span>
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
            </div>

            <div>
              <div className="text-xs text-gray-400 mb-1">Primary Email Address:</div>
              <div className="text-lg sm:text-xl font-bold font-mono text-white select-all">
                pushkarbalyan@gmail.com
              </div>
            </div>

            <button
              onClick={copyEmail}
              className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-white/[0.05] border border-white/10 hover:border-cyan-400/50 hover:bg-white/[0.08] text-xs font-mono text-cyan-300 transition-all duration-300"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4 text-emerald-400" />
                  <span className="text-emerald-400">COPIED TO CLIPBOARD!</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" />
                  <span>COPY EMAIL ADDRESS</span>
                </>
              )}
            </button>
          </GlassCard>

          {/* Location & Real-Time Clock */}
          <GlassCard glowColor="cyan" className="p-7 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono text-cyan-300 uppercase tracking-widest">
                GEOGRAPHIC COORDINATES
              </span>
              <MapPin className="w-4 h-4 text-cyan-400" />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm font-bold text-white">India</div>
                <div className="text-xs text-gray-400 font-mono">IST (UTC +5:30)</div>
              </div>
              <div className="text-right">
                <div className="flex items-center gap-1.5 text-xs font-mono text-cyan-300">
                  <Clock className="w-3.5 h-3.5" />
                  <span>{currentTime || "12:00:00 PM"}</span>
                </div>
                <div className="text-[10px] font-mono text-emerald-400 flex items-center justify-end gap-1 mt-0.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  ACTIVE HOURS
                </div>
              </div>
            </div>
          </GlassCard>

          {/* Social Profiles Grid */}
          <GlassCard glowColor="blue" className="p-7 space-y-4">
            <div className="text-xs font-mono text-gray-400 uppercase tracking-widest">
              NETWORK NODES
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {SOCIAL_PROFILES.map((profile) => (
                <a
                  key={profile.name}
                  href={profile.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  onMouseEnter={() => sound.playHover()}
                  className={`p-3 rounded-xl bg-white/[0.03] border border-white/10 flex items-center gap-3 transition-all duration-300 ${profile.color}`}
                >
                  <div className="p-2 rounded-lg bg-white/[0.05] text-white">
                    {profile.icon}
                  </div>
                  <div>
                    <div className="text-xs font-bold text-white">{profile.name}</div>
                    <div className="text-[10px] font-mono text-gray-400">{profile.handle}</div>
                  </div>
                </a>
              ))}
            </div>
          </GlassCard>
        </motion.div>

        {/* Right: Interactive Contact Form */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="lg:col-span-7"
        >
          <GlassCard glowColor="cyan" tilt={false} className="p-8 sm:p-10 relative overflow-hidden">
            <div className="space-y-6">
              <div>
                <h3 className="text-2xl font-bold text-white">Send a Direct Transmission</h3>
                <p className="text-xs sm:text-sm text-gray-400 mt-1">
                  Leave your details and message below. You will receive a response within 24 hours.
                </p>
              </div>

              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="py-12 px-6 rounded-2xl bg-cyan-500/10 border border-cyan-400/40 text-center space-y-4"
                >
                  <div className="w-14 h-14 rounded-full bg-cyan-500/20 border border-cyan-400/60 mx-auto flex items-center justify-center text-cyan-300">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h4 className="text-xl font-bold text-white">Transmission Dispatched</h4>
                  <p className="text-sm text-gray-300 max-w-md mx-auto">
                    Thank you, <span className="text-cyan-300 font-semibold">{formData.name}</span>. Your message has been beamed directly to Pushkar. I will be in touch shortly!
                  </p>
                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setFormData({
                        name: "",
                        email: "",
                        projectType: "Full Stack Web App",
                        subject: "",
                        message: "",
                      });
                    }}
                    className="text-xs font-mono text-purple-300 hover:text-white underline underline-offset-4"
                  >
                    Send another message
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  {/* Name and Email */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-mono text-gray-300 uppercase">
                        Your Name *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Alex Mercer"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/10 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400 focus:shadow-[0_0_15px_rgba(6,182,212,0.3)] transition-all"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs font-mono text-gray-300 uppercase">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="e.g. alex@company.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/10 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400 focus:shadow-[0_0_15px_rgba(6,182,212,0.3)] transition-all"
                      />
                    </div>
                  </div>

                  {/* Project Type Selector Pills */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-mono text-gray-300 uppercase">
                      What are you building?
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {[
                        "Full Stack Web App",
                        "AI Agent / LLM System",
                        "Game Dev / 3D WebGL",
                        "Consultation / Full-Time",
                      ].map((type) => (
                        <button
                          type="button"
                          key={type}
                          onClick={() => {
                            setFormData({ ...formData, projectType: type });
                            sound.playClick();
                          }}
                          className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all ${
                            formData.projectType === type
                              ? "bg-purple-600/40 border-purple-400 text-white shadow-[0_0_12px_rgba(139,92,246,0.3)]"
                              : "bg-white/[0.03] border-white/10 text-gray-400 hover:text-white"
                          } border`}
                        >
                          {type}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Subject */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-mono text-gray-300 uppercase">Subject</label>
                    <input
                      type="text"
                      placeholder="e.g. Building an AI-driven platform"
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/10 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400 focus:shadow-[0_0_15px_rgba(6,182,212,0.3)] transition-all"
                    />
                  </div>

                  {/* Message Body */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-mono text-gray-300 uppercase">Message *</label>
                    <textarea
                      required
                      rows={4}
                      placeholder="Share details regarding your timeline, vision, and project scope..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/10 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400 focus:shadow-[0_0_15px_rgba(6,182,212,0.3)] transition-all resize-none"
                    />
                  </div>

                  {/* Submit Button */}
                  <div className="pt-2">
                    <GlowButton
                      variant="primary"
                      onClick={() => {}}
                      icon={
                        isSubmitting ? (
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        ) : (
                          <Send className="w-4 h-4" />
                        )
                      }
                      className="w-full justify-center py-4"
                    >
                      {isSubmitting ? "Beaming Transmission..." : "Dispatch Message"}
                    </GlowButton>
                  </div>
                </form>
              )}
            </div>
          </GlassCard>
        </motion.div>
      </div>
    </section>
  );
}

