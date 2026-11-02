
"use client";

import { useEffect, useRef } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";
import gsap from "gsap";

function LuxuryHouse() {
  const houseRef = useRef<THREE.Group>(null);

  useEffect(() => {
    if (!houseRef.current) return;

    const tween = gsap.fromTo(
      houseRef.current.scale,
      { x: 0.82, y: 0.82, z: 0.82 },
      {
        x: 1,
        y: 1,
        z: 1,
        duration: 1.8,
        ease: "power3.out",
      }
    );

    const rotation = gsap.to(houseRef.current.rotation, {
      y: 0.12,
      duration: 5,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
    });

    return () => {
      tween.kill();
      rotation.kill();
    };
  }, []);

  const dark = "#24272b";
  const concrete = "#777b80";
  const glass = "#253d48";
  const gold = "#e8a05a";

  return (
    <group ref={houseRef} position={[0, -0.5, 0]}>
      {/* Property foundation */}
      <mesh position={[0, -0.12, 0]} receiveShadow>
        <boxGeometry args={[5.8, 0.22, 4.4]} />
        <meshStandardMaterial color="#34383a" />
      </mesh>

      {/* Lower floor */}
      <mesh position={[0, 0.65, 0]}>
        <boxGeometry args={[4.7, 1.45, 3.5]} />
        <meshStandardMaterial color={dark} roughness={0.45} />
      </mesh>

      {/* Upper floor */}
      <mesh position={[0.25, 2.1, -0.15]}>
        <boxGeometry args={[4.2, 1.45, 3.1]} />
        <meshStandardMaterial color="#30343a" roughness={0.4} />
      </mesh>

      {/* Roof */}
      <mesh position={[0.25, 2.88, -0.15]}>
        <boxGeometry args={[4.4, 0.12, 3.3]} />
        <meshStandardMaterial color="#a4a6a8" metalness={0.3} />
      </mesh>

      {/* Upper glass windows */}
      <mesh position={[0.25, 2.1, 1.42]}>
        <boxGeometry args={[3.65, 1.05, 0.035]} />
        <meshStandardMaterial
          color={glass}
          metalness={0.65}
          roughness={0.12}
          emissive={gold}
          emissiveIntensity={0.25}
        />
      </mesh>

      {/* Lower glass windows */}
      <mesh position={[0.2, 0.62, 1.77]}>
        <boxGeometry args={[3.8, 1.05, 0.035]} />
        <meshStandardMaterial
          color={glass}
          metalness={0.6}
          roughness={0.15}
          emissive="#d88b4d"
          emissiveIntensity={0.35}
        />
      </mesh>

      {/* Window frames */}
      {[-1.5, -0.5, 0.5, 1.5].map((x) => (
        <mesh key={x} position={[x, 2.1, 1.46]}>
          <boxGeometry args={[0.035, 1.15, 0.06]} />
          <meshStandardMaterial color="#b6b7b5" />
        </mesh>
      ))}

      {/* Balcony */}
      <mesh position={[0.3, 1.35, 2.05]}>
        <boxGeometry args={[4.4, 0.08, 0.8]} />
        <meshStandardMaterial color="#a6a7a4" />
      </mesh>

      {/* Terrace stairs */}
      {Array.from({ length: 5 }).map((_, i) => (
        <mesh
          key={i}
          position={[0, -0.03 + i * 0.13, 2.5 + i * 0.25]}
        >
          <boxGeometry args={[1.8, 0.13, 0.28]} />
          <meshStandardMaterial color={concrete} />
        </mesh>
      ))}

      {/* Architectural side wall */}
      <mesh position={[-2.05, 2.05, -0.1]}>
        <boxGeometry args={[0.18, 1.5, 3.1]} />
        <meshStandardMaterial color="#a6a8a9" />
      </mesh>

      {/* Entrance feature */}
      <mesh position={[1.45, 2.15, 1.48]}>
        <boxGeometry args={[0.65, 1.15, 0.06]} />
        <meshStandardMaterial
          color="#d18a4c"
          emissive="#e98c3d"
          emissiveIntensity={0.8}
        />
      </mesh>

      {/* Rooftop architectural block */}
      <mesh position={[1.3, 3.35, -0.5]}>
        <boxGeometry args={[1.2, 0.8, 1.3]} />
        <meshStandardMaterial color="#34383c" />
      </mesh>

      {/* Garden */}
      {[
        [-2.4, -1.7],
        [2.3, -1.6],
        [-2.5, 1.5],
        [2.5, 1.6],
      ].map(([x, z], i) => (
        <group key={i} position={[x, 0, z]}>
          <mesh position={[0, 0.3, 0]}>
            <sphereGeometry args={[0.35, 12, 12]} />
            <meshStandardMaterial color="#354b37" />
          </mesh>
          <mesh position={[0, 0.58, 0]}>
            <sphereGeometry args={[0.23, 12, 12]} />
            <meshStandardMaterial color="#526b45" />
          </mesh>
        </group>
      ))}
    </group>
  );
}

export default function PropertyScene() {
  return (
    <div className="property-scene">
      <Canvas
        shadows
        camera={{ position: [7, 5, 9], fov: 35 }}
        gl={{ antialias: true, alpha: true }}
        dpr={[1, 1.75]}
      >
        <ambientLight intensity={1.5} />

        <directionalLight
          position={[5, 9, 6]}
          intensity={3}
          castShadow
        />

        <pointLight
          position={[0, 3, 3]}
          intensity={35}
          color="#ffae69"
          distance={9}
        />

        <LuxuryHouse />

        <mesh
          rotation={[-Math.PI / 2, 0, 0]}
          position={[0, -0.25, 0]}
          receiveShadow
        >
          <planeGeometry args={[200, 200]} />
          <meshStandardMaterial
            color="#080909"
            roughness={0.9}
          />
        </mesh>

        <OrbitControls
          enablePan={false}
          enableZoom={false}
          minPolarAngle={Math.PI / 3.5}
          maxPolarAngle={Math.PI / 2.1}
          autoRotate
          autoRotateSpeed={0.35}
        />
      </Canvas>
    </div>
  );
}
