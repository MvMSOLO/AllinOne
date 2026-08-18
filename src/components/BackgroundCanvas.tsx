import React, { useEffect, useRef, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

interface SeamlessVideoShaderProps {
  videoSrc: string;
}

const SeamlessVideoPlane: React.FC<SeamlessVideoShaderProps> = ({ videoSrc }) => {
  const { viewport, mouse } = useThree();
  const materialRef = useRef<THREE.ShaderMaterial>(null);
  const meshRef = useRef<THREE.Mesh>(null);

  const videoA = useRef<HTMLVideoElement | null>(null);
  const videoB = useRef<HTMLVideoElement | null>(null);

  const [textureA, setTextureA] = useState<THREE.VideoTexture | null>(null);
  const [textureB, setTextureB] = useState<THREE.VideoTexture | null>(null);

  useEffect(() => {
    // Create Video Element A
    const vA = document.createElement('video');
    vA.src = videoSrc;
    vA.loop = true;
    vA.muted = true;
    vA.playsInline = true;
    vA.crossOrigin = 'anonymous';

    // Create Video Element B
    const vB = document.createElement('video');
    vB.src = videoSrc;
    vB.loop = true;
    vB.muted = true;
    vB.playsInline = true;
    vB.crossOrigin = 'anonymous';

    videoA.current = vA;
    videoB.current = vB;

    const texA = new THREE.VideoTexture(vA);
    texA.minFilter = THREE.LinearFilter;
    texA.magFilter = THREE.LinearFilter;
    texA.colorSpace = THREE.SRGBColorSpace;

    const texB = new THREE.VideoTexture(vB);
    texB.minFilter = THREE.LinearFilter;
    texB.magFilter = THREE.LinearFilter;
    texB.colorSpace = THREE.SRGBColorSpace;

    setTextureA(texA);
    setTextureB(texB);

    // Play initial video
    const startVideos = async () => {
      try {
        await vA.play();
      } catch (err) {
        console.warn('Autoplay restricted or error starting video A', err);
      }
    };
    startVideos();

    return () => {
      vA.pause();
      vB.pause();
      vA.remove();
      vB.remove();
      texA.dispose();
      texB.dispose();
    };
  }, [videoSrc]);

  // Handle smooth cross-fade loop logic
  useFrame(() => {
    const vA = videoA.current;
    const vB = videoB.current;
    const mat = materialRef.current;

    if (vA && mat && vA.duration && !isNaN(vA.duration)) {
      const duration = vA.duration;
      const fadeTime = Math.min(2.5, duration / 3); // 2.5 seconds crossfade window
      const currentTimeA = vA.currentTime;

      // Update texture updates
      if (textureA) textureA.needsUpdate = true;
      if (textureB) textureB.needsUpdate = true;

      // Crossfade calculations
      // When vA gets close to duration - fadeTime, trigger vB
      if (currentTimeA >= duration - fadeTime) {
        if (vB && vB.paused) {
          vB.currentTime = 0;
          vB.play().catch(() => {});
        }
        const alpha = (currentTimeA - (duration - fadeTime)) / fadeTime;
        mat.uniforms.mixRatio.value = Math.min(1, Math.max(0, alpha));
      } else {
        if (vB && !vB.paused && vB.currentTime > fadeTime) {
          vB.pause();
        }
        mat.uniforms.mixRatio.value = 0;
      }

      // Smooth camera parallax based on mouse position
      if (meshRef.current) {
        meshRef.current.rotation.x = THREE.MathUtils.lerp(meshRef.current.rotation.x, mouse.y * 0.03, 0.05);
        meshRef.current.rotation.y = THREE.MathUtils.lerp(meshRef.current.rotation.y, mouse.x * 0.03, 0.05);
      }
    }
  });

  const vertexShader = `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `;

  const fragmentShader = `
    uniform sampler2D texA;
    uniform sampler2D texB;
    uniform float mixRatio;
    varying vec2 vUv;

    void main() {
      vec4 colA = texture2D(texA, vUv);
      vec4 colB = texture2D(texB, vUv);

      // Mix textures seamlessly
      vec4 finalColor = mix(colA, colB, mixRatio);

      // Add subtle vignette and atmospheric darkening for cozy music feel
      float dist = distance(vUv, vec2(0.5, 0.5));
      finalColor.rgb *= smoothstep(0.8, 0.2, dist * 0.7);

      gl_FragColor = finalColor;
    }
  `;

  if (!textureA || !textureB) return null;

  return (
    <mesh ref={meshRef} scale={[viewport.width * 1.1, viewport.height * 1.1, 1]}>
      <planeGeometry args={[1, 1, 32, 32]} />
      <shaderMaterial
        ref={materialRef}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={{
          texA: { value: textureA },
          texB: { value: textureB },
          mixRatio: { value: 0 },
        }}
      />
    </mesh>
  );
};

// Ambient 3D floating dust/bokeh particles
const FloatingParticles: React.FC = () => {
  const count = 120;
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const particles = useRef<Array<{
    x: number; y: number; z: number;
    vx: number; vy: number; vz: number;
    scale: number; speed: number;
  }>>([]);

  useEffect(() => {
    const temp = [];
    for (let i = 0; i < count; i++) {
      temp.push({
        x: (Math.random() - 0.5) * 15,
        y: (Math.random() - 0.5) * 10,
        z: (Math.random() - 0.5) * 5,
        vx: (Math.random() - 0.5) * 0.005,
        vy: Math.random() * 0.008 + 0.002,
        vz: (Math.random() - 0.5) * 0.005,
        scale: Math.random() * 0.04 + 0.01,
        speed: Math.random() * 0.02 + 0.005,
      });
    }
    particles.current = temp;
  }, []);

  const dummy = new THREE.Object3D();

  useFrame(() => {
    if (!meshRef.current) return;

    particles.current.forEach((p, i) => {
      p.y += p.vy;
      p.x += Math.sin(p.y * 2) * 0.002;

      if (p.y > 6) p.y = -6;
      if (p.x > 8) p.x = -8;
      if (p.x < -8) p.x = 8;

      dummy.position.set(p.x, p.y, p.z);
      dummy.scale.set(p.scale, p.scale, p.scale);
      dummy.updateMatrix();

      meshRef.current!.setMatrixAt(i, dummy.matrix);
    });

    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, count]}>
      <sphereGeometry args={[1, 16, 16]} />
      <meshBasicMaterial color="#d8b4fe" transparent opacity={0.4} />
    </instancedMesh>
  );
};

export const BackgroundCanvas: React.FC = () => {
  return (
    <div className="fixed inset-0 -z-10 bg-slate-950 overflow-hidden pointer-events-none">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 60 }}
        gl={{ antialias: true, alpha: false, powerPreference: 'high-performance' }}
      >
        <SeamlessVideoPlane videoSrc="/background.mp4" />
        <FloatingParticles />
      </Canvas>
    </div>
  );
};
