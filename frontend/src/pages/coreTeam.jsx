import React, { useState, useEffect, useRef } from 'react';

// Custom cursor hook
const useCustomCursor = () => {
  useEffect(() => {
    const styleElement = document.createElement('style');
    styleElement.textContent = `
      * { cursor: none !important; }
      
      .cursor-dot {
        position: fixed;
        width: 8px;
        height: 8px;
        background: #f97316;
        border-radius: 50%;
        pointer-events: none;
        z-index: 9999;
      }
      .cursor-circle {
        position: fixed;
        width: 40px;
        height: 40px;
        border: 2px solid rgba(249, 115, 22, 0.5);
        border-radius: 50%;
        pointer-events: none;
        z-index: 9998;
      }
    `;
    document.head.appendChild(styleElement);

    const cursor = document.createElement('div');
    cursor.className = 'cursor-dot';
    document.body.appendChild(cursor);

    const circle = document.createElement('div');
    circle.className = 'cursor-circle';
    document.body.appendChild(circle);

    let mouseX = 0, mouseY = 0;
    let circleX = 0, circleY = 0;

    const handleMouseMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      
      cursor.style.left = mouseX - 4 + 'px';
      cursor.style.top = mouseY - 4 + 'px';
    };

    const animateCircle = () => {
      circleX += (mouseX - circleX) * 0.1;
      circleY += (mouseY - circleY) * 0.1;
      circle.style.left = circleX - 20 + 'px';
      circle.style.top = circleY - 20 + 'px';
      requestAnimationFrame(animateCircle);
    };
    animateCircle();

    document.addEventListener('mousemove', handleMouseMove);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      cursor.remove();
      circle.remove();
      styleElement.remove();
    };
  }, []);
};
import { ChevronLeft, ChevronRight, Search, Filter } from 'lucide-react';
import TeamCard from '../components/TeamCard';

