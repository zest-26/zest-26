import React, { useRef, useState } from 'react';
import { motion, useMotionTemplate, useMotionValue, animate } from 'framer-motion';

// --- DATA ---
const titleSponsors = [
  { name: "EMOTORAD", logo: "/sponsers/EMOTORAD.png", link: "https://emotorad.com", tier: "Title" },
  { name: "Company One", logo: "/badmintonLoader.avif", link: "#", tier: "Title" },
  { name: "Company Two", logo: "/badmintonLoader.avif", link: "#", tier: "Title" },
  { name: "Company Three", logo: "/badmintonLoader.avif", link: "#", tier: "Title" },
];

const mediaSponsors = [
  { name: "Media One", logo: "/badmintonLoader.avif", link: "#", tier: "Media" },
  { name: "Media Two", logo: "/badmintonLoader.avif", link: "#", tier: "Media" },
  { name: "Media Three", logo: "/badmintonLoader.avif", link: "#", tier: "Media" },
  { name: "Media Four", logo: "/badmintonLoader.avif", link: "#", tier: "Media" },
];

// --- COMPONENTS ---

/**
 * 1. SPOTLIGHT CARD
 * Creates a hover effect where a gradient light follows the mouse cursor
 */
const SpotlightCard = ({ children, className = "", link }) => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({ currentTarget, clientX, clientY }) {
    let { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  return (
    <motion.a
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      className={`group relative border border-white/10 bg-gray-900/50 overflow-hidden rounded-xl ${className}`}
      onMouseMove={handleMouseMove}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      {/* Spotlight Effect Layer */}
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-xl opacity-0 transition duration-300 group-hover:opacity-100"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              650px circle at ${mouseX}px ${mouseY}px,
              rgba(232, 86, 14, 0.15),
              transparent 80%
            )
          `,
        }}
      />
      
      {/* Border Highlight Layer */}
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-xl opacity-0 transition duration-300 group-hover:opacity-100"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              400px circle at ${mouseX}px ${mouseY}px,
              rgba(232, 86, 14, 0.4),
              transparent 80%
            )
          `,
        }}
      />

      <div className="relative h-full">{children}</div>
    </motion.a>
  );
};

/**
 * 2. BACKGROUND ORBS
 * Floating blobs of color to give the page life
 */
const AnimatedBackground = () => (
  <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10">
    {/* Noise Texture for 'Film' look */}
    <div className="absolute inset-0 opacity-[0.03] bg-[url('https://grainy-gradients.vercel.app/noise.svg')] mix-blend-overlay"></div>
    
    {/* Top Left Orb */}
    <motion.div 
      animate={{ 
        scale: [1, 1.2, 1],
        opacity: [0.3, 0.5, 0.3],
        x: [0, 50, 0]
      }}
      transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      className="absolute -top-[20%] -left-[10%] w-[50vw] h-[50vw] bg-[#E8560E] rounded-full blur-[120px] mix-blend-screen"
    />
    
    {/* Bottom Right Orb */}
    <motion.div 
      animate={{ 
        scale: [1, 1.3, 1],
        opacity: [0.2, 0.4, 0.2],
        x: [0, -50, 0]
      }}
      transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 1 }}
      className="absolute -bottom-[20%] -right-[10%] w-[60vw] h-[60vw] bg-[#FF8C42] rounded-full blur-[140px] mix-blend-screen"
    />
  </div>
);

/**
 * 3. SECTION TITLE
 */
const SectionTitle = ({ title, subtitle }) => (
  <div className="relative flex flex-col items-center justify-center my-20">
    <motion.h2 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="text-4xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-b from-white to-white/40 uppercase tracking-tighter text-center z-10"
    >
      {title}
    </motion.h2>
    <motion.div 
      initial={{ width: 0 }}
      whileInView={{ width: "100px" }}
      viewport={{ once: true }}
      transition={{ delay: 0.2, duration: 0.8 }}
      className="h-1 bg-[#E8560E] mt-4 rounded-full"
    />
    <p className="mt-4 text-white/50 tracking-widest text-sm uppercase font-medium">{subtitle}</p>
  </div>
);

