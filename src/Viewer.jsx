import React, { useEffect, useRef, useMemo } from 'react';
import { Canvas, useThree, extend, useFrame } from '@react-three/fiber';
import { shaderMaterial } from '@react-three/drei';
import * as THREE from 'three';

const vertexShader = `
varying vec2 vUv;

void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`;

const ShaderMaterial = shaderMaterial(
  // Uniforms
  { u_time: 0, u_resolution: new THREE.Vector2() },
  // Vertex Shader
  vertexShader,
);

extend({ ShaderMaterial });

function FullScreenQuad({ fragmentShader }) {
  const { viewport } = useThree();

  const material = useMemo(() => new ShaderMaterial({ fragmentShader }), [fragmentShader]);

  useFrame(({ clock }) => {
    material.uniforms.u_time.value = clock.getElapsedTime();
  });

  useEffect(() => {
    material.uniforms.u_resolution.value.set(viewport.width, viewport.height);
  }, [viewport.width, viewport.height, material]);

  return (
    <mesh>
      <planeGeometry args={[6, 6]} />
      <primitive object={material} attach="material" />
    </mesh>
  );
}

function Viewer({ fragmentShader }) {
  return (
    <Canvas style={{ background: 'black' }}>
      <FullScreenQuad fragmentShader={fragmentShader} />
    </Canvas>
  );
}

export default Viewer;
