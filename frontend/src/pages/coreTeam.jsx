import React, { useState, useEffect, useRef } from 'react';

import { ChevronLeft, ChevronRight, Search, Filter } from 'lucide-react';
import TeamCard from '../components/TeamCard';

const coreTeamMembers = [
  {
    role: "Secretary",
    name: "Aditya Dalvi",
    image: "/CoreTeam/Aaditya.avif",
    instagram: "https://www.instagram.com/aditya_dalvi1207/",
    linkedin: "https://www.linkedin.com/in/aditya-dalvi-a1b825259/"
  },
  {
    role: "Overall Coordinator",
    name: "Tushar Mahajan",
    image: "/CoreTeam/OC.avif",
    instagram: "https://www.instagram.com/_tushar_0810/",
    linkedin: "https://www.linkedin.com/in/tushar-mahajan-a8b720291/"
  }
];
//real data to be updated
const portfolioHeads = [
  //CRN 1 2
  { role: "CRN Head", name: "Bhumika Rawale", image: "/CoreTeam/Bhumika.avif", linkedin: "https://www.linkedin.com/in/bhumika-rawale-362983260?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app", instagram: "https://www.instagram.com/bhumika_rawale?igsh=dzdwczV2dGMwcmQ4", portfolio: "CRN" },
  { role: "CRN Head", name: "Mokshank Gorwade", image: "/CoreTeam/Mokshank.avif", linkedin: "https://www.linkedin.com/in/mokshank-gorwade-8a2778335?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app", instagram: "https://www.instagram.com/mokshank_7?igsh=MXVyZXY4azQ5OGdxcg==", portfolio: "CRN" },
   //FnM 1 2
  { role: "Finance and Marketing Head", name: "Utkarsh Wasade", image: "/CoreTeam/Utkarsh.avif", linkedin: "https://www.linkedin.com/in/utkarsh-wasade-b445672a8?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app", instagram: "https://www.instagram.com/utkarsh_wasade17?igsh=bGJiZzhlMWEyaDY0", portfolio: "Finance and Marketing" },
  { role: "Finance and Marketing Head", name: "Mrunal Khutemate", image: "/CoreTeam/Mrunal.avif", linkedin: "https://www.linkedin.com/in/mrunal-khutemate-593954290?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app", instagram: "https://www.instagram.com/mrunal.khutemate_10?igsh=MWJlcjI2d2UzOWg0OA==", portfolio: "Finance and Marketing" },
   //vfx 1
  { role: "VFX Head", name: "Sneha Raut", image: "/CoreTeam/SnehaRaut.avif", linkedin: "https://www.linkedin.com/in/sneha-raut-a39539296?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app", instagram: "https://www.instagram.com/sneharaut_2137?igsh=ZDVtMDJ3eThvM3gx", portfolio: "VFX" },
  { role: "VFX Head", name: "Arnav", image: "/CoreTeam/VFXArnav.avif", linkedin: "https://www.linkedin.com/in/arnavwaske?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app", instagram: "https://www.linkedin.com/in/arnavwaske?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app", portfolio: "VFX" },
 
  //accounts 1 2
  { role: "Accounts Head", name: "Sairaj Pawar", image: "/CoreTeam/Sairaj.avif", linkedin: "https://www.linkedin.com/in/sairaj-pawar-649b66363?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app", instagram: "https://www.instagram.com/sairaj_pawar_7677?igsh=MTl5ZmlrcjRyZnNrYQ==", portfolio: "Accounts" },
  { role: "Accounts Head", name: "Karan Khairnar", image: "/CoreTeam/KaranK_compressed.avif", linkedin: "https://www.linkedin.com/in/karankhairnar", instagram: "https://www.instagram.com/karankhairnar87?igsh=MTFwdXF6OHU2Y2xycw==", portfolio: "Accounts" },
  //AOG 1 2
  { role: "AOG Head", name: "Om Behare", image: "/CoreTeam/Om.avif", linkedin: "https://www.linkedin.com/in/om-behare-26517b292?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app", instagram: "https://www.instagram.com/ombehare1513?igsh=MXU0b3V4N2kweTBvaQ==", portfolio: "AOG" },
  { role: "AOG Head", name: "Riddhi Kamde", image: "/CoreTeam/Ridhi_compressed.avif", linkedin: "https://www.linkedin.com/in/riddhi-kamde-8a2699290", instagram: "https://www.instagram.com/riddhi.kamde?igsh=bWZ2aTJkanJkZ2Vv", portfolio: "AOG" },
  //Campus 1
  { role: "Campus Head", name: "Ranjit Dattaji Shinde", image: "/CoreTeam/Ranjit.avif", linkedin: "https://www.linkedin.com/in/ranjit-shinde-02b70237b?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app", instagram: "https://www.instagram.com/ranjit_shinde_108?igsh=YzVlbjVmMzl1N3hp", portfolio: "Campus" },
  { role: "Campus Head", name: "Sudarshan Mane", image: "/CoreTeam/Sudarshan_compressed.avif", linkedin: "https://www.linkedin.com/in/sudarshan-mane-98a171292?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app", instagram: "https://www.linkedin.com/in/sudarshan-mane-98a171292?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app", portfolio: "Campus" },
  //Championship
  { role: "Championship Head", name: "Ajit Patil", image: "/CoreTeam/Ajit_compressed.avif", linkedin: "https://www.linkedin.com/in/ajit-patil-a7282b331?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app", instagram: "https://www.instagram.com/ajit_patil_20?igsh=MXdmNHBmaHNtdDJmNQ%3D%3D", portfolio: "Championship" },
 
    //Design 1 2 3
  { role: "Design Head", name: "Atharv Barve", image: "/CoreTeam/DesignAtharv.avif", linkedin: "https://www.linkedin.com/in/atharv-barve-335196330?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app", instagram: "https://www.instagram.com/atharv_barve04?igsh=YmtldXRsZzBkaXo0", portfolio: "Design" },
  { role: "Design Head", name: "Deep Vaidya", image: "#", linkedin: "https://www.linkedin.com/in/deep-vaidya-vaidya-0b9900317?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app", instagram: "https://www.instagram.com/its.deeeeep?igsh=aDZ2YmFqYjljZGtn", portfolio: "Design" },
  { role: "Design Head", name: "Vaishnavi Pradhan", image: "#", linkedin: "https://in.linkedin.com/in/vaishnavi-pradhan-0885a039b", instagram: "https://www.instagram.com/vaish_h718?igsh=MmJteHhpdjRlazdl", portfolio: "Design" },
  //Documents 1
  { role: "Document Head", name: "Sahil Nandkumar Watharkar", image: "/CoreTeam/Sahil.avif", linkedin: "https://www.linkedin.com/in/sahil-watharkar-115a9433a?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app", instagram: "https://www.instagram.com/sahil_watharkar?igsh=dXljMzc3ajllaGI5", portfolio: "Document" },
  { role: "Document Head", name: "Mrunmayee", image: "/CoreTeam/MrunDocs_compressed.avif", linkedin: " https://www.linkedin.com/in/mrunmayi-sangle-878b8028b?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app", instagram: "https://www.instagram.com/mrunmayisangle?igsh=MTFhdzR0cHp6dW53eQ==", portfolio: "Document" },
  //ESM 1
  { role: "ESM Head", name: "Pawan Satish Vaghule", image: "/CoreTeam/pawanWaghule.avif", linkedin: "https://www.linkedin.com/in/pawan-vaghule-59a318250?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app", instagram: "https://www.instagram.com/pavan_._._09?igsh=amh4NzdnbnVvd3Y3", portfolio: "ESM" },
  
  //Event 1 2
  { role: "Event Head", name: "Varad Umardand ", image: "/CoreTeam/Varad_compressed.avif", linkedin: "https://www.linkedin.com/in/varad-umardand-786168292", instagram: "https://www.instagram.com/varad_2655?igsh=MXI0c2gxMDBvNWlpcA==", portfolio: "Event" },
  { role: "Event Head", name: "Shripad Pande", image: "/CoreTeam/shripad.avif", linkedin: "https://www.linkedin.com/in/shripad-pande-01181a293?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app", instagram: "https://www.instagram.com/shripad_43?igsh=OXo2dGlobDdyaWdm", portfolio: "Event" },
  //Hospitality 1 2
  { role: "Hospitality Head", name: "Karan Bonde", image: "/CoreTeam/KaranB.avif", linkedin: "https://www.linkedin.com/in/karan-bonde-bb0576293?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app", instagram: "https://www.instagram.com/bonde.karan?igsh=MTc0dHNlamJwdGRhag==", portfolio: "Hospitality" },
  { role: "Hospitality Head", name: "Yash Wankhede", image: "/CoreTeam/YashWankhede.avif", linkedin: "https://www.linkedin.com/in/yash-wankhede-b50762216?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app", instagram: "https://www.instagram.com/yashh__2_5?igsh=MWF0aDFrNnJrMzEwYg==", portfolio: "Hospitality" },
  //Infra 1 2
  
  { role: "Infra Head", name: "Atharv Salunkhe", image: "#", linkedin: "https://www.linkedin.com/in/atharv-salunkhe-coep", instagram: "https://www.instagram.com/atharv_7.1?igsh=MWs4MXd0YjYydmJ2dQ==", portfolio: "Infra" },
  //logistics 1
  { role: "Logistics Head", name: "Kedar Patil", image: "/CoreTeam/kedarPatil.avif", linkedin: "https://www.linkedin.com/in/kedar-patil-18386833a?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app", instagram: "https://www.instagram.com/kedar._.27?igsh=MTF5azRrOG11d2N2YQ==", portfolio: "Logistics" },
  
  //media 1
  { role: "Media Head", name: "Mrunmayee Jadhav", image: "#", linkedin: "https://www.linkedin.com/in/mrunmayee-jadhav-8a918b224?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app", instagram: "https://www.instagram.com/mrunmayeejadhav?igsh=MWk5OHAxMDFwMnoxdw==", portfolio: "Media" },
    //refreshment 1
  { role: "Refreshment Head", name: "Yash Ekhande", image: "/CoreTeam/RefreshmentYash.avif", linkedin: "https://www.linkedin.com/in/yash-ekhande-84296827b?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app", instagram: "https://www.instagram.com/michtohyashhh?igsh=MTVsdmN4ZzB4aHM4cA%3D%3D&utm_source=qr", portfolio: "Refreshment" },
  
  //safety 1
  { role: "Safety and Dispute Head", name: "Shrijeet Karandikar", image: "/CoreTeam/shreejit.avif", linkedin: "https://www.linkedin.com/in/shrijeet-karandikar-017570282?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app", instagram: "https://www.instagram.com/shrik_04?igsh=cTlsaHZvdjB0b3li", portfolio: "Safety and Dispute" },
  
  //web 1 2  
   { role: "Web Head", name: "Palak Kongale", image: "/CoreTeam/WEBPalak.avif", linkedin: "https://in.linkedin.com/in/palak-kongale-b212aa290", instagram: "https://www.instagram.com/_palakkongale_?igsh=MTVodDVqdWszMzc3MQ==", portfolio: "Web" },
  { role: "Web Head", name: "Vitthal Karanjkar", image: "#", linkedin: "https://www.linkedin.com/in/vitthal-karanjkar-a90836226/.", instagram: "https://www.instagram.com/vitthal_karanjkar?igsh=MWdsMDVtNHpnZWpueA==", portfolio: "Web" },
     
];


