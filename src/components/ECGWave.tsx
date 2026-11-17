"use client";

import { useEffect, useRef } from "react";

export function ECGWave() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    let offset = 0;

    const render = () => {
      animationId = requestAnimationFrame(render);
      const width = canvas.width;
      const height = canvas.height;
      const midY = height / 2;

      ctx.clearRect(0, 0, width, height);

      ctx.beginPath();
      ctx.lineWidth = 2;
      ctx.strokeStyle = "#00f0ff";
      ctx.shadowColor = "#00f0ff";
      ctx.shadowBlur = 8;

      offset += 2;
      if (offset > width) offset = 0;

      for (let x = 0; x < width; x++) {
        // Base heartbeat pulse pattern
        const pos = (x + offset) % width;
        let y = midY;

        if (pos > 30 && pos < 40) {
          y = midY - 6;
        } else if (pos >= 40 && pos < 50) {
          y = midY + 12;
        } else if (pos >= 50 && pos < 62) {
          y = midY - 18;
        } else if (pos >= 62 && pos < 72) {
          y = midY + 8;
        } else if (pos >= 72 && pos < 85) {
          y = midY - 3;
        }

        if (x === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
      }

      ctx.stroke();
    };

    render();

    return () => cancelAnimationFrame(animationId);
  }, []);

  return (
    <canvas
      ref={canvasRef}
      width={120}
      height={36}
      className="w-28 h-9 opacity-90"
    />
  );
}

