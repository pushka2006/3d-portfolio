"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { GlassCard } from "@/components/ui/GlassCard";
import { GlassBadge } from "@/components/ui/GlassBadge";
import { ParallaxLayer } from "@/components/effects/ParallaxLayer";
import { sound } from "@/utils/sound";
import {
  Sparkles,
  GraduationCap,
  Briefcase,
  Trophy,
  Award,
  Calendar,
  MapPin,
  CheckCircle2,
  Flame,
} from "lucide-react";

interface TimelineItem {
  id: string;
  year: string;
  title: string;
  organization: string;
  location: string;
  category: "education" | "experience" | "hackathon" | "certification";
  badge: string;
  description: string;
  highlights: string[];
  skills: string[];
  glowColor: "purple" | "cyan" | "magenta" | "blue";
}

const TIMELINE_DATA: TimelineItem[] = [
  {
    id: "exp-1",
    year: "2024 - PRESENT",
    title: "Full Stack & AI Systems Engineer",
    organization: "Independent Software Architecture & Research",
    location: "India / Remote",
    category: "experience",
    badge: "CURRENT FOCUS",
    description:
      "Spearheading the engineering of production web platforms, autonomous LLM agent frameworks, and real-time interactive tools. Designing scalable microservices and high-throughput Next.js applications.",
    highlights: [
      "Engineered autonomous multi-agent pipelines with vector retrieval memory in Python & FastAPI",
      "Built resilient Full Stack web architectures using Next.js 14/15, TypeScript, and distributed databases",
      "Developed high-performance 3D WebGL user interfaces with Three.js and custom shader passes",
    ],
    skills: ["Next.js", "Python", "FastAPI", "Autonomous Agents", "TypeScript", "Three.js"],
    glowColor: "cyan",
  },
  {
    id: "hack-1",
    year: "2024",
    title: "National AI & Innovation Hackathon Winner",
    organization: "Apex Innovation Summit & Tech Hackathons",
    location: "India",
    category: "hackathon",
    badge: "1ST PLACE & HONORS",
    description:
      "Led high-intensity 36-hour sprint to conceptualize, prototype, and pitch an AI-driven public expenditure analytics platform (MPLADS AI), winning top honors among 200+ competing teams.",
    highlights: [
      "Implemented predictive budget forecasting with TensorFlow regression under intense time constraints",
      "Crafted full-stack interactive dashboard with live geospatial mapping for civic expenditure tracking",
      "Recognized by jury for technical depth, code cleanliness, and immediate societal impact",
    ],
    skills: ["TensorFlow", "FastAPI", "React", "Mapbox", "Data Science"],
    glowColor: "purple",
  },
  {
    id: "edu-1",
    year: "2021 - 2025",
    title: "Bachelor of Technology in Computer Science & Engineering",
    organization: "Engineering Institute",
    location: "India",
    category: "education",
    badge: "UNDERGRADUATE DEGREE",
    description:
      "Deep foundational study of Data Structures, Advanced Algorithms, Operating Systems, Database Management Systems, Computer Networks, and Artificial Intelligence.",
    highlights: [
      "Consistently achieved top-tier academic standing across systems programming and algorithms",
      "Led university technical society sessions on Full Stack Engineering and Modern React architectures",
      "Published research exploration on neural optimization and distributed computational workflows",
    ],
    skills: ["Data Structures", "Algorithms", "C++", "Java", "Computer Networks", "DBMS"],
    glowColor: "blue",
  },
  {
    id: "cert-1",
    year: "2023 - 2024",
    title: "Advanced Deep Learning & Neural Architectures",
    organization: "AI Specialization & Research Programs",
    location: "Online / Global",
    category: "certification",
    badge: "SPECIALIZATION",
    description:
      "Rigorous certification program covering Convolutional Neural Networks, Sequence Models, Attention Mechanisms, Transformer Architectures, and Large Language Model fine-tuning.",
    highlights: [
      "Implemented custom CNN and Transformer models from scratch in Python and PyTorch",
      "Mastered hyperparameter tuning, gradient descent optimization, and regularization strategies",
      "Engineered real-world computer vision classification and semantic segmentation models",
    ],
    skills: ["PyTorch", "TensorFlow", "Transformers", "Computer Vision", "NLP"],
    glowColor: "magenta",
  },
  {
    id: "exp-2",
    year: "2022 - 2023",
    title: "Creative Developer & 3D Simulation Engineer",
    organization: "Interactive Game & Web Experiments",
    location: "India",
    category: "experience",
    badge: "3D & GRAPHICS",
    description:
      "Engineered 3D action gameplay mechanics and procedural voxel generators using Unity, Unreal Engine, and WebGL. Focused on real-time physics, camera kinematics, and visual styling.",
    highlights: [
      "Developed custom HLSL shaders for dynamic lighting, water reflections, and character shields",
      "Constructed multithreaded voxel terrain generation with Marching Cubes algorithm",
      "Built immersive interactive portfolio experiences with custom sound effects and fluid physics",
    ],
    skills: ["Unity", "Unreal Engine 5", "C++", "HLSL Shaders", "WebGL"],
    glowColor: "purple",
  },
];

