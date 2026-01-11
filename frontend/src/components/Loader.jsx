import React, { forwardRef, useEffect, useRef } from "react";
import gsap from "gsap";
import './Loader.css';
import LightRays from "@/components/LightRays"; 

const Loader = forwardRef((props, ref) => {
  const overlayRef = useRef(null);
 

  useEffect(() => {
    // Animate overlay sliding out
    gsap.fromTo(
      overlayRef.current,
      { x: "0%" },
      { x: "100%", duration: 2, ease: "power2.inOut" }
    );

  }, []);

  return (
   <div
  ref={ref}
  className="relative overflow-hidden flex justify-center items-center h-screen w-screen bg-black"
>
  {/* BACKGROUND LIGHT RAYS */}
   <div className="absolute inset-0 z-10 pointer-events-none hidden md:block">
  <LightRays
    raysOrigin="top-right"
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

    <div className="absolute inset-0 z-10 pointer-events-none hidden md:block">
      <LightRays
        raysOrigin="top-left"
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

     <div className="absolute inset-0 z-10 pointer-events-none md:hidden block">
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

<div className="absolute inset-0 z-10 pointer-events-none md:hidden block">
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


  {/* FOREGROUND CONTENT */}
  <div className="relative   mt-[-3rem] md:mt-0 z-10 aspect-square h-2/5 md:h-1/2 grid grid-rows-20">
    
    {/* TOP SECTION */}
    <div className="row-span-19 h-full w-full flex justify-center items-center">
      <div className="h-full aspect-square overflow-hidden rounded-2xl">
        <video
          src="/videos/MashalVideo.webm"
          autoPlay
          loop
          muted
          playsInline
          onContextMenu={(e) => e.preventDefault()}
          disablePictureInPicture
          className="w-full h-full object-cover"
        />
      </div>
    </div>

    {/* BOTTOM SECTION */}
    <div className="row-span-1 w-full h-full flex items-center justify-center">
      <div className="loader-spinner"></div>
    </div>

  </div>
</div>


  );
});

export default Loader;