import { Canvas, useFrame } from "@react-three/fiber";
import { Bounds, OrbitControls, useGLTF, Center } from "@react-three/drei";
import gsap from "gsap";
import { SplitText } from "gsap/all";
import { useRef, useState,useEffect } from "react";
import { Calendar, Clock, MapPin } from "lucide-react";

gsap.registerPlugin(SplitText);

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
   const textRef = useRef();
    const sloganRef = useRef();
    const sindoorRef = useRef();
  const infoRefs = useRef([]); // array for event info lines


  useEffect(() => {
    // hide everything initially
    gsap.set(helmetBoxRef.current, { opacity: 0, y: -30 });
    gsap.set(textRef.current, { opacity: 0 });
    gsap.set(sloganRef.current, { opacity: 0, y: 20 });
    gsap.set(sindoorRef.current, { opacity: 0, y: 20 });
    gsap.set(infoRefs.current, { opacity: 0, y: 20 });

    gsap.to(helmetBoxRef.current, {
      y: 0,
      opacity: 1,
      duration: 1,
      delay: 2.5,
      ease: "elastic.out(1, 0.3)",
      onComplete: () => {
        gsap.to(".movable", {
          x: 390,
          duration: 0.7,
          ease: "power3.inOut",
          onComplete: () => {
            const heroSplit = new SplitText(textRef.current, {
              type: "chars, words",
            });

            heroSplit.chars.forEach((char) =>
              char.classList.add("text-gradient")
            );

            gsap.set(textRef.current, { opacity: 1 });

            gsap.from(heroSplit.chars, {
              yPercent: 15,
              duration: 0.4,
              ease: "expo.out",
              stagger: 0.03,
              onComplete: () => {
                // === Animate slogan, Sindoor text, and event info in sequence ===
                const tl = gsap.timeline();
                tl.to(sloganRef.current, {
                  opacity: 1,
                  y: 0,
                  duration: 0.4,
                  ease: "power3.out",
                })
                  .to(sindoorRef.current, {
                    opacity: 1,
                    y: 0,
                    duration: 0.4,
                    ease: "power3.out",
                  })
                  .to(infoRefs.current, {
                    opacity: 1,
                    y: 0,
                    duration: 0.4,
                    ease: "power3.out",
                    stagger: 0.2, // reveal event info one by one
                  });
              },
            });
          },
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
        <div  ref={textRef} style={{ fontFamily: 'cyclothonFont',transform: 'scaleY(1.3)', }} className="title text-white text-[100px] ml-[10px] mt-[10px] ">
          Cyclothon'25
        </div>
        <div ref={sloganRef} style={{ fontFamily: 'cyclothonSloganFont',transform: 'scaleY(1.3)', }} className="absolute text-[30px] text-white">- Every Mile, A Salute, Ride for those who Stood for Us</div>
        <div ref={sindoorRef} style={{ fontFamily: 'cyclothonSloganFont',transform: 'scaleY(1.3)', }} className="absolute mt-[150px] ml-[220px] text-[30px] text-white"> Ride for Operation Sindoor</div>
       {/* Event Info */}
<div
  style={{ fontFamily: "cyclothonSloganFont", transform: "scaleY(1.3)" }}
  className="absolute text-[25px] text-white mt-[260px] ml-[300px]"
>
  {[
    { icon: <Calendar size={22} className="mr-2 h-[30px] w-[30px]" />, text: "12th October" },
    { icon: <Clock size={22} className="mr-2 h-[30px] w-[30px]"  />, text: "5:30 am" },
    { icon: <MapPin size={22} className="mr-2 h-[30px] w-[30px]" />, text: "COEP Ground" },
  ].map((item, i) => (
    <div
      key={i}
      ref={(el) => (infoRefs.current[i] = el)}
      className="flex items-center gap-2 opacity-0 mb-2"
    >
      {item.icon}
      <span>{item.text}</span>
    </div>
  ))}
</div>

      </div>
      
    </div>
  );
}