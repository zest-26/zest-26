import React from 'react'
import "@fontsource/sour-gummy/800.css";

const Home = () => {
  return (
    <div className='relative h-screen w-screen bg-gradient-to-b from-black to-[#4d2103] flex'>
      
      <p style={{ fontFamily: "Sour Gummy, sans-serif", fontWeight: 300 }} className='mt-30 ml-150 text-4xl'>
         Upcoming Events
</p>
      <div class="rounded-2xl p-1 bg-black border-black transition-transform duration-300 hover:-translate-y-2 hover:shadow-[0_0_50px_rgba(255,255,255,0.8)]   w-100 h-120 top-[240px] left-[250px] absolute"><img src='./badmintonLoader.avif' className='h-full w-full'/></div>
      <div class="rounded-2xl p-1 bg-black border-black border transition-transform duration-300 hover:-translate-y-2 hover:shadow-[0_0_50px_rgba(255,255,255,0.8)]   w-100 h-120 top-[240px] right-[250px] absolute"><img src='./badmintonLoader.avif' className='h-full w-full'/></div>
    
  
      
    </div>
  )
}

export default Home