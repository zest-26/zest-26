import React from "react";
import {
  Phone,
  Mail,
  Linkedin,
  Instagram,
  Facebook,
  X,
  Heart
} from "lucide-react";

const contacts = [
  {
    portfolio: "Secretary",
    name: "Aditya Dalvi",
    phone: "+91 7756020782",
    email: "overall@zest.coep.ac.in",
  },
  {
    portfolio: "Overall Coordinator",
    name: "Tushar Mahajan",
    phone: "+91 8080348011",
    email: "tech@zest.coep.ac.in",
  },
  {
    portfolio: "Finance and Marketing Team",
    phone: "+91 99887 66554",
    email: "marketing@zest.coep.ac.in",
  },
  {
    portfolio: "Alumini Outreach Team",
    phone: "+91 90123 45678",
    email: "events@zest.coep.ac.in",
  },
  {
    portfolio: "Events Team",
  
    phone: "+91 93456 78901",
    email: "sponsor@zest.coep.ac.in",
  },
  {
    portfolio: "Media Team",
  
    phone: "+91 95678 12345",
    email: "media@zest.coep.ac.in",
  },
];

const Footer = () => {
  return (
    <div className="relative bg-gradient-to-b from-black via-gray-900 to-black w-full py-12 sm:py-16 overflow-hidden">
      
      {/* Decorative Background Elements */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-10 left-10 w-64 h-64 bg-orange-500 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-80 h-80 bg-orange-600 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 flex flex-col items-center gap-8 sm:gap-12 px-4">
        
        {/* HEADING */}
        <div className="text-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-2">
            <span className="bg-gradient-to-r from-orange-500 via-orange-400 to-orange-300 text-transparent bg-clip-text">
              Get In Touch
            </span>
          </h1>
          <div className="h-1 w-32 sm:w-40 bg-gradient-to-r from-transparent via-orange-500 to-transparent mx-auto rounded-full"></div>
        </div>

      
       
{/* CONTACT GRID */}
<div className="w-full max-w-7xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
  {contacts.map((contact, idx) => {
    // Desktop layout logic
    let colSpan = "lg:col-span-1";

    // First row → 2 cards, each 50%
    if (idx === 0 || idx === 1) {
      colSpan = "lg:col-span-2";
    }

    return (
      <div key={idx} className={colSpan}>
        <div className="group relative h-full rounded-2xl border border-orange-500/30 bg-gradient-to-br from-gray-900/80 to-black/60 backdrop-blur-lg p-5 sm:p-6 text-white transition-all duration-300 hover:scale-105 hover:border-orange-500/60 hover:shadow-2xl hover:shadow-orange-500/20">
          
          {/* Glow */}
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-orange-500/0 to-orange-600/0 group-hover:from-orange-500/10 group-hover:to-orange-600/5 transition-all duration-300"></div>

          <div className="relative z-10">
            <div className="flex items-start justify-between mb-3">
              <h3 className="text-base sm:text-lg font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-orange-300">
                {contact.portfolio}
              </h3>
              <div className="w-2 h-2 rounded-full bg-orange-500 animate-pulse"></div>
            </div>

            <p className="text-white font-semibold text-sm sm:text-base mb-4">
              {contact.name}
            </p>

            <div className="space-y-2 text-xs sm:text-sm">
              <a
                href={`tel:${contact.phone.replace(/\s/g, "")}`}
                className="flex items-center gap-2 text-gray-300 hover:text-orange-400 transition"
              >
                <div className="p-1.5 rounded-lg bg-orange-500/10">
                  <Phone size={14} className="text-orange-400" />
                </div>
                {contact.phone}
              </a>

              <a
                href={`mailto:${contact.email}`}
                className="flex items-center gap-2 text-gray-300 hover:text-orange-400 transition"
              >
                <div className="p-1.5 rounded-lg bg-orange-500/10">
                  <Mail size={14} className="text-orange-400" />
                </div>
                {contact.email}
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  })}
</div>



        {/* SOCIAL ICONS */}
        <div className="flex flex-col items-center gap-6">
          <div className="h-px w-48 sm:w-64 bg-gradient-to-r from-transparent via-orange-500 to-transparent"></div>
          
          <div className="flex justify-center items-center gap-4 sm:gap-6 flex-wrap">
            <a 
              href="https://www.instagram.com/coepzest/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="group p-3 rounded-full bg-gradient-to-br from-orange-500/20 to-orange-600/10 border border-orange-500/30 hover:border-orange-500 transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-orange-500/50"
            >
              <Instagram className="text-orange-400 group-hover:text-orange-300 transition-colors" size={24} />
            </a>

            <a 
              href="https://www.facebook.com/people/Coep-Zest/61571312685575/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="group p-3 rounded-full bg-gradient-to-br from-orange-500/20 to-orange-600/10 border border-orange-500/30 hover:border-orange-500 transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-orange-500/50"
            >
              <Facebook className="text-orange-400 group-hover:text-orange-300 transition-colors" size={24} />
            </a>

            <a 
              href="https://www.linkedin.com/company/zest-coep/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="group p-3 rounded-full bg-gradient-to-br from-orange-500/20 to-orange-600/10 border border-orange-500/30 hover:border-orange-500 transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-orange-500/50"
            >
              <Linkedin className="text-orange-400 group-hover:text-orange-300 transition-colors" size={24} />
            </a>

            <a 
              href="https://x.com/zest_coep" 
              target="_blank" 
              rel="noopener noreferrer"
              className="group p-3 rounded-full bg-gradient-to-br from-orange-500/20 to-orange-600/10 border border-orange-500/30 hover:border-orange-500 transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-orange-500/50"
            >
              <X className="text-orange-400 group-hover:text-orange-300 transition-colors" size={24} />
            </a>
          </div>
          
          <div className="h-px w-48 sm:w-64 bg-gradient-to-r from-transparent via-orange-500 to-transparent"></div>
        </div>

        {/* COPYRIGHT */}
       <div className="text-center space-y-4">
          <p className="text-sm text-gray-400 flex items-center justify-center gap-2">
            Made with <Heart className="text-orange-300 hover:text-orange-200
               [filter:drop-shadow(0_0_4px_#E8560E)_drop-shadow(0_0_10px_#E8560E)_drop-shadow(0_0_20px_#E8560E)]
                hover:scale-110 transition-transform duration-300 ease-out hover:-translate-y-1" size={16} /> by <span className="text-orange-600"> Web and App Team</span>
          </p>
          <p className="text-xs sm:text-sm text-gray-400">
            © 2025 <span className="text-orange-400 font-semibold">ZEST'26</span>. All rights reserved.
          </p>
        </div>

      </div>
    </div>
  );
};

export default Footer;