"use client";

import { useEffect, useRef } from "react";

interface Spark {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  color: string;
  size: number;
}

interface Point {
  x: number;
  y: number;
  time: number;
}

interface Shockwave {
  x: number;
  y: number;
  radius: number;
  maxRadius: number;
  alpha: number;
  color: string;
}

export function ElectricCursor() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let targetX = mouseX;
    let targetY = mouseY;
    let hasMoved = false;
    let lastActiveTime = Date.now();

    const trail: Point[] = [];
    const sparks: Spark[] = [];
    const shockwaves: Shockwave[] = [];
    let isHoveringInteractive = false;
    let hoveredElement: DOMRect | null = null;
    let isMouseDown = false;

    // Handle Resize
    const onResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", onResize);

    // Mouse Tracking
    const onMouseMove = (e: MouseEvent) => {
      hasMoved = true;
      lastActiveTime = Date.now();
      targetX = e.clientX;
      targetY = e.clientY;

      // Check for interactive targets
      const target = e.target as HTMLElement | null;
      const interactiveEl = target?.closest<HTMLElement>(
        "button, a, input, textarea, [data-interactive='true'], .glass-card, [role='button'], .cursor-pointer"
      );

      if (interactiveEl) {
        isHoveringInteractive = true;
        hoveredElement = interactiveEl.getBoundingClientRect();
      } else {
        isHoveringInteractive = false;
        hoveredElement = null;
      }

      // Spawn movement sparks on rapid motion
      const speed = Math.hypot(e.movementX, e.movementY);
      if (speed > 3) {
        const count = Math.min(Math.floor(speed / 3), 8);
        for (let i = 0; i < count; i++) {
          sparks.push({
            x: targetX,
            y: targetY,
            vx: (Math.random() - 0.5) * 10 + e.movementX * 0.25,
            vy: (Math.random() - 0.5) * 10 + e.movementY * 0.25,
            life: 1,
            maxLife: Math.random() * 26 + 18,
            color: Math.random() > 0.4 ? "#00f0ff" : "#ec4899",
            size: Math.random() * 3.2 + 1.5,
          });
        }
      }
    };

    const onMouseDown = () => {
      isMouseDown = true;
      lastActiveTime = Date.now();
      // High-voltage burst on click
      shockwaves.push({
        x: targetX,
        y: targetY,
        radius: 6,
        maxRadius: 85,
        alpha: 1,
        color: "#00f0ff",
      });

      // Massive explosion of 40 plasma sparks
      for (let i = 0; i < 40; i++) {
        const angle = Math.random() * Math.PI * 2;
        const spd = Math.random() * 12 + 5;
        sparks.push({
          x: targetX,
          y: targetY,
          vx: Math.cos(angle) * spd,
          vy: Math.sin(angle) * spd,
          life: 1,
          maxLife: Math.random() * 35 + 25,
          color: Math.random() > 0.5 ? "#00f0ff" : "#c084fc",
          size: Math.random() * 4 + 1.8,
        });
      }
    };

    const onMouseUp = () => {
      isMouseDown = false;
      lastActiveTime = Date.now();
    };

    // Mobile Phone Touch Handling
    const onTouchStart = (e: TouchEvent) => {
      if (e.touches && e.touches.length > 0) {
        hasMoved = true;
        isMouseDown = true;
        lastActiveTime = Date.now();
        const touch = e.touches[0];
        targetX = touch.clientX;
        targetY = touch.clientY;
        mouseX = touch.clientX;
        mouseY = touch.clientY;

        // Instant high-voltage shockwave under finger
        shockwaves.push({
          x: targetX,
          y: targetY,
          radius: 8,
          maxRadius: 80,
          alpha: 1,
          color: "#00f0ff",
        });

        // 35 plasma sparks burst on mobile tap
        for (let i = 0; i < 35; i++) {
          const angle = Math.random() * Math.PI * 2;
          const spd = Math.random() * 11 + 4;
          sparks.push({
            x: targetX,
            y: targetY,
            vx: Math.cos(angle) * spd,
            vy: Math.sin(angle) * spd,
            life: 1,
            maxLife: Math.random() * 32 + 20,
            color: Math.random() > 0.5 ? "#00f0ff" : "#c084fc",
            size: Math.random() * 4 + 1.8,
          });
        }
      }
    };

    const onTouchMove = (e: TouchEvent) => {
      if (e.touches && e.touches.length > 0) {
        hasMoved = true;
        lastActiveTime = Date.now();
        const touch = e.touches[0];
        const dx = touch.clientX - targetX;
        const dy = touch.clientY - targetY;
        targetX = touch.clientX;
        targetY = touch.clientY;

        // Spawn rapid sparks on drag
        const speed = Math.hypot(dx, dy);
        if (speed > 2) {
          const count = Math.min(Math.floor(speed / 3), 8);
          for (let i = 0; i < count; i++) {
            sparks.push({
              x: targetX,
              y: targetY,
              vx: (Math.random() - 0.5) * 8 + dx * 0.25,
              vy: (Math.random() - 0.5) * 8 + dy * 0.25,
              life: 1,
              maxLife: Math.random() * 24 + 16,
              color: Math.random() > 0.4 ? "#00f0ff" : "#ec4899",
              size: Math.random() * 3.2 + 1.5,
            });
          }
        }
      }
    };

    const onTouchEnd = () => {
      isMouseDown = false;
      lastActiveTime = Date.now();
    };

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    window.addEventListener("mousedown", onMouseDown);
    window.addEventListener("mouseup", onMouseUp);

    // Register mobile touch listeners
    window.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchmove", onTouchMove, { passive: true });
    window.addEventListener("touchend", onTouchEnd, { passive: true });

    // High-Voltage Fractal Branching Lightning Generator
    const drawBolt = (
      x1: number,
      y1: number,
      x2: number,
      y2: number,
      displace: number,
      depth: number,
      allowBranch: boolean = true
    ) => {
      if (depth === 0) {
        ctx.lineTo(x2, y2);
        return;
      }

      const midX = (x1 + x2) / 2;
      const midY = (y1 + y2) / 2;
      const dx = y2 - y1;
      const dy = -(x2 - x1);
      const len = Math.hypot(dx, dy) || 1;
      const nx = dx / len;
      const ny = dy / len;

      const jitter = (Math.random() - 0.5) * displace;
      const newMidX = midX + nx * jitter;
      const newMidY = midY + ny * jitter;

      // Draw left half
      drawBolt(x1, y1, newMidX, newMidY, displace * 0.55, depth - 1, allowBranch);

      // Random sub-branch tendril
      if (allowBranch && depth >= 2 && Math.random() < 0.3) {
        const branchAngle = Math.atan2(y2 - y1, x2 - x1) + (Math.random() - 0.5) * 1.2;
        const branchLen = len * (0.35 + Math.random() * 0.3);
        const bx = newMidX + Math.cos(branchAngle) * branchLen;
        const by = newMidY + Math.sin(branchAngle) * branchLen;

        ctx.save();
        ctx.beginPath();
        ctx.moveTo(newMidX, newMidY);
        drawBolt(newMidX, newMidY, bx, by, displace * 0.45, depth - 1, false);
        ctx.stroke();
        ctx.restore();
      }

      // Draw right half
      drawBolt(newMidX, newMidY, x2, y2, displace * 0.55, depth - 1, allowBranch);
    };

    // Dual-Layer Hot-Core Lightning Renderer
    const renderLightning = (
      x1: number,
      y1: number,
      x2: number,
      y2: number,
      displace: number,
      depth: number,
      glowColor: string,
      glowWidth: number = 3.5,
      coreWidth: number = 1.5,
      allowBranch: boolean = true
    ) => {
      // Pass 1: Outer Neon Aura Glow
      ctx.save();
      ctx.shadowColor = glowColor;
      ctx.shadowBlur = 22;
      ctx.strokeStyle = glowColor;
      ctx.lineWidth = glowWidth;
      ctx.beginPath();
      ctx.moveTo(x1, y1);
      drawBolt(x1, y1, x2, y2, displace, depth, allowBranch);
      ctx.stroke();
      ctx.restore();

      // Pass 2: White-Hot Plasma Core
      ctx.save();
      ctx.shadowColor = "#ffffff";
      ctx.shadowBlur = 8;
      ctx.strokeStyle = "#ffffff";
      ctx.lineWidth = coreWidth;
      ctx.beginPath();
      ctx.moveTo(x1, y1);
      drawBolt(x1, y1, x2, y2, displace, depth, false);
      ctx.stroke();
      ctx.restore();
    };

    // Animation Loop
    let animId: number;
    let pulseAngle = 0;

    const render = () => {
      animId = requestAnimationFrame(render);
      ctx.clearRect(0, 0, width, height);

      pulseAngle += 0.08;

      // Smooth cursor lerp
      mouseX += (targetX - mouseX) * 0.5;
      mouseY += (targetY - mouseY) * 0.5;

      // Add to trail
      trail.push({ x: mouseX, y: mouseY, time: Date.now() });
      if (trail.length > 14) trail.shift();

      // 1. Double-Helix Lightning Trail
      if (trail.length > 2) {
        for (let i = 0; i < trail.length - 1; i++) {
          const p1 = trail[i];
          const p2 = trail[i + 1];
          const dist = Math.hypot(p2.x - p1.x, p2.y - p1.y);
          if (dist > 1.5) {
            const alpha = (i / trail.length) * 0.95;
            const glowCol = i % 2 === 0 ? `rgba(0, 240, 255, ${alpha})` : `rgba(217, 70, 239, ${alpha})`;
            renderLightning(
              p1.x,
              p1.y,
              p2.x,
              p2.y,
              14,
              2,
              glowCol,
              isMouseDown ? 4.5 : 3.2,
              1.6,
              true
            );
          }
        }
      }

      // 2. Idle Tesla-Coil Crackling around cursor reticle
      const timeSinceActive = Date.now() - lastActiveTime;
      const isRecentlyActive = timeSinceActive < 2400;

      if (hasMoved && isRecentlyActive) {
        const crackleCount = isHoveringInteractive ? 8 : 6;
        for (let c = 0; c < crackleCount; c++) {
          const angle = Math.random() * Math.PI * 2;
          const dist = Math.random() * (isHoveringInteractive ? 36 : 24) + 10;
          const endX = mouseX + Math.cos(angle) * dist;
          const endY = mouseY + Math.sin(angle) * dist;
          const col = Math.random() > 0.35 ? "#00f0ff" : "#d946ef";
          renderLightning(mouseX, mouseY, endX, endY, 10, 2, col, 2.5, 1.2, false);
        }
      }

      // 3. Magnetic Multi-Point Arcing to Hovered Interactive Elements
      if (isHoveringInteractive && hoveredElement) {
        const rect = hoveredElement;

        // Target corners and edges of the hovered element
        const targets = [
          { x: Math.max(rect.left, Math.min(mouseX, rect.right)), y: Math.max(rect.top, Math.min(mouseY, rect.bottom)) },
          { x: rect.left + Math.random() * rect.width, y: rect.top },
          { x: rect.left + Math.random() * rect.width, y: rect.bottom },
          { x: rect.left, y: rect.top + Math.random() * rect.height },
        ];

        targets.forEach((tgt, idx) => {
          const col = idx % 2 === 0 ? "#00f0ff" : "#ec4899";
          renderLightning(mouseX, mouseY, tgt.x, tgt.y, 20, 3, col, 3.8, 1.8, true);

          // Impact sparks at the target edge
          if (Math.random() > 0.6) {
            sparks.push({
              x: tgt.x,
              y: tgt.y,
              vx: (Math.random() - 0.5) * 6,
              vy: (Math.random() - 0.5) * 6,
              life: 1,
              maxLife: 18,
              color: col,
              size: 2.5,
            });
          }
        });
      }

      // 4. Update & Draw Shockwaves with Radial Lightning Discharge
      for (let i = shockwaves.length - 1; i >= 0; i--) {
        const sw = shockwaves[i];
        sw.radius += 4.5;
        sw.alpha = 1 - sw.radius / sw.maxRadius;

        if (sw.radius >= sw.maxRadius) {
          shockwaves.splice(i, 1);
          continue;
        }

        ctx.save();
        ctx.beginPath();
        ctx.arc(sw.x, sw.y, sw.radius, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(0, 240, 255, ${sw.alpha * 0.9})`;
        ctx.lineWidth = 3.2;
        ctx.shadowColor = sw.color;
        ctx.shadowBlur = 20;
        ctx.stroke();

        // 6 Radial lightning discharges bursting out with the shockwave
        for (let r = 0; r < 6; r++) {
          const angle = (r / 6) * Math.PI * 2 + pulseAngle;
          const r1 = sw.radius * 0.6;
          const r2 = sw.radius * 1.15;
          const sx = sw.x + Math.cos(angle) * r1;
          const sy = sw.y + Math.sin(angle) * r1;
          const ex = sw.x + Math.cos(angle) * r2;
          const ey = sw.y + Math.sin(angle) * r2;
          renderLightning(sx, sy, ex, ey, 8, 2, "#00f0ff", 2.5, 1.2, false);
        }
        ctx.restore();
      }

      // 5. Update & Draw Glowing Sparks
      for (let i = sparks.length - 1; i >= 0; i--) {
        const s = sparks[i];
        s.x += s.vx;
        s.y += s.vy;
        s.vx *= 0.93;
        s.vy *= 0.93;
        s.life -= 1 / s.maxLife;

        if (s.life <= 0) {
          sparks.splice(i, 1);
          continue;
        }

        ctx.save();
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.size * s.life, 0, Math.PI * 2);
        ctx.fillStyle = s.color;
        ctx.shadowColor = s.color;
        ctx.shadowBlur = 14;
        ctx.fill();
        ctx.restore();
      }

      // 6. Blinding Electric Cursor Core Reticle
      if (hasMoved && isRecentlyActive && mouseX > 0 && mouseY > 0) {
        ctx.save();

        const auraRadius = isHoveringInteractive ? 34 : 24;
        const pulse = Math.sin(pulseAngle) * 4.5;

        // Intense corona energy aura
        const auraGrad = ctx.createRadialGradient(
          mouseX,
          mouseY,
          0,
          mouseX,
          mouseY,
          auraRadius + pulse
        );
        auraGrad.addColorStop(0, "rgba(255, 255, 255, 0.8)");
        auraGrad.addColorStop(0.2, "rgba(0, 240, 255, 0.6)");
        auraGrad.addColorStop(0.6, "rgba(139, 92, 246, 0.35)");
        auraGrad.addColorStop(1, "rgba(0, 0, 0, 0)");
        ctx.fillStyle = auraGrad;
        ctx.beginPath();
        ctx.arc(mouseX, mouseY, auraRadius + pulse, 0, Math.PI * 2);
        ctx.fill();

        // High-contrast Reticle Crosshairs
        ctx.strokeStyle = isHoveringInteractive ? "#ec4899" : "#00f0ff";
        ctx.lineWidth = 1.8;
        ctx.shadowColor = "#00f0ff";
        ctx.shadowBlur = 15;

        const reticleSize = isHoveringInteractive ? 16 : 11;
        ctx.beginPath();
        ctx.moveTo(mouseX - reticleSize, mouseY);
        ctx.lineTo(mouseX + reticleSize, mouseY);
        ctx.moveTo(mouseX, mouseY - reticleSize);
        ctx.lineTo(mouseX, mouseY + reticleSize);
        ctx.stroke();

        // Center Blinding White Core
        ctx.beginPath();
        ctx.arc(mouseX, mouseY, isMouseDown ? 7 : 4.5, 0, Math.PI * 2);
        ctx.fillStyle = "#ffffff";
        ctx.shadowColor = "#00f0ff";
        ctx.shadowBlur = 18;
        ctx.fill();
        ctx.restore();
      }
    };

    render();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mouseup", onMouseUp);
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("touchend", onTouchEnd);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-[99999] overflow-hidden"
      style={{ willChange: "transform" }}
    />
  );
}
