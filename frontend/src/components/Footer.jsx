import React from 'react'
import {Phone,Mail,MapPin,Linkedin,Github,Instagram, Twitter} from 'lucide-react'


const Footer = () => {
  return (
    <div className='bg-black  min-h-1/3'>
      <h1 className='text-5xl font-bold text-center py-6 '>
  <span className='bg-gradient-to-r from-orange-600 to-white text-transparent bg-clip-text'>Get In</span><span className='bg-gradient-to-r from-white to-orange-600 text-transparent bg-clip-text'> Touch</span>
</h1>
  <div className='flex justify-evenly mt-6 ml-150 mr-150'>
                <Linkedin color="currentColor" size={30} />
                <Instagram color="currentColor" size={30} />
                <Github color="currentColor" size={30} />
                <Twitter color="currentColor" size={30} />
            </div>
         <p className='mt-5'>© 2025 ZEST'26. All rights reserved.</p>
    </div>
  )
}

export default Footer