// --- MAIN PAGE ---

const Sponsors = () => {
  return (
    <div className="min-h-screen w-full bg-[#030303] text-white pt-[100px] pb-32 px-4 md:px-8 relative selection:bg-[#E8560E] selection:text-white">
      
      <AnimatedBackground />

      {/* HERO HEADER */}
      <div className="flex flex-col items-center justify-center min-h-[40vh] relative z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative"
        >
          {/* Glowing Backlight behind text */}
          <div className="absolute -inset-10 bg-[#E8560E]/20 blur-3xl rounded-full" />
          
          <h1 className="relative text-6xl md:text-9xl font-black tracking-tighter text-center text-white mix-blend-normal">
            OUR <br className="md:hidden" />
           <span className="text-[#E8560E]">
            ALLIES
            </span>
          </h1>
        </motion.div>
        
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-6 text-lg md:text-xl text-white/60 max-w-2xl text-center font-light"
        >
          Powering the spirit of competition. Meet the visionaries making ZEST possible.
        </motion.p>
      </div>

      {/* ================= TITLE SPONSORS ================= */}
      <SectionTitle title="Title Sponsors" subtitle="The Main Pillars" />

      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10">
        {titleSponsors.map((sponsor, idx) => (
          <SpotlightCard key={idx} link={sponsor.link} className="h-[350px]">
            <div className="absolute inset-0 flex flex-col items-center justify-center p-8 bg-black/40 backdrop-blur-sm transition-all duration-300 group-hover:bg-black/20">
              
              {/* Logo Wrapper with Floating Animation */}
              <motion.div 
                className="w-4/5 h-3/5 relative flex items-center justify-center"
                whileHover={{ scale: 1.1 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <img 
                  src={sponsor.logo} 
                  alt={sponsor.name} 
                  className="max-w-full max-h-full object-contain filter drop-shadow-[0_0_15px_rgba(255,255,255,0.1)]"
                />
              </motion.div>

              {/* Text Reveal on Hover */}
              <div className="absolute bottom-8 opacity-0 transform translate-y-4 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0">
                <span className="text-[#E8560E] font-bold tracking-wider uppercase text-lg">
                  Visit Website &rarr;
                </span>
              </div>
            </div>
          </SpotlightCard>
        ))}
      </div>

      {/* ================= MEDIA SPONSORS ================= */}
      <SectionTitle title="Media Partners" subtitle="Amplifying the Noise" />

      <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 relative z-10">
        {mediaSponsors.map((sponsor, idx) => (
          <SpotlightCard key={idx} link={sponsor.link} className="h-[200px]">
            <div className="absolute inset-0 flex flex-col items-center justify-center p-6 bg-black/40 backdrop-blur-sm">
              <div className="w-full h-full flex items-center justify-center grayscale transition-all duration-500 group-hover:grayscale-0">
                <img 
                  src={sponsor.logo} 
                  alt={sponsor.name} 
                  className="max-w-full max-h-full object-contain opacity-70 group-hover:opacity-100 transition-opacity"
                />
              </div>
            </div>
            {/* Corner Accent */}
            <div className="absolute top-0 right-0 p-3 opacity-0 group-hover:opacity-100 transition-opacity">
               <div className="w-2 h-2 bg-[#E8560E] rounded-full shadow-[0_0_10px_#E8560E]" />
            </div>
          </SpotlightCard>
        ))}
      </div>

      {/* BOTTOM CTA */}
      <div className="mt-32 text-center relative z-10">
        <h3 className="text-2xl font-bold text-white mb-6">WANT TO SPONSOR US?</h3>
        <button className="px-8 py-4 rounded-full bg-white text-black font-bold uppercase tracking-widest hover:bg-[#E8560E] hover:text-white transition-colors duration-300 shadow-[0_0_20px_rgba(255,255,255,0.3)]">
          Get in Touch
        </button>
      </div>

    </div>
  );
};

export default Sponsors;