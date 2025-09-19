import { Canvas, useFrame } from "@react-three/fiber";
import { Bounds, OrbitControls, useGLTF, Center } from "@react-three/drei";
import gsap from "gsap";
import { useRef, useState,useEffect } from "react";

function Cycle() {
  const { scene } = useGLTF("/3DModels/cycle.glb"); // your downloaded model

  const modelRef = useRef();
  const [rotated, setRotated] = useState(false); // track if animation finished

  useFrame(() => {
    if (modelRef.current && !rotated) {
      // Rotate smoothly until 360° (2 * Math.PI radians)
      modelRef.current.rotation.y += 0.08;

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
    <Center position={[50, 0, 0]} rotation={[0, -(Math.PI) * 2.6, 0]} scale={0.8}>
  <primitive object={scene}  />
</Center>
  );
}

export default function cyclothon() {

   const helmetBoxRef = useRef();

  useEffect(() => {
  // start hidden above
  gsap.set(helmetBoxRef.current, { opacity: 0, y: -30 });

  // helmet drop-in animation
  gsap.to(helmetBoxRef.current, {
    y: 0,
    opacity: 1,
    duration: 1.2,
    delay: 2.5,
    ease: "elastic.out(1, 0.3)",
    onComplete: () => {
      // when helmet finishes, move both helmet + cycle canvases to RHS
      gsap.to(".movable", {
        x: 390, // shift to right
        duration: 1,
        ease: "power3.inOut",
      });
    },
  });
}, []);
  return (
    <div className="h-screen w-screen relative bg-[#40342c]">

     {/* Helmet box */}
      <div ref={helmetBoxRef} className="movable h-[300px] w-[300px] absolute rounded-xl  ml-[600px] mt-[40px]">
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


      <div className="movable h-[590px] w-[590px] absolute mt-[200px] ml-[480px]">
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

      <div className=" absolute h-[600px] w-[800px] mt-[70px] ml-[100px]">
        <div style={{ fontFamily: 'cyclothonFont',transform: 'scaleY(1.3)', }} className="text-white text-[100px] ml-[10px] mt-[10px] ">
          <p>Cyclothon'25</p>
        </div>
      </div>
      
    </div>
  );
}