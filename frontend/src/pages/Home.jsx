import React, { Suspense, useEffect, useRef } from "react";
import "@fontsource/sour-gummy/800.css";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { OrbitControls, useGLTF, useAnimations } from "@react-three/drei";
import * as THREE from "three";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import ElectricBorder from "@/components/ElectricBorder";
import {GridScan} from "@/components/GridScan";
import GradientText from '@/components/GradientText'
import LightRays from "@/components/LightRays"; 
import Galaxy from "@/components/Galaxy";
import { Menu, X } from "lucide-react";
import gsap from "gsap";


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
const [isMenuOpen, setIsMenuOpen] = React.useState(false);
const overlayRef = useRef(null);
const menuItemsRef = useRef([]);
const tlRef = useRef(null); // store timeline



useEffect(() => {
  if (!overlayRef.current) return;

  // Create timeline only once
  const tl = gsap.timeline({ paused: true });

  // Set initial hidden state
  gsap.set(overlayRef.current, { x: "100%" });
  gsap.set(menuItemsRef.current, { x: 80, opacity: 0 });

  // Enter animation
  tl.to(overlayRef.current, {
    x: "0%",
    duration: 0.6,
    ease: "power4.out",
  }).to(
    menuItemsRef.current,
    {
      x: 0,
      opacity: 1,
      stagger: 0.05,
      duration: 0.45,
      ease: "power3.out",
    },
    "-=0.2"
  );

  tlRef.current = tl;

  return () => tl.kill();
}, []);

// Play or reverse timeline when isMenuOpen changes
useEffect(() => {
  if (!tlRef.current) return;

  if (isMenuOpen) {
    tlRef.current.play();
  } else {
    tlRef.current.reverse();
  }
}, [isMenuOpen]);

