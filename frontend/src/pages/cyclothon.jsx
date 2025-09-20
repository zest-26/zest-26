import { Canvas, useFrame } from "@react-three/fiber";
import { Bounds, OrbitControls, useGLTF, Center } from "@react-three/drei";
import gsap from "gsap";
import { SplitText } from "gsap/all";
import { useRef, useState, useEffect } from "react";
import { Calendar, Clock, MapPin } from "lucide-react";

gsap.registerPlugin(SplitText);

function Cycle({ enableSwaying = false }) {
  const { scene } = useGLTF("/3DModels/cyclist.glb");

  const modelRef = useRef();
  const [rotated, setRotated] = useState(false);
  
  // Swaying animation variables
  const swayTimeRef = useRef(0);
  const baseRotationY = 1.3; // Base Y rotation after initial animation

  useFrame((state, delta) => {
    if (modelRef.current && !rotated) {
      // Initial rotation animation
      modelRef.current.rotation.y += 0.08;

      if (modelRef.current.rotation.y >= 2* Math.PI +1.3) {
        modelRef.current.rotation.y = 1.3;
        setRotated(true);
      }
    }

    // Swaying animation after initial rotation and GSAP animation
    if (modelRef.current && rotated && enableSwaying) {
      swayTimeRef.current += delta;
      
      // Smooth pendulum-like swaying motion along Y-axis (±30 degrees)
      const swayAmplitude = -Math.PI / 6; // 30 degrees in radians (π/6)
      const swaySpeed = 1.1; // Adjust speed (how fast it sways)
      
      const swayOffset = Math.sin(swayTimeRef.current * swaySpeed) * swayAmplitude;
      modelRef.current.rotation.y = baseRotationY + swayOffset;
    }
  });

  return (
    <primitive
      ref={modelRef}
      object={scene}
      scale={7}
      position={[1, 0, 0]}
      rotation={[Math.PI, Math.PI / 6, Math.PI]}
    />
  );
}

// 🪖 Helmet model
function Helmet({ enableSwaying = false }) {
  const { scene } = useGLTF("/3DModels/cycle_helmet.glb");
  const helmetRef = useRef();
  
  // Swaying animation variables
  const swayTimeRef = useRef(0);
  const baseRotationY = -(Math.PI) * 2.6; // Base Y rotation

  useFrame((state, delta) => {
    // Swaying animation when enabled
    if (helmetRef.current && enableSwaying) {
      swayTimeRef.current += delta;
      
      // Smooth pendulum-like swaying motion along Y-axis (±30 degrees)
      const swayAmplitude = Math.PI / 6; // 30 degrees in radians (π/6)
      const swaySpeed = 1.2; // Adjust speed (how fast it sways)
      
      const swayOffset = Math.sin(swayTimeRef.current * swaySpeed) * swayAmplitude;
      helmetRef.current.rotation.y = baseRotationY + swayOffset;
    }
  });

  console.log(scene);
  return (
    <Center ref={helmetRef} position={[50, 0, 0]} rotation={[0, -(Math.PI) * 2.6, 0]} scale={0.8}>
      <primitive object={scene} />
    </Center>
  );
}

// Background infinite scrolling rows
function InfiniteRow({ images, reverse = false, speed = 30 }) {
  const rowRef = useRef();

  useEffect(() => {
    const ctx = gsap.context(() => {
      const row = rowRef.current;
      const totalWidth = row.scrollWidth / 2;

      gsap.fromTo(
        row,
        { x: reverse ? -totalWidth : 0 },
        {
          x: reverse ? 0 : -totalWidth,
          duration: speed,
          ease: "none",
          repeat: -1,
        }
      );
    });

    return () => ctx.revert();
  }, [reverse, speed]);

  return (
    <div className="overflow-hidden w-full">
      <div ref={rowRef} className="flex" style={{ width: "max-content" }}>
        {[...images, ...images].map((img, i) => (
          <div
            key={i}
            className="min-w-[250px] h-[210px] mx-2 rounded-xl shadow-lg overflow-hidden"
          >
            <img
              src={img}
              alt="row-img"
              className="w-full h-full object-cover"
            />
          </div>
        ))}
      </div>
    </div>
  );
}

function BackgroundScroller() {
  const row1 = ["/OS/OS-2.png", "/OS/OS-3.webp", "/OS/OS-5.webp", "/OS/OS-6.jpg", "/OS/OS-7.avif", "/OS/OS-8.jpg"];
  const row2 = ["/OS/OS-1.webp", "/OS/OS-6.jpg", "/OS/OS-7.avif", "/OS/OS-8.jpg", "/OS/OS-9.jpg", "/OS/OS-3.webp"];
  const row3 = ["/OS/OS-2.png", "/OS/OS-7.avif", "/OS/OS-8.jpg", "/OS/OS-9.jpg", "/OS/OS-3.webp", "/OS/OS-5.webp"];
  const row4 = ["/OS/OS-1.webp", "/OS/OS-8.jpg", "/OS/OS-9.jpg", "/OS/OS-3.webp", "/OS/OS-5.webp", "/OS/OS-6.jpg"];

  return (
    <div className="absolute inset-0 z-0 flex flex-col gap-6 opacity-30">
      <InfiniteRow images={row1} reverse={false} speed={40} />
      <InfiniteRow images={row2} reverse={true} speed={50} />
      <InfiniteRow images={row3} reverse={false} speed={35} />
      <InfiniteRow images={row4} reverse={true} speed={45} />
    </div>
  );
}

