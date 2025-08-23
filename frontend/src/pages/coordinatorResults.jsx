import React, { forwardRef, useEffect, useRef } from "react";
import Tabs from "../components/resultsTab";
import gsap from "gsap";
const CoordinatorResults = () => {
  const textRef = useRef(null);
  const overlayRef = useRef(null);

  useEffect(() => {
    

    // Animate text after a small delay
    const letters = textRef.current.querySelectorAll("span");
    gsap.to(letters, {
      opacity: 1,
      y: 0,
      duration: 0.5,
      stagger: 0.05,
      delay: 0.5, // delay before text animation starts
      ease: "power2.out"
    });

   
  }, []);

  useEffect(() => {
    gsap.to(".football", {
    y: -30,
    duration: 1.3,
    repeat: -1,
    yoyo: true,
    ease: "sine.inOut",
  });
 

  }, []);

  return (
    <div className=" relative h-[700px] sm:h-[1090px] flex items-center justify-center bg-gradient-to-b from-black to-[#361701]">
      <div className="absolute h-[950px] sm:h-[930px] bg-gradient-to-b from-[#b94d05] to-black w-full mt-[-900px] sm:mt-[-980px]"></div>
      
      <img src='/football.png' className="football brightness-90 absolute h-[100px] w-[100px] top-[18px] left-[-20px] sm:h-[300px] sm:w-[300px] sm:top-[-40px] sm:left-[-40px]"/>
      <img src='/football.png' className="football brightness-90 absolute h-[100px] w-[100px] top-[18px] right-[-20px] sm:h-[300px] sm:w-[300px] sm:top-[-40px] sm:right-[-40px]"/>
      <img src='/football.png' className="football brightness-90 hidden sm:block absolute  sm:h-[300px] sm:w-[300px] sm:top-[790px] sm:right-[-40px]"/>
      <img src='/football.png' className="football brightness-90 hidden sm:block absolute  sm:h-[300px] sm:w-[300px] sm:top-[790px] sm:left-[-40px]"/>

       {/* Logo at top */}
          <div className="absolute top-[27px] w-[230px] h-[70px] sm:w-[270px] sm:h-[100px] overflow-hidden z-10">
            <img src="/ZEST-26.png" alt="Logo" className="w-full h-full object-contain" />
          </div>

          <h1 className="absolute top-[120px] sm:top-[155px] text-2xl  sm:text-4xl font-bold " ref={textRef}>
            {"Coordinator Results".split("").map((char, index) => (
          <span
            key={index}
            className="inline-block text-white opacity-0 translate-y-[-20px]"
          >
            {char === " " ? "\u00A0" : char}
          </span>
        ))}</h1>

      <div
        className="w-full h-[520px] sm:w-[660px] sm:h-[790px] top-[180px] sm:top-[200px] bg-cover pb-[20px]  bg-center absolute rounded-2xl  shadow-lg overflow-y-auto scrollbar-none"
        style={{ backgroundImage: "url('/bg-6.png')" }} // put bg2.avif in /public folder
      >
        {/* Dark overlay */}
  <div className="absolute inset-0 bg-black/40 h-[1270px] sm:h-[1400px] rounded-2xl z-0"></div>


        {/* Content goes on top of image */}
        <div className="relative z-10 flex flex-col items-center justify-center h-full text-white">
          
          <div className="absolute mr-10 sm:mr-13 sm:top-[30px]   sm:pb-[100px] top-[165px] w-[400px]  rounded-2xl   shadow-md">
            <Tabs />
          </div>
          
        </div>
      </div>
    
    </div>
  );
};

export default CoordinatorResults;
