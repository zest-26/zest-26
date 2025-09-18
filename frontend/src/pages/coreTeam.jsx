import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, Search, Filter } from 'lucide-react';
import TeamCard from '../components/TeamCard';

// Real team member data
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
    role: "Joint Secretary", 
    name: "Priya Patel", 
    image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
    bio: "Supporting organizational excellence and team coordination. Electronics Engineering student with leadership experience.",
    email: "priya.patel@zest.com",
    linkedin: "https://linkedin.com/in/priyapatel"
  }
];

const portfolioMembers = [
  { role: "Accounts Head", name: "Rajesh Kumar", image: "#", bio: "Managing financial operations.", email: "rajesh.kumar@zest.com", instagram: "https://instagram.com/rajeshkumar", portfolio: "Accounts" },
  { role: "Accounts Head", name: "Sneha Reddy", image: "#", bio: "Financial planning specialist.", email: "sneha.reddy@zest.com", portfolio: "Accounts" },
  { role: "AOG Head", name: "Vikram Singh", image: "#", bio: "AOG operations manager.", email: "vikram.singh@zest.com", portfolio: "AOG" },
  { role: "AOG Head", name: "Ananya Gupta", image: "#", bio: "AOG coordination expert.", email: "ananya.gupta@zest.com", portfolio: "AOG" },
  { role: "Campus Head", name: "Rohit Mehta", image: "#", bio: "Campus activities coordinator.", email: "rohit.mehta@zest.com", portfolio: "Campus" },
  { role: "Campus Head", name: "Kavya Nair", image: "#", bio: "Campus engagement specialist.", email: "kavya.nair@zest.com", portfolio: "Campus" },
  { role: "Championship Head", name: "Arjun Sharma", image: "#", bio: "Championship event manager.", email: "arjun.sharma@zest.com", portfolio: "Championship" },
  { role: "Championship Head", name: "Priya Patel", image: "#", bio: "Sports competition coordinator.", email: "priya.patel@zest.com", portfolio: "Championship" },
  { role: "CRN Head", name: "Ravi Kumar", image: "#", bio: "CRN operations lead.", email: "ravi.kumar@zest.com", portfolio: "CRN" },
  { role: "CRN Head", name: "Sita Sharma", image: "#", bio: "CRN coordination expert.", email: "sita.sharma@zest.com", portfolio: "CRN" },
  { role: "Design Head", name: "Amit Singh", image: "#", bio: "Creative design lead.", email: "amit.singh@zest.com", portfolio: "Design" },
  { role: "Design Head", name: "Neha Gupta", image: "#", bio: "Visual design specialist.", email: "neha.gupta@zest.com", portfolio: "Design" },
  { role: "Document Head", name: "Suresh Mehta", image: "#", bio: "Documentation manager.", email: "suresh.mehta@zest.com", portfolio: "Document" },
  { role: "Document Head", name: "Pooja Nair", image: "#", bio: "Content documentation lead.", email: "pooja.nair@zest.com", portfolio: "Document" },
  { role: "ESM Head", name: "Kiran Sharma", image: "#", bio: "ESM operations coordinator.", email: "kiran.sharma@zest.com", portfolio: "ESM" },
  { role: "ESM Head", name: "Meera Patel", image: "#", bio: "ESM management expert.", email: "meera.patel@zest.com", portfolio: "ESM" },
  { role: "Event Head", name: "Raj Kumar", image: "#", bio: "Event planning specialist.", email: "raj.kumar@zest.com", portfolio: "Event" },
  { role: "Event Head", name: "Asha Singh", image: "#", bio: "Event coordination lead.", email: "asha.singh@zest.com", portfolio: "Event" },
  { role: "Finance and Marketing Head", name: "Dev Gupta", image: "#", bio: "Finance and marketing expert.", email: "dev.gupta@zest.com", portfolio: "Finance and Marketing" },
  { role: "Finance and Marketing Head", name: "Riya Mehta", image: "#", bio: "Marketing strategy lead.", email: "riya.mehta@zest.com", portfolio: "Finance and Marketing" },
  { role: "Hospitality Head", name: "Anil Nair", image: "#", bio: "Hospitality management expert.", email: "anil.nair@zest.com", portfolio: "Hospitality" },
  { role: "Hospitality Head", name: "Sunita Sharma", image: "#", bio: "Guest services coordinator.", email: "sunita.sharma@zest.com", portfolio: "Hospitality" },
  { role: "Infra Head", name: "Manoj Patel", image: "#", bio: "Infrastructure planning lead.", email: "manoj.patel@zest.com", portfolio: "Infra" },
  { role: "Infra Head", name: "Lata Kumar", image: "#", bio: "Infrastructure management expert.", email: "lata.kumar@zest.com", portfolio: "Infra" },
  { role: "Logistics Head", name: "Vinod Singh", image: "#", bio: "Logistics coordination specialist.", email: "vinod.singh@zest.com", portfolio: "Logistics" },
  { role: "Logistics Head", name: "Geeta Gupta", image: "#", bio: "Supply chain management lead.", email: "geeta.gupta@zest.com", portfolio: "Logistics" },
  { role: "Media Head", name: "Rahul Mehta", image: "#", bio: "Media operations coordinator.", email: "rahul.mehta@zest.com", portfolio: "Media" },
  { role: "Media Head", name: "Kavita Nair", image: "#", bio: "Media content specialist.", email: "kavita.nair@zest.com", portfolio: "Media" },
  { role: "Refreshment Head", name: "Sunil Sharma", image: "#", bio: "Refreshment services manager.", email: "sunil.sharma@zest.com", portfolio: "Refreshment" },
  { role: "Refreshment Head", name: "Rekha Patel", image: "#", bio: "Food and beverage coordinator.", email: "rekha.patel@zest.com", portfolio: "Refreshment" },
  { role: "Safety and Dispute Head", name: "Ajay Kumar", image: "#", bio: "Safety and security expert.", email: "ajay.kumar@zest.com", portfolio: "Safety and Dispute" },
  { role: "Safety and Dispute Head", name: "Nisha Singh", image: "#", bio: "Dispute resolution specialist.", email: "nisha.singh@zest.com", portfolio: "Safety and Dispute" },
  { role: "VFX Head", name: "Rohit Gupta", image: "#", bio: "Visual effects coordinator.", email: "rohit.gupta@zest.com", portfolio: "VFX" },
  { role: "VFX Head", name: "Priya Mehta", image: "#", bio: "VFX production lead.", email: "priya.mehta@zest.com", portfolio: "VFX" },
  { role: "Web Head", name: "Sanjay Nair", image: "#", bio: "Web development specialist.", email: "sanjay.nair@zest.com", portfolio: "Web" },
  { role: "Web Head", name: "Deepa Sharma", image: "#", bio: "Web technology lead.", email: "deepa.sharma@zest.com", portfolio: "Web" }
]




