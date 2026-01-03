import React from 'react'
import {Phone,Mail,MapPin,Linkedin,Github,Instagram, Twitter,Facebook,X} from 'lucide-react'


const Footer = () => {
  return (
    <div className="bg-black w-full py-10 flex flex-col items-center gap-8">

  {/* Heading */}
  <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center">
    <span className="bg-gradient-to-r from-orange-600 to-white text-transparent bg-clip-text">
      Get In
    </span>
    <span className="bg-gradient-to-r from-white to-orange-600 text-transparent bg-clip-text">
      {" "}Touch
    </span>
  </h1>

  {/* Social Icons */}
  <div className="flex justify-center items-center gap-8">
    <a href="https://www.instagram.com/coepzest/" target="_blank" rel="noopener noreferrer">
      <Instagram className="text-white hover:text-orange-500 transition" size={28} />
    </a>

    <a href="https://www.facebook.com/people/Coep-Zest/61571312685575/" target="_blank" rel="noopener noreferrer">
      <Facebook className="text-white hover:text-orange-500 transition" size={28} />
    </a>

    <a href="https://www.linkedin.com/company/zest-coep/" target="_blank" rel="noopener noreferrer">
      <Linkedin className="text-white hover:text-orange-500 transition" size={28} />
    </a>

    <a href="https://x.com/zest_coep" target="_blank" rel="noopener noreferrer">
      <X className="text-white hover:text-orange-500 transition" size={28} />
    </a>
  </div>

  {/* Copyright */}
  <p className="text-sm text-gray-400 text-center">
    © 2025 ZEST'26. All rights reserved.
  </p>

</div>

  )
}

export default Footer