const coreTeam = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPortfolio, setSelectedPortfolio] = useState('all');
  const [visibleCards, setVisibleCards] = useState(new Set());
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);
  const cardRefs = useRef([]);


  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const cardId = entry.target.dataset.cardId;
          if (entry.isIntersecting) {
            setVisibleCards(prev => new Set([...prev, cardId]));
          } else {
            setVisibleCards(prev => {
              const newSet = new Set(prev);
              newSet.delete(cardId);
              return newSet;
            });
          }
        });
      },
      { threshold: 0.2, rootMargin: '0px' }
    );

    cardRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const styleElement = document.createElement('style');
    styleElement.textContent = `
       @keyframes grid-move {
         0% { transform: translate(0, 0); }
         100% { transform: translate(50px, 50px); }
       }
       @keyframes fadeInUp {
         from { opacity: 0; transform: translateY(60px) scale(0.8); }
         to { opacity: 1; transform: translateY(0) scale(1); }
       }
       @keyframes float {
         0%, 100% { transform: translateY(0px) rotate(0deg); }
         50% { transform: translateY(-10px) rotate(2deg); }
       }
       @keyframes pulse-glow {
         0%, 100% { box-shadow: 0 0 20px rgba(249, 115, 22, 0.3); }
         50% { box-shadow: 0 0 40px rgba(249, 115, 22, 0.6), 0 0 60px rgba(249, 115, 22, 0.3); }
       }
       @keyframes sparkle {
         0%, 100% { opacity: 0; transform: scale(0) rotate(0deg); }
         50% { opacity: 1; transform: scale(1) rotate(180deg); }
       }
       .animate-fade-in-up { animation: fadeInUp 1s cubic-bezier(0.4, 0, 0.2, 1) forwards; }
       .animate-float { animation: float 6s ease-in-out infinite; }
       .animate-grid { animation: grid-move 20s linear infinite; }
       .animate-pulse-glow { animation: pulse-glow 3s ease-in-out infinite; }
 
       @keyframes gradient-shift {
         0% { background-position: 0% 50%; }
         50% { background-position: 100% 50%; }
         100% { background-position: 0% 50%; }
       }
       .gradient-text {
         background: linear-gradient(-45deg, #f97316, #fb923c, #fdba74, #f97316, #fb923c);
         background-size: 400% 400%;
         background-clip: text;
         -webkit-background-clip: text;
         color: #f97316;
         animation: gradient-shift 3s ease infinite;
       }
       @keyframes split-in {
         0% {
           opacity: 0;
           transform: translateY(20px) rotateX(90deg);
         }
         100% {
           opacity: 1;
           transform: translateY(0) rotateX(0deg);
         }
       }
       .split-text span {
         display: inline-block;
         opacity: 0;
         animation: split-in 0.6s ease forwards;
       }
         
 
     `;
    document.head.appendChild(styleElement);

    return () => {
      styleElement.remove();
    };
  }, []);

  const portfolioNames = [
   "CRN","Finance and Marketing","VFX",  "Accounts", "AOG", "Campus", "Championship",  "Design", "Document", "ESM", "Event",  "Hospitality", "Infra", "Logistics", "Media", "Refreshment", "Safety and Dispute", "Web"
  ];

  const cardsPerSlide = 2;

  // Filter portfolio members based on search and portfolio filter
  const filteredportfolioHeads = portfolioHeads.filter(member => {
    const matchesSearch = member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.role.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesPortfolio = selectedPortfolio === 'all' ||
      member.portfolio === selectedPortfolio;
    return matchesSearch && matchesPortfolio;
  });

  const totalSlides = Math.ceil(filteredportfolioHeads.length / cardsPerSlide);

  // Reset slide when filters change
  useEffect(() => {
    setCurrentSlide(0);
  }, [searchTerm, selectedPortfolio]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % totalSlides);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
  };

  // Touch handlers for mobile swipe
  const handleTouchStart = (e) => {
    touchStartX.current = e.targetTouches[0].clientX;
  };

  const handleTouchMove = (e) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    const difference = touchStartX.current - touchEndX.current;
    const threshold = 50;

    if (Math.abs(difference) > threshold) {
      if (difference > 0) {
        nextSlide();
      } else {
        prevSlide();
      }
    }
  };



  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-gray-800 relative overflow-hidden">
      {/* Animated Grid Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(249,115,22,0.3) 1px, transparent 0)',
          backgroundSize: '50px 50px',
          animation: 'grid-move 20s linear infinite'
        }}></div>
      </div>



      {/* Enhanced Core Team Title */}
      <div className="fixed top-24 md:top-34 left-1/2 transform -translate-x-1/2 z-50">
        <div className="relative">
          <div className="absolute -inset-1 sm:-inset-2 bg-gradient-to-r from-orange-500/20 via-orange-400/10 to-orange-500/20 blur-lg sm:blur-xl rounded-lg"></div>

          <div className="
      relative
      bg-black/30 backdrop-blur-sm
      px-4 py-2           /* 👈 mobile */
      sm:px-8 sm:py-3     /* 👈 desktop */
      rounded-md sm:rounded-lg
      border border-orange-500/30
    ">
            <h1 className="
        text-xl            /* 👈 mobile */
        sm:text-3xl
        lg:text-5xl
        font-bold
        gradient-text
        tracking-wide
        split-text
      ">
              <span style={{ animationDelay: '0ms' }}>C</span>
              <span style={{ animationDelay: '100ms' }}>o</span>
              <span style={{ animationDelay: '200ms' }}>r</span>
              <span style={{ animationDelay: '300ms' }}>e</span>
              <span style={{ animationDelay: '400ms' }}>&nbsp;</span>
              <span style={{ animationDelay: '500ms' }}>T</span>
              <span style={{ animationDelay: '600ms' }}>e</span>
              <span style={{ animationDelay: '700ms' }}>a</span>
              <span style={{ animationDelay: '800ms' }}>m</span>
            </h1>

            <div className="
        absolute bottom-0 left-1/2 transform -translate-x-1/2
        w-10 sm:w-16 h-0.5
        bg-gradient-to-r from-transparent via-orange-500 to-transparent
        animate-pulse
      "></div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8">

        {/* Core Team Section */}
        <section className="mb-12 sm:mb-20 pt-40 sm:pt-54">

          <div className="flex flex-col items-center gap-8 sm:gap-12 max-w-2xl mx-auto">
            {coreTeamMembers.map((member, index) => {
              const cardId = `core-${index}`;
              const isVisible = visibleCards.has(cardId);
              
              return (
                <div
                  key={index}
                  ref={(el) => {
                    if (el && !cardRefs.current.includes(el)) {
                      cardRefs.current.push(el);
                    }
                  }}
                  data-card-id={cardId}
                  className={`transform transition-all duration-1000 ${isVisible
                    ? 'opacity-100 translate-x-0 translate-y-0 scale-100'
                    : `opacity-0 scale-75 ${index % 2 === 0 ? '-translate-x-20' : 'translate-x-20'
                    } translate-y-10`
                    }`}
                  style={{
                    transitionDelay: `${index * 100}ms`,
                    filter: isVisible ? 'none' : 'blur(3px)'
                  }}
                >
                  <TeamCard
                    cardId={cardId}
                    role={member.role}
                    name={member.name}
                    image={member.image}



                    linkedin={member.linkedin}
                    instagram={member.instagram}
                  />
                </div>
              );
            })}
          </div>
        </section>

        {/* Portfolio Sections */}
        {portfolioNames.map((portfolioName, portfolioIndex) => {
          const portfolioMembers = portfolioHeads.filter(member => member.portfolio === portfolioName);

          if (portfolioMembers.length === 0) return null;

          return (
            <section key={portfolioName} className="mb-10 sm:mb-16 relative">
              <div className="text-center mb-8 sm:mb-12">
                <h2 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-orange-400 via-orange-500 to-orange-600 bg-clip-text text-transparent mb-4 hover:scale-105 transition-transform duration-300">{portfolioName}</h2>
                <div className="w-12 sm:w-16 h-0.5 bg-gradient-to-r from-orange-400 to-orange-600 mx-auto rounded-full animate-pulse"></div>
              </div>

              <div className="flex flex-wrap justify-center gap-6 sm:gap-8 lg:gap-12 max-w-7xl mx-auto">
                {portfolioMembers.map((member, index) => {
                  const cardId = `${portfolioName}-${index}`;
                  const isVisible = visibleCards.has(cardId);

                  return (
                    <div
                      key={cardId}
                      ref={(el) => {
                        if (el && !cardRefs.current.includes(el)) {
                          cardRefs.current.push(el);
                        }
                      }}
                      data-card-id={cardId}
                      className={`transform transition-all duration-1000 ${isVisible
                        ? 'opacity-100 translate-x-0 translate-y-0 scale-100'
                        : `opacity-0 scale-75 ${index % 2 === 0 ? '-translate-x-20' : 'translate-x-20'
                        } translate-y-10`
                        }`}
                      style={{
                        transitionDelay: `${index * 100}ms`,
                        filter: isVisible ? 'none' : 'blur(3px)'
                      }}
                    >
                      <TeamCard
                        cardId={cardId}
                        role={member.role}
                        name={member.name}
                        image={member.image}


                        linkedin={member.linkedin}
                        instagram={member.instagram}
                      />
                    </div>
                  );
                })}
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
}

export default coreTeam