
import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

const VERTEX_SHADER = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = vec4(position, 1.0);
  }
`;

const FRAGMENT_SHADER = `
  uniform float uTime;
  uniform vec2 uResolution;
  varying vec2 vUv;

  float hash(vec2 p) {
  return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
}

  float noise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    float a = hash(i);
    float b = hash(i + vec2(1.0, 0.0));
    float c = hash(i + vec2(0.0, 1.0));
    float d = hash(i + vec2(1.0, 1.0));
    vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(a, b, u.x) + (c - a) * u.y * (1.0 - u.x) + (d - b) * u.x * u.y;
}

void main() {
    vec2 uv = vUv;
    vec2 centeredUv = (uv * 2.0 - 1.0);
  centeredUv.x *= uResolution.x / uResolution.y;

    float t = uTime * 0.1;

    // Deep Space Background - Richer dark blue/purple base
    vec3 spaceColor = mix(vec3(0.01, 0.01, 0.04), vec3(0.005, 0.0, 0.02), uv.y);

    // Cosmic Nebula Layers - Vibrant and Fluid
    // Layer 1: Blue/Cyan structure
    float n1 = noise(centeredUv * 1.8 + t * 0.5);
    float n2 = noise(centeredUv * 2.2 - t * 0.3 + vec2(2.4, 1.2));
    float nDetail = noise(centeredUv * 5.0 + t);
    
    float blueMask = smoothstep(0.35, 0.8, n1 * 0.6 + n2 * 0.4 + nDetail * 0.1);
    vec3 blueNebula = vec3(0.1, 0.4, 0.9) * blueMask * 0.7; // Brighter Electric Blue

    // Layer 2: Pink/Purple accents
    float purpleMask = smoothstep(0.4, 0.85, n2 * 0.6 + n1 * 0.4 + nDetail * 0.15);
    vec3 purpleNebula = vec3(0.6, 0.1, 0.8) * purpleMask * 0.5; // Deep Purple

    // Stars with twinkling
    float starfield = 0.0;
  for (float i = 1.0; i < 4.0; i++) {
        vec2 starUv = centeredUv * (10.0 * i);
        vec2 grid = fract(starUv) - 0.5;
        vec2 id = floor(starUv);
        float h = hash(id);
    if (h > 0.985) { // Fewer but distinct stars
            float blink = 0.5 + 0.5 * sin(uTime * 3.0 + h * 100.0);
            float starSize = smoothstep(0.05 * h, 0.0, length(grid));
      // Add a subtle glow/bloom to stars
      starSize += smoothstep(0.2 * h, 0.0, length(grid)) * 0.3;
      starfield += starSize * h * blink;
    }
  }

    // Combine - Removed Horizon, pure space
    vec3 finalColor = spaceColor + blueNebula + purpleNebula + vec3(starfield);

  // High-end film grain
  finalColor += hash(uv + uTime) * 0.02;

  gl_FragColor = vec4(finalColor, 1.0);
}
`;

const PARTICLE_VERTEX_SHADER = `
  uniform float uTime;
  varying float vOpacity;

void main() {
    float cycle = 8.0;
    vec3 pos = position;

    // Loop movement upward
    float speed = 0.05;
  pos.y += mod(uTime * speed + pos.z, 2.0) - 1.0;

  // Wrap x and z slightly for variety
  pos.x += sin(uTime * 0.2 + pos.y) * 0.05;
    
    vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
  gl_PointSize = (10.0 / -mvPosition.z) * (1.0 + sin(uTime + pos.x) * 0.2);
  gl_Position = projectionMatrix * mvPosition;

  // Fade out at edges
  vOpacity = smoothstep(-1.0, -0.5, pos.y) * smoothstep(1.0, 0.5, pos.y);
}
`;

const PARTICLE_FRAGMENT_SHADER = `
  varying float vOpacity;
void main() {
    float dist = length(gl_PointCoord - vec2(0.5));
  if (dist > 0.5) discard;
    // Circular particles with soft glowing edges
    float alpha = vOpacity * smoothstep(0.5, 0.2, dist);
  // Soft white-blue star color
  gl_FragColor = vec4(0.8, 0.9, 1.0, alpha * 0.8);
}
`;

export const DigitalHorizon: React.FC = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const rendererRef = useRef<THREE.WebGLRenderer | null>(null);

    useEffect(() => {
        if (!containerRef.current) return;

        // Scene setup
        const scene = new THREE.Scene();
        const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
        const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        renderer.setSize(window.innerWidth, window.innerHeight);
        containerRef.current.appendChild(renderer.domElement);
        rendererRef.current = renderer;

        // Background Shader
        const bgGeometry = new THREE.PlaneGeometry(2, 2);
        const bgMaterial = new THREE.ShaderMaterial({
            vertexShader: VERTEX_SHADER,
            fragmentShader: FRAGMENT_SHADER,
            uniforms: {
                uTime: { value: 0 },
                uResolution: { value: new THREE.Vector2(window.innerWidth, window.innerHeight) }
            }
        });
        const bgMesh = new THREE.Mesh(bgGeometry, bgMaterial);
        scene.add(bgMesh);

        // Particles
        const particleCount = 100;
        const particles = new THREE.BufferGeometry();
        const positions = new Float32Array(particleCount * 3);
        for (let i = 0; i < particleCount; i++) {
            positions[i * 3] = (Math.random() - 0.5) * 2;
            positions[i * 3 + 1] = (Math.random() - 0.5) * 2;
            positions[i * 3 + 2] = (Math.random() - 0.5) * 0.5; // Depth
        }
        particles.setAttribute('position', new THREE.BufferAttribute(positions, 3));

        const particleMaterial = new THREE.ShaderMaterial({
            vertexShader: PARTICLE_VERTEX_SHADER,
            fragmentShader: PARTICLE_FRAGMENT_SHADER,
            uniforms: {
                uTime: { value: 0 }
            },
            transparent: true,
            blending: THREE.AdditiveBlending,
            depthWrite: false
        });

        const particleSystem = new THREE.Points(particles, particleMaterial);
        particleSystem.position.z = 0.1;
        scene.add(particleSystem);

        // Resize handler
        const handleResize = () => {
            const width = window.innerWidth;
            const height = window.innerHeight;
            renderer.setSize(width, height);
            bgMaterial.uniforms.uResolution.value.set(width, height);
        };
        window.addEventListener('resize', handleResize);

        // Animation loop
        const startTime = Date.now();
        let animationFrameId: number;

        const animate = () => {
            const elapsedTime = (Date.now() - startTime) / 1000;
            bgMaterial.uniforms.uTime.value = elapsedTime;
            particleMaterial.uniforms.uTime.value = elapsedTime;

            renderer.render(scene, camera);
            animationFrameId = requestAnimationFrame(animate);
        };
        animate();

        return () => {
            window.removeEventListener('resize', handleResize);
            cancelAnimationFrame(animationFrameId);
            renderer.dispose();
            bgGeometry.dispose();
            bgMaterial.dispose();
            particles.dispose();
            particleMaterial.dispose();
            if (containerRef.current) {
                containerRef.current.removeChild(renderer.domElement);
            }
        };
    }, []);

    return (
        <div
            ref={containerRef}
            className="absolute inset-0 -z-10 bg-[#000814]"
            style={{ pointerEvents: 'none' }}
        />
    );
};
