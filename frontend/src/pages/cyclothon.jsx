import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";
import { useRef, useState } from "react";

function Model() {
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

export default function cyclothon() {
  return (
    <div className="h-screen w-screen relative bg-[#b94d05]">
      <div className="h-[590px] w-[590px] absolute mt-[200px] ml-[480px]">
      <Canvas camera={{ position: [-27, 25, 43], fov: 50 }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[5, 5, 5]} />
        <Model />
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