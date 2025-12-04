// components/modelView.tsx (or wherever your hook is)
import { useRef, useCallback } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader';
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader';

interface ThreeScene {
  scene: THREE.Scene;
  renderer: THREE.WebGLRenderer;
  camera: THREE.PerspectiveCamera;
  controls: OrbitControls;
  currentModel?: THREE.Object3D;
  animationId?: number;
  cleanup?: () => void;
}

export const useThreeModelBuilder = () => {
  const scenes = useRef<{ [canvasId: string]: ThreeScene }>({});
  const loadedModels = useRef<Set<string>>(new Set()); // Track which models are already loaded

  const openPage = (url: string): void => {
    window.open(url, '_blank');
  };

  const threeDimensionModelBuilder = useCallback((
    canvasId: string,
    modelPath: string,
    helpersBoolean: boolean,
    canvasColor: string,
    cameraPositionX: number,
    cameraPositionY: number,
    cameraPositionZ: number,
    renderPositionWidth: number,
    renderPositionHeight: number,
    hdrPath: string
  ): void => {
    
    // Create a unique key for this specific model+canvas combination
    const modelKey = `${canvasId}_${modelPath}`;
    
    // Skip if this exact model is already loaded on this canvas
    if (loadedModels.current.has(modelKey)) {
      console.log(`Model ${modelPath} already loaded on canvas ${canvasId}, skipping...`);
      return;
    }
    
    let threeScene = scenes.current[canvasId];
    const helpersOn = helpersBoolean;

    if (!threeScene) {
      const canvas = document.querySelector(`#${canvasId}`) as HTMLCanvasElement;
      if (!canvas) {
        console.error(`Canvas with id ${canvasId} not found`);
        return;
      }
      
      const renderer = new THREE.WebGLRenderer({ 
        canvas, 
        antialias: true,
        alpha: true 
      });
      const scene = new THREE.Scene();
      scene.background = new THREE.Color(canvasColor);

      const camera = new THREE.PerspectiveCamera(
        75, 
        canvas.clientWidth / canvas.clientHeight, 
        0.1, 
        1000
      );
      const controls = new OrbitControls(camera, renderer.domElement);

      // cameraPositionX, cameraPositionY - UP, cameraPositionZ - BACK
      camera.position.set(cameraPositionX, cameraPositionY, cameraPositionZ);
      controls.update();

      const light1 = new THREE.DirectionalLight(0xffffff, 1);
      light1.position.set(10, 10, 10);
      scene.add(light1);

      const light2 = new THREE.DirectionalLight(0xffffff, 1);
      light2.position.set(-10, 10, 10);
      scene.add(light2);

      const light3 = new THREE.DirectionalLight(0xffffff, 1);
      light3.position.set(0, 10, -10);
      scene.add(light3);

      if (helpersOn) {
        scene.add(
          new THREE.DirectionalLightHelper(light1, 5),
          new THREE.DirectionalLightHelper(light2, 5),
          new THREE.DirectionalLightHelper(light3, 5)
        );
      }

      // Load HDR texture only if hdrPath is provided
      if (hdrPath && hdrPath.trim() !== '') {
        const rgbeLoader = new RGBELoader();
        rgbeLoader.load(`/hdr/${hdrPath}.hdr`, (texture) => {
          texture.mapping = THREE.EquirectangularReflectionMapping;
          scene.background = texture;
          scene.environment = texture;
        }, undefined, (error) => {
          console.error('Error loading HDR:', error);
        });
      }

      const animate = () => {
        threeScene!.animationId = requestAnimationFrame(animate);
        controls.update();
        renderer.render(scene, camera);
      };

      renderer.setSize(
        canvas.clientWidth,
        canvas.clientHeight
      );

      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.shadowMap.enabled = true;

      const onResize = () => {
        camera.aspect = canvas.clientWidth / canvas.clientHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(canvas.clientWidth, canvas.clientHeight);
      };

      window.addEventListener('resize', onResize);

      // Store cleanup function
      const cleanup = () => {
        window.removeEventListener('resize', onResize);
        if (threeScene!.animationId) {
          cancelAnimationFrame(threeScene!.animationId);
        }
        renderer.dispose();
        controls.dispose();
        // Remove from loaded models when cleaning up
        loadedModels.current.delete(modelKey);
      };

      threeScene = { 
        scene, 
        renderer, 
        camera, 
        controls, 
        cleanup 
      };
      scenes.current[canvasId] = threeScene;
      
      // Start animation
      animate();
    }

    const dLoader = new DRACOLoader();
    dLoader.setDecoderPath('https://www.gstatic.com/draco/versioned/decoders/1.5.7/');
    dLoader.setDecoderConfig({ type: 'js' });

    const loader = new GLTFLoader();
    loader.setDRACOLoader(dLoader);

    loader.load(
      `/models/${modelPath}.glb`,
      (glb) => {
        console.log(`Model ${modelPath} loaded on canvas ${canvasId}`);
        threeScene!.currentModel = glb.scene;
        threeScene!.scene.add(glb.scene);
        // Mark this model as loaded for this canvas
        loadedModels.current.add(modelKey);
      },
      (xhr) => {
        // Check if total is 0 (which causes Infinity%)
        if (xhr.total === 0) {
          console.log(`Loading ${modelPath}... (size unknown)`);
        } else {
          console.log(`${(xhr.loaded / xhr.total) * 100}% loaded`);
        }
      },
      (error) => {
        console.error(`Error loading model ${modelPath}:`, error);
      }
    );
  }, []);

  // Add a cleanup function to dispose all scenes
  const cleanupAll = useCallback(() => {
    Object.values(scenes.current).forEach(scene => {
      if (scene.cleanup) {
        scene.cleanup();
      }
    });
    scenes.current = {};
    loadedModels.current.clear();
  }, []);

  return { threeDimensionModelBuilder, openPage, cleanupAll };
};