export default function Experience() {
  const [activeCategory, setActiveCategory] = useState<string>("all");

  const filteredItems = TIMELINE_DATA.filter((item) => {
    if (activeCategory === "all") return true;
    return item.category === activeCategory;
  });

  return (
    <section id="experience" className="relative py-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Section Header with Parallax */}
      <ParallaxLayer speed={0.15}>
        <div className="flex flex-col items-center text-center space-y-4 mb-16">
          <GlassBadge variant="purple" icon={<Sparkles className="w-3.5 h-3.5" />}>
            Milestones & Trajectory
          </GlassBadge>
          <h2 className="text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white">
            Journey & <span className="text-gradient-purple">Experience</span>
          </h2>
          <p className="max-w-2xl text-gray-400 text-sm sm:text-base leading-relaxed">
            The educational bedrock, development milestones, hackathon triumphs, and relentless engineering pursuits shaping my technical foundation.
          </p>
        </div>
      </ParallaxLayer>

      {/* Category Tabs */}
      <div className="flex flex-wrap justify-center items-center gap-2 mb-16">
        {[
          { id: "all", label: "Full Journey", icon: <Flame className="w-3.5 h-3.5" /> },
          { id: "experience", label: "Development", icon: <Briefcase className="w-3.5 h-3.5" /> },
          { id: "hackathon", label: "Hackathons", icon: <Trophy className="w-3.5 h-3.5" /> },
          { id: "education", label: "Education", icon: <GraduationCap className="w-3.5 h-3.5" /> },
          { id: "certification", label: "Certifications", icon: <Award className="w-3.5 h-3.5" /> },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => {
              setActiveCategory(tab.id);
              sound.playClick();
            }}
            onMouseEnter={() => sound.playHover()}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-medium transition-all ${
              activeCategory === tab.id
                ? "bg-gradient-to-r from-purple-600 to-cyan-500 text-white shadow-[0_0_15px_rgba(139,92,246,0.4)] border border-white/20"
                : "bg-white/[0.04] text-gray-400 hover:text-white border border-white/[0.08]"
            }`}
          >
            {tab.icon}
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Futuristic Timeline Structure */}
      <div className="relative max-w-4xl mx-auto">
        {/* Central Glowing Energy Conduit Beam */}
        <div className="absolute left-4 md:left-1/2 top-4 bottom-4 w-1 -translate-x-1/2 bg-gradient-to-b from-purple-500 via-cyan-400 to-fuchsia-500 rounded-full shadow-[0_0_15px_#8b5cf6]" />

        {/* Timeline Items */}
        <div className="space-y-12">
          {filteredItems.map((item, index) => {
            const isEven = index % 2 === 0;

            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 35 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className={`relative flex flex-col md:flex-row items-start ${
                  isEven ? "md:flex-row-reverse" : ""
                } gap-8 pl-10 md:pl-0`}
              >
                {/* Glowing Node on Timeline Beam */}
                <div className="absolute left-4 md:left-1/2 top-6 -translate-x-1/2 w-6 h-6 rounded-full bg-[#050014] border-2 border-cyan-400 flex items-center justify-center shadow-[0_0_15px_#22d3ee] z-20">
                  <div className="w-2 h-2 rounded-full bg-purple-400 animate-ping" />
                </div>

                {/* Content Card Container */}
                <div className="w-full md:w-[calc(50%-2rem)]">
                  <GlassCard glowColor={item.glowColor} className="p-7">
                    <div className="space-y-4">
                      {/* Header Badge & Year */}
                      <div className="flex items-center justify-between flex-wrap gap-2">
                        <GlassBadge variant={item.glowColor === "cyan" ? "cyan" : "purple"}>
                          {item.badge}
                        </GlassBadge>
                        <span className="flex items-center gap-1.5 text-xs font-mono text-cyan-300 bg-white/[0.04] px-2.5 py-1 rounded-md border border-white/5">
                          <Calendar className="w-3 h-3" />
                          {item.year}
                        </span>
                      </div>

                      {/* Title & Organization */}
                      <div>
                        <h3 className="text-lg sm:text-xl font-bold text-white">{item.title}</h3>
                        <div className="text-xs font-mono text-purple-300 mt-1 flex items-center gap-2">
                          <span>{item.organization}</span>
                          <span>•</span>
                          <span className="flex items-center gap-1 text-gray-400">
                            <MapPin className="w-3 h-3" /> {item.location}
                          </span>
                        </div>
                      </div>

                      {/* Description */}
                      <p className="text-xs sm:text-sm text-gray-300 leading-relaxed font-normal">
                        {item.description}
                      </p>

                      {/* Bullet Highlights */}
                      <div className="space-y-2 pt-2 border-t border-white/10">
                        {item.highlights.map((point, pIdx) => (
                          <div key={pIdx} className="flex items-start gap-2 text-xs text-gray-300">
                            <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" />
                            <span>{point}</span>
                          </div>
                        ))}
                      </div>

                      {/* Skills Tags */}
                      <div className="flex flex-wrap gap-1.5 pt-2">
                        {item.skills.map((skill) => (
                          <span
                            key={skill}
                            className="px-2 py-0.5 rounded text-[10px] font-mono bg-white/[0.03] text-gray-300 border border-white/5"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  </GlassCard>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

