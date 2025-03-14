import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { shaderMaterial } from '@react-three/drei';

const CyberWaterMaterial = shaderMaterial(
  {
    time: 0,
    color: new THREE.Color('#00ffff'),
    secondaryColor: new THREE.Color('#ff00ff'),
    gridColor: new THREE.Color('#00ff00'),
  },
  // vertex shader
  `
    varying vec2 vUv;
    varying vec3 vPosition;
    void main() {
      vUv = uv;
      vPosition = position;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  // fragment shader
  `
    uniform float time;
    uniform vec3 color;
    uniform vec3 secondaryColor;
    uniform vec3 gridColor;
    varying vec2 vUv;
    varying vec3 vPosition;

    float grid(vec2 st, float res) {
      vec2 grid = fract(st * res);
      return step(0.95, grid.x) + step(0.95, grid.y);
    }

    void main() {
      vec2 uv = vUv;
      float t = time * 0.5;
      
      // Создаем эффект волн
      float wave = sin(uv.x * 10.0 + t) * 0.5 + 0.5;
      wave *= sin(uv.y * 8.0 + t * 1.2) * 0.5 + 0.5;
      
      // Создаем эффект сетки блокчейна
      float gridPattern = grid(uv, 20.0);
      
      // Смешиваем цвета
      vec3 finalColor = mix(color, secondaryColor, wave);
      finalColor = mix(finalColor, gridColor, gridPattern * 0.3);
      
      // Добавляем свечение
      float glow = sin(uv.x * 20.0 + t * 2.0) * 0.5 + 0.5;
      glow *= sin(uv.y * 15.0 + t * 1.5) * 0.5 + 0.5;
      finalColor += vec3(0.0, 0.5, 1.0) * glow * 0.2;
      
      // Добавляем эффект искажения
      float distortion = sin(uv.x * 30.0 + t * 3.0) * 0.5 + 0.5;
      distortion *= sin(uv.y * 25.0 + t * 2.5) * 0.5 + 0.5;
      finalColor *= 1.0 + distortion * 0.1;
      
      gl_FragColor = vec4(finalColor, 1.0);
    }
  `
);

const CyberWater = () => {
  const materialRef = useRef();
  const meshRef = useRef();

  useFrame((state) => {
    if (materialRef.current) {
      materialRef.current.uniforms.time.value = state.clock.getElapsedTime();
    }
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.001;
    }
  });

  return (
    <Sphere ref={meshRef} args={[1, 100, 200]}>
      <CyberWaterMaterial ref={materialRef} />
    </Sphere>
  );
};

export default CyberWater; 