export default function cyclothon() {
  const helmetBoxRef = useRef();
  const textRef = useRef();
  const sloganRef = useRef();
  const sindoorRef = useRef();
  const coepLogoRef = useRef();
 const zestLogoRef = useRef();
  
  // State to control when swaying should start
  const [enableSwaying, setEnableSwaying] = useState(false);

  useEffect(() => {
    // hide everything initially
    gsap.set(helmetBoxRef.current, { opacity: 0, y: -30 });
    gsap.set(textRef.current, { opacity: 0 });
    gsap.set(sloganRef.current, { opacity: 0, y: 20 });
    gsap.set(sindoorRef.current, { opacity: 0, y: 20 });
    gsap.set(coepLogoRef.current, { opacity: 0, y: -30 });
    gsap.set(zestLogoRef.current, { opacity: 0, y: -30 });
  

  const tl = gsap.timeline();

  // Move animation for .movable
  tl.to(".movable", {
    x: 390,
    delay: 2.9,
    duration: 0.7,
    ease: "power3.inOut",
    onComplete: ()=>{
      setEnableSwaying(true);
    }
  })

  .to([coepLogoRef.current, zestLogoRef.current], {
    opacity: 1,
    y: 0,
    duration: 1,
    ease: "power2.out"
  })

  .add(() => {
    const heroSplit = new SplitText(textRef.current, { type: "chars, words" });
    gsap.set(textRef.current, { opacity: 1 }); // make text container visible
    gsap.from(heroSplit.chars, {
      yPercent: 15,
      duration: 0.4,
      ease: "expo.out",
      stagger: 0.03
    });
  })

   .to(sloganRef.current, {
    opacity: 1,
    y: 0,
    delay:0.5,
    duration: 0.4,
    ease: "power3.out"
  })

  .to(sindoorRef.current, {
    opacity: 1,
    y: 0,
    duration: 0.4,
    ease: "power3.out"
  });

}, []);

  return (
    <div className="h-screen w-screen relative bg-[#40342c]">
      <BackgroundScroller />

      <div ref={coepLogoRef}><img src="/CoepLogo.png" className="h-[200px] w-[200px] absolute ml-[260px] mt-[90px]"/></div>
      <div ref={zestLogoRef}><img src="/ZEST-26.png" className="h-[200px] w-[290px] absolute ml-[480px] mt-[90px]"/></div>
      {/* Helmet box */}
      <div ref={helmetBoxRef} className="z-10 movable h-[300px] w-[300px] absolute rounded-xl ml-[600px] mt-[40px]">
        <Canvas camera={{ position: [0, 0, 10], fov: 50 }}>
          <ambientLight intensity={1} />
          <directionalLight position={[5, 5, 5]} />

          <Bounds fit clip observe margin={1.2}>
            <Helmet enableSwaying={enableSwaying} />
          </Bounds>

          <OrbitControls enableZoom={false}   
  enableRotate={false}
  enablePan={false}   />
        </Canvas>
      </div>

      <div className="z-10 movable h-[690px] w-[690px] absolute mt-[70px] ml-[480px]">
        <Canvas camera={{ position: [-27, 25, -43], fov: 50 }}>
          <ambientLight intensity={1.3} />
          <directionalLight position={[27, 40, -43]} />
          <Cycle enableSwaying={enableSwaying} />
          <OrbitControls
             enableZoom={false}   
  enableRotate={false}
  enablePan={false}
            minPolarAngle={0}
            maxPolarAngle={Math.PI * 2}
            enableDamping={true}
            dampingFactor={0.1}
          />
        </Canvas>
      </div>

      <div className="absolute h-[600px] w-[800px] mt-[70px] ml-[100px] z-10">
        <div ref={textRef} style={{ fontFamily: 'cyclothonFont', transform: 'scaleY(1.3)' }} className="title text-white text-[100px] ml-[10px] mt-[250px]">
          Cyclothon'25
        </div>
        <div ref={sloganRef} style={{ fontFamily: 'cyclothonSloganFont', transform: 'scaleY(1.3)' }} className="absolute text-[30px] text-white">- Every Mile, A Salute, Ride for those who Stood for Us</div>
        <div ref={sindoorRef} style={{ fontFamily: 'cyclothonSloganFont', transform: 'scaleY(1.3)' }} className="absolute mt-[150px] ml-[220px] text-[30px] text-white"> Ride for Operation Sindoor</div>
        
       
      </div>
    </div>
  );
}