"use client";

import { motion, AnimatePresence } from "framer-motion";
import { sound } from "@/utils/sound";
import { GlowButton } from "@/components/ui/GlowButton";
import { GlassBadge } from "@/components/ui/GlassBadge";
import {
  X,
  ExternalLink,
  CheckCircle2,
  Cpu,
  Sparkles,
  Zap,
} from "lucide-react";
import { GithubIcon } from "@/components/ui/BrandIcons";

export interface ProjectData {
  id: string;
  title: string;
  subtitle: string;
  category: string;
  badge: string;
  summary: string;
  problem: string;
  solution: string;
  impact: string;
  technologies: string[];
  metrics: { label: string; value: string }[];
  liveUrl?: string;
  githubUrl: string;
  accentColor: "purple" | "cyan" | "magenta" | "blue";
  bannerGradient: string;
}

interface ProjectModalProps {
  project: ProjectData | null;
  onClose: () => void;
}

export function ProjectModal({ project, onClose }: ProjectModalProps) {
  if (!project) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/85 backdrop-blur-xl"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.92, y: 30 }}
          transition={{ type: "spring", stiffness: 350, damping: 25 }}
          className="relative w-full max-w-3xl bg-[#0b0822]/95 border border-purple-500/40 rounded-3xl p-6 sm:p-8 shadow-[0_25px_70px_rgba(0,0,0,0.9),0_0_50px_rgba(139,92,246,0.25)] z-10 max-h-[90vh] overflow-y-auto"
        >
          {/* Close Button */}
          <button
            onClick={() => {
              sound.playClick();
              onClose();
            }}
            className="absolute top-6 right-6 p-2 rounded-xl bg-white/5 border border-white/10 text-gray-400 hover:text-white hover:border-cyan-400/50 transition-colors z-20"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Banner Graphic Header */}
          <div
            className={`w-full aspect-[21/9] rounded-2xl bg-gradient-to-r ${project.bannerGradient} p-6 relative overflow-hidden flex flex-col justify-end mb-6 border border-white/15`}
          >
            <div className="absolute inset-0 cyber-grid-bg opacity-30" />
            <div className="relative z-10 space-y-2">
              <div className="flex items-center gap-2">
                <GlassBadge variant="cyan" pulse>
                  {project.badge}
                </GlassBadge>
                <span className="text-xs font-mono uppercase text-white/80 bg-black/40 px-2.5 py-1 rounded-md backdrop-blur-md">
                  {project.category}
                </span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white filter drop-shadow-[0_2px_10px_rgba(0,0,0,0.6)]">
                {project.title}
              </h2>
            </div>
          </div>

          {/* Content Details */}
          <div className="space-y-6">
            <p className="text-sm sm:text-base text-gray-200 leading-relaxed font-normal">
              {project.summary}
            </p>

            {/* Metrics Row */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {project.metrics.map((m) => (
                <div
                  key={m.label}
                  className="p-3.5 rounded-xl bg-white/[0.03] border border-white/10 text-center"
                >
                  <div className="text-xl sm:text-2xl font-extrabold font-mono text-cyan-300">
                    {m.value}
                  </div>
                  <div className="text-[11px] font-mono text-gray-400 uppercase mt-0.5">
                    {m.label}
                  </div>
                </div>
              ))}
            </div>

            {/* Problem & Solution Accordion */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-purple-500/5 border border-purple-500/20">
                <h4 className="text-xs font-mono uppercase text-purple-300 tracking-wider mb-2 flex items-center gap-1.5">
                  <Cpu className="w-3.5 h-3.5" /> The Engineering Challenge
                </h4>
                <p className="text-xs text-gray-300 leading-relaxed">{project.problem}</p>
              </div>

              <div className="p-4 rounded-xl bg-cyan-500/5 border border-cyan-500/20">
                <h4 className="text-xs font-mono uppercase text-cyan-300 tracking-wider mb-2 flex items-center gap-1.5">
                  <Zap className="w-3.5 h-3.5" /> The Architectural Solution
                </h4>
                <p className="text-xs text-gray-300 leading-relaxed">{project.solution}</p>
              </div>
            </div>

            {/* Impact */}
            <div className="p-4 rounded-xl bg-white/[0.03] border border-white/10">
              <h4 className="text-xs font-mono uppercase text-emerald-400 tracking-wider mb-1 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" /> Measured Impact & Outcomes
              </h4>
              <p className="text-xs sm:text-sm text-gray-300 leading-relaxed">{project.impact}</p>
            </div>

            {/* Tech Stack Pills */}
            <div>
              <div className="text-xs font-mono text-gray-400 uppercase tracking-wider mb-2">
                Technologies & Frameworks
              </div>
              <div className="flex flex-wrap gap-2">
                {project.technologies.map((t) => (
                  <span
                    key={t}
                    className="px-2.5 py-1 rounded-lg bg-white/[0.04] border border-white/10 text-xs font-mono text-cyan-300 flex items-center gap-1.5"
                  >
                    <CheckCircle2 className="w-3 h-3 text-purple-400" />
                    {t}
                  </span>
                ))}
              </div>
            </div>

            {/* CTAs */}
            <div className="pt-4 border-t border-white/10 flex flex-col sm:flex-row gap-3">
              {project.liveUrl && (
                <GlowButton
                  variant="primary"
                  href={project.liveUrl}
                  external
                  icon={<ExternalLink className="w-4 h-4" />}
                  className="w-full sm:w-auto justify-center"
                >
                  Launch Live Demo
                </GlowButton>
              )}
              <GlowButton
                variant="outline"
                href={project.githubUrl}
                external
                icon={<GithubIcon className="w-4 h-4" />}
                className="w-full sm:w-auto justify-center"
              >
                Inspect Source Code
              </GlowButton>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}

