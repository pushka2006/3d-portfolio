"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

export default function CosmicBackground() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    const container = containerRef.current;

    // Three.js Scene Setup
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x030014, 0.0012);

    const camera = new THREE.PerspectiveCamera(
      60,
      window.innerWidth / window.innerHeight,
      0.1,
      2000
    );
    camera.position.z = 1000;

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // Particle Geometry: Cosmic Stars & Energy Dust
    const particleCount = 1200;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    const sizes = new Float32Array(particleCount);

    const colorPalette = [
      new THREE.Color("#8b5cf6"), // purple
      new THREE.Color("#06b6d4"), // cyan
      new THREE.Color("#ec4899"), // pink
      new THREE.Color("#3b82f6"), // blue
      new THREE.Color("#ffffff"), // white
    ];

    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 2400;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 2400;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 1800;

      const col = colorPalette[Math.floor(Math.random() * colorPalette.length)];
      colors[i * 3] = col.r;
      colors[i * 3 + 1] = col.g;
      colors[i * 3 + 2] = col.b;

      sizes[i] = Math.random() * 4 + 1;
    }

    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));
    geometry.setAttribute("size", new THREE.BufferAttribute(sizes, 1));

    // Custom Canvas Circular Particle Texture
    const canvas = document.createElement("canvas");
    canvas.width = 32;
    canvas.height = 32;
    const ctx = canvas.getContext("2d");
    if (ctx) {
      const gradient = ctx.createRadialGradient(16, 16, 0, 16, 16, 16);
      gradient.addColorStop(0, "rgba(255,255,255,1)");
      gradient.addColorStop(0.2, "rgba(200,240,255,0.8)");
      gradient.addColorStop(0.6, "rgba(139,92,246,0.2)");
      gradient.addColorStop(1, "rgba(0,0,0,0)");
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, 32, 32);
    }
    const texture = new THREE.CanvasTexture(canvas);

    const material = new THREE.PointsMaterial({
      size: 6,
      map: texture,
      transparent: true,
      blending: THREE.AdditiveBlending,
      vertexColors: true,
      depthWrite: false,
    });

    const particles = new THREE.Points(geometry, material);
    scene.add(particles);

    // Subtle 3D Wireframe Floating Polyhedrons (Cyber Artifacts)
    const icosahedronGeo = new THREE.IcosahedronGeometry(80, 1);
    const wireframeMat = new THREE.MeshBasicMaterial({
      color: 0x7c3aed,
      wireframe: true,
      transparent: true,
      opacity: 0.15,
    });
    const poly1 = new THREE.Mesh(icosahedronGeo, wireframeMat);
    poly1.position.set(-450, 200, -200);
    scene.add(poly1);

    const torusGeo = new THREE.TorusGeometry(120, 3, 16, 100);
    const torusMat = new THREE.MeshBasicMaterial({
      color: 0x06b6d4,
      wireframe: true,
      transparent: true,
      opacity: 0.12,
    });
    const torus = new THREE.Mesh(torusGeo, torusMat);
    torus.position.set(500, -250, -300);
    torus.rotation.x = Math.PI / 3;
    scene.add(torus);

    // Mouse Tracking for Interactive Parallax
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    const onMouseMove = (event: MouseEvent) => {
      mouseX = (event.clientX - window.innerWidth / 2) * 0.4;
      mouseY = (event.clientY - window.innerHeight / 2) * 0.4;

      // Update CSS variables for global card illumination
      document.documentElement.style.setProperty("--mouse-x", `${event.clientX}px`);
      document.documentElement.style.setProperty("--mouse-y", `${event.clientY}px`);
    };

    window.addEventListener("mousemove", onMouseMove, { passive: true });

    // Handle Window Resize
    const onResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener("resize", onResize);

    // Animation Loop
    let animationFrameId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Smooth camera interpolation towards mouse
      targetX += (mouseX - targetX) * 0.03;
      targetY += (mouseY - targetY) * 0.03;

      camera.position.x = targetX * 0.6;
      camera.position.y = -targetY * 0.6;
      camera.lookAt(scene.position);

      // Rotate cosmic particle galaxy
      particles.rotation.y = elapsedTime * 0.03;
      particles.rotation.x = Math.sin(elapsedTime * 0.02) * 0.08;

      // Rotate floating geometric cyber artifacts
      poly1.rotation.x = elapsedTime * 0.15;
      poly1.rotation.y = elapsedTime * 0.2;
      torus.rotation.z = elapsedTime * 0.1;
      torus.rotation.y = elapsedTime * 0.12;

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("resize", onResize);
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      geometry.dispose();
      material.dispose();
      icosahedronGeo.dispose();
      wireframeMat.dispose();
      torusGeo.dispose();
      torusMat.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {/* 3D WebGL Canvas Layer */}
      <div ref={containerRef} className="absolute inset-0 opacity-80" />

      {/* Cyberpunk Radial Atmospheric Glows */}
      <div className="absolute -top-40 -left-40 w-96 md:w-[650px] h-96 md:h-[650px] rounded-full bg-purple-600/15 blur-[140px] pointer-events-none" />
      <div className="absolute top-1/3 -right-40 w-96 md:w-[600px] h-96 md:h-[600px] rounded-full bg-cyan-500/12 blur-[150px] pointer-events-none" />
      <div className="absolute bottom-10 left-1/4 w-80 md:w-[500px] h-80 md:h-[500px] rounded-full bg-fuchsia-600/10 blur-[140px] pointer-events-none" />

      {/* Micro Cyber Grid lines */}
      <div className="absolute inset-0 cyber-grid-bg opacity-30 pointer-events-none" />

      {/* Subtle Anime Vignette & Scanline Texture */}
      <div className="absolute inset-0 scanlines opacity-10 pointer-events-none" />
    </div>
  );
}

