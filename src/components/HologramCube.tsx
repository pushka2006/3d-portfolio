"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

export function HologramCube() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    const container = containerRef.current;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 1000);
    camera.position.set(0, 20, 110);
    camera.lookAt(0, 0, 0);

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(180, 180);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // Inner Glowing Core Cube
    const coreGeo = new THREE.BoxGeometry(22, 22, 22);
    const coreMat = new THREE.MeshBasicMaterial({
      color: 0x00f0ff,
      wireframe: true,
      transparent: true,
      opacity: 0.8,
    });
    const coreCube = new THREE.Mesh(coreGeo, coreMat);
    scene.add(coreCube);

    // Outer Translucent Glass Cube
    const outerGeo = new THREE.BoxGeometry(32, 32, 32);
    const outerMat = new THREE.MeshBasicMaterial({
      color: 0x8b5cf6,
      wireframe: true,
      transparent: true,
      opacity: 0.5,
    });
    const outerCube = new THREE.Mesh(outerGeo, outerMat);
    scene.add(outerCube);

    // Outer Orbit Rings
    const ringGeo1 = new THREE.TorusGeometry(38, 0.8, 8, 48);
    const ringMat1 = new THREE.MeshBasicMaterial({
      color: 0x06b6d4,
      transparent: true,
      opacity: 0.8,
    });
    const ring1 = new THREE.Mesh(ringGeo1, ringMat1);
    ring1.rotation.x = Math.PI / 2.5;
    scene.add(ring1);

    const ringGeo2 = new THREE.TorusGeometry(44, 0.6, 8, 48);
    const ringMat2 = new THREE.MeshBasicMaterial({
      color: 0xec4899,
      transparent: true,
      opacity: 0.6,
    });
    const ring2 = new THREE.Mesh(ringGeo2, ringMat2);
    ring2.rotation.x = -Math.PI / 3;
    ring2.rotation.y = Math.PI / 5;
    scene.add(ring2);

    let frameId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      frameId = requestAnimationFrame(animate);
      const elapsed = clock.getElapsedTime();

      // Floating gentle bobbing
      const bob = Math.sin(elapsed * 2) * 3;
      coreCube.position.y = bob;
      outerCube.position.y = bob;

      // Rotation
      coreCube.rotation.x = elapsed * 0.8;
      coreCube.rotation.y = elapsed * 1.0;

      outerCube.rotation.x = -elapsed * 0.5;
      outerCube.rotation.y = -elapsed * 0.6;

      ring1.rotation.z = elapsed * 0.9;
      ring2.rotation.z = -elapsed * 1.1;

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(frameId);
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      coreGeo.dispose();
      coreMat.dispose();
      outerGeo.dispose();
      outerMat.dispose();
      ringGeo1.dispose();
      ringMat1.dispose();
      ringGeo2.dispose();
      ringMat2.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div className="relative w-44 h-44 flex flex-col items-center justify-center select-none">
      {/* 3D Canvas */}
      <div ref={containerRef} className="relative z-10" />

      {/* Futuristic Pedestal Base (matching the image) */}
      <div className="absolute bottom-2 w-36 h-6 rounded-full bg-gradient-to-t from-[#060416] to-[#1a113d] border border-cyan-400/50 shadow-[0_0_20px_rgba(6,182,212,0.4)] flex items-center justify-center">
        {/* Inner Glowing Ring */}
        <div className="w-28 h-3 rounded-full border border-purple-500/70 shadow-[0_0_10px_#8b5cf6]" />
      </div>

      {/* Atmospheric glow */}
      <div className="absolute inset-0 bg-cyan-500/10 rounded-full blur-2xl pointer-events-none" />
    </div>
  );
}

