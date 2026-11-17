"use client";

import { memo } from "react";

const LAYER_1_ITEMS = [
  "0x7F // NEXUS_CORE",
  "▲ Next.js AppRouter",
  "λ Python 3.12",
  "⚛️ React 18 Concurrent",
  "tensor.matmul(dim=1536)",
  "PB.systems.online()",
  "HLSL_Shader_Pass",
  "Async_I/O EventLoop",
  "Latency // 12ms",
  "Unreal_Lumen_GI",
  "Three.WebGL_Renderer",
  "FastAPI_WebSockets",
  "PostgreSQL_ACID",
  "Docker_MicroVM",
  "Vector_Cosine_Sim: 0.984",
  "Autonomous_MultiAgent",
];

const LAYER_2_ITEMS = [
  "// QUANTUM_ENTROPY: 99.8%",
  "CUDA_TENSORS: 16384",
  "LangGraph_State_DAG",
  "Redis_Cache_Hit: 99.2%",
  "Tailwind_CSS_JIT",
  "Framer_Spring_Physics",
  "Lenis_Smooth_Scroll",
  "WebAudio_Synthesizer",
  "ChromaDB_Embeddings",
  "PyTorch_Transformer",
  "GLSL_Fragment_Shader",
  "TypeScript_Strict: true",
  "Civic_Governance_AI",
  "MediaSphere_Pipeline",
  "EcoGrid_Forecast_72h",
  "Chronos_Voxel_Terrain",
];

const LAYER_3_ITEMS = [
  "{ status: 200, auth: 'PB_NEXUS' }",
  "const agent = new AutonomousCore();",
  "optimizer.zero_grad(); loss.backward();",
  "window.__LENIS__.raf(time);",
  "mesh.rotation.y += delta * 0.5;",
  "await db.analytics.aggregate([...]);",
  "channel.broadcast('TELEMETRY_SYNC');",
  "gl_FragColor = vec4(neonColor, 1.0);",
  "import { pipeline } from '@ai/core';",
  "export default function NexusPlatform();",
  "const embedding = await embed(query);",
  "raycaster.setFromCamera(mouse, camera);",
];

function DriftWallComponent() {
  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden select-none"
      style={{
        perspective: "1200px",
        perspectiveOrigin: "50% 30%",
      }}
    >
      {/* 3D Tilted Drift Surface */}
      <div
        className="absolute -inset-[30%] opacity-[0.28] flex justify-between gap-12 md:gap-20 pointer-events-none"
        style={{
          transform: "rotateX(16deg) rotateY(-8deg) rotateZ(-5deg)",
          transformStyle: "preserve-3d",
        }}
      >
        {/* Stream 1 - Drifts Upwards slowly */}
        <div className="flex-1 flex flex-col gap-6 animate-drift-up text-[11px] sm:text-xs font-mono text-cyan-400">
          {[...LAYER_1_ITEMS, ...LAYER_1_ITEMS].map((item, idx) => (
            <div
              key={`s1-${idx}`}
              className="px-4 py-2 rounded-lg border border-cyan-500/20 bg-cyan-950/20 backdrop-blur-xs whitespace-nowrap shadow-[0_0_15px_rgba(6,182,212,0.1)]"
            >
              {item}
            </div>
          ))}
        </div>

        {/* Stream 2 - Drifts Downwards at medium speed */}
        <div className="flex-1 flex flex-col gap-8 animate-drift-down text-[11px] sm:text-xs font-mono text-purple-400">
          {[...LAYER_2_ITEMS, ...LAYER_2_ITEMS].map((item, idx) => (
            <div
              key={`s2-${idx}`}
              className="px-4 py-2.5 rounded-lg border border-purple-500/25 bg-purple-950/25 backdrop-blur-xs whitespace-nowrap shadow-[0_0_15px_rgba(139,92,246,0.1)]"
            >
              {item}
            </div>
          ))}
        </div>

        {/* Stream 3 - Drifts Upwards at higher velocity */}
        <div className="flex-1 flex flex-col gap-7 animate-drift-up-fast text-[11px] sm:text-xs font-mono text-pink-400">
          {[...LAYER_3_ITEMS, ...LAYER_3_ITEMS].map((item, idx) => (
            <div
              key={`s3-${idx}`}
              className="px-4 py-2 rounded-lg border border-pink-500/20 bg-pink-950/20 backdrop-blur-xs whitespace-nowrap shadow-[0_0_15px_rgba(236,72,153,0.1)]"
            >
              {item}
            </div>
          ))}
        </div>

        {/* Stream 4 (Desktop) - Drifts Downwards */}
        <div className="hidden lg:flex flex-1 flex-col gap-8 animate-drift-down text-[11px] sm:text-xs font-mono text-emerald-400">
          {[...LAYER_1_ITEMS, ...LAYER_1_ITEMS].map((item, idx) => (
            <div
              key={`s4-${idx}`}
              className="px-4 py-2.5 rounded-lg border border-emerald-500/20 bg-emerald-950/20 backdrop-blur-xs whitespace-nowrap shadow-[0_0_15px_rgba(16,185,129,0.1)]"
            >
              {item}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export const DriftWall = memo(DriftWallComponent);

