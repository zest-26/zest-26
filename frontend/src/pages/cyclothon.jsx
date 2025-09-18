import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";

function Model() {
  const { scene } = useGLTF("/3DModels/cycle.glb"); // your downloaded model
  scene.traverse((obj) => {
  if (obj.isMesh) {
    console.log("Mesh found:", obj.name);
  }
});

   return <primitive object={scene} scale={2} rotation={[Math.PI, 0, 0]} />;
}

export default function cyclothon() {
  return (
    <div className="h-screen w-screen bg-[#b94d05]">
      <Canvas camera={{ position: [0, 2, 5], fov: 50 }}>
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
  );
}

