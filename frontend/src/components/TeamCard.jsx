import React, { useState, useRef } from "react";
import { User, Mail, Linkedin, Instagram, ArrowLeft } from "lucide-react";

const TeamCard = ({
  role,
  name,
  image,
  bio,
  email,
  linkedin,
  instagram,
  onCardFlip,
  cardId,
  isLoading = false,
}) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [imageError, setImageError] = useState(false);
  const cardRef = useRef(null);

  React.useEffect(() => {
    const resetCard = (event) => {
      if (event.detail !== cardId && isFlipped) {
        setIsFlipped(false);
      }
    };
    window.addEventListener("cardFlipped", resetCard);
    return () => window.removeEventListener("cardFlipped", resetCard);
  }, [isFlipped, cardId]);

  const handleConnect = (e) => {
    e.stopPropagation();
    setIsFlipped(true);
    window.dispatchEvent(new CustomEvent("cardFlipped", { detail: cardId }));
    onCardFlip?.(cardId);
  };

  const handleBack = (e) => {
    e.stopPropagation();
    setIsFlipped(false);
  };

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    
    const card = cardRef.current;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateX = (y - centerY) / 10;
    const rotateY = (centerX - x) / 10;
    
    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.05, 1.05, 1.05)`;
  };

  const handleMouseLeave = () => {
    if (cardRef.current) {
      cardRef.current.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
    }
  };

  return (
    <div 
      ref={cardRef}
      className="relative h-80 w-64 rounded-xl shadow-2xl overflow-hidden transition-transform duration-300 ease-out"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ transformStyle: 'preserve-3d' }}
    >
      {!isFlipped ? (
        <div className="w-full h-full relative">
          {image ? (
            <img
              src={image}
              alt={name}
              className="w-full h-full object-cover"
              onError={() => setImageError(true)}
            />
          ) : (
            <div className="w-full h-full bg-orange-200 flex items-center justify-center">
              <User size={80} className="text-orange-600" />
            </div>
          )}

          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/30"></div>

          <div className="absolute top-3 left-3 right-3 z-10">
            <h3 className="text-sm font-bold text-white text-center bg-black/50 px-3 py-1 rounded-full">
              {role}
            </h3>
          </div>

          <div className="absolute bottom-16 left-3 right-3 z-10">
            <h4 className="text-lg font-bold text-white text-center">{name}</h4>
          </div>

          <div className="absolute bottom-3 left-3 right-3 z-10">
            <button
              className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-semibold py-2 px-4 rounded-lg transition-all duration-200 shadow-lg"
              onClick={handleConnect}
            >
              Connect
            </button>
          </div>
        </div>
      ) : (
        <div className="w-full h-full bg-gradient-to-br from-orange-500 to-orange-600 flex flex-col items-center justify-center p-6 relative">
          <div className="text-center mb-8">
            <h3 className="text-xl font-bold text-white mb-2">{name}</h3>
            <p className="text-orange-100 text-sm">{role}</p>
            {bio && (
              <p className="text-white/80 text-xs mt-2 leading-relaxed">
                {bio}
              </p>
            )}
          </div>

          <div className="flex space-x-4 mb-6">
            {email && (
              <a
                href={`mailto:${email}`}
                className="p-3 bg-white/20 rounded-full hover:bg-white/30 transition-colors"
                onClick={(e) => e.stopPropagation()}
              >
                <Mail size={24} className="text-white" />
              </a>
            )}
            {linkedin && (
              <a
                href={linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-white/20 rounded-full hover:bg-white/30 transition-colors"
                onClick={(e) => e.stopPropagation()}
              >
                <Linkedin size={24} className="text-white" />
              </a>
            )}
            {instagram && (
              <a
                href={instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-white/20 rounded-full hover:bg-white/30 transition-colors"
                onClick={(e) => e.stopPropagation()}
              >
                <Instagram size={24} className="text-white" />
              </a>
            )}
          </div>

          <button
            onClick={handleBack}
            className="absolute bottom-3 left-3 right-3 bg-white/20 hover:bg-white/30 text-white font-semibold py-2 px-4 rounded-lg transition-colors flex items-center justify-center gap-2"
          >
            <ArrowLeft size={16} />
            Back
          </button>
        </div>
      )}
    </div>
  );
};

export default TeamCard;