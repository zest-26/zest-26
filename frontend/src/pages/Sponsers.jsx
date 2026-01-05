import React from 'react'
import MagicBento from '@/components/MagicBento'
import GradientText from '@/components/GradientText'
import GlareHover from '@/components/GlareHover'


const Sponsers = () => {

  const titlesponsor = [
  {
    name: "Company One",
    logo: "/badmintonLoader.avif",
    link: "https://companyone.com",
  },
  {
    name: "Company One",
    logo: "/badmintonLoader.avif",
    link: "https://companyone.com",
  },
   {
    name: "Company One",
    logo: "/badmintonLoader.avif",
    link: "https://companyone.com",
  },
   {
    name: "Company One",
    logo: "/badmintonLoader.avif",
    link: "https://companyone.com",
  },
   {
    name: "Company One",
    logo: "/badmintonLoader.avif",
    link: "https://companyone.com",
  },
   {
    name: "Company One",
    logo: "/badmintonLoader.avif",
    link: "https://companyone.com",
  },
   {
    name: "Company One",
    logo: "/badmintonLoader.avif",
    link: "https://companyone.com",
  },
   {
    name: "Company One",
    logo: "/badmintonLoader.avif",
    link: "https://companyone.com",
  },
  {
    name: "Company One",
    logo: "/badmintonLoader.avif",
    link: "https://companyone.com",
  },
  {
    name: "Company One",
    logo: "/badmintonLoader.avif",
    link: "https://companyone.com",
  },
   
];

 const sponsors = [
  {
    name: "Company One",
    logo: "/badmintonLoader.avif",
    link: "https://companyone.com",
  },
  {
    name: "Company One",
    logo: "/badmintonLoader.avif",
    link: "https://companyone.com",
  },
   {
    name: "Company One",
    logo: "/badmintonLoader.avif",
    link: "https://companyone.com",
  },
   {
    name: "Company One",
    logo: "/badmintonLoader.avif",
    link: "https://companyone.com",
  },
   {
    name: "Company One",
    logo: "/badmintonLoader.avif",
    link: "https://companyone.com",
  },
   {
    name: "Company One",
    logo: "/badmintonLoader.avif",
    link: "https://companyone.com",
  },
   {
    name: "Company One",
    logo: "/badmintonLoader.avif",
    link: "https://companyone.com",
  },
   {
    name: "Company One",
    logo: "/badmintonLoader.avif",
    link: "https://companyone.com",
  },
  {
    name: "Company One",
    logo: "/badmintonLoader.avif",
    link: "https://companyone.com",
  },
  {
    name: "Company One",
    logo: "/badmintonLoader.avif",
    link: "https://companyone.com",
  },
   
];

  return (
    <div className="min-h-screen w-full bg-black pt-[15vh]">

  {/* TITLE ROW */}
  <div className="h-[10vh] w-full grid grid-cols-20 items-center">
    <div className="col-span-5"></div>

    <div className="col-span-10 flex justify-center items-center">
      <GradientText
        colors={[
          "#E8560E",
          "#FF8C42",
          "#FFD1B3",
          "#FFFFFF",
          "#FFD1B3",
          "#E8560E",
        ]}
        animationSpeed={3}
        showBorder
        enableSpotlight
        enableBorderGlow
        className="text-2xl md:text-4xl font-bold tracking-wide p-2"
      >
        Sponsors
      </GradientText>
    </div>

    <div className="col-span-5"></div>
  </div>

  {/* SECOND TITLE WITH DOUBLE UNDERLINE */}
<div className="w-full flex flex-col items-center mt-8">
  
  {/* TOP UNDERLINE */}
  <div className="mb-3 h-[3px] w-1/2 md:w-2/3 bg-gradient-to-r from-[#E8560E] via-[#FF8C42] to-[#FFD1B3] rounded-full shadow-[0_0_12px_#E8560E]" />

  {/* TITLE */}
  <h2 className="text-white text-xl md:text-2xl font-semibold tracking-widest uppercase">
    Title Sponsers
  </h2>

  {/* BOTTOM UNDERLINE */}
  <div className="mt-3 h-[3px] w-1/2 md:w-2/3 bg-gradient-to-r from-[#FFD1B3] via-[#FF8C42] to-[#E8560E] rounded-full shadow-[0_0_12px_#E8560E]" />
</div>


  {/* SPONSOR GRID */}
 <div className="max-w-6xl mx-auto px-6 mt-12">
  <div className="flex flex-wrap justify-center gap-8">
    {titlesponsor.map((sponsor, index) => (
      <a
        key={index}
        href={sponsor.link}
        target="_blank"
        rel="noopener noreferrer"
        className="
          group
          relative
          overflow-hidden

          /* FIXED CARD SIZE */
          w-[300px] md:w-[320px] lg:w-[340px]
          h-[300px] md:h-[360px] lg:h-[420px]

          /* SHINY ORANGE BASE */
          bg-gradient-to-br
          from-[#E8560E]/10
          via-[#FF8C42]/20
          to-[#E8560E]/10

          backdrop-blur-md
          rounded-2xl
          p-6
          flex flex-col items-center justify-center

          /* BORDER */
          border border-[#FFB703]/50

          /* GLOW */
          shadow-[0_0_22px_rgba(255,183,3,0.55)]

          transition-all duration-300 ease-out
          hover:scale-[1.05]
          hover:shadow-[0_0_45px_rgba(255,183,3,0.65)]
          hover:border-[#FFD166]
        "
      >
        {/* LOGO */}
        <div className="h-4/5 w-full flex items-center justify-center mb-4">
          <img
            src={sponsor.logo}
            alt={sponsor.name}
            className="max-h-full object-contain"
          />
        </div>

        {/* NAME */}
        <h3 className="text-white text-2xl font-bold mb-2 text-center">
          {sponsor.name}
        </h3>
      </a>
    ))}
  </div>
</div>

<div className="w-full flex flex-col items-center mt-8">
  
  {/* TOP UNDERLINE */}
  <div className="mb-3 h-[3px] w-1/2 md:w-2/3 bg-gradient-to-r from-[#E8560E] via-[#FF8C42] to-[#FFD1B3] rounded-full shadow-[0_0_12px_#E8560E]" />

  {/* TITLE */}
  <h2 className="text-white text-xl md:text-2xl font-semibold tracking-widest uppercase">
    Media Sponsers
  </h2>

  {/* BOTTOM UNDERLINE */}
  <div className="mt-3 h-[3px] w-1/2 md:w-2/3 bg-gradient-to-r from-[#FFD1B3] via-[#FF8C42] to-[#E8560E] rounded-full shadow-[0_0_12px_#E8560E]" />
</div>

 {/* SPONSOR GRID */}
 <div className="max-w-6xl mx-auto px-6 mt-12">
  <div className="flex flex-wrap justify-center gap-8">
    {sponsors.map((sponsor, index) => (
      <a
        key={index}
        href={sponsor.link}
        target="_blank"
        rel="noopener noreferrer"
        className="
          group
          relative
          overflow-hidden

          /* FIXED CARD SIZE */
          w-[300px] md:w-[320px] lg:w-[340px]
          h-[300px] md:h-[360px] lg:h-[420px]

          /* SHINY ORANGE BASE */
          bg-gradient-to-br
          from-[#E8560E]/10
          via-[#FF8C42]/20
          to-[#E8560E]/10

          backdrop-blur-md
          rounded-2xl
          p-6
          flex flex-col items-center justify-center

          /* BORDER */
          border border-[#FFB703]/50

          /* GLOW */
          shadow-[0_0_22px_rgba(255,183,3,0.55)]

          transition-all duration-300 ease-out
          hover:scale-[1.05]
          hover:shadow-[0_0_45px_rgba(255,183,3,0.65)]
          hover:border-[#FFD166]
        "
      >
        {/* LOGO */}
        <div className="h-4/5 w-full flex items-center justify-center mb-4">
          <img
            src={sponsor.logo}
            alt={sponsor.name}
            className="max-h-full object-contain"
          />
        </div>

        {/* NAME */}
        <h3 className="text-white text-2xl font-bold mb-2 text-center">
          {sponsor.name}
        </h3>
      </a>
    ))}
  </div>
</div>



</div>

  )
}

export default Sponsers
