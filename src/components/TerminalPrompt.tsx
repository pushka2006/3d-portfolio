"use client";

import { useState } from "react";
import { sound } from "@/utils/sound";

export function TerminalPrompt() {
  const [inputVal, setInputVal] = useState("");
  const [outputLines, setOutputLines] = useState<string[]>([
    "Building something extraordinary...",
    "Let's create the future together. 🚀",
  ]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      sound.playClick();
      const cmd = inputVal.trim().toLowerCase();
      const newOutputs = [...outputLines, `> pushkar@omega-nexus:~$ ${inputVal}`];

      if (cmd === "help") {
        newOutputs.push("Available: about, skills, projects, contact, clear");
      } else if (cmd === "about") {
        newOutputs.push("Pushkar Balyan: Full Stack Engineer & AI Specialist from India.");
      } else if (cmd === "skills") {
        newOutputs.push("Core: Next.js, React, Python, C++, TensorFlow, Three.js, Docker, AWS");
      } else if (cmd === "projects") {
        newOutputs.push("1. Omega Nexus AI OS  2. MediaSphere AI  3. EcoGrid AI");
      } else if (cmd === "contact") {
        newOutputs.push("Transmission channel: pushkarbalyan@gmail.com");
      } else if (cmd === "clear") {
        setOutputLines([]);
        setInputVal("");
        return;
      } else if (cmd !== "") {
        newOutputs.push(`Command '${cmd}' recognized by Nexus Core.`);
      }

      setOutputLines(newOutputs.slice(-4));
      setInputVal("");
    }
  };

  return (
    <div className="w-full max-w-sm rounded-xl bg-black/60 border border-emerald-500/30 p-2.5 font-mono text-[11px] text-emerald-400 backdrop-blur-md shadow-[0_0_15px_rgba(16,185,129,0.15)]">
      <div className="flex items-center gap-1.5 text-emerald-500/80 mb-1 border-b border-emerald-500/20 pb-1 text-[10px]">
        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
        <span>pushkar@omega-nexus:~$</span>
      </div>

      <div className="space-y-0.5 leading-snug text-emerald-300">
        {outputLines.map((line, idx) => (
          <div key={idx} className="line-clamp-1">
            {line}
          </div>
        ))}
      </div>

      <div className="flex items-center gap-1 mt-1 text-emerald-400">
        <span>&gt;</span>
        <input
          type="text"
          value={inputVal}
          onChange={(e) => setInputVal(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="type 'help'..."
          className="bg-transparent border-none outline-none text-emerald-300 placeholder-emerald-600/60 w-full text-[11px] font-mono"
        />
      </div>
    </div>
  );
}

