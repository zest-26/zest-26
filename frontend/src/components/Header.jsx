import React, { useState, useRef, useEffect } from "react";
import { NavLink,useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import {ArrowLeft} from 'lucide-react';
import gsap from "gsap";

const Header = () => {
 const [menuOpen, setMenuOpen] = useState(false);
const [renderOverlay, setRenderOverlay] = useState(false);
const navigate = useNavigate(); // ✅ MISSING LINE
const overlayRef = useRef(null);
const menuItemsRef = useRef([]);
const tlRef = useRef(null);
const isNavigatingRef = useRef(false);


const openMenu = () => {
  setRenderOverlay(true);
  setMenuOpen(true);
};


const closeMenu = () => {
  if (!tlRef.current) {
    setMenuOpen(false);
    setRenderOverlay(false);
    return;
  }

  tlRef.current.reverse();
  tlRef.current.eventCallback("onReverseComplete", () => {
    setMenuOpen(false);
    setRenderOverlay(false);
    tlRef.current.eventCallback("onReverseComplete", null);
  });
};

const handleMenuClick = (path) => {
  if (isNavigatingRef.current) return;
  isNavigatingRef.current = true;

  // 🔥 Scroll to top BEFORE navigation
  window.scrollTo({ top: 0, behavior: "instant" });

  navigate(path);

  if (!tlRef.current) {
    setMenuOpen(false);
    setRenderOverlay(false);
    isNavigatingRef.current = false;
    return;
  }

  tlRef.current.eventCallback("onReverseComplete", () => {
    setMenuOpen(false);
    setRenderOverlay(false);
    tlRef.current.eventCallback("onReverseComplete", null);
    isNavigatingRef.current = false;
  });

  tlRef.current.reverse();
};





// BODY SCROLL LOCK
useEffect(() => {
  if (renderOverlay) {
    document.body.style.overflow = "hidden";
    document.body.style.height = "100vh";
  } else {
    document.body.style.overflow = "";
    document.body.style.height = "";
  }

  return () => {
    document.body.style.overflow = "";
    document.body.style.height = "";
  };
}, [renderOverlay]);




 useEffect(() => {
  if (!renderOverlay || !overlayRef.current) return;

  const tl = gsap.timeline({ paused: true });

  gsap.set(overlayRef.current, { x: "100%" });
  gsap.set(menuItemsRef.current, { x: 80, opacity: 0 });

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
  tl.play();

  return () => tl.kill();
}, [renderOverlay]);


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
    <header className="fixed grid grid-cols-20  top-0 left-0 w-full md:h-12/100 h-10/100 z-50  backdrop-blur-md">
     <div className="w-full h-full  flex justify-center items-center col-span-4 md:col-span-2 ">
      <div className="md:h-2/5 md:w-2/5 w-1/2 h-1/2 border-2 border-amber-950 rounded-sm  aspect-square ">
          <NavLink
  to="/"
  className="flex justify-center items-center md:block h-full w-full"
>
            <ArrowLeft
              className="
               h-8/10 w-8/10 md:h-full md:w-full text-orange-300 hover:text-orange-200
               [filter:drop-shadow(0_0_4px_#E8560E)_drop-shadow(0_0_10px_#E8560E)_drop-shadow(0_0_20px_#E8560E)]
                hover:scale-110 transition-transform duration-300 ease-out hover:-translate-y-1
              "
            />
</NavLink>
        </div>
     </div>
     
    <div className="w-full h-full    col-span-12 md:col-span-16 flex items-center justify-center">
  <img
    src="/Zest26Logo4.png"
    alt="Zest26Logo"
    className="h-full hidden md:block  w-full md:w-5/10 object-contain"
  />

  <img
    src="/Zest26Logo.png"
    alt="Zest26Logo"
    className="h-full  block md:hidden  w-full md:w-5/10 object-contain"
  />
</div>

     <div className="w-full h-full md:hidden  flex justify-center items-center col-span-4 md:col-span-2 ">
      <div className="md:h-2/5 md:w-2/5 w-1/2 h-1/2 border-2 border-amber-950 rounded-sm aspect-square">
  <button
    onClick={openMenu}
    className="flex justify-center items-center h-full w-full"
  >
    <Menu
      className="
        h-8/10 w-8/10 md:h-full md:w-full text-orange-300
        [filter:drop-shadow(0_0_4px_#E8560E)_drop-shadow(0_0_10px_#E8560E)]
        hover:scale-110 transition-transform duration-300
      "
    />
  </button>
</div>

     </div>
     
    </header>

  {renderOverlay && (
  <div
    ref={overlayRef}
    className="fixed inset-0 z-[9999] bg-black bg-opacity-95
               flex flex-col items-center justify-around
               pt-8 pb-8 pointer-events-auto"
  >
    {/* CLOSE */}
    <div className="h-10  w-10 border-2 border-amber-950 rounded-sm p-1">
      <button
        onClick={closeMenu}
        className="flex justify-center items-center h-full w-full"
      >
        <X className="h-full w-full text-orange-300
          [filter:drop-shadow(0_0_6px_#E8560E)_drop-shadow(0_0_16px_#E8560E)]" />
      </button>
    </div>

    {/* MENU */}
    <div className="flex items-center flex-col gap-4 mt-2">
      {[
        ["ABOUT US", "/about"],
         ["GALLERY", "/Gallery"],
        ["SPORTS", "/Sports"],
        ["SCORES", "/Scores"],
         ["CORE TEAM", "/coreTeam"],
        ["ACCOMODATIONS", "/Accomodations"],
        ["SPONSERS", "/Sponsers"],
        ["CONTACT US", "/contactUs"],
      ].map(([label, path], i) => (
        <button
          key={path}
          ref={(el) => (menuItemsRef.current[i] = el)}
          onClick={() => handleMenuClick(path)}
          className="menu-glow-btn text-xl md:text-4xl"
        >
          <span className="menu-glow-text">{label}</span>
        </button>
      ))}
    </div>
  </div>
)}



</>
  );
};

export default Header;
