import React, { useRef, useState } from 'react';
import { motion, useMotionTemplate, useMotionValue, animate } from 'framer-motion';

// --- DATA ---
const titleSponsors = [
  { name: "EMOTORAD", logo: "/sponsers/EMOTORAD.png", link: "https://emotorad.com", tier: "Title" },
];

 const mbaPreparationPartner = [
    { name: "TIME", logo: "/sponsers/TIME.avif", link: "https://time4education.com/aipmt/Aboutus.aspx" }
  ];

const poweringPartner = [
    { name: "UNSTOP", logo: "/sponsers/UNSTOP.avif", link: "https://unstop.com" }
  ];

  const munchingPartner = [
    { name: "CORNITOS", logo: "/sponsers/CORNITOS.avif", link: "https://cornitos.com" }
  ];

  const snackingPartner = [
    { name: "BUDHANI BROS", logo: "/sponsers/BUDHANI.avif", link: "https://budhanibros.com/" }
  ];

  const fitnessPartner = [
    { name: "FIT MY CITY", logo: "/sponsers/FITMYCITY.avif", link: "https://fitmycity.com" }
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
    <div className="absolute inset-0 opacity-[0.03]  mix-blend-overlay"></div>
    
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
      className="text-2xl md:text-3xl font-black text-transparent bg-clip-text bg-gradient-to-b from-white to-white/40 uppercase tracking-tighter text-center z-10"
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

       {/* ================= AUTO-SCROLLING PHOTO CAROUSEL ================= */}
<div className="w-full h-[12vh] sm:h-[20vh] md:h-[20vh] lg:h-[20vh] mt-15 sm:mt-15 md:mt-15 lg:mt-20 mb-8 sm:mb-12 md:mb-16 overflow-hidden relative">
  {/* Gradient Overlays */}
  <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-24 md:w-32 bg-gradient-to-r from-[#030303] to-transparent z-10" />
  <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-24 md:w-32 bg-gradient-to-l from-[#030303] to-transparent z-10" />
  
  {/* Scrolling Container */}
  <motion.div
    className="flex gap-3 sm:gap-4 md:gap-6 h-full"
    animate={{
      x: [0, -1920],
    }}
    transition={{
      x: {
        repeat: Infinity,
        repeatType: "loop",
        duration: 30,
        ease: "linear",
      },
    }}
  >
    {/* Duplicate the images twice for seamless loop */}
    {[...Array(2)].map((_, setIndex) => (
      <React.Fragment key={setIndex}>
        {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
          <div
            key={`${setIndex}-${num}`}
            className="relative h-full w-[180px] sm:w-[220px] md:w-[260px] lg:w-[280px] flex-shrink-0 rounded-lg overflow-hidden group"
          >
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <img
              src={`/sponsers/photos${num}.avif`}
              alt={`Gallery ${num}`}
              className="w-full h-full object-cover object-center transform group-hover:scale-110 transition-transform duration-500"
            />
            <div className="absolute inset-0 border border-white/10 rounded-lg pointer-events-none" />
          </div>
        ))}
      </React.Fragment>
    ))}
  </motion.div>
</div>

      {/* ================= TITLE SPONSORS ================= */}
      <SectionTitle title="E Mobility Partner"  />

      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10">
       {titleSponsors.map((sponsor, idx) => {
  const isLastOdd =
    titleSponsors.length % 2 === 1 &&
    idx === titleSponsors.length - 1;

  return (
    <SpotlightCard
      key={idx}
      link={sponsor.link}
     className={`h-[250px] block w-full ${
  isLastOdd ? "md:col-span-2 md:mx-auto md:max-w-xl" : ""
}`}
    >

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
  );
})}
      </div>

       {/* ================= mba preparation ================= */}
      <SectionTitle title="MBA Preparation Partner"  />

      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10">
       {mbaPreparationPartner.map((sponsor, idx) => {
  const isLastOdd =
    titleSponsors.length % 2 === 1 &&
    idx === titleSponsors.length - 1;

  return (
    <SpotlightCard
      key={idx}
      link={sponsor.link}
     className={`h-[250px] block w-full ${
  isLastOdd ? "md:col-span-2 md:mx-auto md:max-w-xl" : ""
}`}
    >

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
  );
})}
      </div>

      {/* ================= TITLE SPONSORS ================= */}
      <SectionTitle title="Powering Partner"  />

      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10">
       {poweringPartner.map((sponsor, idx) => {
  const isLastOdd =
    titleSponsors.length % 2 === 1 &&
    idx === titleSponsors.length - 1;

  return (
    <SpotlightCard
      key={idx}
      link={sponsor.link}
     className={`h-[250px] block w-full ${
  isLastOdd ? "md:col-span-2 md:mx-auto md:max-w-xl" : ""
}`}
    >

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
  );
})}
      </div>

     {/* ================= TITLE SPONSORS ================= */}
      <SectionTitle title="Munching Partner"  />

      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10">
       {munchingPartner.map((sponsor, idx) => {
  const isLastOdd =
    titleSponsors.length % 2 === 1 &&
    idx === titleSponsors.length - 1;

  return (
    <SpotlightCard
      key={idx}
      link={sponsor.link}
     className={`h-[250px] block w-full ${
  isLastOdd ? "md:col-span-2 md:mx-auto md:max-w-xl" : ""
}`}
    >

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
  );
})}
      </div>

      {/* ================= TITLE SPONSORS ================= */}
      <SectionTitle title="Snacking Partner"  />

      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10">
       {snackingPartner.map((sponsor, idx) => {
  const isLastOdd =
    titleSponsors.length % 2 === 1 &&
    idx === titleSponsors.length - 1;

  return (
    <SpotlightCard
      key={idx}
      link={sponsor.link}
     className={`h-[250px] block w-full ${
  isLastOdd ? "md:col-span-2 md:mx-auto md:max-w-xl" : ""
}`}
    >

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
  );
})}
      </div>

      {/* ================= TITLE SPONSORS ================= */}
      <SectionTitle title="Fitness Partner"  />

      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10">
       {fitnessPartner.map((sponsor, idx) => {
  const isLastOdd =
    titleSponsors.length % 2 === 1 &&
    idx === titleSponsors.length - 1;

  return (
    <SpotlightCard
      key={idx}
      link={sponsor.link}
     className={`h-[250px] block w-full ${
  isLastOdd ? "md:col-span-2 md:mx-auto md:max-w-xl" : ""
}`}
    >

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
  );
})}
      </div>

    </div>
  );
};

export default Sponsors;