const coreTeamMembers = [
  { 
    role: "Secretary", 
    name: "xyz", 
    image: "#",
    bio: "Leading Zest2026 with vision and dedication. Computer Science student passionate about technology and innovation.",
    email: "arjun.sharma@zest.com",
    linkedin: "https://linkedin.com/in/arjunsharma"
  },
  { 
    role: "Overall Coordinator", 
    name: "abc", 
    image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
    bio: "Supporting organizational excellence and team coordination. Electronics Engineering student with leadership experience.",
    email: "priya.patel@zest.com",
    linkedin: "https://linkedin.com/in/priyapatel"
  }
];
//real data to be updated
const portfolioHeads = [ 
  { role: "Accounts Head", name: "Rajesh Kumar", image: "#", bio: "Managing financial operations.", email: "rajesh.kumar@zest.com", linkedin: "https://linkedin.com/in/rajeshkumar", instagram: "https://instagram.com/rajeshkumar", portfolio: "Accounts" },
  { role: "Accounts Head", name: "Sneha Reddy", image: "#", bio: "Financial planning specialist.", email: "sneha.reddy@zest.com", linkedin: "https://linkedin.com/in/snehareddy", instagram: "https://instagram.com/snehareddy", portfolio: "Accounts" },
  { role: "AOG Head", name: "Vikram Singh", image: "#", bio: "AOG operations manager.", email: "vikram.singh@zest.com", linkedin: "https://linkedin.com/in/vikramsingh", instagram: "https://instagram.com/vikramsingh", portfolio: "AOG" },
  { role: "AOG Head", name: "Ananya Gupta", image: "#", bio: "AOG coordination expert.", email: "ananya.gupta@zest.com", linkedin: "https://linkedin.com/in/ananyagupta", instagram: "https://instagram.com/ananyagupta", portfolio: "AOG" },
  { role: "Campus Head", name: "Rohit Mehta", image: "#", bio: "Campus activities coordinator.", email: "rohit.mehta@zest.com", linkedin: "https://linkedin.com/in/rohitmehta", instagram: "https://instagram.com/rohitmehta", portfolio: "Campus" },
  { role: "Campus Head", name: "Kavya Nair", image: "#", bio: "Campus engagement specialist.", email: "kavya.nair@zest.com", linkedin: "https://linkedin.com/in/kavyanair", instagram: "https://instagram.com/kavyanair", portfolio: "Campus" },
  { role: "Championship Head", name: "Arjun Sharma", image: "#", bio: "Championship event manager.", email: "arjun.sharma@zest.com", linkedin: "https://linkedin.com/in/arjunsharma", instagram: "https://instagram.com/arjunsharma", portfolio: "Championship" },
  { role: "Championship Head", name: "Priya Patel", image: "#", bio: "Sports competition coordinator.", email: "priya.patel@zest.com", linkedin: "https://linkedin.com/in/priyapatel", instagram: "https://instagram.com/priyapatel", portfolio: "Championship" },
  { role: "CRN Head", name: "Ravi Kumar", image: "#", bio: "CRN operations lead.", email: "ravi.kumar@zest.com", linkedin: "https://linkedin.com/in/ravikumar", instagram: "https://instagram.com/ravikumar", portfolio: "CRN" },
  { role: "CRN Head", name: "Sita Sharma", image: "#", bio: "CRN coordination expert.", email: "sita.sharma@zest.com", linkedin: "https://linkedin.com/in/sitasharma", instagram: "https://instagram.com/sitasharma", portfolio: "CRN" },
  { role: "Design Head", name: "Amit Singh", image: "#", bio: "Creative design lead.", email: "amit.singh@zest.com", linkedin: "https://linkedin.com/in/amitsingh", instagram: "https://instagram.com/amitsingh", portfolio: "Design" },
  { role: "Design Head", name: "Neha Gupta", image: "#", bio: "Visual design specialist.", email: "neha.gupta@zest.com", linkedin: "https://linkedin.com/in/nehagupta", instagram: "https://instagram.com/nehagupta", portfolio: "Design" },
  { role: "Document Head", name: "Suresh Mehta", image: "#", bio: "Documentation manager.", email: "suresh.mehta@zest.com", linkedin: "https://linkedin.com/in/sureshmehta", instagram: "https://instagram.com/sureshmehta", portfolio: "Document" },
  { role: "Document Head", name: "Pooja Nair", image: "#", bio: "Content documentation lead.", email: "pooja.nair@zest.com", linkedin: "https://linkedin.com/in/poojanair", instagram: "https://instagram.com/poojanair", portfolio: "Document" },
  { role: "ESM Head", name: "Kiran Sharma", image: "#", bio: "ESM operations coordinator.", email: "kiran.sharma@zest.com", linkedin: "https://linkedin.com/in/kiransharma", instagram: "https://instagram.com/kiransharma", portfolio: "ESM" },
  { role: "ESM Head", name: "Meera Patel", image: "#", bio: "ESM management expert.", email: "meera.patel@zest.com", linkedin: "https://linkedin.com/in/meerapatel", instagram: "https://instagram.com/meerapatel", portfolio: "ESM" },
  { role: "Event Head", name: "Raj Kumar", image: "#", bio: "Event planning specialist.", email: "raj.kumar@zest.com", linkedin: "https://linkedin.com/in/rajkumar", instagram: "https://instagram.com/rajkumar", portfolio: "Event" },
  { role: "Event Head", name: "Asha Singh", image: "#", bio: "Event coordination lead.", email: "asha.singh@zest.com", linkedin: "https://linkedin.com/in/ashasingh", instagram: "https://instagram.com/ashasingh", portfolio: "Event" },
  { role: "Finance and Marketing Head", name: "Dev Gupta", image: "#", bio: "Finance and marketing expert.", email: "dev.gupta@zest.com", linkedin: "https://linkedin.com/in/devgupta", instagram: "https://instagram.com/devgupta", portfolio: "Finance and Marketing" },
  { role: "Finance and Marketing Head", name: "Riya Mehta", image: "#", bio: "Marketing strategy lead.", email: "riya.mehta@zest.com", linkedin: "https://linkedin.com/in/riyamehta", instagram: "https://instagram.com/riyamehta", portfolio: "Finance and Marketing" },
  { role: "Hospitality Head", name: "Anil Nair", image: "#", bio: "Hospitality management expert.", email: "anil.nair@zest.com", linkedin: "https://linkedin.com/in/anilnair", instagram: "https://instagram.com/anilnair", portfolio: "Hospitality" },
  { role: "Hospitality Head", name: "Sunita Sharma", image: "#", bio: "Guest services coordinator.", email: "sunita.sharma@zest.com", linkedin: "https://linkedin.com/in/sunitasharma", instagram: "https://instagram.com/sunitasharma", portfolio: "Hospitality" },
  { role: "Infra Head", name: "Manoj Patel", image: "#", bio: "Infrastructure planning lead.", email: "manoj.patel@zest.com", linkedin: "https://linkedin.com/in/manojpatel", instagram: "https://instagram.com/manojpatel", portfolio: "Infra" },
  { role: "Infra Head", name: "Lata Kumar", image: "#", bio: "Infrastructure management expert.", email: "lata.kumar@zest.com", linkedin: "https://linkedin.com/in/latakumar", instagram: "https://instagram.com/latakumar", portfolio: "Infra" },
  { role: "Logistics Head", name: "Vinod Singh", image: "#", bio: "Logistics coordination specialist.", email: "vinod.singh@zest.com", linkedin: "https://linkedin.com/in/vinodsingh", instagram: "https://instagram.com/vinodsingh", portfolio: "Logistics" },
  { role: "Logistics Head", name: "Geeta Gupta", image: "#", bio: "Supply chain management lead.", email: "geeta.gupta@zest.com", linkedin: "https://linkedin.com/in/geetagupta", instagram: "https://instagram.com/geetagupta", portfolio: "Logistics" },
  { role: "Media Head", name: "Rahul Mehta", image: "#", bio: "Media operations coordinator.", email: "rahul.mehta@zest.com", linkedin: "https://linkedin.com/in/rahulmehta", instagram: "https://instagram.com/rahulmehta", portfolio: "Media" },
  { role: "Media Head", name: "Kavita Nair", image: "#", bio: "Media content specialist.", email: "kavita.nair@zest.com", linkedin: "https://linkedin.com/in/kavitanair", instagram: "https://instagram.com/kavitanair", portfolio: "Media" },
  { role: "Refreshment Head", name: "Sunil Sharma", image: "#", bio: "Refreshment services manager.", email: "sunil.sharma@zest.com", linkedin: "https://linkedin.com/in/sunilsharma", instagram: "https://instagram.com/sunilsharma", portfolio: "Refreshment" },
  { role: "Refreshment Head", name: "Rekha Patel", image: "#", bio: "Food and beverage coordinator.", email: "rekha.patel@zest.com", linkedin: "https://linkedin.com/in/rekhapatel", instagram: "https://instagram.com/rekhapatel", portfolio: "Refreshment" },
  { role: "Safety and Dispute Head", name: "Ajay Kumar", image: "#", bio: "Safety and security expert.", email: "ajay.kumar@zest.com", linkedin: "https://linkedin.com/in/ajaykumar", instagram: "https://instagram.com/ajaykumar", portfolio: "Safety and Dispute" },
  { role: "Safety and Dispute Head", name: "Nisha Singh", image: "#", bio: "Dispute resolution specialist.", email: "nisha.singh@zest.com", linkedin: "https://linkedin.com/in/nishasingh", instagram: "https://instagram.com/nishasingh", portfolio: "Safety and Dispute" },
  { role: "VFX Head", name: "Rohit Gupta", image: "#", bio: "Visual effects coordinator.", email: "rohit.gupta@zest.com", linkedin: "https://linkedin.com/in/rohitgupta", instagram: "https://instagram.com/rohitgupta", portfolio: "VFX" },
  { role: "VFX Head", name: "Priya Mehta", image: "#", bio: "VFX production lead.", email: "priya.mehta@zest.com", linkedin: "https://linkedin.com/in/priyamehta", instagram: "https://instagram.com/priyamehta", portfolio: "VFX" },
  { role: "Web Head", name: "Sanjay Nair", image: "#", bio: "Web development specialist.", email: "sanjay.nair@zest.com", linkedin: "https://linkedin.com/in/sanjaynair", instagram: "https://instagram.com/sanjaynair", portfolio: "Web" },
  { role: "Web Head", name: "Deepa Sharma", image: "#", bio: "Web technology lead.", email: "deepa.sharma@zest.com", linkedin: "https://linkedin.com/in/deepasharma", instagram: "https://instagram.com/deepasharma", portfolio: "Web" }
];