// Function to handle menu button click
const handleMenuClick = (path) => {
  if (!tlRef.current) {
    navigate(path); // fallback
    return;
  }

  // Reverse animation first
  tlRef.current.reverse();

  // Navigate after reverse completes
  tlRef.current.eventCallback("onReverseComplete", () => {
    navigate(path);
    tlRef.current.eventCallback("onReverseComplete", null); // reset callback
  });
};




  return (


    <>

    <style>
{`


.menu-glow-btn {
  display: inline-block; /* shrink to content */
  position: relative;
  padding: 0.5rem 1.5rem;
  font-weight: 700;
  letter-spacing: 0.05em;
  color: #fdba74; /* orange-300 */
  border: 1px solid rgba(249, 115, 22, 0.4);
  box-shadow: 0 0 18px rgba(232, 86, 14, 0.55);
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  /* optional: rounded edges */
  border-radius: 0.25rem;

  /* shrink in flex column */
  width: fit-content;
}


.menu-glow-btn:hover {
  transform: translateY(-4px) scale(1.05);
  box-shadow: 0 0 32px rgba(232, 86, 14, 0.85);
}

.menu-glow-text {
  text-shadow:
    0 0 6px rgba(232, 86, 14, 0.7),
    0 0 14px rgba(232, 86, 14, 0.55),
    0 0 26px rgba(255, 140, 66, 0.45);
}
`}
</style>


    <div className="relative h-screen w-full overflow-hidden bg-black">

        {/* 🌌 GALAXY (Particles) */}
        
  <div
    className="
      absolute inset-0 z-0 pointer-events-none
      hue-rotate-[25deg] saturate-200 brightness-110
    "
  >
    <Galaxy
       density={0.4}
      glowIntensity={0.15}
      starSpeed={0.6}
      twinkleIntensity={0.4}
      rotationSpeed={0.08}
      mouseInteraction={false}
      mouseRepulsion={false}
      transparent
    />
  </div>

  {/* 🌈 LIGHT RAYS */}
  <div className="absolute inset-0 z-10 pointer-events-none">
    <LightRays
      raysOrigin="top-center"
      raysColor="#EE7F4F"
      raysSpeed={1.5}
      lightSpread={0.8}
      rayLength={3}
      followMouse
      mouseInfluence={0.1}
      noiseAmount={0.1}
      distortion={0.05}
      className="w-full h-full"
    />
  </div>

   {/* 🧱 Page Content */}
  <div className="relative z-10 grid grid-cols-40 h-full w-full">

    <div className="hidden md:col-span-1 md:flex items-center h-full justify-center "></div>
      {/* 🟨 LEFT COLUMN */}
 <div className="col-span-8  hidden md:flex items-center h-full justify-center  text-white">
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


     <div className="col-span-40 md:col-span-22  h-full grid grid-rows-12 min-w-0 min-h-0 relative">

  {/* INNER CONTAINER */}
 <div className="
    row-span-2
    overflow-hidden
    min-w-0
     md:flex
    grid grid-cols-10 md:grid-cols-1
    items-center
  ">

    {/* START DIV – mobile only */}
    <div className="col-span-2   md:hidden h-full flex items-center justify-center">
      {/* optional content */}
    </div>

    {/* IMAGE */}
    <div className="col-span-6 w-full h-full  md:col-span-1 flex items-center justify-center">
      <img 
        src="/Zest26Logo_compressed.avif"
        alt="header"
        className="w-full  h-full object-contain"
      />
    </div>

    {/* END DIV – mobile only */}
    <div className="col-span-2  pr-6 md:hidden h-full flex items-center justify-end">
  <div className="h-1/3 border-2 border-amber-950 flex justify-center items-center rounded-sm aspect-square p-0">
    <button
      type="button"
      className="block h-3/4 aspect-square"
      aria-label="Open menu"
      onClick={() => setIsMenuOpen(true)}
    >
      <Menu
        className="
          h-full w-full
          text-orange-300 hover:text-orange-200
          [filter:drop-shadow(0_0_4px_#E8560E)_drop-shadow(0_0_10px_#E8560E)_drop-shadow(0_0_20px_#E8560E)]
          hover:scale-110 transition-transform duration-300 ease-out hover:-translate-y-1
        "
        strokeWidth={2}
      />
    </button>
  </div>
</div>

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

<div className=" relative w-full h-full row-span-2   grid grid-rows-10">
  <div className=" w-full h-full bg-amber-300 hidden md:row-span-1 "></div>

 <div className="w-full h-full  row-span-4 flex items-stretch justify-center gap-6">
  {/* Instagram */}
  <div className="h-full border-2 border-amber-950 rounded-sm  aspect-square p-2">
    <a
      href=" https://www.instagram.com/coepzest/?hl=en"
      target="_blank"
      rel="noopener noreferrer"
      className="flex justify-center items-center md:block h-full  w-full"
    >
      <Instagram
        className="
         h-8/10 w-8/10 md:h-full md:w-full text-orange-300 hover:text-orange-200
          [filter:drop-shadow(0_0_4px_#E8560E)_drop-shadow(0_0_10px_#E8560E)_drop-shadow(0_0_20px_#E8560E)]
          hover:scale-110 transition-transform duration-300 ease-out hover:-translate-y-1
        "
      />
    </a>
  </div>

  {/* LinkedIn */}
  <div className="h-full border-2 border-amber-950 rounded-sm  aspect-square p-2">
    <a
      href=" https://www.linkedin.com/company/zest-coep/?originalSubdomain=in"
      target="_blank"
      rel="noopener noreferrer"
      className="flex justify-center items-center md:block h-full  w-full"
    >
      <Linkedin
        className="
        h-8/10 w-8/10 md:h-full md:w-full text-orange-300 hover:text-orange-200
          [filter:drop-shadow(0_0_4px_#E8560E)_drop-shadow(0_0_10px_#E8560E)_drop-shadow(0_0_20px_#E8560E)]
          hover:scale-110 transition-transform duration-300 ease-out hover:-translate-y-1
        "
      />
    </a>
  </div>

  {/* X / Twitter */}
  <div className="h-full border-2 border-amber-950 rounded-sm  aspect-square p-2">
    <a
      href=" https://x.com/zest_coep"
      target="_blank"
      rel="noopener noreferrer"
      className="flex justify-center items-center md:block h-full  w-full"
    >
      <Twitter
        className="
         h-8/10 w-8/10 md:h-full md:w-full text-orange-300 hover:text-orange-200
         [filter:drop-shadow(0_0_4px_#E8560E)_drop-shadow(0_0_10px_#E8560E)_drop-shadow(0_0_20px_#E8560E)]
          hover:scale-110 transition-transform duration-300 ease-out hover:-translate-y-1
        "
      />
    </a>
  </div>

  {/* Facebook */}
  <div className="h-full border-2 border-amber-950 rounded-sm  aspect-square p-2">
    <a
      href=" https://www.facebook.com/share/16dd5rFCFF/?mibextid=wwXIfr"
      target="_blank"
      rel="noopener noreferrer"
      className="flex justify-center items-center md:block h-full  w-full"
    >
      <Facebook
        className="
         h-8/10 w-8/10 md:h-full md:w-full text-orange-300 hover:text-orange-200
         [filter:drop-shadow(0_0_4px_#E8560E)_drop-shadow(0_0_10px_#E8560E)_drop-shadow(0_0_20px_#E8560E)]
          hover:scale-110 transition-transform duration-300 ease-out hover:-translate-y-1
        "
      />
    </a>
  </div>

  {/* YouTube */}
  <div className="h-full border-2 border-amber-950 rounded-sm  aspect-square p-2">
    <a
      href=" https://www.youtube.com/@coepzest2271"
      target="_blank"
      rel="noopener noreferrer"
      className="flex justify-center items-center md:block h-full  w-full"
    >
      <Youtube
        className="
          h-8/10 w-8/10 md:h-full md:w-full text-orange-300 hover:text-orange-200
          [filter:drop-shadow(0_0_4px_#E8560E)_drop-shadow(0_0_10px_#E8560E)_drop-shadow(0_0_20px_#E8560E)]
          hover:scale-110 transition-transform duration-300 ease-out hover:-translate-y-1
        "
      />
    </a>
  </div>
 </div>




{/* get app button */}

 <div className="w-full h-full hidden pt-5 md:flex row-span-4 items-center justify-center relative overflow-hidden">

  {/* Dark sparkly background */}
  <div className="absolute inset-0 bg-gradient-to-br from-orange-600/10 via-black/20 to-orange-800/15 blur-3xl" />
  
  {/* Floating sparkles */}
  <div className="absolute inset-0 opacity-40">
    <div className="absolute top-[20%] left-[30%] w-1 h-1 bg-orange-400 rounded-full animate-pulse" />
    <div className="absolute top-[60%] left-[70%] w-1.5 h-1.5 bg-orange-300 rounded-full animate-pulse delay-75" />
    <div className="absolute top-[40%] left-[50%] w-1 h-1 bg-orange-500 rounded-full animate-pulse delay-150" />
  </div>

 {/* Button structure */}
<div className="group relative h-full w-[10%] min-w-[140px]
                bg-gradient-to-b from-orange-950/40 via-black/60 to-orange-950/40
                backdrop-blur-sm
                border border-orange-600/50
                text-orange-300 font-bold tracking-wide
                flex items-center justify-center
                overflow-hidden
                shadow-[0_0_25px_rgba(255,165,0,0.45)]
                cursor-pointer transition-all duration-300
                hover:border-orange-300
                hover:shadow-[0_0_45px_rgba(255,165,0,0.85)]">

  {/* Strong glow overlay */}
  <span className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,180,0,0.25),transparent_65%)]
                   opacity-60 group-hover:opacity-100 transition duration-500" />

  {/* Vertical sliding shine line */}
  <span className="absolute left-[-100%] top-0 h-full w-[3px]
                   bg-gradient-to-b from-transparent via-orange-300 to-transparent
                   shadow-[0_0_35px_rgba(255,180,0,1)]
                   group-hover:left-[100%]
                   transition-all duration-700 ease-in-out" />

  {/* Color wave */}
  <span className="absolute left-[-100%] top-0 h-full w-[120px]
                   bg-gradient-to-r from-transparent via-orange-400/30 to-transparent
                   group-hover:left-[100%]
                   transition-all duration-700 ease-in-out" />

  {/* Inner glowing border */}
  <span className="absolute inset-[2px] border border-orange-300/10
                   group-hover:border-orange-200/70
                   transition duration-500" />

  {/* TEXT – extra shiny */}
  <span className="relative z-10 text-lg tracking-wide
                   bg-gradient-to-r from-orange-200 via-yellow-300 to-orange-200
                   bg-clip-text text-transparent
                   drop-shadow-[0_0_12px_rgba(255,200,0,0.9)]
                   group-hover:tracking-widest
                   group-hover:drop-shadow-[0_0_22px_rgba(255,220,0,1)]
                   transition-all duration-500">
    GET APP
  </span>
</div>

</div>


  <div className=" w-full h-full row-span-5 md:row-span-1"></div>

 </div>


 </div>


      {/* 🟩 RIGHT COLUMN */}
 <div className="col-span-8 hidden md:flex relative  items-center h-full justify-center text-white">

  <div className="h-5/8 w-5/6 flex flex-col justify-between">
 
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
            SPONSORS
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

<div className="hidden md:col-span-1 md:flex items-center h-full justify-center "></div>
   </div>

   {/* MOBILE MENU OVERLAY */}
 {/* MOBILE MENU OVERLAY */}
<div
  ref={overlayRef}
  className="fixed md:hidden inset-0 z-[9999] bg-black bg-opacity-95
             flex flex-col items-center justify-around
             pt-8 pb-8 pointer-events-auto
             translate-x-full"
>
  {/* Close button */}
  {/* Top bar: Close (LHS) + Get App (RHS) */}
<div className="w-full px-6 flex items-center justify-between">

  {/* Close button (LHS) */}
  <div className="h-10 w-10 border border-amber-950 rounded-sm p-1">
    <button
      onClick={() => setIsMenuOpen(false)}
      className="flex justify-center items-center h-full w-full"
    >
      <X
        className="
          h-full w-full text-orange-300
          [filter:drop-shadow(0_0_6px_#E8560E)_drop-shadow(0_0_16px_#E8560E)]
        "
      />
    </button>
  </div>

  {/* GET APP button (RHS) */}
  <button
    className="relative px-4 py-2 text-sm font-semibold tracking-wide
               border border-orange-500/40
               text-orange-300
               bg-black/40 backdrop-blur-sm
               rounded-[5px]
               shadow-[0_0_18px_rgba(232,86,14,0.55)]
               hover:shadow-[0_0_28px_rgba(255,165,0,0.85)]
               transition-all duration-300"
  >
    GET APP
  </button>

</div>


  {/* MENU BUTTONS */}
 <div className="flex items-center flex-col gap-4 mt-2">
  {[
     ["ABOUT US", "/about"],
         ["GALLERY", "/Gallery"],
        ["SPORTS", "/Sports"],
        ["SCORES", "/Scores"],
         ["CORE TEAM", "/coreTeam"],
        ["ACCOMODATIONS", "/Accomodations"],
        ["SPONSORS", "/Sponsers"],
        ["CONTACT US", "/contactUs"],
  ].map(([label, path], i) => (
    <button
      key={i}
      ref={(el) => (menuItemsRef.current[i] = el)}
      onClick={() => handleMenuClick(path)}
      className="menu-glow-btn text-xl md:text-4xl"
    >
      <span className="menu-glow-text">{label}</span>
    </button>
  ))}
</div>

</div>

    </div>

    </>
  );
};

export default Home;
