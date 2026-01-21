import React, { useState } from "react";
import { User, Linkedin, Instagram, ArrowLeft, TrendingUp, Zap } from "lucide-react";
import { motion } from "framer-motion";

const TeamCard = ({
  role,
  name,
  image,
  bio,
  linkedin,
  instagram,
  cardId,
}) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [imageError, setImageError] = useState(false);

  return (
    <motion.div
      className="relative h-96 w-72 cursor-pointer perspective-1000"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ scale: 1.05, rotateZ: 2 }}
      transition={{ type: "spring", stiffness: 400, damping: 15 }}
      onClick={() => setIsFlipped(!isFlipped)}
    >
      <div className="w-full h-full relative preserve-3d transition-transform duration-500 ease-[cubic-bezier(0.23,1,0.32,1)]"
        style={{ transform: isFlipped ? "rotateY(180deg)" : "rotateY(0deg)", transformStyle: "preserve-3d" }}>

        {/* === FRONT SIDE === */}
        <div className="absolute inset-0 w-full h-full backface-hidden bg-gradient-to-br from-zinc-900 via-black to-zinc-950 border-2 border-orange-600/80 overflow-hidden"
          style={{ clipPath: "polygon(10% 0, 100% 0, 100% 90%, 90% 100%, 0 100%, 0 10%)" }}>

          {/* Subtle Grid Texture */}
          <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#f97316_1px,transparent_1px)] [background-size:16px_16px] z-0" />

          {/* Neon Glow Effects - Moved BEHIND image (z-0) */}
          <div className="absolute top-0 right-0 w-40 h-40 bg-orange-600/10 blur-[60px] z-0" />
          <div className="absolute bottom-0 left-0 w-40 h-40 bg-orange-600/10 blur-[60px] z-0" />

          {/* Image Container - Full Fill - Higher Z-Index (z-10) */}
          <div className="absolute inset-2 bg-black/50 overflow-hidden backdrop-blur-sm z-10"
            style={{ clipPath: "polygon(0 0, 100% 0, 100% 90%, 90% 100%, 0 100%)" }}>
            {image && !imageError ? (
              <img
                src={image}
                alt={name}
                className="w-full h-full object-cover object-top grayscale-[0.2] contrast-125 hover:grayscale-0 transition-all duration-300"
                onError={() => setImageError(true)}
              />
            ) : (
              <div className="w-full h-full bg-zinc-900 flex items-center justify-center">
                <User size={80} className="text-orange-600" />
              </div>
            )}
          </div>

          {/* Stats / Tech Deco (z-20) */}
          <div className="absolute top-4 right-4 flex flex-col gap-1 items-end z-20">
            <div className="w-12 h-1 bg-orange-500 shadow-[0_0_15px_orange]" />
            <div className="w-8 h-1 bg-orange-500 shadow-[0_0_15px_orange]" />
            <div className="w-4 h-1 bg-orange-500 shadow-[0_0_15px_orange]" />
          </div>

          {/* Content Area - Overlay at Bottom (z-20) */}
          <div className="absolute bottom-2 left-2 right-2 p-4 z-20 bg-gradient-to-t from-black via-black/80 to-transparent pt-12">
            <div className="absolute top-4 left-0 bg-gradient-to-r from-orange-600 to-orange-500 text-black text-[10px] font-black uppercase px-3 py-1 tracking-tighter skew-x-[-10deg] shadow-lg">
              {role}
            </div>

            <h3 className="text-2xl font-black text-white uppercase italic tracking-tighter leading-none mb-1 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
              {name}
            </h3>
          </div>
        </div>

        {/* === BACK SIDE === */}
        <div className="absolute inset-0 w-full h-full backface-hidden bg-zinc-950 border-2 border-orange-500 overflow-hidden flex flex-col p-6 items-center justify-center text-center rotate-y-180"
          style={{ transform: "rotateY(180deg)", clipPath: "polygon(10% 0, 100% 0, 100% 90%, 90% 100%, 0 100%, 0 10%)" }}>

          {/* Animated Gradient Background */}
          <div className="absolute inset-0 bg-gradient-to-br from-zinc-900 via-orange-950/20 to-zinc-900" />
          <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(249,115,22,0.1)_50%,transparent_75%,transparent_100%)] bg-[length:40px_40px] opacity-30" />

          <div className="relative z-10">
            <h3 className="text-3xl font-black text-white italic uppercase mb-2 drop-shadow-lg">{name}</h3>
            <div className="w-20 h-1.5 bg-gradient-to-r from-orange-600 to-yellow-500 mb-8 skew-x-[-20deg] mx-auto" />

            <p className="text-orange-400 font-bold uppercase tracking-widest text-xs mb-6 border border-orange-500/30 px-3 py-1 rounded inline-block bg-black/50 backdrop-blur-md">
              {role}
            </p>

            <div className="flex gap-6 mt-2 justify-center">
              {linkedin && (
                <a href={linkedin} target="_blank" rel="noreferrer" onClick={e => e.stopPropagation()}
                  className="w-12 h-12 flex items-center justify-center border border-orange-500 text-orange-500 hover:bg-orange-600 hover:text-white hover:shadow-[0_0_20px_orange] transition-all duration-300 bg-black/40"
                  style={{ clipPath: "polygon(20% 0, 100% 0, 100% 80%, 80% 100%, 0 100%, 0 20%)" }}>
                  <Linkedin size={20} />
                </a>
              )}
              {instagram && (
                <a href={instagram} target="_blank" rel="noreferrer" onClick={e => e.stopPropagation()}
                  className="w-12 h-12 flex items-center justify-center border border-orange-500 text-orange-500 hover:bg-pink-600 hover:text-white hover:border-pink-600 hover:shadow-[0_0_20px_magenta] transition-all duration-300 bg-black/40"
                  style={{ clipPath: "polygon(20% 0, 100% 0, 100% 80%, 80% 100%, 0 100%, 0 20%)" }}>
                  <Instagram size={20} />
                </a>
              )}
            </div>
          </div>

          <button className="absolute bottom-6 text-zinc-500 text-xs uppercase font-bold tracking-widest hover:text-orange-500 flex items-center gap-2 transition-colors">
            <ArrowLeft size={14} /> Flip Back
          </button>
        </div>

      </div>
    </motion.div>
  );
};

export default TeamCard;