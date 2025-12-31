import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial, Float, Stars } from '@react-three/drei';
import * as THREE from 'three';

const ParticleGrid = () => {
  const gridRef = useRef<THREE.Points>(null!);
  
  // 50x50 grid = 2500 points
  const gridSize = 50;
  
  const points = useMemo(() => {
    const temp = new Float32Array(gridSize * gridSize * 3);
    for (let i = 0; i < gridSize; i++) {
      for (let j = 0; j < gridSize; j++) {
        const k = (i * gridSize + j) * 3;
        // Center the grid
        temp[k] = (i - gridSize / 2) * 2; 
        temp[k + 1] = 0; // Y is calculated in animation
        temp[k + 2] = (j - gridSize / 2) * 2;
      }
    }
    return temp;
  }, []);

  useFrame((state) => {
    if (!gridRef.current) return;
    const time = state.clock.getElapsedTime() * 0.4;
    const positions = gridRef.current.geometry.attributes.position.array as Float32Array;
    
    // Animate waves
    for (let i = 0; i < gridSize; i++) {
        for (let j = 0; j < gridSize; j++) {
             const k = (i * gridSize + j) * 3;
             const x = positions[k];
             const z = positions[k + 2];
             
             // Complex wave function for organic tech look
             // Base wave
             let y = Math.sin(x * 0.15 + time) * Math.cos(z * 0.15 + time) * 2;
             // Detail wave
             y += Math.sin(x * 0.3 + time * 1.5) * Math.sin(z * 0.3 + time * 1.5) * 0.5;
             
             positions[k + 1] = y - 8; // Position below the main content
        }
    }
    gridRef.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <points ref={gridRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={points.length / 3}
          array={points}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.12}
        color="#10b981" // Emerald 500
        transparent
        opacity={0.3}
        sizeAttenuation={true}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
};

const ParticleField = () => {
  const ref = useRef<THREE.Points>(null!);
  
  // Create particles in a sphere distribution
  const sphere = useMemo(() => {
    const temp = new Float32Array(3000 * 3);
    for (let i = 0; i < 3000; i++) {
      const theta = THREE.MathUtils.randFloatSpread(360); 
      const phi = THREE.MathUtils.randFloatSpread(360); 
      
      const x = 20 * Math.sin(theta) * Math.cos(phi);
      const y = 20 * Math.sin(theta) * Math.sin(phi);
      const z = 20 * Math.cos(theta);
      
      temp[i * 3] = x;
      temp[i * 3 + 1] = y;
      temp[i * 3 + 2] = z;
    }
    return temp;
  }, []);

  useFrame((state, delta) => {
    if (ref.current) {
      ref.current.rotation.x -= delta / 15;
      ref.current.rotation.y -= delta / 20;
    }
  });

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points ref={ref} positions={sphere} stride={3} frustumCulled={false}>
        <PointMaterial
          transparent
          color="#22c55e"
          size={0.05}
          sizeAttenuation={true}
          depthWrite={false}
          opacity={0.6}
        />
      </Points>
    </group>
  );
};

const CyberShape = () => {
    const meshRef = useRef<THREE.Mesh>(null!);
    
    useFrame((state) => {
        const time = state.clock.getElapsedTime();
        meshRef.current.rotation.x = time * 0.2;
        meshRef.current.rotation.y = time * 0.3;
        meshRef.current.position.y = Math.sin(time) * 0.5;
    });

    return (
        <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
             <mesh ref={meshRef} position={[6, 0, -5]}>
                <icosahedronGeometry args={[2, 0]} />
                <meshStandardMaterial 
                    color="#22c55e" 
                    wireframe 
                    transparent 
                    opacity={0.3} 
                    emissive="#22c55e"
                    emissiveIntensity={0.5}
                />
            </mesh>
        </Float>
    );
}

const ThreeBackground: React.FC = () => {
  return (
    <div className="fixed top-0 left-0 w-full h-full -z-50 bg-slate-950">
      
      {/* 3D Scene Layer */}
      <div className="absolute inset-0">
        <Canvas camera={{ position: [0, 0, 10], fov: 60 }} gl={{ alpha: true }}>
          <fog attach="fog" args={['#020617', 5, 25]} />
          <ambientLight intensity={0.5} />
          
          <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
          
          {/* New Particle Grid Background */}
          <ParticleGrid />
          
          <ParticleField />
          <CyberShape />
        </Canvas>
      </div>
      
      {/* Scanline & Noise Overlays */}
      <div className="absolute inset-0 pointer-events-none opacity-10 bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" style={{ backgroundSize: '100px' }}></div>
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-transparent via-green-900/5 to-transparent bg-[length:100%_4px]"></div>
    </div>
  );
};

export default ThreeBackground;