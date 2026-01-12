import React, { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUpRight, Trophy, Zap, Activity, Target, Flame } from 'lucide-react';
import './Sports.css';


gsap.registerPlugin(ScrollTrigger);

// Categories for filtering
const categories = ["All", "Outdoor", "Indoor"];

const sportsData = [
  // --- FLAGSHIP / MAJOR OUTDOOR ---
  { 
    id: 1, 
    title: "CRICKET", 
    category: "Outdoor", 
    desc: "11 Players. The gentleman's game, reimagined. White ball tournament.", 
    img: "/Sports/Cricket_converted.avif", 
    height: "h-tall",
    link: "https://unstop.com/p/coep-zest26-cricket-college-of-engineering-coep-pune-1608250?lb=GzoB9Yag&utm_medium=Share&utm_source=WhatsApp&fbclid=PAZXh0bgNhZW0CMTEAc3J0YwZhcHBfaWQMMjU2MjgxMDQwNTU4AAGnldpSWdDOei0AQpL-ZmmOMnqCB9xCB9mgZd85WKAG44Hhr7DHU4_Gmn7nG5g_aem_rwS2JGW6idmfG6yqoX6IcQ" 
  },
  { 
    id: 2, 
    title: "FOOTBALL", 
    category: "Outdoor", 
    desc: "11+7 Players. Passion, grit, and glory. Standard FIFA rules apply.", 
    img: "/Sports/Football_converted.avif", 
    height: "h-med",
    link: "https://unstop.com/p/coep-zest26-football-college-of-engineering-coep-pune-1609189?lb=GzoB9Yag&utm_medium=Share&utm_source=WhatsApp&fbclid=PAZXh0bgNhZW0CMTEAc3J0YwZhcHBfaWQMMjU2MjgxMDQwNTU4AAGnwFpECSzT8zNw6xRuo87ZbVclwZwx4C5io73DvqjLvmk2nibx1Y-S-RZ8_j4_aem_zqGMCWhUteMPiKdvfnj1hA" 
  },
  { 
    id: 3, 
    title: "BASKETBALL", 
    category: "Outdoor", 
    desc: "FIBA Rules. Dribble, shoot, score. High intensity court action.", 
    img: "/Sports/Basketball Basketball_converted.avif", 
    height: "h-tall",
    link: "https://unstop.com/" 
  },
  { 
    id: 4, 
    title: "KABADDI", 
    category: "Outdoor", 
    desc: "The soil of strength. Pro Kabaddi style mats and rules.", 
    img: "/Sports/Kabaddi_converted.avif", 
    height: "h-med",
    link: "https://unstop.com/p/coep-zest25-kabaddi-college-of-engineering-coep-pune-1608275?lb=GzoB9Yag&utm_medium=Share&utm_source=WhatsApp&fbclid=PAZXh0bgNhZW0CMTEAc3J0YwZhcHBfaWQMMjU2MjgxMDQwNTU4AAGnTM4ZqCWKrkbvgrjLkP283WQwY2RYp_GZiCEC9yqxTc_jSLQOQpjg4Ilm-K8_aem_Pb_fEAIdSK5C2ImRlHC3tQ" 
  },

  // --- OUTDOOR ---
  { 
    id: 5, 
    title: "VOLLEYBALL", 
    category: "Outdoor", 
    desc: "Spike your way to victory. Standard FIVB rules.", 
    img: "/Sports/Volleyball_converted.avif", 
    height: "h-short",
    link: "https://unstop.com/p/coep-zest26-volleyball-college-of-engineering-coep-pune-1608991?lb=GzoB9Yag&utm_medium=Share&utm_source=WhatsApp&fbclid=PAZXh0bgNhZW0CMTEAc3J0YwZhcHBfaWQMMjU2MjgxMDQwNTU4AAGnwfGAEqIWE0OU_Wy9wANrB7Ri6jclUPnc_VLsTxCMwBgwb3nAIt5F5hMeKtc_aem_Lc06-E_y5YeYGEM28f39PQ" 
  },
  { 
    id: 6, 
    title: "KHO-KHO", 
    category: "Outdoor", 
    desc: "Chase and tag. A test of speed and agility.", 
    img: "/Sports/Khokho_converted.avif", 
    height: "h-med",
    link: "https://unstop.com/p/coep-zest26-kho-kho-college-of-engineering-coep-pune-1609746?lb=GzoB9Yag&utm_medium=Share&utm_source=WhatsApp&fbclid=PAZXh0bgNhZW0CMTEAc3J0YwZhcHBfaWQMMjU2MjgxMDQwNTU4AAGn4wOUUp-UtpAXrcRbJn7s7Bqk3zFvqRPHOUfMKY1FQ8f-47yMdV0wCwV2xuY_aem_A2TvTg-xT0O8XZ8z4kbIuA" 
  },
  { 
    id: 7, 
    title: "HANDBALL", 
    category: "Outdoor", 
    desc: "Speed, stamina, and skill. 7 players per team.", 
    img: "/Sports/Handball_converted.avif", 
    height: "h-short",
    link: "https://unstop.com/" 
  },
  { 
    id: 8, 
    title: "HOCKEY", 
    category: "Outdoor", 
    desc: "The national pride. Field hockey tournament.", 
    img: "/Sports/Hockey_converted.avif", 
    height: "h-med",
    link: "https://unstop.com/" 
  },
  { 
    id: 9, 
    title: "ATHLETICS", 
    category: "Outdoor", 
    desc: "100m, 200m, Relay. Faster, Higher, Stronger.", 
    img: "/Sports/Athletics_converted.avif", 
    height: "h-tall",
    link: "https://unstop.com/" 
  },
  { 
    id: 10, 
    title: "ARCHERY", 
    category: "Outdoor", 
    desc: "Aim for the bullseye. Indian round (30m & 50m).", 
    img: "/Sports/Archery_converted.avif", 
    height: "h-med",
    link: "https://unstop.com/" 
  },
  { 
    id: 11, 
    title: "BOX CRICKET", 
    category: "Outdoor", 
    desc: "Short boundary, big thrill. Soft tennis ball tournament.", 
    img: "/Sports/Box-Cricket_converted.avif", 
    height: "h-short",
    link: "https://unstop.com/" 
  },

  // --- INDOOR ---
  { 
    id: 12, 
    title: "BADMINTON", 
    category: "Indoor", 
    desc: "Smash your way to victory. Singles, Doubles, and Mix.", 
    img: "/Sports/Badminton_converted.avif", 
    height: "h-tall",
    link: "https://unstop.com/" 
  },
  { 
    id: 13, 
    title: "TABLE TENNIS", 
    category: "Indoor", 
    desc: "Spin and smash. Team event format (A-B-C vs X-Y-Z).", 
    img: "/Sports/Table Tennis_converted.avif", 
    height: "h-short",
    link: "https://unstop.com/" 
  },
  { 
    id: 14, 
    title: "CHESS", 
    category: "Indoor", 
    desc: "Checkmate in style. Blitz, Rapid, and Classical formats.", 
    img: "/Sports/Chess_converted.avif", 
    height: "h-med",
    link: "https://unstop.com/" 
  },
  { 
    id: 15, 
    title: "CARROM", 
    category: "Indoor", 
    desc: "Strike and pocket. Singles and Doubles.", 
    img: "/Sports/Carrom_converted.avif", 
    height: "h-short",
    link: "https://unstop.com/" 
  },
  { 
    id: 16, 
    title: "FENCING", 
    category: "Indoor", 
    desc: "The art of swordplay. Epee, Sabre, and Foil.", 
    img: "/Sports/Fencing_converted.avif", 
    height: "h-tall",
    link: "https://unstop.com/" 
  },
  { 
    id: 17, 
    title: "INDOOR ROWING", 
    category: "Indoor", 
    desc: "Test your endurance. 1KM and 500m categories.", 
    img: "/Sports/Indoor rowing_converted.avif", 
    height: "h-med",
    link: "https://unstop.com/" 
  },
  { 
    id: 18, 
    title: "COEP SHREE", 
    category: "Indoor", 
    desc: "Bodybuilding championship. Defining Strength.", 
    img: "/Sports/COEP Shree_converted.avif", 
    height: "h-tall",
    link: "https://unstop.com/" 
  },
  { 
    id: 19, 
    title: "YOGA", 
    category: "Indoor", 
    desc: "Harmony of mind and body.", 
    img: "/Sports/yoga_converted.avif", 
    height: "h-med",
    link: "https://unstop.com/" 
  },
];

