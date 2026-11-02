
"use client";

import { Suspense, useEffect, useMemo, useRef } from "react";
import { Canvas } from "@react-three/fiber";
import {
  ContactShadows,
  OrbitControls,
  useGLTF,
} from "@react-three/drei";
import * as THREE from "three";
import gsap from "gsap";

function FurnishedVilla() {
  const { scene } = useGLTF("/models/two-storey-villa-3d-model.glb");
  const groupRef = useRef<THREE.Group>(null);

  const model = useMemo(() => {
    const clone = scene.clone(true);

    // These meshes obstruct the interior.
    // The actual furniture remains in the model.
    const hiddenMeshes = new Set([
      "Wall",
      "Roof slab",
      "Roof finish gravel",
      "Parapet coping",
      "First floor slab",
    ]);

    clone.traverse((child) => {
      if (hiddenMeshes.has(child.name)) {
        child.visible = false;
      }

      if (child instanceof THREE.Mesh) {
        child.castShadow = true;
        child.receiveShadow = true;

        const materials = Array.isArray(child.material)
          ? child.material
          : [child.material];

        materials.forEach((material) => {
          material.needsUpdate = true;
        });
      }
    });

    // Center and resize the model.
    const bounds = new THREE.Box3().setFromObject(clone);
    const size = bounds.getSize(new THREE.Vector3());
    const center = bounds.getCenter(new THREE.Vector3());

    const maxDimension = Math.max(size.x, size.y, size.z);
    const scale = 7.2 / maxDimension;

    clone.scale.setScalar(scale);

    clone.position.set(
      -center.x * scale,
      -bounds.min.y * scale,
      -center.z * scale
    );

    return clone;
  }, [scene]);

  useEffect(() => {
    if (!groupRef.current) return;

    const animation = gsap.fromTo(
      groupRef.current.scale,
      {
        x: 0.85,
        y: 0.85,
        z: 0.85,
      },
      {
        x: 1,
        y: 1,
        z: 1,
        duration: 1.8,
        ease: "power3.out",
      }
    );

    return () => {
      animation.kill();
    };
  }, []);

  return (
    <group ref={groupRef}>
      <primitive object={model} />
    </group>
  );
}

function SceneLoader() {
  return null;
}

export default function PropertyScene() {
  return (
    <div className="property-scene">
      <Canvas
        shadows
        camera={{
          position: [8, 7, 10],
          fov: 38,
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
        <ambientLight intensity={1.8} />

        <hemisphereLight
          args={["#ffffff", "#8b735e", 1.5]}
        />

        <directionalLight
          position={[6, 12, 8]}
          intensity={2.8}
          castShadow
          shadow-mapSize-width={2048}
          shadow-mapSize-height={2048}
        />

        <directionalLight
          position={[-8, 6, -5]}
          intensity={1.5}
          color="#d5b18a"
        />

        <pointLight
          position={[0, 5, 5]}
          intensity={25}
          color="#ffcf9f"
          distance={20}
        />

        <Suspense fallback={<SceneLoader />}>
          <FurnishedVilla />

          <ContactShadows
            position={[0, -0.04, 0]}
            opacity={0.35}
            scale={11}
            blur={2.5}
            far={5}
          />
        </Suspense>

        <OrbitControls
          enablePan={false}
          enableZoom={false}
          autoRotate
          autoRotateSpeed={0.35}
          minPolarAngle={Math.PI / 3.5}
          maxPolarAngle={Math.PI / 2.05}
          target={[0, 1.7, 0]}
        />
      </Canvas>
    </div>
  );
}

useGLTF.preload("/models/two-storey-villa-3d-model.glb");
