import React from 'react'
import { Link } from "react-router-dom";


const Header = () => {
  return (
    <nav className="fixed top-0 w-full h-20 font-bold text-[18px]  bg-white/10 backdrop-blur-md shadow-md z-50 pt-3">
      <ul className="relative flex justify-evenly space-x-8 p-4 bg-gradient-to-r from-purple-200 to-blue-200 text-transparent bg-clip-text ">
        <li><Link to="/" className=''><img src='./ZEST-26.png' className='w-[100px] h-[40px] mb-1 absolute left-[13px] top-[7px]'/></Link></li>
        <li><Link to="cyclothon" className='text-orange-600 hover:text-white transition-colors duration-200'>Cyclothon</Link></li>
        <li><a href="#marathon" className='text-orange-600 hover:text-white transition-colors duration-200'>Marathon</a></li>
        <li><Link to="Gallery" className='text-orange-600 hover:text-white transition-colors duration-200'>Gallery</Link></li>
        <li><Link to="coreTeam" className='text-orange-600 hover:text-white transition-colors duration-200'>Core Team</Link></li>
        <li><Link to="Sports" className='text-orange-600 hover:text-white transition-colors duration-200'>Sports</Link></li>
        <li><Link to="Sponsers" className='text-orange-600 hover:text-white transition-colors duration-200'>Sponsers</Link></li>
        <li><Link to="Accomodations" className='text-orange-600 hover:text-white transition-colors duration-200'>Accomodations</Link></li>
        <li><Link to="about" className='text-orange-600 hover:text-white transition-colors duration-200'>About Us</Link></li>
        <li><Link to="contactUs" className='text-orange-600 hover:text-white transition-colors duration-200'>Contact Us</Link></li>
      </ul>
    </nav>
  )
}

export default Header