const Sports = () => {
  const [filter, setFilter] = useState("All");
  const containerRef = useRef(null);

  const filteredItems = filter === "All" 
    ? sportsData 
    : sportsData.filter(item => item.category === filter);

  useEffect(() => {
    let ctx = gsap.context(() => {
      
      // 1. Header Entrance
      gsap.fromTo(".zest-sports-header > *", 
        { y: 100, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.2, stagger: 0.1, ease: "power4.out" }
      );

      // 2. Background Marquee Animation
      gsap.to(".zest-bg-marquee-text", {
        xPercent: -50,
        ease: "none",
        duration: 20,
        repeat: -1
      });

    }, containerRef);
    return () => ctx.revert();
  }, []);

  // Card Animation on Filter Change
  useEffect(() => {
    let ctx = gsap.context(() => {
      gsap.fromTo(".zest-sports-card", 
        { y: 100, opacity: 0, rotateX: -15 },
        { y: 0, opacity: 1, rotateX: 0, duration: 0.8, stagger: 0.1, ease: "back.out(1.2)" }
      );
    }, containerRef);
    return () => ctx.revert();
  }, [filter]);

  // 3D Tilt Effect on Mouse Move
  const handleMouseMove = (e) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateX = ((y - centerY) / centerY) * -1; // Max 10deg rotation
    const rotateY = ((x - centerX) / centerX) * 1;

    gsap.to(card, {
      rotateX: rotateX,
      rotateY: rotateY,
      scale: 1.05,
      duration: 0.4,
      ease: "power2.out"
    });
  };

  const handleMouseLeave = (e) => {
    gsap.to(e.currentTarget, {
      rotateX: 0,
      rotateY: 0,
      scale: 1,
      duration: 0.5,
      ease: "power2.out"
    });
  };

  return (
    <div className="zest-sports-page-wrapper" ref={containerRef}>
      
      {/* BACKGROUND MARQUEE */}
      <div className="zest-bg-marquee">
        <div className="zest-bg-marquee-text">
          ZEST SPORTS • UNLEASH THE BEAST • ZEST SPORTS • UNLEASH THE BEAST • 
        </div>
      </div>

      {/* 1. HERO HEADER */}
      <header className="zest-sports-header">
        <div className="zest-sports-pill">
          <Flame size={14} className="icon-pulse" /> THE ARENA
        </div>
        
        <h1 className="zest-sports-main-title">
          BATTLE <span className="zest-sports-text-stroke">GROUNDS</span>
        </h1>

        {/* 2. FILTER TABS */}
        <div className="zest-sports-filter-container">
          {categories.map((cat) => (
            <button 
              key={cat} 
              className={`zest-sports-filter-btn ${filter === cat ? 'active' : ''}`}
              onClick={() => setFilter(cat)}
            >
              {cat}
            </button>
          ))}
        </div>
      </header>

      {/* 3. MASONRY GRID */}
      <div className="zest-sports-masonry-grid hidden md:block">
        {filteredItems.map((item) => (
          <div 
            key={item.id} 
            className={`zest-sports-card ${item.height}`}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
          >
            <div className="zest-sports-img-wrapper">
              <img src={item.img} alt={item.title} loading="lazy" />
              <div className="zest-sports-img-overlay"></div>
              
              {/* Revealed Content on Hover */}
              <div className="zest-sports-card-content">
                <div className="zest-content-top mb-6 md:mb-4">
                  <div className="zest-sports-category">{item.category}</div>
                  <h3 className="zest-sports-card-title">{item.title}</h3>
                  <a
                    href={item.link} // Changed to item.link from Unstop/Instagram
                    target="_blank"
                    rel="noopener noreferrer"
                    className="zest-register-btn md:ml-3"
                  >
                    REGISTER
                    <ArrowUpRight size={16} />
                  </a>
                </div>
                
                <div className="zest-content-hidden">
                  <p>{item.desc}</p>
                </div>
              </div>

            </div>
          </div>
        ))}
      </div> 

       {/* 3. MASONRY GRID */}
      <div className="zest-sports-masonry-grid block md:hidden">
        {filteredItems.map((item) => (
          <div 
            key={item.id} 
            className={`zest-sports-card ${item.height}`}
           
          >
            <div className="zest-sports-img-wrapper">
              <img src={item.img} alt={item.title} loading="lazy" />
              <div className="zest-sports-img-overlay"></div>
              
              {/* Revealed Content on Hover */}
              <div className="zest-sports-card-content">
                <div className="zest-content-top mb-6 md:mb-4">
                  <div className="zest-sports-category">{item.category}</div>
                  <h3 className="zest-sports-card-title">{item.title}</h3>
                  <a
                    href={item.link} // Changed to item.link from Unstop/Instagram
                    target="_blank"
                    rel="noopener noreferrer"
                    className="zest-register-btn md:ml-3"
                  >
                    REGISTER
                    <ArrowUpRight size={16} />
                  </a>
                </div>
                
                <div className="zest-content-hidden">
                  <p>{item.desc}</p>
                </div>
              </div>

            </div>
          </div>
        ))}
      </div> 

      {/* 4. FOOTER CTA */}
      <section className="zest-sports-footer">
        <div className="zest-sports-divider"></div>
        <h2>AND <span className="zest-text-highlight">MANY MORE</span></h2>
        <div className="zest-sports-icon-row">
          <Activity size={30} /> <Target size={30} /> <Zap size={30} />
        </div>
        <a href="/RuleBook.pdf" download>
          <button className="zest-sports-cta-btn">
            DOWNLOAD RULEBOOK
          </button>
        </a>
      </section>

    </div>
  );
};

export default Sports;