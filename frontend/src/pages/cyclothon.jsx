import { Canvas, useFrame } from "@react-three/fiber";
import { Bounds, OrbitControls, useGLTF, Center } from "@react-three/drei";
import gsap from "gsap";
import { SplitText } from "gsap/all";
import { useRef, useState, useEffect } from "react";
import { Calendar, Clock, MapPin} from "lucide-react";
import { ScrollTrigger } from "gsap/ScrollTrigger";


gsap.registerPlugin(SplitText);
 gsap.registerPlugin(ScrollTrigger);

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
function InfiniteRow({ images, reverse = false, speed = 30,className }) {
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
    <div className={`overflow-hidden w-full ${className || ""}`}>
      <div ref={rowRef} className="flex" style={{ width: "max-content" }}>
        {[...images, ...images].map((img, i) => (
          <div
            key={i}
            className="h-[100px] sm:min-w-[250px] sm:h-[210px] mx-2 rounded-xl shadow-lg overflow-hidden"
          >
            <img
              src={img}
              alt="row-img"
              className="object-cover w-full h-full"
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
    <div className="absolute inset-0 z-0 flex flex-col gap-6 opacity-30 ">
      <InfiniteRow images={row1} reverse={false} speed={40} />
      <InfiniteRow images={row2} reverse={true} speed={50} />
      <InfiniteRow images={row3} reverse={false} speed={35} />
      <InfiniteRow images={row4} reverse={true} speed={45} />
      <InfiniteRow images={row1} reverse={true} speed={45} className="block sm:hidden"/>
       <InfiniteRow images={row2} reverse={true} speed={45} className="block sm:hidden"/>
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
    <div className="bg-black h-[900px] w-full relative">
      {/* Title */}
      <div
        style={{ fontFamily: "cyclothonFont", transform: "scaleY(1.3)" }}
        className="title absolute z-10 left-1/2 -translate-x-1/2 sm:left-auto sm:translate-x-0 text-white sm:text-[50px] text-[30px] mt-[255px] sm:ml-[700px] sm:mt-[30px]"
      >
        FAQs
      </div>

      {/* Background image */}
      <div className="absolute z-0 ml-[20px] sm:mt-[0px] mt-[240px] sm:ml-[440px]">
        <img src="FAQTab.jpg" alt="FAQ Background" />
      </div>

      {/* Red FAQ container */}
      <div className=" sm:w-[1000px] mt-[400px] sm:h-[500px] absolute sm:mt-[200px] sm:ml-[270px] rounded-xl overflow-y-auto p-6 space-y-4 z-20">
        {faqs.map((faq, index) => (
          <div
            key={index}
            className="bg-[#1a1a1a] rounded-lg p-4 cursor-pointer shadow-md transition"
            onClick={() => toggleFAQ(index)}
          >

            <div style={{ fontFamily: "SharpAxe", transform: "scaleY(1.3)" }} className="flex items-center justify-between text-xl font-semibold text-white sm:text-2xl">

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
 const discriptionRef = useRef();
  const dtlContainerRef = useRef(null);
  const dtlRef = useRef(null);
  const dtlOtherRef = useRef([]); // holds all other elements
   const soldierRHS = useRef(null);
  const soldierLHS = useRef(null);

  
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
     gsap.set(dtlOtherRef.current, { opacity: 0, y: 50 });

      const isSmallScreen = window.matchMedia("(max-width: 639px)").matches;

  

  const tl = gsap.timeline();

 if (!isSmallScreen) {
    // Run animation only for sm and larger
    tl.to(".movable", {
      x: 390,
      delay: 2.9,
      duration: 0.7,
      ease: "power3.inOut",
      onComplete: () => {
        setEnableSwaying(true);
      }
    });
  } else {
    // Make sure .movable stays in place for small screens
    gsap.set(".movable", { x: 0 });
     setEnableSwaying(true);
     tl.to({}, { duration: 3 });
  }

  tl.to([coepLogoRef.current, zestLogoRef.current], {
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

    const split = new SplitText(discriptionRef.current, { type: "lines" });

    gsap.from(split.lines, {
      opacity: 0,
      y: 50,
      duration: 0.8,
      stagger: 0.3,
      ease: "power3.out",
      scrollTrigger: {
        trigger: discriptionRef.current,
        start: "top 85%",
      },

      
    });


    const t2 = gsap.timeline({
      scrollTrigger: {
        trigger: dtlContainerRef.current,
         start: isSmallScreen ? "top 30%" : "top 20%", // Start when top of element hits bottom of viewport
        end: "bottom top",
        toggleActions: "play none none reverse",
        onRefresh: () => console.log("ScrollTrigger refreshed"),
        onEnter: () => console.log("ScrollTrigger entered"),
      },
    });

    // Rotate DTL.png 360 degrees
    t2.to(dtlRef.current, { rotation: 720, duration: 1, ease: "power2.inOut" });

    // Fade in and slide up other elements
    t2.to(
      dtlOtherRef.current,
      {
        opacity: 1,
        y: 0,
        delay: 0.5,
        duration: 0.8,
        ease: "power3.out",
      },
      "-=0.5"
    );

     gsap.fromTo(
      soldierRHS.current,
      { x: 0, rotation: 35, opacity: 0 },
      {
        x: -160,
        rotation: 0,
        opacity: 1,
        scrollTrigger: {
          trigger: soldierRHS.current,
          start: "top 40%",
          end: "top 10%",
          scrub: true, // smooth animation linked to scroll
        },
      }
    );

    gsap.fromTo(
      soldierLHS.current,
      { x: 0, rotation: -35, opacity: 0 },
      {
        x: 160,
        rotation: 0,
        opacity: 1,
        scrollTrigger: {
          trigger: soldierLHS.current,
          start: "top 40%",
          end: "top 10%",
          scrub: true,
        },
      }
    );

}, []);

  return (
    <div className="w-full min-h-screen overflow-x-hidden">
    <div className="relative w-full h-screen bg-black">
      <BackgroundScroller />

      <div className="absolute top-[5%] left-0 w-full flex flex-wrap justify-center gap-[15vw] sm:gap-0 items-start sm:justify-start sm:space-x-10 sm:ml-[200px] sm:mt-[20px]">
  {/* COEP Logo */}
  <div ref={coepLogoRef}>
    <img
      src="/CoepLogo.png"
      className="h-[80px] w-[80px] sm:h-[200px] sm:w-[200px]"
      alt="COEP Logo"
    />
  </div>

  {/* ZEST Logo */}
  <div ref={zestLogoRef}>
    <img
      src="/ZEST-26.png"
      className="h-[80px] w-[110px] sm:h-[200px] sm:w-[290px]"
      alt="ZEST Logo"
    />
  </div>
</div>
      {/* Helmet box */}
      <div ref={helmetBoxRef} className=" z-10 movable h-[300px] w-[300px] absolute rounded-xl ml-[600px] mt-[40px]">
        <Canvas camera={{ position: [0, 0, 10], fov: 50 }}>
          <ambientLight intensity={1} />
          <directionalLight position={[5, 5, 5]} />

          <Bounds fit clip observe margin={1.2}>
            <Helmet enableSwaying={enableSwaying} />
          </Bounds>

          <OrbitControls enableZoom={false}   
  enableRotate={false}
  enablePan={false}
     />
        </Canvas>
      </div>

      <div className="absolute inset-0 z-10 flex items-center justify-center">
  <div className="movable h-[300px] w-[300px] sm:h-[690px] sm:w-[690px]">
    <Canvas camera={{ position: [-27, 25, -43], fov: 50 }}>
      <ambientLight intensity={1.3} />
      <directionalLight position={[27, 40, -43]} />
      <Cycle enableSwaying={enableSwaying} />
    </Canvas>
  </div>
</div>

      
      <div className="absolute z-10 w-full flex flex-col items-center sm:block sm:h-[600px] sm:w-[800px] sm:mt-[70px] sm:ml-[100px]">
  {/* Main title */}
  <div
    ref={textRef}
    style={{ fontFamily: 'cyclothonFont', transform: 'scaleY(1.3)' }}
    className="text-white text-[40px] mt-[20vh] sm:text-[100px] sm:ml-[10px] sm:mt-[250px]"
  >
    Cyclothon'25
  </div>

  {/* Slogan */}
  <div
    ref={sloganRef}
    style={{ fontFamily: 'cyclothonSloganFont', transform: 'scaleY(1.3)' }}
    className="text-white text-[20px] mt-[350px] text-center sm:absolute sm:ml-[0px] sm:mt-[0px] sm:text-[30px]"
  >
    - Every Mile, A Salute, Ride for those who Stood for Us
  </div>

  {/* Sindoor text, only for sm+ */}
  <div
    ref={sindoorRef}
    style={{ fontFamily: 'cyclothonSloganFont', transform: 'scaleY(1.3)' }}
    className="hidden sm:block absolute text-[20px] ml-[220px] mt-[150px] sm:text-[30px] text-white"
  >
    Ride for Operation Sindoor
  </div>
</div>
      

    </div>
    <div className="relative w-scrren h-[800px] sm:h-[1000px] bg-[#070811]" >
       <div className="absolute bottom-0 w-full sm:bottom-auto">
  <img 
    src="/cloud.png" 
    alt="cloud" 
    className="w-full h-auto  sm:mt-[370px] z-0 sm:h-[500px] sm:w-[761px]" 
  />
</div>
      <div className="absolute hidden sm:block"><img src="/cloud-1.png" className="h-[500px] w-[761px] mt-[370px] ml-[761px] z-0" alt="cloud" /></div>
                  
      <div ref={discriptionRef} style={{ fontFamily: 'cyclothonSloganFont', transform: 'scaleY(1.9)' }} className="text-white mt-[200px] w-full ml-[10px] sm:text-xl absolute sm:ml-[450px] sm:mt-[300px]">{/* Desktop / sm and above */}
     
  <span className="hidden sm:block text-center mr-[900px]">
    “Every mile you ride is a salute, every turn of the pedal a tribute.<br/>
    This Cyclothon is for those who stood for us—brave hearts who inspire us <br/>
    to keep moving forward. As wheels spin and paths stretch, we carry <br/>
    their courage with every stride, turning our ride into a journey of <br/> 
    respect, strength, and solidarity. Ride not just for speed, but for a <br/>
    cause that stands tall, just like the heroes we honor.”
  </span>

  {/* Mobile */}

  <div className="flex justify-center w-full sm:hidden">
   <span className="block px-6 text-center sm:hidden">

    “Every mile you ride is a salute,<br/> every turn of the pedal a tribute.<br/>
    This Cyclothon is for those who<br/> stood for us—brave hearts who inspire<br/> us
    to keep moving forward.<br/> 
  </span></div></div>
         
    </div>
    <div  ref={dtlContainerRef} className="relative w-full h-[800px] sm:h-[800px] bg-[#070811]">
      <div className="absolute hidden sm:block"><img src="/cloud.png" className=" h-[500px] w-[761px] ml-[760px] mt-[-130px] z-0 rotate-180" alt="cloud" /></div>
     <div className="absolute mt-[-1px] sm:mt-[0px] w-full">
    <img
    src="/cloud-1.png"
    alt="cloud"
    className="w-full  h-auto  sm:mt-[-130px] sm:h-[500px] sm:w-[761px] rotate-180 z-0 "
  />
</div>
    <div className=" w-[300px] h-[400px] 
                  absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-2/12
                  sm:top-auto sm:left-auto sm:translate-x-0 sm:translate-y-0 sm:w-[0px] sm:h-[0px]">
      <div  ref={dtlRef} className="sm:h-[350px] h-[200px] w-[200px]  sm:w-[350px] ml-[45px] mt-[70px]  sm:mt-[300px] sm:ml-[550px] absolute"><img src="/DTL.png" className=""/></div>
      <div ref={(el) => (dtlOtherRef.current[0] = el)} className="mt-[37px] ml-[5px] h-[95px] w-[80px] sm:mt-[295px] sm:ml-[860px] absolute rotate-90"><img src="whiteLine.png"/></div>
      <div ref={(el) => (dtlOtherRef.current[1] = el)} className="h-[20px] w-[150px] hidden sm:block mt-[292px] ml-[915px] absolute"><img src="whiteLine.png"/></div>
      <div ref={(el) => (dtlOtherRef.current[2] = el)} className="h-[20px] w-[150px] hidden sm:block mt-[350px] ml-[808px] absolute"><img src="whiteLine.png"/></div>
      <div ref={(el) => (dtlOtherRef.current[3] = el)} className="h-[95px] w-[80px] mt-[37px] ml-[135px] sm:mt-[550px] sm:ml-[860px] absolute rotate-90"><img src="whiteLine.png"/></div>
      <div ref={(el) => (dtlOtherRef.current[4] = el)} className="h-[20px] w-[150px] hidden sm:block mt-[608px] ml-[915px] absolute"><img src="whiteLine.png"/></div>
      <div ref={(el) => (dtlOtherRef.current[5] = el)} className="h-[20px] w-[150px] hidden sm:block mt-[550px] ml-[808px] absolute"><img src="whiteLine.png"/></div>
      <div ref={(el) => (dtlOtherRef.current[6] = el)} className="h-[95px] w-[80px] ml-[65px] mt-[230px] sm:mt-[395px] sm:ml-[402px] absolute rotate-90"><img src="whiteLine.png"/></div>
      <div ref={(el) => (dtlOtherRef.current[7] = el)} className="h-[20px] w-[150px] hidden sm:block mt-[450px] ml-[458px] absolute"><img src="whiteLine.png"/></div>
      <div ref={(el) => (dtlOtherRef.current[8] = el)} className="h-[20px] w-[150px]  hidden sm:block mt-[392px] ml-[352px] absolute"><img src="whiteLine.png"/></div>
      <div ref={(el) => (dtlOtherRef.current[9] = el)} className="sm:h-[80px] h-[40px] w-[140px] mt-[-45px] ml-[10px] sm:w-[220px] sm:mt-[320px] sm:ml-[160px] absolute"><img src="/DTLTab.png"/>
         <div style={{ fontFamily: 'cyclothonFont', transform: 'scaleY(1.3)' }} className="title text-white text-[22px] mt-[-60px] ml-[20px] sm:text-[35px] sm:ml-[26px] sm:mt-[-105px]">
            12th Oct
        </div>
      </div>

      <div ref={(el) => (dtlOtherRef.current[10] = el)} className="sm:h-[80px] h-[40px] w-[140px] mt-[-45px] ml-[145px] sm:w-[220px]  sm:mt-[220px] sm:ml-[1030px] absolute"><img src="/DTLTab.png"/>
         <div style={{ fontFamily: 'cyclothonFont', transform: 'scaleY(1.3)' }} className="title text-white text-[22px] mt-[-60px] ml-[25px] sm:text-[35px] sm:ml-[26px] sm:mt-[-105px]">
            5:00 AM
        </div>
      </div>

      <div ref={(el) => (dtlOtherRef.current[11] = el)} className="sm:h-[80px] h-[40px] w-[150px] ml-[65px] mt-[285px]  sm:w-[220px] sm:mt-[535px] sm:ml-[1030px] absolute"><img src="/DTLTab.png"/>
         <div style={{ fontFamily: 'cyclothonFont', transform: 'scaleY(1.3)' }} className="title text-white ml-[25px] mt-[-80px] text-[22px] sm:text-[30px] sm:ml-[42px] sm:mt-[-122px]">
            COEP GROUND
        </div>
      </div>
      </div>
    </div>

    <div className="bg-black relative w-full sm:h-[1500px] h-[1000px]">
    
      <div className="absolute 
                sm:h-[200px] h-[130px] 
                w-[150px] sm:w-[200px] 
                sm:ml-[644px] ml-0 
                sm:mt-[60px] mt-[20px]
                left-1/2 -translate-x-1/2 sm:left-auto sm:translate-x-0"><img src="/categoryTab.jpg"/></div>
      <div style={{ fontFamily: 'cyclothonFont', transform: 'scaleY(1.3)' }} className="absolute text-white 
             left-1/2 -translate-x-1/2 ml-0 pt-[50px]
             sm:ml-[662px] sm:left-auto sm:translate-x-0 
             sm:text-[25px] sm:w-[300px] sm:mt-[55px] sm:h-[200px]">CATEGORIES</div>
    
      <div className="left-1/2 -translate-x-1/2 sm:left-auto sm:translate-x-0  sm:w-[350px] w-[250px] h-[250px]  text-white sm:h-[250px] sm:ml-[310px] sm:mt-[310px] mt-[100px] absolute z-10">
        <h1 style={{ fontFamily: 'cyclothonFont', transform: 'scaleY(1.3)' }} className="sm:text-[35px] text-[25px] ml-[90px] mt-[110px] sm:ml-[120px] sm:mt-[20px]">15 KM</h1>
        <h2 style={{ fontFamily: 'cyclothonFont', transform: 'scaleY(1.3)' }} className="sm:text-[30px] text-[25px] ml-[10px] mt-[30px] sm:ml-[20px] sm:mt-[31px]">₹499</h2>
        <h2 style={{ fontFamily: 'cyclothonFont', transform: 'scaleY(1.3)' }} className="sm:text-[30px] text-[25px] ml-[160px] mt-[-40px] sm:ml-[247px] sm:mt-[-42px]">₹449</h2>
        <div className="sm:h-[40px] h-[40px] w-[100px] ml-[-5px] mt-[-35px] sm:w-[150px] sm:mt-[-52px] sm:ml-[-12px] absolute"><img src="redLine.png"/></div>
        <div className=" sm:w-[400px] sm:h-[400px] sm:ml-[0px] ml-[5px] w-[300px] h-[300p] mt-[-5px] sm:mt-[45px] "><a href="https://unstop.com/o/sHZkuV8?lb=GzoB9Yag" target="_blank" rel="noopener noreferrer"><div className="transition-all duration-300 transform hover:scale-105 hover:brightness-110"><img src="RegisterTab1.png"/><h2 style={{ fontFamily: 'cyclothonFont', transform: 'scaleY(1.3)' }} className="sm:text-[30px] sm:ml-[140px] text-[25px] ml-[100px] mt-[-90px] sm:mt-[-121px]">Register</h2></div></a></div>
        
      </div>
      <div className="left-1/2 -translate-x-1/2 sm:left-auto sm:translate-x-0  sm:w-[350px] w-[250px] h-[250px] mt-[450px] sm:h-[250px] sm:ml-[850px] text-white sm:mt-[310px] absolute z-10">
          <h1 style={{ fontFamily: 'cyclothonFont', transform: 'scaleY(1.3)' }} className="sm:text-[35px] text-[25px] ml-[15px] mt-[110px] text-center sm:ml-[50px] sm:mt-[20px]">15 KM [Corporate]</h1>
        <h2 style={{ fontFamily: 'cyclothonFont', transform: 'scaleY(1.3)' }} className="sm:text-[30px] text-[25px] ml-[10px] mt-[15px] sm:ml-[20px] sm:mt-[31px]">₹499</h2>
        <h2 style={{ fontFamily: 'cyclothonFont', transform: 'scaleY(1.3)' }} className="sm:text-[30px] text-[25px] ml-[160px] mt-[-35px] sm:ml-[247px] sm:mt-[-42px]">₹449</h2>
        <div className="sm:h-[40px] h-[40px] w-[100px] ml-[-5px] mt-[-35px] sm:w-[150px] sm:mt-[-52px] sm:ml-[-12px] absolute"><img src="redLine.png"/></div>
        <div className=" sm:w-[400px] sm:h-[400px] sm:ml-[0px] ml-[5px] w-[300px] h-[300p] mt-[-35px] sm:mt-[-5px] "><a href="https://unstop.com/o/SFZjqcl?lb=GzoB9Yag" target="_blank" rel="noopener noreferrer"><div className="transition-all duration-300 transform hover:scale-105 hover:brightness-110"><img src="RegisterTab1.png"/><h2 style={{ fontFamily: 'cyclothonFont', transform: 'scaleY(1.3)' }} className="sm:text-[30px] sm:ml-[140px] text-[25px] ml-[100px] mt-[-90px] sm:mt-[-121px]">Register</h2></div></a></div>
        
      </div>
      <div className="left-1/2 -translate-x-1/2 sm:left-auto sm:translate-x-0 sm:w-[350px] w-[250px] h-[250px] mt-[795px] sm:h-[250px] sm:ml-[570px] text-white sm:mt-[710px] absolute z-10">
        <h1 style={{ fontFamily: 'cyclothonFont', transform: 'scaleY(1.3)' }} className="sm:text-[35px] text-[25px] ml-[90px] mt-[110px] sm:ml-[120px] sm:mt-[20px]">30 KM</h1>
        <h2 style={{ fontFamily: 'cyclothonFont', transform: 'scaleY(1.3)' }} className="sm:text-[30px] text-[25px] ml-[10px] mt-[30px] sm:ml-[20px] sm:mt-[31px]">₹699</h2>
        <h2 style={{ fontFamily: 'cyclothonFont', transform: 'scaleY(1.3)' }} className="sm:text-[30px] text-[25px] ml-[160px] mt-[-40px] sm:ml-[247px] sm:mt-[-42px]">₹549</h2>
        <div className="sm:h-[40px] h-[40px] w-[100px] ml-[-5px] mt-[-30px] sm:w-[150px] sm:mt-[-52px] sm:ml-[-12px] absolute"><img src="redLine.png"/></div>
        <div className=" sm:w-[400px] sm:h-[400px] sm:ml-[0px] ml-[5px] w-[300px] h-[300p] mt-[-5px] sm:mt-[45px] "><a href="https://unstop.com/o/QZTjaIL?lb=GzoB9Yag" target="_blank" rel="noopener noreferrer"><div className="transition-all duration-300 transform hover:scale-105 hover:brightness-110"><img src="RegisterTab1.png"/><h2 style={{ fontFamily: 'cyclothonFont', transform: 'scaleY(1.3)' }} className="sm:text-[30px] sm:ml-[140px] text-[25px] ml-[100px] mt-[-90px] sm:mt-[-121px]">Register</h2></div></a></div>

      </div>
      <div className="absolute sm:h-[500px] sm:w-[500px] h-[300px] left-1/2 -translate-x-1/2 sm:left-auto sm:translate-x-0  mt-[180px] w-[300px]  sm:mt-[280px] sm:ml-[244px] z-0"><img src="/categoryTab.jpg"/> </div>
      
      <div className="left-1/2 -translate-x-1/2 sm:left-auto sm:translate-x-0 absolute sm:h-[500px] sm:w-[500px] h-[300px]  mt-[530px] w-[300px]  sm:mt-[280px] sm:ml-[790px] z-0"><img src="/categoryTab.jpg"/></div>
      <div className="left-1/2 -translate-x-1/2 sm:left-auto sm:translate-x-0 absolute sm:h-[500px] sm:w-[500px] h-[300px]  mt-[880px] w-[300px]  sm:mt-[680px] sm:ml-[510px] z-0"><img src="/categoryTab.jpg"/></div>
      <div className="absolute sm:h-[500px] sm:w-[1300px] sm:mt-[1080px] mt-[1210px] sm:ml-[230px] opacity-50">
        
      <img src='/Jet.png'/>   
      </div>
      
      
    </div>

    <div className="bg-black sm:h-[900px] h-[1500px] w-full realtive">
      <div className="left-1/2 -translate-x-1/2 sm:left-auto sm:translate-x-0 sm:w-[500px] w-[300px] h-[300px] mt-[350px] sm:h-[500px]  sm:ml-[580px] sm:mt-[100px] absolute"><img src="useGoodies.png" />
        <div  style={{ fontFamily: 'cyclothonFont', transform: 'scaleY(1.3)' }} className=" absolute ml-[-5px] left-1/2 -translate-x-1/2 sm:left-auto sm:translate-x-0 text-white text-[30px] sm:text-[40px] sm:ml-[100px]  mt-[-55px] sm:mt-[-80px]">
          Goodies
        </div>
      </div>
      <div className=" left-1/2 -translate-x-1/2 sm:left-auto sm:translate-x-0 w-[250px] h-[250px] sm:mt-[470px] mt-[550px]  sm:ml-[70px] absolute"><img src="useGoodies1.jpg"/></div>
      <div  style={{ fontFamily: 'cyclothonFont', transform: 'scaleY(1.3)' }} className=" absolute left-1/2 -translate-x-1/2 sm:left-auto sm:translate-x-0 text-white text-[35px] sm:text-[40px] text-center  mt-[650px] sm:ml-[60px] sm:mt-[570px]">
          Welcome Kit
        </div>
      <div className="w-[250px] h-[250px] sm:mt-[470px] mt-[800px] left-1/2 -translate-x-1/2 sm:left-auto sm:translate-x-0  sm:ml-[400px] absolute"><img src="useGoodies1.jpg"/></div>
      <div  style={{ fontFamily: 'cyclothonFont', transform: 'scaleY(1.3)' }} className=" absolute text-white text-[35px] sm:text-[40px] left-1/2 -translate-x-1/2 sm:left-auto sm:translate-x-0 mt-[900px] sm:ml-[440px] sm:mt-[570px]">
          T-Shirt
        </div>
      <div className="w-[250px] h-[250px] sm:mt-[470px] mt-[1050px] left-1/2 -translate-x-1/2 sm:left-auto sm:translate-x-0 sm:ml-[850px] absolute"><img src="useGoodies1.jpg"/></div>
      <div  style={{ fontFamily: 'cyclothonFont', transform: 'scaleY(1.3)' }} className=" absolute text-white text-[35px] sm:text-[40px] left-1/2 -translate-x-1/2 sm:left-auto sm:translate-x-0 mt-[1150px] sm:ml-[905px] sm:mt-[570px]">
          Medal
        </div>
       <div className="w-[250px] h-[250px] sm:mt-[470px] mt-[1300px] left-1/2 -translate-x-1/2 sm:left-auto sm:translate-x-0 sm:ml-[1170px] absolute"><img src="useGoodies1.jpg"/></div>
      <div  style={{ fontFamily: 'cyclothonFont', transform: 'scaleY(1.3)' }} className=" absolute text-white text-[35px] sm:text-[40px] left-1/2 -translate-x-1/2 sm:left-auto sm:translate-x-0 mt-[1400px] sm:ml-[1155px] sm:mt-[570px]">
          Refreshment
        </div>
    </div>
    
    <div className=" bg-black sm:h-[700px] h-[1100px] w-full relative">
      <div ref={soldierRHS} style={{
    right: `calc(100vw * 1/100)`, // 2/3 from the right
  }} className="absolute h-[200px] w-[200px]  sm:h-[400px] z-10 sm:w-[400px] sm:mt-[-150px] sm:ml-[1160px] rotate-15"><img src="/soldier.png"/></div>
      <div style={{
    left: `calc(100vw * 1/100)`, // 2/3 from the right
  }} ref={soldierLHS} className="absolute h-[200px] w-[200px]   sm:h-[400px] z-10 sm:w-[400px] sm:mt-[-150px] sm:ml-[-50px] rotate-345"><img src="/soldierLHS.png"/></div>
      <FAQSection />
    </div>

    <div className=" bg-black sm:h-[700px] h-[1200px] w-full relative">
      <div className="left-1/2 -translate-x-1/2 sm:left-auto sm:translate-x-0 absolute w-[300px] h-[300px] mt-[300px] sm:w-[400px] sm:h-[400px] sm:mt-[200px] sm:ml-[550px]"><img src="/cycloContact.jpg"/></div>
      <div  style={{ fontFamily: 'cyclothonFont', transform: 'scaleY(1.3)' }} className="left-1/2 text-center -translate-x-1/2 sm:left-auto sm:translate-x-0 title absolute text-white sm:text-[50px] text-[30px] mt-[250px]  sm:ml-[630px] sm:mt-[130px]">
          Contact
        </div>

        <div className="absolute sm:w-[350px] left-1/2 -translate-x-1/2 sm:left-auto sm:translate-x-0 sm:mt-[350px] mt-[400px] w-[300px]  sm:ml-[40px]"><img src="/cycloContact1.jpg"/></div>
        <div className="absolute sm:w-[350px] sm:mt-[350px] sm:ml-[570px] mt-[620px] left-1/2 -translate-x-1/2 sm:left-auto sm:translate-x-0 w-[300px]"><img src="/cycloContact1.jpg"/></div>
        <div className="absolute sm:w-[350px] sm:mt-[350px] sm:ml-[1070px] mt-[820px] left-1/2 -translate-x-1/2 sm:left-auto sm:translate-x-0 w-[300px]"><img src="/cycloContact1.jpg"/></div>
        <div className=" w-[250px] text-white h-[200px] sm:mt-[400px] mt-[480px] left-1/2 -translate-x-1/2 sm:left-auto sm:translate-x-0 sm:ml-[80px] absolute ">
          <h1 style={{ fontFamily: 'cyclothonFont', transform: 'scaleY(1.3)' }} className="sm:text-[35px] text-[25px] text-center sm:ml-[10px] ">Sahil Watharkar</h1>
          <a href="tel:9021916354" style={{ fontFamily: 'cyclothonFont', transform: 'scaleY(1.3)' }} className="text-[25px] ml-[41px] mt-[5px] block">9021916354</a>
        </div>

        <div className=" w-[250px] h-[200px] sm:mt-[400px] sm:ml-[620px] mt-[680px] left-1/2 -translate-x-1/2 sm:left-auto sm:translate-x-0 text-white  absolute ">
          <h1 style={{ fontFamily: 'cyclothonFont', transform: 'scaleY(1.3)' }} className="sm:text-[35px] text-[25px] text-center sm:ml-[10px]">Yash Wankhede</h1>
          <a href="tel:7972105985" style={{ fontFamily: 'cyclothonFont', transform: 'scaleY(1.3)' }} className="text-[25px] ml-[41px] mt-[5px] block">7972105985</a>
        </div>

        <div className=" w-[250px] h-[200px] sm:mt-[400px] sm:ml-[1120px] mt-[880px] left-1/2 -translate-x-1/2 sm:left-auto sm:translate-x-0 text-white absolute ">
          <h1 style={{ fontFamily: 'cyclothonFont', transform: 'scaleY(1.3)' }} className="sm:text-[35px] text-[25px] text-center sm:ml-[10px]">Deep Vaidya</h1>
          <a href="tel:8308468234" style={{ fontFamily: 'cyclothonFont', transform: 'scaleY(1.3)' }} className="text-[25px] ml-[41px] mt-[5px] block">8308468234</a>

        </div>

    </div>
    </div>
  );
}