"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface GiftBoxProps {
  isOpened: boolean;
  onClick: () => void;
}

export default function GiftBox({ isOpened, onClick }: GiftBoxProps) {
  const groupRef = useRef<THREE.Group>(null);
  const lidRef = useRef<THREE.Mesh>(null);

  const boxMaterial = useMemo(() => new THREE.MeshStandardMaterial({
    color: "#ffb6c1",
    roughness: 0.3,
    metalness: 0.1,
  }), []);

  const ribbonMaterial = useMemo(() => new THREE.MeshStandardMaterial({
    color: "#ffd700",
    roughness: 0.4,
    metalness: 0.5,
  }), []);

  useFrame((state) => {
    if (groupRef.current && !isOpened) {
      groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 2) * 0.1;
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.5;
    }

    if (isOpened && lidRef.current) {
      lidRef.current.position.y = THREE.MathUtils.lerp(lidRef.current.position.y, 3, 0.05);
      lidRef.current.position.x = THREE.MathUtils.lerp(lidRef.current.position.x, 2, 0.05);
      lidRef.current.rotation.z = THREE.MathUtils.lerp(lidRef.current.rotation.z, 0.5, 0.05);
      lidRef.current.rotation.x = THREE.MathUtils.lerp(lidRef.current.rotation.x, 0.5, 0.05);
    }
  });

  const onPointerOver = () => (document.body.style.cursor = 'pointer');
  const onPointerOut = () => (document.body.style.cursor = 'auto');

  return (
    <group 
      ref={groupRef} 
      onClick={onClick} 
      onPointerOver={onPointerOver} 
      onPointerOut={onPointerOut}
    >
      {/* Box Base */}
      <mesh castShadow receiveShadow position={[0, -0.5, 0]}>
        <boxGeometry args={[2, 2, 2]} />
        <primitive object={boxMaterial} />
      </mesh>

      {/* Base Ribbons */}
      <mesh castShadow receiveShadow position={[0, -0.5, 0]}>
        <boxGeometry args={[2.02, 2.02, 0.4]} />
        <primitive object={ribbonMaterial} />
      </mesh>
      <mesh castShadow receiveShadow position={[0, -0.5, 0]}>
        <boxGeometry args={[0.4, 2.02, 2.02]} />
        <primitive object={ribbonMaterial} />
      </mesh>

      {/* Box Lid */}
      <group ref={lidRef} position={[0, 0.5, 0]}>
        <mesh castShadow receiveShadow position={[0, 0.1, 0]}>
          <boxGeometry args={[2.1, 0.4, 2.1]} />
          <primitive object={boxMaterial} />
        </mesh>
        
        {/* Lid Ribbons */}
        <mesh castShadow receiveShadow position={[0, 0.1, 0]}>
          <boxGeometry args={[2.12, 0.42, 0.4]} />
          <primitive object={ribbonMaterial} />
        </mesh>
        <mesh castShadow receiveShadow position={[0, 0.1, 0]}>
          <boxGeometry args={[0.4, 0.42, 2.12]} />
          <primitive object={ribbonMaterial} />
        </mesh>

        {/* Bow */}
        <mesh castShadow receiveShadow position={[0, 0.5, 0]} rotation={[0, Math.PI / 4, 0]}>
          <torusGeometry args={[0.3, 0.1, 16, 32]} />
          <primitive object={ribbonMaterial} />
        </mesh>
        <mesh castShadow receiveShadow position={[0, 0.5, 0]} rotation={[0, -Math.PI / 4, 0]}>
          <torusGeometry args={[0.3, 0.1, 16, 32]} />
          <primitive object={ribbonMaterial} />
        </mesh>
      </group>
    </group>
  );
}
