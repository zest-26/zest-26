import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import {ArrowLeft} from 'lucide-react';

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const navLinks = [
    { to: "/cyclothon", label: "Cyclothon" },
    { to: "/marathon", label: "Marathon" },
    { to: "/Gallery", label: "Gallery" },
    { to: "/coreTeam", label: "Core Team" },
    { to: "/Sports", label: "Sports" },
    { to: "/Sponsers", label: "Sponsers" },
    { to: "/Accomodations", label: "Accomodations" },
    { to: "/about", label: "About Us" },
    { to: "/contactUs", label: "Contact Us" },
  ];

  return (
    <header className="fixed grid grid-cols-20  top-0 left-0 w-full md:h-12/100 h-10/100 z-50  backdrop-blur-md">
     <div className="w-full h-full  flex justify-center items-center col-span-4 md:col-span-2 ">
      <div className="h-1/2 w-1/2 border-2 border-amber-950 rounded-sm  aspect-square ">
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
    alt="MinSpark"
    className="h-full hidden md:block  w-full md:w-5/10 object-contain"
  />

  <img
    src="/Zest26Logo.png"
    alt="MinSpark"
    className="h-full  block md:hidden  w-full md:w-5/10 object-contain"
  />
</div>

     <div className="w-full h-full col-span-4 md:col-span-2"></div>
     
    </header>
  );
};

export default Header;
