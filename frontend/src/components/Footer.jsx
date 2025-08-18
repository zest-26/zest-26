import React from 'react'
import {Phone,Mail,MapPin,Linkedin,Github,Instagram, Twitter,Facebook} from 'lucide-react'


const Footer = () => {
  return (
    <div className='bg-black  min-h-1/3'>
      <h1 className='text-5xl font-bold text-center py-6 '>
  <span className='bg-gradient-to-r from-orange-600 to-white text-transparent bg-clip-text'>Get In</span><span className='bg-gradient-to-r from-white to-orange-600 text-transparent bg-clip-text'> Touch</span>
</h1>
  <div className='flex justify-evenly px-15 mt-6 ml-150 mr-150'>
              <a href='https://www.instagram.com/coepzest/' target="_blank" 
        rel="noopener noreferrer"> <Instagram color="currentColor" size={30} /></a>
              <a href='https://www.facebook.com/people/Coep-Zest/61571312685575/?mibextid=wwXIfr&rdid=DH1ZYqMPnrG976dm&share_url=https%3A%2F%2Fwww.facebook.com%2Fshare%2F16dd5rFCFF%2F%3Fmibextid%3DwwXIfr' target="_blank" 
        rel="noopener noreferrer"><Facebook color="currentColor" size={30} /> </a>
            </div>
         <p className='mt-5'>© 2025 ZEST'26. All rights reserved.</p>
    </div>
  )
}

export default Footer