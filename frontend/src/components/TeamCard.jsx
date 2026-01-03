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
      <div className="w-full h-full relative">
  {/* BACKGROUND IMAGE — always present */}
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

  {/* DARK GRADIENT FOR READABILITY */}
  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/30"></div>

  {/* FRONT CONTENT */}
  {!isFlipped && (
    <>
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
          onClick={handleConnect}
          className="
            w-full bg-white/10 backdrop-blur-md
            border border-white/30
            text-white font-semibold
            py-2 px-4 rounded-lg
            transition-all duration-300
            hover:scale-105 hover:bg-white/25
          "
        >
          Connect
        </button>
      </div>
    </>
  )}

  {/* GLASSY OVERLAY (FLIPPED SIDE) */}
  {isFlipped && (
    <div className="
      absolute inset-0 z-20
  bg-white/1
  backdrop-blur-xl
  border border-white/15
  flex flex-col items-center justify-center
  p-6
  text-center
    ">
      <h3 className="text-xl font-bold text-white mb-2">{name}</h3>
      <p className="text-white/70 text-sm">{role}</p>

      {bio && (
        <p className="text-white/60 text-xs mt-3 leading-relaxed">
          {bio}
        </p>
      )}

      <div className="flex space-x-4 my-6">
        {email && (
          <a
            href={`mailto:${email}`}
            className="p-3 bg-white/20 backdrop-blur-md rounded-full hover:bg-white/30 transition-all"
            onClick={(e) => e.stopPropagation()}
          >
            <Mail size={22} className="text-white" />
          </a>
        )}
        {linkedin && (
          <a
            href={linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 bg-white/20 backdrop-blur-md rounded-full hover:bg-white/30 transition-all"
            onClick={(e) => e.stopPropagation()}
          >
            <Linkedin size={22} className="text-white" />
          </a>
        )}
        {instagram && (
          <a
            href={instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 bg-white/20 backdrop-blur-md rounded-full hover:bg-white/30 transition-all"
            onClick={(e) => e.stopPropagation()}
          >
            <Instagram size={22} className="text-white" />
          </a>
        )}
      </div>

      <button
        onClick={handleBack}
        className="
          absolute bottom-3 left-3 right-3
          bg-white/15 backdrop-blur-md
          border border-white/30
          hover:bg-white/25
          text-white font-semibold
          py-2 rounded-lg
          transition-all hover:scale-105
          flex items-center justify-center gap-2
        "
      >
        <ArrowLeft size={16} />
        Back
      </button>
    </div>
  )}
</div>

    </div>
  );
};

export default TeamCard;