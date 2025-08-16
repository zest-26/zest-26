import React from 'react'

const Header = () => {
  return (
    <nav className="fixed top-0 w-full h-20 font-bold text-[18px]  bg-white/10 backdrop-blur-md shadow-md z-50 pt-3">
      <ul className="flex justify-evenly space-x-8 p-4 bg-gradient-to-r from-purple-200 to-blue-200 text-transparent bg-clip-text ">
        <li><a href="#home" className=''><img src='./ZEST-26.png' className='w-[100px] h-[40px] mb-1'/></a></li>
        <li><a href="#education" className='text-orange-600 hover:text-white transition-colors duration-200'>Cyclothon</a></li>
        <li><a href="#responsibilities" className='text-orange-600 hover:text-white transition-colors duration-200'>Marathon</a></li>
        <li><a href="#about" className='text-orange-600 hover:text-white transition-colors duration-200'>Gallery</a></li>
        <li><a href="#skills" className='text-orange-600 hover:text-white transition-colors duration-200'>Games</a></li>
        <li><a href="#projects" className='text-orange-600 hover:text-white transition-colors duration-200'>Sponsers</a></li>
        <li><a href="#experience" className='text-orange-600 hover:text-white transition-colors duration-200'>Accomodation</a></li>
        <li><a href="#hobbies" className='text-orange-600 hover:text-white transition-colors duration-200'>About Us</a></li>
        <li><a href="#contact" className='text-orange-600 hover:text-white transition-colors duration-200'>Contact Us</a></li>
      </ul>
    </nav>
  )
}

export default Header