const EnhancedTeamPage = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPortfolio, setSelectedPortfolio] = useState('all');
  const [visibleCards, setVisibleCards] = useState(new Set());
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);
  const cardRefs = useRef([]);
  // Use custom cursor
  useCustomCursor();

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
      
      {/* Floating Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-r from-orange-500 to-orange-600 rounded-full mix-blend-screen filter blur-xl opacity-20 animate-float"></div>
        <div className="absolute top-40 right-10 w-96 h-96 bg-gradient-to-r from-orange-400 to-orange-700 rounded-full mix-blend-screen filter blur-xl opacity-15 animate-float" style={{animationDelay: '2s'}}></div>
        <div className="absolute bottom-20 left-1/3 w-80 h-80 bg-gradient-to-r from-orange-300 to-orange-800 rounded-full mix-blend-screen filter blur-xl opacity-10 animate-float" style={{animationDelay: '4s'}}></div>
        <div className="absolute top-60 left-1/2 w-64 h-64 bg-gradient-to-r from-orange-600 to-orange-500 rounded-full mix-blend-screen filter blur-xl opacity-12 animate-float" style={{animationDelay: '1s'}}></div>
        <div className="absolute bottom-40 right-1/4 w-56 h-56 bg-gradient-to-r from-orange-700 to-orange-400 rounded-full mix-blend-screen filter blur-xl opacity-18 animate-float" style={{animationDelay: '3s'}}></div>
        <div className="absolute top-1/3 left-20 w-48 h-48 bg-gradient-to-r from-orange-300 to-orange-600 rounded-full mix-blend-screen filter blur-xl opacity-14 animate-float" style={{animationDelay: '5s'}}></div>
        
        {/* Geometric Shapes */}
        <div className="absolute top-1/4 right-1/4 w-32 h-32 border-2 border-orange-500/20 rotate-45 animate-spin" style={{animationDuration: '20s'}}></div>
        <div className="absolute bottom-1/4 left-1/4 w-24 h-24 bg-gradient-to-r from-orange-600/10 to-transparent transform rotate-12 animate-pulse"></div>
        <div className="absolute top-3/4 right-1/3 w-16 h-16 border border-orange-400/30 rounded-full animate-bounce" style={{animationDuration: '3s'}}></div>
        <div className="absolute top-1/2 right-10 w-20 h-20 border-2 border-orange-300/25 rotate-12 animate-spin" style={{animationDuration: '15s'}}></div>
        <div className="absolute bottom-1/3 left-10 w-12 h-12 bg-orange-500/20 rounded-full animate-bounce" style={{animationDelay: '2s', animationDuration: '4s'}}></div>
        <div className="absolute top-2/3 left-1/2 w-28 h-28 border border-orange-600/30 rounded-full animate-pulse" style={{animationDelay: '1.5s'}}></div>
        
        {/* Interesting Elements */}
        <div className="absolute top-10 right-1/2 w-6 h-6 bg-orange-400 transform rotate-45 animate-ping" style={{animationDelay: '0.5s'}}></div>
        <div className="absolute bottom-10 left-1/4 w-4 h-4 bg-orange-300 rounded-full animate-bounce" style={{animationDelay: '1.2s', animationDuration: '2s'}}></div>
        <div className="absolute top-1/3 right-20 w-8 h-8 border-2 border-orange-500/40 rounded-full animate-spin" style={{animationDuration: '8s'}}></div>
        <div className="absolute bottom-1/2 left-1/3 w-14 h-2 bg-gradient-to-r from-orange-400/30 to-transparent animate-pulse" style={{animationDelay: '2.8s'}}></div>
        <div className="absolute top-1/5 left-10 w-10 h-10 bg-orange-600/15 transform skew-x-12 animate-bounce" style={{animationDelay: '3.2s', animationDuration: '5s'}}></div>
        <div className="absolute bottom-1/5 right-1/3 w-6 h-20 bg-gradient-to-t from-orange-500/20 to-transparent animate-pulse" style={{animationDelay: '1.8s'}}></div>
        <div className="absolute top-1/2 left-1/4 w-3 h-3 bg-orange-300 animate-ping" style={{animationDelay: '4s'}}></div>
        <div className="absolute bottom-2/3 right-10 w-16 h-16 border-4 border-orange-400/25 border-dashed rounded-full animate-spin" style={{animationDuration: '12s'}}></div>
        <div className="absolute top-3/5 right-1/4 w-12 h-1 bg-orange-500/30 animate-pulse" style={{animationDelay: '2.5s'}}></div>
        <div className="absolute bottom-1/4 left-1/2 w-5 h-5 bg-orange-600 transform rotate-12 animate-bounce" style={{animationDelay: '3.8s', animationDuration: '3.5s'}}></div>
        
        {/* Diagonal Lines */}
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute top-1/4 -left-20 w-96 h-0.5 bg-gradient-to-r from-transparent via-orange-500/20 to-transparent rotate-12 animate-pulse"></div>
          <div className="absolute bottom-1/3 -right-20 w-80 h-0.5 bg-gradient-to-r from-transparent via-orange-400/15 to-transparent -rotate-12 animate-pulse" style={{animationDelay: '1s'}}></div>
          <div className="absolute top-1/2 -left-10 w-72 h-0.5 bg-gradient-to-r from-transparent via-orange-600/18 to-transparent rotate-6 animate-pulse" style={{animationDelay: '2.5s'}}></div>
          <div className="absolute bottom-1/2 -right-15 w-88 h-0.5 bg-gradient-to-r from-transparent via-orange-300/22 to-transparent -rotate-8 animate-pulse" style={{animationDelay: '3.5s'}}></div>
        </div>
      </div>
      
      {/* Enhanced Core Team Title */}
      <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50">
        <div className="relative">
          <div className="absolute -inset-2 bg-gradient-to-r from-orange-500/20 via-orange-400/10 to-orange-500/20 blur-xl rounded-lg"></div>
          <div className="relative bg-black/30 backdrop-blur-sm px-8 py-3 rounded-lg border border-orange-500/30">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold gradient-text tracking-wide split-text">
              <span style={{animationDelay: '0ms'}}>C</span>
              <span style={{animationDelay: '100ms'}}>o</span>
              <span style={{animationDelay: '200ms'}}>r</span>
              <span style={{animationDelay: '300ms'}}>e</span>
              <span style={{animationDelay: '400ms'}}>&nbsp;</span>
              <span style={{animationDelay: '500ms'}}>T</span>
              <span style={{animationDelay: '600ms'}}>e</span>
              <span style={{animationDelay: '700ms'}}>a</span>
              <span style={{animationDelay: '800ms'}}>m</span>
            </h1>
            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-16 h-0.5 bg-gradient-to-r from-transparent via-orange-500 to-transparent animate-pulse"></div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8">
        
        {/* Core Team Section */}
        <section className="mb-12 sm:mb-20 pt-20 sm:pt-24">
          <div className="text-center mb-12">
            <p className="text-gray-300 text-lg animate-in fade-in slide-in-from-bottom-4 duration-1000">Leading with passion and excellence</p>
          </div>
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
                  className={`transform transition-all duration-1000 ${
                    isVisible 
                      ? 'opacity-100 translate-x-0 translate-y-0 scale-100' 
                      : `opacity-0 scale-75 ${
                          index % 2 === 0 ? '-translate-x-20' : 'translate-x-20'
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
                    bio={member.bio}
                    email={member.email}
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
                      className={`transform transition-all duration-1000 ${
                        isVisible 
                          ? 'opacity-100 translate-x-0 translate-y-0 scale-100' 
                          : `opacity-0 scale-75 ${
                              index % 2 === 0 ? '-translate-x-20' : 'translate-x-20'
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
                        bio={member.bio}
                        email={member.email}
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
};

export default EnhancedTeamPage;