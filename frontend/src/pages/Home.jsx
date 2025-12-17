import React, { Suspense, useEffect, useRef } from "react";
import "@fontsource/sour-gummy/800.css";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { OrbitControls, useGLTF, useAnimations } from "@react-three/drei";
import * as THREE from "three";
import { EffectComposer, Bloom } from "@react-three/postprocessing";



function Model() {
  const group = useRef();
  const gltf = useGLTF("/3DModels/football3D.glb");
  const { actions, names } = useAnimations(gltf.animations, group);
  const { mouse } = useThree();

  // Base rotation (your original pose)
  const baseRotation = useRef(new THREE.Euler(1.3, 0.8, 0));
  const basePosition = useRef(new THREE.Vector3(0, 0, 0));

  useEffect(() => {
    console.log("FOOTBALL MODEL LOADED ✅");

    gltf.scene.traverse((obj) => {
      if (obj.isMesh && obj.name === "Icosphere") {
        obj.material = new THREE.MeshStandardMaterial({
          color: "#ff9980",
          emissive: "#ff9980",
          emissiveIntensity: 1.1,
          roughness: 0.2,
          metalness: 0.8,
        });

        const light = new THREE.PointLight("#ff8c00", 6, 10);
        light.position.set(0, 0, 0);
        obj.add(light);
      }
    });

    names.forEach((name) => {
      const action = actions[name];
      if (action) {
        action.reset();
        action.play();
        action.loop = THREE.LoopOnce;
      }
    });
  }, [actions, names, gltf]);

  // 🎯 Cursor-based spring motion
  useFrame(() => {
    if (!group.current) return;

    // Cursor influence strength
    const ROTATION_STRENGTH = 0.4;
    const POSITION_STRENGTH = 0.35;
    const SMOOTHNESS = 0.08; // smaller = more springy

    // Target rotation from cursor
    const targetRotationX =
      baseRotation.current.x + mouse.y * ROTATION_STRENGTH;
    const targetRotationY =
      baseRotation.current.y + mouse.x * ROTATION_STRENGTH;

    // Target position (subtle floating feel)
    const targetX = basePosition.current.x + mouse.x * POSITION_STRENGTH;
    const targetY = basePosition.current.y + mouse.y * POSITION_STRENGTH;

    // Smooth interpolation (spring effect)
    group.current.rotation.x = THREE.MathUtils.lerp(
      group.current.rotation.x,
      targetRotationX,
      SMOOTHNESS
    );

    group.current.rotation.y = THREE.MathUtils.lerp(
      group.current.rotation.y,
      targetRotationY,
      SMOOTHNESS
    );

    group.current.position.x = THREE.MathUtils.lerp(
      group.current.position.x,
      targetX,
      SMOOTHNESS
    );

    group.current.position.y = THREE.MathUtils.lerp(
      group.current.position.y,
      targetY,
      SMOOTHNESS
    );
  });

  return (
    <group ref={group}>
      <primitive object={gltf.scene} scale={6.9} />
    </group>
  );
}




useGLTF.preload("/3DModels/football3D.glb");



const Home = () => {
  return (
    <div className="relative h-screen w-full grid grid-cols-12 bg-black">
      {/* 🟨 LEFT COLUMN */}
  <div className="col-span-3 flex items-center justify-center bg-gray-950 text-white">
    <div className="pointer-events-auto">
      LEFT CONTENT
    </div>
  </div>
      <div className="col-span-6 h-full relative">
      <Canvas className="h-full w-full"
        camera={{ position: [0, 1.5, 5], fov: 50 }}
      >
        {/* Lights */}
       {/* <ambientLight intensity={1.9} /> */}
       {/* <directionalLight position={[5, 5, 5]} intensity={1.7} />  */}

        {/* 3D Model */}
        
         <Suspense fallback={<mesh />}>
  <Model />
</Suspense>


    <EffectComposer>
  <Bloom
    intensity={2.5}
    luminanceThreshold={0}
    luminanceSmoothing={0.9}
  />
</EffectComposer>


        {/* Controls */}
        <OrbitControls enableZoom={false} />
      </Canvas>
      </div>

      {/* 🟩 RIGHT COLUMN */}
  <div className="col-span-3 flex items-center justify-center bg-gray-950 text-white">
    <div className="pointer-events-auto">
      RIGHT CONTENT
    </div>
  </div>
    </div>
  );
};

export default Home;