const EnhancedTeamPage = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPortfolio, setSelectedPortfolio] = useState('all');
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  const portfolioNames = [
    "Accounts", "AOG", "Campus", "Championship", "CRN", "Design", "Document", "ESM", "Event", "Finance and Marketing", "Hospitality", "Infra", "Logistics", "Media", "Refreshment", "Safety and Dispute", "VFX", "Web"
  ];

  const cardsPerSlide = 2;

  // Filter portfolio members based on search and portfolio filter
  const filteredPortfolioMembers = portfolioMembers.filter(member => {
    const matchesSearch = member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         member.role.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesPortfolio = selectedPortfolio === 'all' || 
                           member.portfolio === selectedPortfolio;
    return matchesSearch && matchesPortfolio;
  });

  const totalSlides = Math.ceil(filteredPortfolioMembers.length / cardsPerSlide);

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
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-orange-100">
      {/* Sticky Navbar */}
      <nav className="sticky top-0 z-40 bg-gradient-to-r from-black via-gray-900 to-black shadow-2xl border-b-4 border-orange-500 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-orange-500 to-orange-600 rounded-full flex items-center justify-center text-white font-bold">
                Z
              </div>
              <div className="text-2xl font-bold bg-gradient-to-r from-orange-400 to-orange-600 bg-clip-text text-transparent">Zest2026</div>
            </div>
            
            {/* Search and Filter Controls */}
            <div className="hidden md:flex items-center space-x-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                <input
                  type="text"
                  placeholder="Search team members..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 bg-white bg-opacity-10 border border-orange-300 rounded-full text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200"
                />
              </div>
              
              <div className="relative">
                <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                <select
                  value={selectedPortfolio}
                  onChange={(e) => setSelectedPortfolio(e.target.value)}
                  className="pl-10 pr-8 py-2 bg-white bg-opacity-10 border border-orange-300 rounded-full text-white focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200 appearance-none cursor-pointer"
                >
                  <option value="all" className="text-black">All Portfolios</option>
                  {portfolioNames.map((portfolio) => (
                    <option key={portfolio} value={portfolio} className="text-black">
                      {portfolio}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
          
          {/* Mobile Filter */}
          <div className="md:hidden pb-4">
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
              <select
                value={selectedPortfolio}
                onChange={(e) => setSelectedPortfolio(e.target.value)}
                className="w-full pl-10 pr-8 py-2 bg-white bg-opacity-10 border border-orange-300 rounded-full text-white focus:outline-none focus:ring-2 focus:ring-orange-500 appearance-none"
              >
                <option value="all" className="text-black">All Portfolios</option>
                {portfolioNames.map((portfolio) => (
                  <option key={portfolio} value={portfolio} className="text-black">
                    {portfolio}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Core Team Section */}
        <section className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-5xl font-bold text-black mb-4 animate-in fade-in slide-in-from-bottom-4 duration-1000">Core Team</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-orange-500 to-orange-600 mx-auto rounded-full animate-in fade-in slide-in-from-left-4 duration-1000 delay-200"></div>
            <p className="text-gray-700 mt-4 text-lg animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-300">Leading with passion and excellence</p>
          </div>
          <div className="flex flex-wrap justify-center gap-12 max-w-4xl mx-auto">
            {coreTeamMembers.map((member, index) => (
              <div key={index} className="animate-in fade-in slide-in-from-bottom-4 duration-1000" style={{ animationDelay: String((index + 1) * 200) + 'ms' }}>
                <TeamCard
                  cardId={`core-${index}`}
                  role={member.role}
                  name={member.name}
                  image={member.image}
                  bio={member.bio}
                  email={member.email}
                  linkedin={member.linkedin}
                  instagram={member.instagram}
                />
              </div>
            ))}
          </div>
        </section>

        {/* Portfolio Section with Enhanced Sliding Effect */}
        <section className="mb-20">
          {totalSlides > 0 ? (
            <div className="relative max-w-5xl mx-auto">
              {/* Navigation Buttons - Only show if there are multiple slides */}
              {totalSlides > 1 && (
                <>
                  <button 
                    onClick={prevSlide}
                    className="absolute left-4 top-1/2 -translate-y-1/2 z-10 w-14 h-14 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white rounded-full flex items-center justify-center transition-all duration-300 shadow-2xl hover:scale-110 border-2 border-white hover:rotate-12"
                  >
                    <ChevronLeft size={28} />
                  </button>
                  
                  <button 
                    onClick={nextSlide}
                    className="absolute right-4 top-1/2 -translate-y-1/2 z-10 w-14 h-14 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white rounded-full flex items-center justify-center transition-all duration-300 shadow-2xl hover:scale-110 border-2 border-white hover:rotate-12"
                  >
                    <ChevronRight size={28} />
                  </button>
                </>
              )}
              
              <div className="bg-gradient-to-br from-white via-orange-50 to-white rounded-3xl shadow-2xl border-4 border-orange-200 p-12 relative overflow-hidden">
                {/* Portfolio Name Header */}
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold bg-gradient-to-r from-orange-500 to-orange-600 bg-clip-text text-transparent">
                    {portfolioNames[currentSlide] || 'Team Portfolio'}
                  </h3>
                  <div className="w-16 h-0.5 bg-gradient-to-r from-orange-500 to-orange-600 mx-auto mt-2 rounded-full"></div>
                </div>
                
                {/* Decorative background elements */}
                <div className="absolute top-0 left-0 w-32 h-32 bg-gradient-to-br from-orange-200 to-orange-300 opacity-20 rounded-full -translate-x-16 -translate-y-16 animate-pulse"></div>
                <div className="absolute bottom-0 right-0 w-40 h-40 bg-gradient-to-tl from-orange-200 to-orange-300 opacity-20 rounded-full translate-x-20 translate-y-20 animate-pulse"></div>
                
                {/* Sliding Container with Touch Support */}
                <div 
                  className="relative overflow-hidden"
                  onTouchStart={handleTouchStart}
                  onTouchMove={handleTouchMove}
                  onTouchEnd={handleTouchEnd}
                >
                  <div 
                    className="flex transition-transform duration-500 ease-in-out"
                    style={{ transform: `translateX(-${currentSlide * 100}%)` }}
                  >
                    {Array.from({ length: totalSlides }, (_, slideIndex) => (
                      <div key={slideIndex} className="w-full flex-shrink-0 px-2">
                        <div className="flex flex-wrap justify-center gap-8">
                          {filteredPortfolioMembers
                            .slice(slideIndex * cardsPerSlide, (slideIndex + 1) * cardsPerSlide)
                            .map((member, memberIndex) => (
                              <TeamCard
                                key={memberIndex}
                                cardId={`portfolio-${slideIndex}-${memberIndex}`}
                                role={member.role}
                                name={member.name}
                                image={member.image}
                                bio={member.bio}
                                email={member.email}
                                linkedin={member.linkedin}
                                instagram={member.instagram}
                              />
                            ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Slide Indicators - Only show if there are multiple slides */}
              {totalSlides > 1 && (
                <div className="flex justify-center space-x-3 mt-8">
                  {Array.from({ length: totalSlides }, (_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentSlide(index)}
                      className={`w-4 h-4 rounded-full transition-all duration-300 ${
                        index === currentSlide 
                          ? 'bg-gradient-to-r from-orange-500 to-orange-600 scale-125 shadow-lg' 
                          : 'bg-gray-300 hover:bg-orange-200 hover:scale-110'
                      }`}
                    />
                  ))}
                </div>
              )}
            </div>
          ) : (
            <div className="text-center py-20">
              <div className="text-gray-500 text-xl">No team members found matching your criteria</div>
              <button 
                onClick={() => {
                  setSearchTerm('');
                  setSelectedPortfolio('all');
                }}
                className="mt-4 bg-gradient-to-r from-orange-500 to-orange-600 text-white px-6 py-2 rounded-full hover:from-orange-600 hover:to-orange-700 transition-all duration-200"
              >
                Clear Filters
              </button>
            </div>
          )}
        </section>
      </div>




    </div>
  );
};

export default EnhancedTeamPage;