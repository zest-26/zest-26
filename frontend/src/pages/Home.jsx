import React from 'react'
import "@fontsource/sour-gummy/800.css";

const Home = () => {
  return (
     <div className='relative h-screen w-screen flex'>
      {/* Background image with opacity */}
      <div 
        className="absolute inset-0 bg-cover bg-center" 
        style={{ backgroundImage: "url('./stadium.jpg')", opacity: 0.5 }}
      ></div>

      {/* Content above background */}
      <p 
        style={{ fontFamily: "Sour Gummy, sans-serif", fontWeight: 300 }} 
        className='relative mt-23 ml-150 text-4xl z-10'
      >
        Upcoming Events
      </p>
       <a href='https://docs.google.com/forms/d/e/1FAIpQLScMLWWUCdK3xzY4JL4RKEpRZxpTAkByMeQ2i9KEeY4WhinnTQ/viewform'>
      <div className="rounded-2xl p-1 bg-black border-black transition-transform duration-300 hover:-translate-y-2 hover:shadow-[0_0_50px_rgba(255,255,255,0.8)] w-100 h-120 top-[200px] left-[530px] absolute z-10" target="_blank" 
        rel="noopener noreferrer">
        <img src='./coordInduct.jpeg' className='h-full w-full'/>
      </div>
      </a>
    </div>
  )
}

export default Home