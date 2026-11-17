"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

export function HologramGlobe() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    const container = containerRef.current;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, 1, 0.1, 1000);
    camera.position.z = 100;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(72, 72);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // Globe Sphere Wireframe
    const sphereGeo = new THREE.SphereGeometry(32, 16, 12);
    const sphereMat = new THREE.MeshBasicMaterial({
      color: 0x06b6d4,
      wireframe: true,
      transparent: true,
      opacity: 0.65,
    });
    const sphere = new THREE.Mesh(sphereGeo, sphereMat);
    scene.add(sphere);

    // Outer Orbit Ring 1
    const ringGeo1 = new THREE.TorusGeometry(42, 0.8, 8, 48);
    const ringMat1 = new THREE.MeshBasicMaterial({
      color: 0x8b5cf6,
      transparent: true,
      opacity: 0.8,
    });
    const ring1 = new THREE.Mesh(ringGeo1, ringMat1);
    ring1.rotation.x = Math.PI / 3;
    scene.add(ring1);

    // Outer Orbit Ring 2
    const ringGeo2 = new THREE.TorusGeometry(46, 0.6, 8, 48);
    const ringMat2 = new THREE.MeshBasicMaterial({
      color: 0x00f0ff,
      transparent: true,
      opacity: 0.7,
    });
    const ring2 = new THREE.Mesh(ringGeo2, ringMat2);
    ring2.rotation.x = -Math.PI / 4;
    ring2.rotation.y = Math.PI / 6;
    scene.add(ring2);

    let frameId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      frameId = requestAnimationFrame(animate);
      const elapsed = clock.getElapsedTime();

      sphere.rotation.y = elapsed * 0.4;
      sphere.rotation.x = Math.sin(elapsed * 0.2) * 0.15;

      ring1.rotation.z = elapsed * 0.5;
      ring2.rotation.z = -elapsed * 0.6;

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(frameId);
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      sphereGeo.dispose();
      sphereMat.dispose();
      ringGeo1.dispose();
      ringMat1.dispose();
      ringGeo2.dispose();
      ringMat2.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div className="relative w-16 h-16 sm:w-18 sm:h-18 flex items-center justify-center shrink-0">
      <div ref={containerRef} className="relative z-10" />
      <div className="absolute inset-0 bg-cyan-500/10 rounded-full blur-md pointer-events-none" />
    </div>
  );
}

