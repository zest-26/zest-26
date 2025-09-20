import React, { useState, useEffect, useRef } from 'react';
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
    role: "Joint Secretary", 
    name: "Priya Patel", 
    image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
    bio: "Supporting organizational excellence and team coordination. Electronics Engineering student with leadership experience.",
    email: "priya.patel@zest.com",
    linkedin: "https://linkedin.com/in/priyapatel"
  }
];

const portfolioMembers = [
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
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800">
      {/* Page Header */}
      <div className="text-center py-16">
        <h1 className="text-6xl font-bold text-white mb-4">Core Team</h1>
        <div className="w-32 h-1 bg-gradient-to-r from-orange-500 to-orange-600 mx-auto rounded-full"></div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Core Team Section */}
        <section className="mb-20">
          <div className="text-center mb-12">
            <p className="text-gray-300 text-lg animate-in fade-in slide-in-from-bottom-4 duration-1000">Leading with passion and excellence</p>
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
            <div className="relative max-w-4xl mx-auto">
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
              
              <div className="bg-gradient-to-br from-gray-800 via-gray-900 to-gray-800 rounded-3xl shadow-2xl border-4 border-orange-500 p-8 relative overflow-hidden">
                {/* Portfolio Name Header */}
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold bg-gradient-to-r from-orange-500 to-orange-600 bg-clip-text text-transparent">
                    {portfolioNames[currentSlide] || 'Team Portfolio'}
                  </h3>
                  <div className="w-16 h-0.5 bg-gradient-to-r from-orange-500 to-orange-600 mx-auto mt-2 rounded-full"></div>
                </div>
                
                {/* Decorative background elements */}
                <div className="absolute top-0 left-0 w-32 h-32 bg-gradient-to-br from-orange-500 to-orange-600 opacity-10 rounded-full -translate-x-16 -translate-y-16 animate-pulse"></div>
                <div className="absolute bottom-0 right-0 w-40 h-40 bg-gradient-to-tl from-orange-500 to-orange-600 opacity-10 rounded-full translate-x-20 translate-y-20 animate-pulse"></div>
                
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
                          : 'bg-gray-600 hover:bg-orange-400 hover:scale-110'
                      }`}
                    />
                  ))}
                </div>
              )}
            </div>
          ) : (
            <div className="text-center py-20">
              <div className="text-gray-400 text-xl">No team members found matching your criteria</div>
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