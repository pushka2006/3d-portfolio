"use client";

import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";
import { sound } from "@/utils/sound";
import { GlowButton } from "@/components/ui/GlowButton";
import { GlassBadge } from "@/components/ui/GlassBadge";
import {
  X,
  Download,
  FileText,
  CheckCircle2,
  ExternalLink,
  Briefcase,
  GraduationCap,
  Sparkles,
} from "lucide-react";

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ResumeModal({ isOpen, onClose }: ResumeModalProps) {
  useEffect(() => {
    if (isOpen) {
      sound.playSuccess();
      confetti({
        particleCount: 70,
        spread: 60,
        origin: { y: 0.6 },
        colors: ["#8b5cf6", "#06b6d4", "#ec4899", "#ffffff"],
      });
    }
  }, [isOpen]);

  const handleDownload = () => {
    sound.playWarp();
    // Trigger download of resume file or print view
    window.print();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-xl"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", stiffness: 350, damping: 25 }}
            className="relative w-full max-w-2xl bg-[#0c0924]/95 border border-purple-500/40 rounded-3xl p-6 sm:p-8 shadow-[0_25px_60px_rgba(0,0,0,0.9),0_0_40px_rgba(139,92,246,0.3)] z-10 max-h-[90vh] overflow-y-auto"
          >
            {/* Close Button */}
            <button
              onClick={() => {
                sound.playClick();
                onClose();
              }}
              className="absolute top-6 right-6 p-2 rounded-xl bg-white/5 border border-white/10 text-gray-400 hover:text-white hover:border-cyan-400/50 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Header */}
            <div className="flex items-start gap-4 mb-6">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-purple-600 to-cyan-500 p-[1.5px] shadow-[0_0_20px_rgba(139,92,246,0.5)]">
                <div className="w-full h-full bg-[#080518] rounded-[14px] flex items-center justify-center text-cyan-300">
                  <FileText className="w-6 h-6" />
                </div>
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-xl sm:text-2xl font-bold text-white">Pushkar Balyan</h3>
                  <GlassBadge variant="cyan" pulse>
                    Available
                  </GlassBadge>
                </div>
                <p className="text-sm text-purple-300 font-mono">
                  Full Stack Software Engineer & AI Enthusiast
                </p>
              </div>
            </div>

            {/* Resume Summary Details */}
            <div className="space-y-6 text-sm text-gray-300">
              <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/[0.08]">
                <h4 className="text-xs font-mono uppercase tracking-wider text-cyan-400 mb-2 flex items-center gap-2">
                  <Sparkles className="w-3.5 h-3.5" /> Executive Summary
                </h4>
                <p className="leading-relaxed text-gray-300 text-xs sm:text-sm">
                  Forward-thinking Full Stack Developer and AI specialist with expertise in modern React/Next.js architectures, distributed backend microservices, neural network modeling, and interactive 3D WebGL experiences. Dedicated to building world-class products that fuse computational power with breathtaking visual craft.
                </p>
              </div>

              {/* Quick Pillars */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-2xl bg-purple-500/5 border border-purple-500/20">
                  <h4 className="text-xs font-mono text-purple-300 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                    <Briefcase className="w-3.5 h-3.5" /> Core Competencies
                  </h4>
                  <ul className="space-y-1.5 text-xs text-gray-300">
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                      <span>Next.js, React, TypeScript, Node.js</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                      <span>Python, TensorFlow, PyTorch, LLMs</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                      <span>C++, Java, Distributed Systems, MySQL</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                      <span>Three.js, Unity & Unreal Engine</span>
                    </li>
                  </ul>
                </div>

                <div className="p-4 rounded-2xl bg-cyan-500/5 border border-cyan-500/20">
                  <h4 className="text-xs font-mono text-cyan-300 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                    <GraduationCap className="w-3.5 h-3.5" /> Highlights & Credentials
                  </h4>
                  <ul className="space-y-1.5 text-xs text-gray-300">
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-purple-400 shrink-0" />
                      <span>B.Tech in Computer Science & Engineering</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-purple-400 shrink-0" />
                      <span>National Hackathon Winner & Finalist</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-purple-400 shrink-0" />
                      <span>25+ Shipped Production & AI Projects</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-purple-400 shrink-0" />
                      <span>Open Source Contributor & Researcher</span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-4 flex flex-col sm:flex-row gap-3">
                <GlowButton
                  variant="primary"
                  onClick={handleDownload}
                  icon={<Download className="w-4 h-4" />}
                  className="w-full justify-center"
                >
                  Download Complete Resume (PDF)
                </GlowButton>
                <GlowButton
                  variant="outline"
                  onClick={() => {
                    sound.playClick();
                    window.open("mailto:pushkarbalyan@gmail.com?subject=Opportunity%20for%20Pushkar%20Balyan", "_blank");
                  }}
                  icon={<ExternalLink className="w-4 h-4" />}
                  className="w-full sm:w-auto justify-center"
                >
                  Contact Directly
                </GlowButton>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

