import React, { Suspense, useEffect, useRef } from "react";
import "@fontsource/sour-gummy/800.css";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { OrbitControls, useGLTF, useAnimations } from "@react-three/drei";
import * as THREE from "three";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import ElectricBorder from "@/components/ElectricBorder";
import {GridScan} from "@/components/GridScan";
import GradientText from '@/components/GradientText'
import './HomeButton.css';
import { useNavigate } from "react-router-dom";
import {
  Instagram,
  Linkedin,
  Twitter,
  Facebook,
  Youtube
} from "lucide-react";




function GoalPost() {
  const { scene } = useGLTF("/3DModels/football_goal.glb");

  return (
    <primitive
      object={scene}
      position={[270.5, -380, -600]}
      scale={1.1}
      rotation={[0, Math.PI, 0]} // X, Y, Z in radians
    />
  );
}


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

const navigate = useNavigate();

  return (
    <div className="relative h-screen w-full overflow-hidden grid grid-cols-40 bg-black">

    <div className="col-span-1 flex items-center h-full justify-center "></div>
      {/* 🟨 LEFT COLUMN */}
 <div className="col-span-8  flex items-center h-full justify-center text-white">
  <div className="h-5/8 w-5/6 flex flex-col justify-between ">
 

<div         onClick={() => navigate("/Sports")} className="pointer-events-auto h-1/6 w-full flex items-center justify-center">
  <div className="home-container w-full h-full -skew-x-24">
    <div className="home-canvas w-full h-full relative">
      <div className="home-tracker home-tr-1"></div>
      <div className="home-tracker home-tr-2"></div>
      <div className="home-tracker home-tr-3"></div>
      <div className="home-tracker home-tr-4"></div>
      <div className="home-tracker home-tr-5"></div>
      <div className="home-tracker home-tr-6"></div>
      <div className="home-tracker home-tr-7"></div>
      <div className="home-tracker home-tr-8"></div>
      <div className="home-tracker home-tr-9"></div>
      <div className="home-tracker home-tr-10"></div>
      <div className="home-tracker home-tr-11"></div>
      <div className="home-tracker home-tr-12"></div>
      <div className="home-tracker home-tr-13"></div>
      <div className="home-tracker home-tr-14"></div>
      <div className="home-tracker home-tr-15"></div>
      <div className="home-tracker home-tr-16"></div>
      <div className="home-tracker home-tr-17"></div>
      <div className="home-tracker home-tr-18"></div>
      <div className="home-tracker home-tr-19"></div>
      <div className="home-tracker home-tr-20"></div>
      <div className="home-tracker home-tr-21"></div>
      <div className="home-tracker home-tr-22"></div>
      <div className="home-tracker home-tr-23"></div>
      <div className="home-tracker home-tr-24"></div>
      <div className="home-tracker home-tr-25"></div>

      <div

        className="bg-red-600  home-card w-full h-full relative"
      >
        <div className="home-card-content w-full h-full relative">
          <div className="home-card-glare"></div>

          <div className="home-cyber-lines w-full h-full relative">
            <span></span><span></span><span></span><span></span>
          </div>

          <div className="home-title skew-x-24 absolute inset-0 flex items-center justify-center text-white font-bold">
            SPORTS
          </div>

          <div className="home-glowing-elements absolute inset-0">
            <div className="home-glow-1"></div>
            <div className="home-glow-2"></div>
            <div className="home-glow-3"></div>
          </div>

          <div className="home-card-particles absolute inset-0">
            <span></span><span></span><span></span><span></span><span></span><span></span>
          </div>

          <div className="home-corner-elements absolute inset-0">
            <span></span><span></span><span></span><span></span>
          </div>

          <div className="home-scan-line absolute inset-0"></div>
        </div>
      </div>
    </div>
  </div>
</div>




 <div         onClick={() => navigate("/Accomodations")} className="pointer-events-auto h-1/6 w-full flex items-center justify-center">
  <div className="home-container w-full h-full -skew-x-24">
    <div className="home-canvas w-full h-full relative">
      <div className="home-tracker home-tr-1"></div>
      <div className="home-tracker home-tr-2"></div>
      <div className="home-tracker home-tr-3"></div>
      <div className="home-tracker home-tr-4"></div>
      <div className="home-tracker home-tr-5"></div>
      <div className="home-tracker home-tr-6"></div>
      <div className="home-tracker home-tr-7"></div>
      <div className="home-tracker home-tr-8"></div>
      <div className="home-tracker home-tr-9"></div>
      <div className="home-tracker home-tr-10"></div>
      <div className="home-tracker home-tr-11"></div>
      <div className="home-tracker home-tr-12"></div>
      <div className="home-tracker home-tr-13"></div>
      <div className="home-tracker home-tr-14"></div>
      <div className="home-tracker home-tr-15"></div>
      <div className="home-tracker home-tr-16"></div>
      <div className="home-tracker home-tr-17"></div>
      <div className="home-tracker home-tr-18"></div>
      <div className="home-tracker home-tr-19"></div>
      <div className="home-tracker home-tr-20"></div>
      <div className="home-tracker home-tr-21"></div>
      <div className="home-tracker home-tr-22"></div>
      <div className="home-tracker home-tr-23"></div>
      <div className="home-tracker home-tr-24"></div>
      <div className="home-tracker home-tr-25"></div>

      <div

        className="bg-red-600  home-card w-full h-full relative"
      >
        <div className="home-card-content w-full h-full relative">
          <div className="home-card-glare"></div>

          <div className="home-cyber-lines w-full h-full relative">
            <span></span><span></span><span></span><span></span>
          </div>

          <div className="home-title skew-x-24 absolute inset-0 flex items-center justify-center text-white font-bold">
            ACCOMODATION
          </div>

          <div className="home-glowing-elements absolute inset-0">
            <div className="home-glow-1"></div>
            <div className="home-glow-2"></div>
            <div className="home-glow-3"></div>
          </div>

          <div className="home-card-particles absolute inset-0">
            <span></span><span></span><span></span><span></span><span></span><span></span>
          </div>

          <div className="home-corner-elements absolute inset-0">
            <span></span><span></span><span></span><span></span>
          </div>

          <div className="home-scan-line absolute inset-0"></div>
        </div>
      </div>
    </div>
  </div>
</div>




     <div         onClick={() => navigate("/Scores")} className="pointer-events-auto h-1/6 w-full flex items-center justify-center">
  <div className="home-container w-full h-full -skew-x-24">
    <div className="home-canvas w-full h-full relative">
      <div className="home-tracker home-tr-1"></div>
      <div className="home-tracker home-tr-2"></div>
      <div className="home-tracker home-tr-3"></div>
      <div className="home-tracker home-tr-4"></div>
      <div className="home-tracker home-tr-5"></div>
      <div className="home-tracker home-tr-6"></div>
      <div className="home-tracker home-tr-7"></div>
      <div className="home-tracker home-tr-8"></div>
      <div className="home-tracker home-tr-9"></div>
      <div className="home-tracker home-tr-10"></div>
      <div className="home-tracker home-tr-11"></div>
      <div className="home-tracker home-tr-12"></div>
      <div className="home-tracker home-tr-13"></div>
      <div className="home-tracker home-tr-14"></div>
      <div className="home-tracker home-tr-15"></div>
      <div className="home-tracker home-tr-16"></div>
      <div className="home-tracker home-tr-17"></div>
      <div className="home-tracker home-tr-18"></div>
      <div className="home-tracker home-tr-19"></div>
      <div className="home-tracker home-tr-20"></div>
      <div className="home-tracker home-tr-21"></div>
      <div className="home-tracker home-tr-22"></div>
      <div className="home-tracker home-tr-23"></div>
      <div className="home-tracker home-tr-24"></div>
      <div className="home-tracker home-tr-25"></div>

      <div

        className="bg-red-600  home-card w-full h-full relative"
      >
        <div className="home-card-content w-full h-full relative">
          <div className="home-card-glare"></div>

          <div className="home-cyber-lines w-full h-full relative">
            <span></span><span></span><span></span><span></span>
          </div>

          <div className="home-title skew-x-24 absolute inset-0 flex items-center justify-center text-white font-bold">
            SCORES
          </div>

          <div className="home-glowing-elements absolute inset-0">
            <div className="home-glow-1"></div>
            <div className="home-glow-2"></div>
            <div className="home-glow-3"></div>
          </div>

          <div className="home-card-particles absolute inset-0">
            <span></span><span></span><span></span><span></span><span></span><span></span>
          </div>

          <div className="home-corner-elements absolute inset-0">
            <span></span><span></span><span></span><span></span>
          </div>

          <div className="home-scan-line absolute inset-0"></div>
        </div>
      </div>
    </div>
  </div>
</div>


   <div         onClick={() => navigate("/about")} className="pointer-events-auto h-1/6 w-full flex items-center justify-center">
  <div className="home-container w-full h-full -skew-x-24">
    <div className="home-canvas w-full h-full relative">
      <div className="home-tracker home-tr-1"></div>
      <div className="home-tracker home-tr-2"></div>
      <div className="home-tracker home-tr-3"></div>
      <div className="home-tracker home-tr-4"></div>
      <div className="home-tracker home-tr-5"></div>
      <div className="home-tracker home-tr-6"></div>
      <div className="home-tracker home-tr-7"></div>
      <div className="home-tracker home-tr-8"></div>
      <div className="home-tracker home-tr-9"></div>
      <div className="home-tracker home-tr-10"></div>
      <div className="home-tracker home-tr-11"></div>
      <div className="home-tracker home-tr-12"></div>
      <div className="home-tracker home-tr-13"></div>
      <div className="home-tracker home-tr-14"></div>
      <div className="home-tracker home-tr-15"></div>
      <div className="home-tracker home-tr-16"></div>
      <div className="home-tracker home-tr-17"></div>
      <div className="home-tracker home-tr-18"></div>
      <div className="home-tracker home-tr-19"></div>
      <div className="home-tracker home-tr-20"></div>
      <div className="home-tracker home-tr-21"></div>
      <div className="home-tracker home-tr-22"></div>
      <div className="home-tracker home-tr-23"></div>
      <div className="home-tracker home-tr-24"></div>
      <div className="home-tracker home-tr-25"></div>

      <div

        className="bg-red-600  home-card w-full h-full relative"
      >
        <div className="home-card-content w-full h-full relative">
          <div className="home-card-glare"></div>

          <div className="home-cyber-lines w-full h-full relative">
            <span></span><span></span><span></span><span></span>
          </div>

          <div className="home-title skew-x-24 absolute inset-0 flex items-center justify-center text-white font-bold">
            ABOUT US
          </div>

          <div className="home-glowing-elements absolute inset-0">
            <div className="home-glow-1"></div>
            <div className="home-glow-2"></div>
            <div className="home-glow-3"></div>
          </div>

          <div className="home-card-particles absolute inset-0">
            <span></span><span></span><span></span><span></span><span></span><span></span>
          </div>

          <div className="home-corner-elements absolute inset-0">
            <span></span><span></span><span></span><span></span>
          </div>

          <div className="home-scan-line absolute inset-0"></div>
        </div>
      </div>
    </div>
  </div>
</div>

  </div>
</div>


     <div className="col-span-22  h-full grid grid-rows-12 min-w-0 min-h-0 relative">

  <div className="row-span-2 overflow-hidden flex items-center justify-center min-w-0">
    <img
      src="/mindsparkLogo.png"
      alt="header"
      className="max-w-full max-h-full object-contain"
    />
  </div>

 <div className="row-span-8  min-w-0 min-h-0 relative overflow-hidden ">
 

  

  
  <div className="absolute inset-0 z-10 w-full h-full  pointer-events-none">
    
    <Canvas camera={{ position: [0, 1.5, 5], fov: 50 }}>
      <Suspense fallback={null}>
        <Model />
      </Suspense>

      

      <EffectComposer>
        <Bloom intensity={2.5} luminanceThreshold={0} luminanceSmoothing={0.9} />
      </EffectComposer>

      <OrbitControls enableZoom={false} />
    </Canvas>
    
  </div>
  
</div>

<div className=" relative w-full h-full row-span-2 grid grid-rows-10">
  <div className=" w-full h-full row-span-1"></div>

<div className="w-full h-full row-span-4 flex items-stretch justify-center gap-6">
  {/* Instagram */}
  <div className="h-full aspect-square p-2">
    <a
      href="https://www.instagram.com/"
      target="_blank"
      rel="noopener noreferrer"
      className="block h-full w-full"
    >
      <Instagram
        className="
          h-full w-full text-orange-300 hover:text-orange-200
          [filter:drop-shadow(0_0_4px_#E8560E)_drop-shadow(0_0_10px_#E8560E)_drop-shadow(0_0_20px_#E8560E)]
          hover:scale-110 transition-transform duration-300 ease-out hover:-translate-y-1
        "
      />
    </a>
  </div>

  {/* LinkedIn */}
  <div className="h-full aspect-square p-2">
    <a
      href="https://www.linkedin.com/"
      target="_blank"
      rel="noopener noreferrer"
      className="block h-full w-full"
    >
      <Linkedin
        className="
          h-full w-full text-orange-300 hover:text-orange-200
          [filter:drop-shadow(0_0_4px_#E8560E)_drop-shadow(0_0_10px_#E8560E)_drop-shadow(0_0_20px_#E8560E)]
          hover:scale-110 transition-transform duration-300 ease-out hover:-translate-y-1
        "
      />
    </a>
  </div>

  {/* X / Twitter */}
  <div className="h-full aspect-square p-2">
    <a
      href="https://twitter.com/"
      target="_blank"
      rel="noopener noreferrer"
      className="block h-full w-full"
    >
      <Twitter
        className="
          h-full w-full text-orange-300 hover:text-orange-200
         [filter:drop-shadow(0_0_4px_#E8560E)_drop-shadow(0_0_10px_#E8560E)_drop-shadow(0_0_20px_#E8560E)]
          hover:scale-110 transition-transform duration-300 ease-out hover:-translate-y-1
        "
      />
    </a>
  </div>

  {/* Facebook */}
  <div className="h-full aspect-square p-2">
    <a
      href="https://www.facebook.com/"
      target="_blank"
      rel="noopener noreferrer"
      className="block h-full w-full"
    >
      <Facebook
        className="
          h-full w-full text-orange-300 hover:text-orange-200
         [filter:drop-shadow(0_0_4px_#E8560E)_drop-shadow(0_0_10px_#E8560E)_drop-shadow(0_0_20px_#E8560E)]
          hover:scale-110 transition-transform duration-300 ease-out hover:-translate-y-1
        "
      />
    </a>
  </div>

  {/* YouTube */}
  <div className="h-full aspect-square p-2">
    <a
      href="https://www.youtube.com/"
      target="_blank"
      rel="noopener noreferrer"
      className="block h-full w-full"
    >
      <Youtube
        className="
          h-full w-full text-orange-300 hover:text-orange-200
          [filter:drop-shadow(0_0_4px_#E8560E)_drop-shadow(0_0_10px_#E8560E)_drop-shadow(0_0_20px_#E8560E)]
          hover:scale-110 transition-transform duration-300 ease-out hover:-translate-y-1
        "
      />
    </a>
  </div>
</div>








  <div className=" w-full h-full row-span-5"></div>

</div>


</div>


      {/* 🟩 RIGHT COLUMN */}
 <div className="col-span-8 flex items-center h-full justify-center text-white">
  <div className="h-5/8 w-5/6 flex flex-col justify-between ">
 
    {/* Rhomboid container */}
    <div         onClick={() => navigate("/Gallery")} className="pointer-events-auto h-1/6 w-full flex items-center justify-center">
  <div className="home-container w-full h-full skew-x-24">
    <div className="home-canvas w-full h-full relative">
      <div className="home-tracker home-tr-1"></div>
      <div className="home-tracker home-tr-2"></div>
      <div className="home-tracker home-tr-3"></div>
      <div className="home-tracker home-tr-4"></div>
      <div className="home-tracker home-tr-5"></div>
      <div className="home-tracker home-tr-6"></div>
      <div className="home-tracker home-tr-7"></div>
      <div className="home-tracker home-tr-8"></div>
      <div className="home-tracker home-tr-9"></div>
      <div className="home-tracker home-tr-10"></div>
      <div className="home-tracker home-tr-11"></div>
      <div className="home-tracker home-tr-12"></div>
      <div className="home-tracker home-tr-13"></div>
      <div className="home-tracker home-tr-14"></div>
      <div className="home-tracker home-tr-15"></div>
      <div className="home-tracker home-tr-16"></div>
      <div className="home-tracker home-tr-17"></div>
      <div className="home-tracker home-tr-18"></div>
      <div className="home-tracker home-tr-19"></div>
      <div className="home-tracker home-tr-20"></div>
      <div className="home-tracker home-tr-21"></div>
      <div className="home-tracker home-tr-22"></div>
      <div className="home-tracker home-tr-23"></div>
      <div className="home-tracker home-tr-24"></div>
      <div className="home-tracker home-tr-25"></div>

      <div

        className="bg-red-600  home-card w-full h-full relative"
      >
        <div className="home-card-content w-full h-full relative">
          <div className="home-card-glare"></div>

          <div className="home-cyber-lines w-full h-full relative">
            <span></span><span></span><span></span><span></span>
          </div>

          <div className="home-title -skew-x-24 absolute inset-0 flex items-center justify-center text-white font-bold">
            GALLERY
          </div>

          <div className="home-glowing-elements absolute inset-0">
            <div className="home-glow-1"></div>
            <div className="home-glow-2"></div>
            <div className="home-glow-3"></div>
          </div>

          <div className="home-card-particles absolute inset-0">
            <span></span><span></span><span></span><span></span><span></span><span></span>
          </div>

          <div className="home-corner-elements absolute inset-0">
            <span></span><span></span><span></span><span></span>
          </div>

          <div className="home-scan-line absolute inset-0"></div>
        </div>
      </div>
    </div>
  </div>
</div>
     
<div         onClick={() => navigate("/coreTeam")} className="pointer-events-auto h-1/6 w-full flex items-center justify-center">
  <div className="home-container w-full h-full skew-x-24">
    <div className="home-canvas w-full h-full relative">
      <div className="home-tracker home-tr-1"></div>
      <div className="home-tracker home-tr-2"></div>
      <div className="home-tracker home-tr-3"></div>
      <div className="home-tracker home-tr-4"></div>
      <div className="home-tracker home-tr-5"></div>
      <div className="home-tracker home-tr-6"></div>
      <div className="home-tracker home-tr-7"></div>
      <div className="home-tracker home-tr-8"></div>
      <div className="home-tracker home-tr-9"></div>
      <div className="home-tracker home-tr-10"></div>
      <div className="home-tracker home-tr-11"></div>
      <div className="home-tracker home-tr-12"></div>
      <div className="home-tracker home-tr-13"></div>
      <div className="home-tracker home-tr-14"></div>
      <div className="home-tracker home-tr-15"></div>
      <div className="home-tracker home-tr-16"></div>
      <div className="home-tracker home-tr-17"></div>
      <div className="home-tracker home-tr-18"></div>
      <div className="home-tracker home-tr-19"></div>
      <div className="home-tracker home-tr-20"></div>
      <div className="home-tracker home-tr-21"></div>
      <div className="home-tracker home-tr-22"></div>
      <div className="home-tracker home-tr-23"></div>
      <div className="home-tracker home-tr-24"></div>
      <div className="home-tracker home-tr-25"></div>

      <div

        className="bg-red-600  home-card w-full h-full relative"
      >
        <div className="home-card-content w-full h-full relative">
          <div className="home-card-glare"></div>

          <div className="home-cyber-lines w-full h-full relative">
            <span></span><span></span><span></span><span></span>
          </div>

          <div className="home-title -skew-x-24 absolute inset-0 flex items-center justify-center text-white font-bold">
            CORE TEAM
          </div>

          <div className="home-glowing-elements absolute inset-0">
            <div className="home-glow-1"></div>
            <div className="home-glow-2"></div>
            <div className="home-glow-3"></div>
          </div>

          <div className="home-card-particles absolute inset-0">
            <span></span><span></span><span></span><span></span><span></span><span></span>
          </div>

          <div className="home-corner-elements absolute inset-0">
            <span></span><span></span><span></span><span></span>
          </div>

          <div className="home-scan-line absolute inset-0"></div>
        </div>
      </div>
    </div>
  </div>
</div>


     
<div         onClick={() => navigate("/Sponsers")} className="pointer-events-auto h-1/6 w-full flex items-center justify-center">
  <div className="home-container w-full h-full skew-x-24">
    <div className="home-canvas w-full h-full relative">
      <div className="home-tracker home-tr-1"></div>
      <div className="home-tracker home-tr-2"></div>
      <div className="home-tracker home-tr-3"></div>
      <div className="home-tracker home-tr-4"></div>
      <div className="home-tracker home-tr-5"></div>
      <div className="home-tracker home-tr-6"></div>
      <div className="home-tracker home-tr-7"></div>
      <div className="home-tracker home-tr-8"></div>
      <div className="home-tracker home-tr-9"></div>
      <div className="home-tracker home-tr-10"></div>
      <div className="home-tracker home-tr-11"></div>
      <div className="home-tracker home-tr-12"></div>
      <div className="home-tracker home-tr-13"></div>
      <div className="home-tracker home-tr-14"></div>
      <div className="home-tracker home-tr-15"></div>
      <div className="home-tracker home-tr-16"></div>
      <div className="home-tracker home-tr-17"></div>
      <div className="home-tracker home-tr-18"></div>
      <div className="home-tracker home-tr-19"></div>
      <div className="home-tracker home-tr-20"></div>
      <div className="home-tracker home-tr-21"></div>
      <div className="home-tracker home-tr-22"></div>
      <div className="home-tracker home-tr-23"></div>
      <div className="home-tracker home-tr-24"></div>
      <div className="home-tracker home-tr-25"></div>

      <div

        className="bg-red-600  home-card w-full h-full relative"
      >
        <div className="home-card-content w-full h-full relative">
          <div className="home-card-glare"></div>

          <div className="home-cyber-lines w-full h-full relative">
            <span></span><span></span><span></span><span></span>
          </div>

          <div className="home-title -skew-x-24 absolute inset-0 flex items-center justify-center text-white font-bold">
            SPONSERS
          </div>

          <div className="home-glowing-elements absolute inset-0">
            <div className="home-glow-1"></div>
            <div className="home-glow-2"></div>
            <div className="home-glow-3"></div>
          </div>

          <div className="home-card-particles absolute inset-0">
            <span></span><span></span><span></span><span></span><span></span><span></span>
          </div>

          <div className="home-corner-elements absolute inset-0">
            <span></span><span></span><span></span><span></span>
          </div>

          <div className="home-scan-line absolute inset-0"></div>
        </div>
      </div>
    </div>
  </div>
</div>


<div         onClick={() => navigate("/contactUs")} className="pointer-events-auto h-1/6 w-full flex items-center justify-center">
  <div className="home-container w-full h-full skew-x-24">
    <div className="home-canvas w-full h-full relative">
      <div className="home-tracker home-tr-1"></div>
      <div className="home-tracker home-tr-2"></div>
      <div className="home-tracker home-tr-3"></div>
      <div className="home-tracker home-tr-4"></div>
      <div className="home-tracker home-tr-5"></div>
      <div className="home-tracker home-tr-6"></div>
      <div className="home-tracker home-tr-7"></div>
      <div className="home-tracker home-tr-8"></div>
      <div className="home-tracker home-tr-9"></div>
      <div className="home-tracker home-tr-10"></div>
      <div className="home-tracker home-tr-11"></div>
      <div className="home-tracker home-tr-12"></div>
      <div className="home-tracker home-tr-13"></div>
      <div className="home-tracker home-tr-14"></div>
      <div className="home-tracker home-tr-15"></div>
      <div className="home-tracker home-tr-16"></div>
      <div className="home-tracker home-tr-17"></div>
      <div className="home-tracker home-tr-18"></div>
      <div className="home-tracker home-tr-19"></div>
      <div className="home-tracker home-tr-20"></div>
      <div className="home-tracker home-tr-21"></div>
      <div className="home-tracker home-tr-22"></div>
      <div className="home-tracker home-tr-23"></div>
      <div className="home-tracker home-tr-24"></div>
      <div className="home-tracker home-tr-25"></div>

      <div

        className="bg-red-600  home-card w-full h-full relative"
      >
        <div className="home-card-content w-full h-full relative">
          <div className="home-card-glare"></div>

          <div className="home-cyber-lines w-full h-full relative">
            <span></span><span></span><span></span><span></span>
          </div>

          <div className="home-title -skew-x-24 absolute inset-0 flex items-center justify-center text-white font-bold">
            CONTACT US
          </div>

          <div className="home-glowing-elements absolute inset-0">
            <div className="home-glow-1"></div>
            <div className="home-glow-2"></div>
            <div className="home-glow-3"></div>
          </div>

          <div className="home-card-particles absolute inset-0">
            <span></span><span></span><span></span><span></span><span></span><span></span>
          </div>

          <div className="home-corner-elements absolute inset-0">
            <span></span><span></span><span></span><span></span>
          </div>

          <div className="home-scan-line absolute inset-0"></div>
        </div>
      </div>
    </div>
  </div>
</div>



    
  </div>
</div>

<div className="col-span-1 flex items-center h-full justify-center "></div>

    </div>
  );
};

export default Home;
