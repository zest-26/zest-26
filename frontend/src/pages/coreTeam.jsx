import React, { useState, useEffect, useRef } from 'react';

import { ChevronLeft, ChevronRight, Search, Filter } from 'lucide-react';
import TeamCard from '../components/TeamCard';

const coreTeamMembers = [
  {
    role: "Secretary",
    name: "xyz",
    image: "/badmintonLoader.avif",
    instagram: "https://instagram.com/arjunsharma",
    linkedin: "https://linkedin.com/in/arjunsharma"
  },
  {
    role: "Overall Coordinator",
    name: "abc",
    image: "/badmintonLoader.avif",
    instagram: "https://instagram.com/priyapatel",
    linkedin: "https://linkedin.com/in/priyapatel"
  }
];
//real data to be updated
const portfolioHeads = [
  //accounts
  { role: "Accounts Head", name: "Sairaj Pawar", image: "#", linkedin: "https://www.linkedin.com/in/sairaj-pawar-649b66363?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app", instagram: "https://www.instagram.com/sairaj_pawar_7677?igsh=MTl5ZmlrcjRyZnNrYQ==", portfolio: "Accounts" },
  { role: "Accounts Head", name: "Karan Khairnar", image: "#", linkedin: "https://www.linkedin.com/in/karankhairnar", instagram: "https://www.instagram.com/karankhairnar87?igsh=MTFwdXF6OHU2Y2xycw==", portfolio: "Accounts" },
  //AOG
  { role: "AOG Head", name: "Om Behare", image: "#", linkedin: "https://www.linkedin.com/in/om-behare-26517b292?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app", instagram: "https://www.instagram.com/ombehare1513?igsh=MXU0b3V4N2kweTBvaQ==", portfolio: "AOG" },
  { role: "AOG Head", name: "Riddhi Kamde", image: "#", linkedin: "https://www.linkedin.com/in/riddhi-kamde-8a2699290", instagram: "https://www.instagram.com/riddhi.kamde?igsh=bWZ2aTJkanJkZ2Vv", portfolio: "AOG" },
  //Campus
  { role: "Campus Head", name: "Ranjit Dattaji Shinde", image: "#", linkedin: "https://www.linkedin.com/in/ranjit-shinde-02b70237b?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app", instagram: "https://www.instagram.com/ranjit_shinde_108?igsh=YzVlbjVmMzl1N3hp", portfolio: "Campus" },
  { role: "Campus Head", name: "Kavya Nair", image: "#", linkedin: "https://linkedin.com/in/kavyanair", instagram: "https://instagram.com/kavyanair", portfolio: "Campus" },
  //Championship
  { role: "Championship Head", name: "Arjun Sharma", image: "#", linkedin: "https://linkedin.com/in/arjunsharma", instagram: "https://instagram.com/arjunsharma", portfolio: "Championship" },
  { role: "Championship Head", name: "Priya Patel", image: "#", linkedin: "https://linkedin.com/in/priyapatel", instagram: "https://instagram.com/priyapatel", portfolio: "Championship" },
  //CRN
  { role: "CRN Head", name: "Bhumika Rawale", image: "#", linkedin: "https://www.linkedin.com/in/bhumika-rawale-362983260?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app", instagram: "https://www.instagram.com/bhumika_rawale?igsh=dzdwczV2dGMwcmQ4", portfolio: "CRN" },
  { role: "CRN Head", name: "Mokshank R. Gorwade", image: "#", linkedin: "https://www.linkedin.com/in/mokshank-gorwade-8a2778335?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app", instagram: "https://www.instagram.com/mokshank_7?igsh=MXVyZXY4azQ5OGdxcg==", portfolio: "CRN" },
  //Design
  { role: "Design Head", name: "Atharv Barve", image: "#", linkedin: "https://www.linkedin.com/in/atharv-barve-335196330?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app", instagram: "https://www.instagram.com/atharv_barve04?igsh=YmtldXRsZzBkaXo0", portfolio: "Design" },
  { role: "Design Head", name: "Deep Vaidya", image: "#", linkedin: "https://www.linkedin.com/in/deep-vaidya-vaidya-0b9900317?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app", instagram: "https://www.instagram.com/its.deeeeep?igsh=aDZ2YmFqYjljZGtn", portfolio: "Design" },
  { role: "Design Head", name: "Vaishnavi Pradhan", image: "#", linkedin: "https://in.linkedin.com/in/vaishnavi-pradhan-0885a039b", instagram: "https://www.instagram.com/vaish_h718?igsh=MmJteHhpdjRlazdl", portfolio: "Design" },
  //Documents
  { role: "Document Head", name: "Sahil Nandkumar Watharkar", image: "#", linkedin: "https://www.linkedin.com/in/sahil-watharkar-115a9433a?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app", instagram: "https://www.instagram.com/sahil_watharkar?igsh=dXljMzc3ajllaGI5", portfolio: "Document" },
  { role: "Document Head", name: "Pooja Nair", image: "#", linkedin: "https://linkedin.com/in/poojanair", instagram: "https://instagram.com/poojanair", portfolio: "Document" },
  //ESM
  { role: "ESM Head", name: "Pawan Satish Vaghule", image: "#", linkedin: "https://www.linkedin.com/in/pawan-vaghule-59a318250?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app", instagram: "https://www.instagram.com/pavan_._._09?igsh=amh4NzdnbnVvd3Y3", portfolio: "ESM" },
  { role: "ESM Head", name: "Meera Patel", image: "#", linkedin: "https://linkedin.com/in/meerapatel", instagram: "https://instagram.com/meerapatel", portfolio: "ESM" },
  //Event 1
  { role: "Event Head", name: "Varad Umardand ", image: "#", linkedin: "https://www.linkedin.com/in/varad-umardand-786168292", instagram: "https://www.instagram.com/varad_2655?igsh=MXI0c2gxMDBvNWlpcA==", portfolio: "Event" },
  { role: "Event Head", name: "Shripad Pande", image: "#", linkedin: "https://www.linkedin.com/in/shripad-pande-01181a293?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app", instagram: "https://www.instagram.com/shripad_43?igsh=OXo2dGlobDdyaWdm", portfolio: "Event" },
  //FnM 2
  { role: "Finance and Marketing Head", name: "Utkarsh Wasade", image: "#", linkedin: "https://www.linkedin.com/in/utkarsh-wasade-b445672a8?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app", instagram: "https://www.instagram.com/utkarsh_wasade17?igsh=bGJiZzhlMWEyaDY0", portfolio: "Finance and Marketing" },
  { role: "Finance and Marketing Head", name: "Mrunal Khutemate", image: "#", linkedin: "https://www.linkedin.com/in/mrunal-khutemate-593954290?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app", instagram: "https://www.instagram.com/mrunal.khutemate_10?igsh=MWJlcjI2d2UzOWg0OA==", portfolio: "Finance and Marketing" },
  //Hospitality
  { role: "Hospitality Head", name: "Karan Bonde", image: "#", linkedin: "https://www.linkedin.com/in/karan-bonde-bb0576293?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app", instagram: "https://www.instagram.com/bonde.karan?igsh=MTc0dHNlamJwdGRhag==", portfolio: "Hospitality" },
  { role: "Hospitality Head", name: "Yash Wankhede", image: "#", linkedin: "https://www.linkedin.com/in/yash-wankhede-b50762216?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app", instagram: "https://www.instagram.com/yashh__2_5?igsh=MWF0aDFrNnJrMzEwYg==", portfolio: "Hospitality" },
  //Infra
  { role: "Infra Head", name: "Sujal Deshmukh", image: "#", linkedin: "https://www.linkedin.com/in/sujal-deshmukh-55a030383?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app", instagram: "", portfolio: "Infra" },
  { role: "Infra Head", name: "Atharv Salunkhe", image: "#", linkedin: "https://www.linkedin.com/in/atharv-salunkhe-coep", instagram: "https://www.instagram.com/atharv_7.1?igsh=MWs4MXd0YjYydmJ2dQ==", portfolio: "Infra" },
  //logistics
  { role: "Logistics Head", name: "Kedar Patil", image: "#", linkedin: "https://www.linkedin.com/in/kedar-patil-18386833a?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app", instagram: "https://www.instagram.com/kedar._.27?igsh=MTF5azRrOG11d2N2YQ==", portfolio: "Logistics" },
  { role: "Logistics Head", name: "Geeta Gupta", image: "#", linkedin: "https://linkedin.com/in/geetagupta", instagram: "https://instagram.com/geetagupta", portfolio: "Logistics" },
  //media
  { role: "Media Head", name: "Mrunmayee Jadhav", image: "#", linkedin: "https://www.linkedin.com/in/mrunmayee-jadhav-8a918b224?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app", instagram: "https://www.instagram.com/mrunmayeejadhav?igsh=MWk5OHAxMDFwMnoxdw==", portfolio: "Media" },
  { role: "Media Head", name: "Kavita Nair", image: "#", linkedin: "https://linkedin.com/in/kavitanair", instagram: "https://instagram.com/kavitanair", portfolio: "Media" },
  //refreshment
  { role: "Refreshment Head", name: "Yash Ekhande", image: "#", linkedin: "https://www.linkedin.com/in/yash-ekhande-84296827b?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app", instagram: "https://www.instagram.com/michtohyashhh?igsh=MTVsdmN4ZzB4aHM4cA%3D%3D&utm_source=qr", portfolio: "Refreshment" },
  { role: "Refreshment Head", name: "Rekha Patel", image: "#", linkedin: "https://linkedin.com/in/rekhapatel", instagram: "https://instagram.com/rekhapatel", portfolio: "Refreshment" },
  //safety
  { role: "Safety and Dispute Head", name: "Shrijeet Karandikar", image: "#", linkedin: "https://www.linkedin.com/in/shrijeet-karandikar-017570282?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app", instagram: "https://www.instagram.com/shrik_04?igsh=cTlsaHZvdjB0b3li", portfolio: "Safety and Dispute" },
  { role: "Safety and Dispute Head", name: "Nisha Singh", image: "#", linkedin: "https://linkedin.com/in/nishasingh", instagram: "https://instagram.com/nishasingh", portfolio: "Safety and Dispute" },
  //vfx
  { role: "VFX Head", name: "Sneha Raut", image: "#", linkedin: "https://www.linkedin.com/in/sneha-raut-a39539296?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app", instagram: "https://www.instagram.com/sneharaut_2137?igsh=ZDVtMDJ3eThvM3gx", portfolio: "VFX" },
  { role: "VFX Head", name: "Priya Mehta", image: "#", linkedin: "https://linkedin.com/in/priyamehta", instagram: "https://instagram.com/priyamehta", portfolio: "VFX" },
  //web
  { role: "Web Head", name: "Sanjay Nair", image: "#", linkedin: "https://linkedin.com/in/sanjaynair", instagram: "https://instagram.com/sanjaynair", portfolio: "Web" },
  { role: "Web Head", name: "Deepa Sharma", image: "#", linkedin: "https://linkedin.com/in/deepasharma", instagram: "https://instagram.com/deepasharma", portfolio: "Web" }
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
    "Accounts", "AOG", "Campus", "Championship", "CRN", "Design", "Document", "ESM", "Event", "Finance and Marketing", "Hospitality", "Infra", "Logistics", "Media", "Refreshment", "Safety and Dispute", "VFX", "Web"
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
