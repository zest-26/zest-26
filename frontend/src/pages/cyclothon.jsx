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

const faqs = [
  {
    question: "What should I bring for the Cyclothon?",
    answer:
      "Bring your own bicycle, helmet (mandatory), water bottle, and comfortable cycling attire. We'll provide the rest!",
  },
  {
    question: "Is there an age limit for participation?",
    answer:
      "Participants must be at least 16 years old. Minors (16-18) need parental consent forms.",
  },
  {
    question: "What happens if it rains on the event day?",
    answer:
      "The event will proceed unless there are severe weather conditions. We'll notify all participants 24 hours in advance if there are any changes.",
  },
  {
    question: "Are there medical facilities available during the ride?",
    answer:
      "Yes, we have medical support teams stationed at multiple points along the route and a dedicated ambulance following the group.",
  },
  {
    question: "Can I switch between 15km and 30km routes on the day of the event?",
    answer:
      "Route changes on the event day are not permitted due to logistics and safety reasons. Please choose your preferred distance during registration.",
  },
];

function FAQSection() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="bg-black h-[900px] w-screen relative">
      {/* Title */}
      <div
        style={{ fontFamily: "cyclothonFont", transform: "scaleY(1.3)" }}
        className="title absolute z-10 text-white text-[50px] ml-[700px] mt-[30px]"
      >
        FAQs
      </div>

      {/* Background image */}
      <div className="absolute z-0 ml-[440px]">
        <img src="FAQTab.jpg" alt="FAQ Background" />
      </div>

      {/* Red FAQ container */}
      <div className=" w-[1000px] h-[500px] absolute mt-[200px] ml-[270px] rounded-xl overflow-y-auto p-6 space-y-4 z-20">
        {faqs.map((faq, index) => (
          <div
            key={index}
            className="bg-[#1a1a1a] rounded-lg p-4 cursor-pointer shadow-md transition"
            onClick={() => toggleFAQ(index)}
          >
            <div className="flex justify-between items-center text-white font-semibold text-lg">
              <span>{faq.question}</span>
              <span className="text-gray-400">{openIndex === index ? "−" : "+"}</span>
            </div>
            {openIndex === index && (
              <div className="mt-2 text-gray-300 text-[20px]">{faq.answer}</div>
            )}
          </div>
        ))}
      </div>
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
    <div>
    <div className="h-screen w-screen relative bg-black">
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
    <div className="relative w-scrren h-[1000px]  bg-[#070811]">
      <div className="absolute"><img src="/cloud.png" className="h-[500px] w-[761px] mt-[370px] z-0" alt="cloud" /></div>
      <div className="absolute"><img src="/cloud-1.png" className="h-[500px] w-[761px] mt-[370px] ml-[761px] z-0" alt="cloud" /></div>
                  
      <div style={{ fontFamily: 'cyclothonSloganFont', transform: 'scaleY(1.9)' }} className="text-xl absolute ml-[450px] mt-[300px]">“Every mile you ride is a salute, every turn of the pedal a tribute.<br/>
         This Cyclothon is for those who stood for us—brave hearts who inspire us <br/>
         to keep moving forward. As wheels spin and paths stretch, we carry <br/>
         their courage with every stride, turning our ride into a journey of <br/> 
         respect, strength, and solidarity. Ride not just for speed, but for a <br/>
         cause that stands tall, just like the heroes we honor.”</div>
         
    </div>
    <div className="relative w-scrren h-[800px]  bg-[#070811]">
      <div className="absolute"><img src="/cloud.png" className="h-[500px] w-[761px] ml-[760px] mt-[-130px] z-0 rotate-180" alt="cloud" /></div>
      <div className="absolute"><img src="/cloud-1.png" className="h-[500px] w-[761px] mt-[-130px] rotate-180 z-0" alt="cloud" /></div>
      <div className="h-[350px] w-[350px]  mt-[300px] ml-[550px] absolute"><img src="/DTL.png" className=""/></div>
      <div className="h-[95px] w-[80px] mt-[295px] ml-[860px] absolute rotate-90"><img src="whiteLine.png"/></div>
      <div className="h-[20px] w-[150px] mt-[292px] ml-[915px] absolute"><img src="whiteLine.png"/></div>
      <div className="h-[20px] w-[150px] mt-[350px] ml-[808px] absolute"><img src="whiteLine.png"/></div>
      <div className="h-[95px] w-[80px] mt-[550px] ml-[860px] absolute rotate-90"><img src="whiteLine.png"/></div>
      <div className="h-[20px] w-[150px] mt-[608px] ml-[915px] absolute"><img src="whiteLine.png"/></div>
      <div className="h-[20px] w-[150px] mt-[550px] ml-[808px] absolute"><img src="whiteLine.png"/></div>
      <div className="h-[95px] w-[80px] mt-[395px] ml-[402px] absolute rotate-90"><img src="whiteLine.png"/></div>
      <div className="h-[20px] w-[150px] mt-[450px] ml-[458px] absolute"><img src="whiteLine.png"/></div>
      <div className="h-[20px] w-[150px] mt-[392px] ml-[352px] absolute"><img src="whiteLine.png"/></div>
      <div className="h-[80px] w-[220px] mt-[320px] ml-[160px] absolute"><img src="/DTLTab.png"/>
         <div style={{ fontFamily: 'cyclothonFont', transform: 'scaleY(1.3)' }} className="title text-white text-[35px] ml-[26px] mt-[-105px]">
            12th Oct
        </div>
      </div>

      <div className="h-[80px] w-[220px] mt-[220px] ml-[1030px] absolute"><img src="/DTLTab.png"/>
         <div style={{ fontFamily: 'cyclothonFont', transform: 'scaleY(1.3)' }} className="title text-white text-[35px] ml-[26px] mt-[-105px]">
            5:00 AM
        </div>
      </div>

      <div className="h-[80px] w-[220px] mt-[535px] ml-[1030px] absolute"><img src="/DTLTab.png"/>
         <div style={{ fontFamily: 'cyclothonFont', transform: 'scaleY(1.3)' }} className="title text-white text-[30px] ml-[42px] mt-[-122px]">
            COEP GROUND
        </div>
      </div>

    </div>
    <div className="bg-black relative w-screen h-[1000px]">
      <div className="absolute h-[200px] w-[200px]  mt-[60px] ml-[644px]"><img src="/categoryTab.jpg"/></div>
      <div style={{ fontFamily: 'cyclothonFont', transform: 'scaleY(1.3)' }} className="absloute text-white text-[25px] ml-[662px] w-[300px] h-[200px] pt-[100px]">CATEGORIES</div>
      <div className=" w-[350px] h-[250px] ml-[310px] mt-[50px] absolute z-10">
        <h1 style={{ fontFamily: 'cyclothonFont', transform: 'scaleY(1.3)' }} className="text-[35px] ml-[120px] mt-[20px]">15 KM</h1>
        <h2 style={{ fontFamily: 'cyclothonFont', transform: 'scaleY(1.3)' }} className="text-[30px] ml-[20px] mt-[31px]">₹499</h2>
        <h2 style={{ fontFamily: 'cyclothonFont', transform: 'scaleY(1.3)' }} className="text-[30px] ml-[247px] mt-[-42px]">₹449</h2>
        <div className="h-[40px] w-[150px] mt-[-52px] ml-[-12px] absolute"><img src="redLine.png"/></div>
        <div className=" w-[400px] h-[400px] mt-[45px]"><img src="RegisterTab1.png"/></div>
        <h2 style={{ fontFamily: 'cyclothonFont', transform: 'scaleY(1.3)' }} className="text-[30px] ml-[140px] mt-[-311px]">Register</h2>
      </div>
      <div className=" w-[350px] h-[250px] ml-[850px] mt-[50px] absolute z-10">
        <h1 style={{ fontFamily: 'cyclothonFont', transform: 'scaleY(1.3)' }} className="text-[35px] ml-[120px] mt-[20px]">15 KM</h1>
        <h2 style={{ fontFamily: 'cyclothonFont', transform: 'scaleY(1.3)' }} className="text-[30px] ml-[20px] mt-[31px]">₹649</h2>
        <h2 style={{ fontFamily: 'cyclothonFont', transform: 'scaleY(1.3)' }} className="text-[30px] ml-[247px] mt-[-42px]">₹549</h2>
        <div className="h-[40px] w-[150px] mt-[-52px] ml-[00px] absolute"><img src="redLine.png"/></div>
        <div className=" w-[400px] h-[400px] mt-[45px]"><img src="RegisterTab1.png"/></div>
        <h2 style={{ fontFamily: 'cyclothonFont', transform: 'scaleY(1.3)' }} className="text-[30px] ml-[140px] mt-[-311px]">Register</h2>
      </div>
      <div className="absolute h-[500px] w-[500px]  mt-[20px] ml-[244px] z-0"><img src="/categoryTab.jpg"/> </div>
      <div className=" w-[350px] h-[250px] ml-[850px] mt-[50px] absolute z-10"></div>
      <div className="absolute h-[500px] w-[500px]  mt-[20px] ml-[774px]"><img src="/categoryTab.jpg"/></div>
      <div className="absolute h-[500px] w-[1300px] mt-[480px] ml-[230px] opacity-50">
        
      <img src='/Jet.png'/>   
      </div>
      
      
    </div>

    <div className="bg-black h-[900px] w-screen realtive">
      <div className="w-[500px] h-[500px] ml-[580px] mt-[100px] absolute"><img src="useGoodies.png"/>
        <div  style={{ fontFamily: 'cyclothonFont', transform: 'scaleY(1.3)' }} className=" absolute text-white text-[40px] ml-[100px] mt-[-80px]">
          Goodies
        </div>
      </div>
      <div className="w-[250px] h-[250px] mt-[470px] ml-[70px] absolute"><img src="useGoodies1.jpg"/></div>
      <div  style={{ fontFamily: 'cyclothonFont', transform: 'scaleY(1.3)' }} className=" absolute text-white text-[40px] ml-[60px] mt-[570px]">
          Welcome Kit
        </div>
      <div className="w-[250px] h-[250px] mt-[470px] ml-[420px] absolute"><img src="useGoodies1.jpg"/></div>
      <div  style={{ fontFamily: 'cyclothonFont', transform: 'scaleY(1.3)' }} className=" absolute text-white text-[40px] ml-[460px] mt-[570px]">
          T-Shirt
        </div>
      <div className="w-[250px] h-[250px] mt-[470px] ml-[850px] absolute"><img src="useGoodies1.jpg"/></div>
      <div  style={{ fontFamily: 'cyclothonFont', transform: 'scaleY(1.3)' }} className=" absolute text-white text-[40px] ml-[910px] mt-[570px]">
          Medal
        </div>
      <div className="w-[250px] h-[250px] mt-[470px] ml-[1200px] absolute"><img src="useGoodies1.jpg"/></div>
      <div  style={{ fontFamily: 'cyclothonFont', transform: 'scaleY(1.3)' }} className=" absolute text-white text-[40px] ml-[1190px] mt-[570px]">
          Refreshment
        </div>
    </div>
    
    <div className="bg-black h-[700px] w-screen relative">
      <FAQSection />
    </div>

    <div className=" bg-black h-[700px] w-screen relative">
      <div className="absolute w-[400px] h-[400px] mt-[200px] ml-[550px]"><img src="/cycloContact.jpg"/></div>
      <div  style={{ fontFamily: 'cyclothonFont', transform: 'scaleY(1.3)' }} className="title absolute text-white text-[50px] ml-[600px] mt-[130px]">
          Contact Us
        </div>
        <div className="absolute w-[350px] mt-[350px] ml-[40px]"><img src="/cycloContact1.jpg"/></div>
        <div className="absolute w-[350px] mt-[350px] ml-[570px]"><img src="/cycloContact1.jpg"/></div>
        <div className="absolute w-[350px] mt-[350px] ml-[1070px]"><img src="/cycloContact1.jpg"/></div>
        <div className=" w-[250px] h-[200px] mt-[400px] ml-[80px] absolute ">
          <h1 style={{ fontFamily: 'cyclothonFont', transform: 'scaleY(1.3)' }} className="text-[35px] ml-[70px]">Palak</h1>
          <h2 style={{ fontFamily: 'cyclothonFont', transform: 'scaleY(1.3)' }} className="text-[25px] ml-[41px] mt-[5px]">8329355527</h2>
        </div>

        <div className=" w-[250px] h-[200px] mt-[400px] ml-[620px] absolute ">
          <h1 style={{ fontFamily: 'cyclothonFont', transform: 'scaleY(1.3)' }} className="text-[35px] ml-[70px]">Palak</h1>
          <h2 style={{ fontFamily: 'cyclothonFont', transform: 'scaleY(1.3)' }} className="text-[25px] ml-[41px] mt-[5px]">8329355527</h2>
        </div>

        <div className=" w-[250px] h-[200px] mt-[400px] ml-[1120px] absolute ">
          <h1 style={{ fontFamily: 'cyclothonFont', transform: 'scaleY(1.3)' }} className="text-[35px] ml-[70px]">Palak</h1>
          <h2 style={{ fontFamily: 'cyclothonFont', transform: 'scaleY(1.3)' }} className="text-[25px] ml-[41px] mt-[5px]">8329355527</h2>
        </div>
    </div>
    </div>
  );
}