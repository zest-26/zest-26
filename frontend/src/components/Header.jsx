import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

const menuVariants = {
  hidden: { opacity: 0, y: "-100%", transition: { duration: 0.3 } },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, staggerChildren: 0.08 } },
};
const linkVariants = {
  hidden: { opacity: 0, x: -30 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.5 } },
};

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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
    <>
      {/* NAVBAR — DESKTOP + MOBILE */}
      <header className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 
        ${scrolled || isMenuOpen ? "bg-black/80 backdrop-blur-md border-b border-orange-500/20" : "bg-transparent"}
      `}>
        <div className="flex items-center justify-between w-full px-6 py-3 mx-auto max-w-7xl">

          {/* Logo */}
          <NavLink to="/" className="z-50">
            <img src="./ZEST-26.png" className="w-[110px] h-[45px] object-contain" />
          </NavLink>

          {/* Desktop Menu */}
          <nav className="hidden md:flex flex-1 justify-between ml-12 bg-gradient-to-r from-purple-200 to-blue-200 text-transparent bg-clip-text font-bold text-[20px]">
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) =>
                  "relative font-semibold uppercase transition duration-200 " +
                  (isActive ? "text-white" : "text-orange-500 hover:text-white")
                }
              >
                {({ isActive }) => (
                  <>
                    {isActive && (
                      <motion.div
                        layoutId="active-pill"
                        className="absolute bg-orange-500 rounded-lg -inset-1 -z-10"
                        transition={{ type: "spring", stiffness: 300, damping: 28 }}
                      />
                    )}
                    <span className="relative">{link.label}</span>
                  </>
                )}
              </NavLink>
            ))}
          </nav>

          {/* Hamburger (Mobile) */}
          <button
            className="z-50 text-3xl text-white md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <motion.div animate={{ rotate: isMenuOpen ? 45 : 0, y: isMenuOpen ? 6 : 0 }} className="w-6 h-1 mb-1 bg-orange-500 rounded"></motion.div>
            <motion.div animate={{ opacity: isMenuOpen ? 0 : 1 }} className="w-6 h-1 mb-1 bg-orange-500 rounded"></motion.div>
            <motion.div animate={{ rotate: isMenuOpen ? -45 : 0, y: isMenuOpen ? -6 : 0 }} className="w-6 h-1 bg-orange-500 rounded"></motion.div>
          </button>
        </div>
      </header>

      {/* MOBILE MENU DROPDOWN */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            variants={menuVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            className="fixed inset-0 z-40 flex items-center justify-center bg-black/95 backdrop-blur-lg md:hidden"
          >
            <nav className="flex flex-col items-center gap-8">
              {navLinks.map((link) => (
                <motion.div key={link.to} variants={linkVariants}>
                  <NavLink
                    to={link.to}
                    onClick={() => setIsMenuOpen(false)}
                    className="text-3xl font-bold uppercase text-neutral-200 hover:text-orange-500"
                  >
                    {link.label}
                  </NavLink>
                </motion.div>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Header;
