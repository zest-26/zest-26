import React from 'react'
import Orb from "@/components/Orb";

const contactUs = () => {
  return (
    <div className="h-screen w-full flex items-center justify-center bg-black">
  
  {/* INNER DIV */}
 <div
  className="
    relative
    h-[50%] md:h-[80%]
    aspect-square
  
    overflow-hidden
    flex items-center justify-center
  "
>
  {/* RED BACKGROUND LAYER (CENTERED) */}
 <div
  className="
    absolute
    top-1/2 left-1/2
    -translate-x-1/2 -translate-y-1/2
    h-2/3 w-2/3
    rounded-full
    z-20
    flex items-center justify-center
    
    backdrop-blur-lg
    
  "
>
  {/* FORM */}
  <form
  className="
    w-4/5 h-4/5
    flex flex-col justify-center
    text-white 
  "
>
  <div className="w-full h-full grid grid-rows-20 gap-2 justify-items-center">
  {/* FULL NAME */}
  <div className="row-span-5 flex items-center w-4/5 md:w-8/10">
    <input
      type="text"
      placeholder="Full Name"
      className="
         w-full h-3/5
      bg-white/20
      backdrop-blur-md
      rounded-lg
      px-4
      placeholder-white/70
      text-white
      outline-none

      transition-all duration-300 ease-out

      hover:scale-[1.03]
      hover:bg-white/30
      border border-orange-400
      shadow-[0_0_20px_rgba(251,146,60,0.6)]

      focus:scale-[1.03]
      focus:bg-white/30
      focus:border focus:border-orange-400
      focus:ring-2 focus:ring-orange-400
      focus:shadow-[0_0_25px_rgba(251,146,60,0.8)]
      "
    />
  </div>

  {/* EMAIL */}
 <div className="row-span-5 flex items-center w-4/5 md:w-8/10">
  <input
    type="email"
    placeholder="Email"
    className="
      w-full h-3/5
      bg-white/20
      backdrop-blur-md
      rounded-lg
      px-4
      placeholder-white/70
      text-white
      outline-none

      transition-all duration-300 ease-out

      hover:scale-[1.03]
      hover:bg-white/30
      border border-orange-400
      shadow-[0_0_20px_rgba(251,146,60,0.6)]

      focus:scale-[1.03]
      focus:bg-white/30
      focus:border focus:border-orange-400
      focus:ring-2 focus:ring-orange-400
      focus:shadow-[0_0_25px_rgba(251,146,60,0.8)]
    "
  />
</div>


  {/* MESSAGE */}
  <div className="row-span-5 flex items-center w-4/5 md:w-8/10">
    <textarea
      placeholder="Your Message"
      className="
         w-full h-3/5
      bg-white/20
      backdrop-blur-md
      rounded-lg
      px-4
      placeholder-white/70
      text-white
      outline-none

      transition-all duration-300 ease-out

      hover:scale-[1.03]
      hover:bg-white/30
      border border-orange-400
      shadow-[0_0_20px_rgba(251,146,60,0.6)]

      focus:scale-[1.03]
      focus:bg-white/30
      focus:border focus:border-orange-400
      focus:ring-2 focus:ring-orange-400
      focus:shadow-[0_0_25px_rgba(251,146,60,0.8)]
      "
    />
  </div>

  {/* SEND BUTTON */}
  <div className="row-span-5 flex items-center justify-center w-5/10 md:w-5/10">
    <button
      type="submit"
      className="
        w-full h-3/5
        
        backdrop-blur-md
        rounded-lg
        font-semibold
        hover:bg-orange-950
        transition
        hover:scale-[1.03]
    
      border border-orange-400
      shadow-[0_0_20px_rgba(251,146,60,0.6)]
      "
    >
      Send
    </button>
  </div>
</div>

</form>

</div>


  {/* ORB LAYER */}
  <div className="absolute inset-0 z-10">
    <Orb hoverIntensity={0.13} />
  </div>
</div>


</div>


  )
}

export default contactUs