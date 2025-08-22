import React, { forwardRef, useEffect, useRef } from "react";
import gsap from "gsap";

const Loader = forwardRef((props, ref) => {
  const overlayRef = useRef(null);
  const textRef = useRef(null);
  const leftImgRefs = [useRef(null), useRef(null), useRef(null)];
  const rightImgRefs = [useRef(null), useRef(null), useRef(null)];
  const blackoutRef = useRef(null);

  useEffect(() => {
    // Animate overlay sliding out
    gsap.fromTo(
      overlayRef.current,
      { x: "0%" },
      { x: "100%", duration: 2, ease: "power2.inOut" }
    );

    // Animate text after a small delay
    const letters = textRef.current.querySelectorAll("span");
    gsap.to(letters, {
      opacity: 1,
      y: 0,
      duration: 0.5,
      stagger: 0.05,
      delay: 1.0, // delay before text animation starts
      ease: "power2.out"
    });

    // Animate LHS images (from left to their position)
    leftImgRefs.forEach((ref, i) => {
      gsap.fromTo(
        ref.current,
        { x: "-150%", opacity: 0 }, // starting point (far left + invisible)
        { x: "0%", opacity: 1, duration: 1.5, delay: i * 0.3, ease: "power3.out" } // final
      );
    });

    // Animate RHS images (from right to their position)
    rightImgRefs.forEach((ref, i) => {
      gsap.fromTo(
        ref.current,
        { x: "150%", opacity: 0 }, // starting point (far right + invisible)
        { x: "0%", opacity: 1, duration: 1.5, delay: i * 0.3, ease: "power3.out" } // final
      );
    });
  }, []);

  return (
    <div
      ref={ref} // This ref will be used to fade out
      className="relative h-screen w-screen bg-black flex flex-col items-center justify-center"
    >
      {/* Floating Images - Left Side */}
      <img
        ref={leftImgRefs[0]}
        src="/footballLoader.avif"
        className="left-img w-40 h-40 top-[35px] left-[1px]  absolute sm:top-[-1px] sm:left-[15px] sm:w-70 sm:h-70 rotate-[-25deg] opacity-70"
      />

      <img
        ref={leftImgRefs[1]}
        src="/badmintonLoader.avif"
        className="left-img w-30 h-30 hidden sm:block top-[300px] left-[1px] absolute z-11 sm:z-0 sm:top-[250px] sm:left-[15px] sm:w-70 sm:h-70 rotate-[25deg] opacity-70"
      />
      
      <img
        ref={leftImgRefs[2]}
        src="/cricketLoader.avif"
        className="left-img absolute w-40 h-40 top-[665px] left-[1px] sm:top-[500px] sm:left-[15px] sm:w-70 sm:h-70 rotate-[-25deg] opacity-70"
      />

      {/* Floating Images - Right Side */}
      <img
        ref={rightImgRefs[0]}
        src="/basketballLoader.png"
        className="right-img absolute  w-40 h-40 top-[35px] right-[1px] sm:top-[-1px] sm:right-[15px] sm:w-70 sm:h-80 rotate-[25deg] opacity-80"
      />

      <img
        ref={rightImgRefs[1]}
        src="/tabletennisLoader.avif"
        className="right-img absolute hidden sm:block w-30 h-30 top-[300px] right-[1px] z-11 sm:z-0  sm:top-[250px] sm:right-[15px] sm:w-80 sm:h-80 rotate-[-21deg] opacity-70"
      />

      <img
        ref={rightImgRefs[2]}
        src="/fencngLoader.jpg"
        className="right-img absolute w-40 h-40  top-[665px] right-[1px] sm:top-[500px] sm:right-[15px] sm:w-80 sm:h-80 rotate-[25deg] opacity-75"
      />

      {/* Video */}
      <video
        src="/videos/MashalVideo.mp4"
        autoPlay
        loop
        muted
        playsInline
        onContextMenu={(e) => e.preventDefault()}
        disablePictureInPicture
        className="w-50 h-50 sm:w-80 sm:h-80 object-cover rounded-2xl shadow-lg sm:mb-5 z-10"
      />

      {/* Logo */}
      <div className="relative top-[10px] w-[230px] h-[70px] sm:w-[230px] sm:h-[70px] overflow-hidden z-10">
        <img src="./ZEST-26.png" className="w-full h-full object-contain" />
        <div
          ref={overlayRef}
          className="absolute top-0 left-0 w-full h-full bg-black shadow-[0_0_40px_15px_rgba(0,0,0,1)]"
        />
      </div>

      {/* Coming Soon Text */}
      <div
        ref={textRef}
        className="flex mt-4 text-[25px] text-white font-bold z-10"
      >
        {"Coming Soon".split("").map((char, index) => (
          <span
            key={index}
            className="inline-block opacity-0 translate-y-[-20px]"
          >
            {char === " " ? "\u00A0" : char}
          </span>
        ))}
      </div>

      {/* Blackout Overlay */}
      <div
        ref={blackoutRef}
        className="blackout absolute inset-0 bg-black opacity-0 z-20"
      />
    </div>
  );
});

export default Loader;