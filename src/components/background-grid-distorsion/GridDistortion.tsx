import { useRef, useEffect } from 'react';
import {
  Scene,
  WebGLRenderer,
  OrthographicCamera,
  PlaneGeometry,
  InstancedMesh,
  ShaderMaterial,
  TextureLoader,
  Vector4,
  DataTexture,
  FloatType,
  RGBAFormat,
  LinearFilter,
  ClampToEdgeWrapping,
  DoubleSide,
  Object3D,
  Texture,
  InstancedBufferAttribute,
} from 'three';
import { arrayCards } from '@/utils/data';
import { baseUrl } from '@/utils/functions';

const vertexShader = `
uniform float time;
attribute vec2 offset;
varying vec2 vUv;
void main() {
  vUv = uv;
  vec3 pos = position + vec3(offset, 0.0);
  gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
}
`;

const fragmentShader = `
uniform sampler2D uTexture;
uniform sampler2D uDataTexture;
varying vec2 vUv;
void main() {
  vec4 offset = texture2D(uDataTexture, vUv);
  gl_FragColor = texture2D(uTexture, vUv - 0.02 * offset.rg);
}
`;

export const ContainerGridDistortion = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    const container = containerRef.current;

    const scene = new Scene();
    const camera = new OrthographicCamera(-1, 1, 1, -1, -1000, 1000);
    camera.position.z = 2;

    const renderer = new WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    container.appendChild(renderer.domElement);

    const size = 10;
    const geometry = new PlaneGeometry(1, 1, size - 1, size - 1);
    const instancedMesh = new InstancedMesh(geometry, undefined as any, arrayCards.length);

    const uniformsArray: { uTexture: Texture | null; uDataTexture: DataTexture }[] = [];
    const dummy = new Object3D();

    arrayCards.forEach((card, i) => {
      const textureLoader = new TextureLoader();
      const texture = textureLoader.load(baseUrl(card.localImage));
      texture.minFilter = LinearFilter;
      texture.magFilter = LinearFilter;
      texture.wrapS = ClampToEdgeWrapping;
      texture.wrapT = ClampToEdgeWrapping;

      const data = new Float32Array(4 * size * size);
      for (let j = 0; j < size * size; j++) {
        data[j * 4] = Math.random() * 255 - 125;
        data[j * 4 + 1] = Math.random() * 255 - 125;
      }
      const dataTexture = new DataTexture(data, size, size, RGBAFormat, FloatType);
      dataTexture.needsUpdate = true;

      uniformsArray.push({ uTexture: texture, uDataTexture: dataTexture });

      const row = Math.floor(i / 5);
      const col = i % 5;
      dummy.position.set(col * 1.2 - 2.5, -row * 1.2 + 2, 0);
      dummy.updateMatrix();
      instancedMesh.setMatrixAt(i, dummy.matrix);
    });

    const material = new ShaderMaterial({
      side: DoubleSide,
      uniforms: {
        time: { value: 0 },
        uTexture: { value: null as Texture | null },
        uDataTexture: { value: null as DataTexture | null },
      },
      vertexShader,
      fragmentShader,
      transparent: true,
    });

    instancedMesh.material = material;
    scene.add(instancedMesh);

    const handleResize = () => {
      const { width, height } = container.getBoundingClientRect();
      renderer.setSize(width, height);
      const aspect = width / height;
      camera.left = -aspect;
      camera.right = aspect;
      camera.top = 1;
      camera.bottom = -1;
      camera.updateProjectionMatrix();
    };
    window.addEventListener('resize', handleResize);
    handleResize();

    const animate = () => {
      requestAnimationFrame(animate);
      material.uniforms.time.value += 0.05;

      uniformsArray.forEach((u, i) => {
        if (!(u.uDataTexture.image.data instanceof Float32Array)) return;
        const data = u.uDataTexture.image.data as Float32Array;
        for (let j = 0; j < size * size; j++) {
          data[j * 4] *= 0.9;
          data[j * 4 + 1] *= 0.9;
        }
        u.uDataTexture.needsUpdate = true;
      });

      renderer.render(scene, camera);
    };
    animate();

    return () => {
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
      geometry.dispose();
      instancedMesh.material.dispose();
      uniformsArray.forEach(u => {
        u.uDataTexture.dispose();
        u.uTexture?.dispose();
      });
    };
  }, []);

  return <div ref={containerRef} style={{ width: '100%', height: '600px' }} />;
};
