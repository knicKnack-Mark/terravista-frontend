
"use client";

import { Suspense, useEffect, useMemo, useRef } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";
import * as THREE from "three";
import gsap from "gsap";

function FurnishedVilla() {
  const { scene } = useGLTF("/models/two-storey-villa-3d-model.glb");

  const model = useMemo(() => {
    const clone = scene.clone(true);

    const box = new THREE.Box3().setFromObject(clone);
    const size = box.getSize(new THREE.Vector3());
    const center = box.getCenter(new THREE.Vector3());

    const maxDimension = Math.max(size.x, size.y, size.z);
    const scale = 6 / maxDimension;

    clone.scale.setScalar(scale);
    clone.position.set(
      -center.x * scale,
      -box.min.y * scale,
      -center.z * scale
    );

    clone.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        child.castShadow = true;
        child.receiveShadow = true;
      }
    });

    return clone;
  }, [scene]);

  const groupRef = useRef<THREE.Group>(null);

  useEffect(() => {
    if (!groupRef.current) return;

    const entrance = gsap.fromTo(
      groupRef.current.scale,
      { x: 0.9, y: 0.9, z: 0.9 },
      {
        x: 1,
        y: 1,
        z: 1,
        duration: 1.7,
        ease: "power3.out",
      }
    );

    const rotation = gsap.to(groupRef.current.rotation, {
      y: 0.15,
      duration: 7,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
    });

    return () => {
      entrance.kill();
      rotation.kill();
    };
  }, []);

  return (
    <group ref={groupRef}>
      <primitive object={model} />
    </group>
  );
}

function Loader() {
  return null;
}

export default function PropertyScene() {
  return (
    <div className="property-scene">
      <Canvas
        shadows
        camera={{
          position: [8, 6, 9],
          fov: 35,
          near: 0.1,
          far: 100,
        }}
        gl={{
          alpha: true,
          antialias: true,
          powerPreference: "high-performance",
        }}
        dpr={[1, 1.5]}
      >
        <ambientLight intensity={1.7} />

        <directionalLight
          position={[5, 10, 7]}
          intensity={2.5}
          castShadow
          shadow-mapSize={[2048, 2048]}
        />

        <pointLight
          position={[0, 4, 4]}
          intensity={20}
          color="#ffb16e"
          distance={12}
        />

        <pointLight
          position={[-4, 3, -3]}
          intensity={12}
          color="#d4a16d"
          distance={10}
        />

        <Suspense fallback={<Loader />}>
          <FurnishedVilla />
        </Suspense>

        <OrbitControls
          enablePan={false}
          enableZoom={false}
          minPolarAngle={Math.PI / 3.5}
          maxPolarAngle={Math.PI / 2.05}
          autoRotate
          autoRotateSpeed={0.25}
          target={[0, 1.8, 0]}
        />
      </Canvas>
    </div>
  );
}

useGLTF.preload("/models/two-storey-villa-3d-model.glb");
