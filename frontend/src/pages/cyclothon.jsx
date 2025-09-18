import { Canvas, useFrame } from "@react-three/fiber";
import { Bounds, OrbitControls, useGLTF, Center } from "@react-three/drei";

import { useRef, useState } from "react";

function Cycle() {
  const { scene } = useGLTF("/3DModels/cycle.glb"); // your downloaded model

  const modelRef = useRef();
  const [rotated, setRotated] = useState(false); // track if animation finished

  useFrame(() => {
    if (modelRef.current && !rotated) {
      // Rotate smoothly until 360° (2 * Math.PI radians)
      modelRef.current.rotation.y += 0.07;

      if (modelRef.current.rotation.y >= 2 * Math.PI + 1.3) {
        // 1.3 is your default rotation.y
        modelRef.current.rotation.y = 1.3; // reset to default
        setRotated(true); // stop animation
      }
    }
  });

    return (
    <primitive
      ref={modelRef}
      object={scene}
      scale={0.18}
      position={[1, -14, 0]}
      rotation={[Math.PI, 1.5, 0]} // default rotation
    />
  );
}

// 🪖 Helmet model
function Helmet() {
  const { scene } = useGLTF("/3DModels/cycle_helmet.glb");
  console.log(scene)
  return (
    <Center position={[50, 0, 0]} rotation={[0, -(Math.PI) * 2.5, 0]} scale={0.8}>
  <primitive object={scene}  />
</Center>
  );
}

export default function cyclothon() {
  return (
    <div className="h-screen w-screen relative bg-[#b94d05]">

     {/* Helmet box */}
      <div className="h-[300px] w-[300px] absolute rounded-xl  ml-[600px] mt-[40px]">
        <Canvas camera={{ position: [0, 0, 10], fov: 50 }}>
          <ambientLight intensity={0.8} />
          <directionalLight position={[5, 5, 5]} />

          {/* Auto-fit helmet inside view */}
          <Bounds fit clip observe margin={1.2}>
            <Helmet />
          </Bounds>

          <OrbitControls makeDefault />
        </Canvas>
      </div>


      <div className="h-[590px] w-[590px] absolute mt-[200px] ml-[480px]">
      <Canvas camera={{ position: [-27, 25, 43], fov: 50 }}>
        <ambientLight intensity={0.7} />
        <directionalLight position={[5, 5, 5]} />
        <Cycle />
       <OrbitControls 
  minPolarAngle={0}
  maxPolarAngle={Math.PI * 2}
  enableDamping={true}
  dampingFactor={0.1}
/>

      </Canvas>
      </div>
      
    </div>
  );
}