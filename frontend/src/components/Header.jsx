import React from 'react'

const Header = () => {
  return (
    <nav className="fixed top-0 w-full h-20 font-bold text-[18px]  bg-white/10 backdrop-blur-md shadow-md z-50 pt-3">
      <ul className="relative flex justify-evenly space-x-8 p-4 bg-gradient-to-r from-purple-200 to-blue-200 text-transparent bg-clip-text ">
        <li><a href="#home" className=''><img src='./ZEST-26.png' className='w-[100px] h-[40px] mb-1 absolute left-[13px] top-[7px]'/></a></li>
        <li><a href="#cyclothon" className='text-orange-600 hover:text-white transition-colors duration-200'>Cyclothon</a></li>
        <li><a href="#marathon" className='text-orange-600 hover:text-white transition-colors duration-200'>Marathon</a></li>
        <li><a href="#gallery" className='text-orange-600 hover:text-white transition-colors duration-200'>Gallery</a></li>
        <li><a href="#games" className='text-orange-600 hover:text-white transition-colors duration-200'>Games</a></li>
        <li><a href="#sponsers" className='text-orange-600 hover:text-white transition-colors duration-200'>Sponsers</a></li>
        <li><a href="#accomodations" className='text-orange-600 hover:text-white transition-colors duration-200'>Accomodation</a></li>
        <li><a href="#aboutus" className='text-orange-600 hover:text-white transition-colors duration-200'>About Us</a></li>
        <li><a href="#contact" className='text-orange-600 hover:text-white transition-colors duration-200'>Contact Us</a></li>
      </ul>
    </nav>
  )
}

export default Header