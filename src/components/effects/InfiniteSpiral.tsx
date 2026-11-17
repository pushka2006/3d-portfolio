"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

interface InfiniteSpiralProps {
  className?: string;
}

export function InfiniteSpiral({ className = "" }: InfiniteSpiralProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    const container = containerRef.current;

    // Three.js Scene Setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      55,
      container.clientWidth / container.clientHeight,
      0.1,
      1500
    );
    camera.position.z = 360;

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // Create Spiral Tunnel with Logarithmic Rings & Particles
    const ringCount = 54;
    const pointsPerRing = 72;
    const totalPoints = ringCount * pointsPerRing;

    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(totalPoints * 3);
    const colors = new Float32Array(totalPoints * 3);

    const cyan = new THREE.Color("#00f0ff");
    const purple = new THREE.Color("#8b5cf6");
    const pink = new THREE.Color("#ec4899");

    let pIdx = 0;
    for (let r = 0; r < ringCount; r++) {
      const z = (r / ringCount) * -950 + 120;
      const radius = 25 + Math.pow(r / ringCount, 1.3) * 420;
      const baseAngle = r * 0.38; // Spiral twist offset

      for (let i = 0; i < pointsPerRing; i++) {
        const theta = (i / pointsPerRing) * Math.PI * 2 + baseAngle;
        positions[pIdx * 3] = Math.cos(theta) * radius;
        positions[pIdx * 3 + 1] = Math.sin(theta) * radius;
        positions[pIdx * 3 + 2] = z;

        // Color gradient along depth & angle
        const t = (r / ringCount + i / pointsPerRing) % 1;
        const col =
          t < 0.5
            ? cyan.clone().lerp(purple, t * 2)
            : purple.clone().lerp(pink, (t - 0.5) * 2);

        colors[pIdx * 3] = col.r;
        colors[pIdx * 3 + 1] = col.g;
        colors[pIdx * 3 + 2] = col.b;

        pIdx++;
      }
    }

    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));

    // Particle Texture for Soft Neon Glow
    const canvas = document.createElement("canvas");
    canvas.width = 64;
    canvas.height = 64;
    const ctx = canvas.getContext("2d");
    if (ctx) {
      const grad = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
      grad.addColorStop(0, "rgba(255,255,255,1)");
      grad.addColorStop(0.25, "rgba(0,240,255,0.9)");
      grad.addColorStop(0.65, "rgba(139,92,246,0.4)");
      grad.addColorStop(1, "rgba(0,0,0,0)");
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, 64, 64);
    }
    const texture = new THREE.CanvasTexture(canvas);

    const material = new THREE.PointsMaterial({
      size: 6.5,
      map: texture,
      transparent: true,
      blending: THREE.AdditiveBlending,
      vertexColors: true,
      depthWrite: false,
    });

    const spiralMesh = new THREE.Points(geometry, material);
    scene.add(spiralMesh);

    // Central Depth Horizon Rings
    const innerRingGeo = new THREE.RingGeometry(22, 24.5, 48);
    const innerRingMat = new THREE.MeshBasicMaterial({
      color: 0x00f0ff,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.55,
    });
    const innerRing = new THREE.Mesh(innerRingGeo, innerRingMat);
    innerRing.position.z = -800;
    scene.add(innerRing);

    // Mouse Interaction
    let targetRotX = 0;
    let targetRotY = 0;
    let mouseSpeedMultiplier = 1;

    const onMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = (e.clientX - (rect.left + rect.width / 2)) / (rect.width / 2);
      const y = (e.clientY - (rect.top + rect.height / 2)) / (rect.height / 2);

      targetRotX = y * 0.35;
      targetRotY = x * 0.35;
      mouseSpeedMultiplier = 1 + Math.min(Math.hypot(x, y), 1.5) * 0.8;
    };

    window.addEventListener("mousemove", onMouseMove, { passive: true });

    const onResize = () => {
      if (!container) return;
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    };

    window.addEventListener("resize", onResize);

    // Animation Loop
    let frameId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      frameId = requestAnimationFrame(animate);
      const elapsed = clock.getElapsedTime();

      // Smooth camera perspective damping towards mouse
      camera.rotation.x += (targetRotX - camera.rotation.x) * 0.06;
      camera.rotation.y += (targetRotY - camera.rotation.y) * 0.06;

      // Infinite spiral rotation & tunnel motion
      spiralMesh.rotation.z = elapsed * 0.28 * mouseSpeedMultiplier;

      // Subtle pulse on inner depth ring
      innerRing.scale.setScalar(1 + Math.sin(elapsed * 2.5) * 0.2);

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("resize", onResize);
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      geometry.dispose();
      material.dispose();
      innerRingGeo.dispose();
      innerRingMat.dispose();
      texture.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={`absolute inset-0 pointer-events-none overflow-hidden select-none opacity-60 mix-blend-screen ${className}`}
      style={{ zIndex: 1 }}
    />
  );
}
