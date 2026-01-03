import React from 'react'
import MagicBento from '@/components/MagicBento'
import GradientText from '@/components/GradientText'

const Accomodations = () => {
  return (
    <div className="min-h-screen w-full bg-black pt-[15vh]">
      <div className="h-[10vh] w-full grid grid-cols-20 items-center">
  
  {/* Empty left space (5 columns) */}
  <div className="col-span-5"></div>

  {/* Center title (10 columns) */}
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
  showBorder={true}
  enableSpotlight={true}
  enableBorderGlow={true}
  disableAnimations={false}
  className="text-2xl md:text-4xl font-bold tracking-wide p-2"
>
  Accomodation
</GradientText>
</div>


  {/* Empty right space (5 columns) */}
  <div className="col-span-5"></div>

</div>

    </div>
  )
}


export default Accomodations