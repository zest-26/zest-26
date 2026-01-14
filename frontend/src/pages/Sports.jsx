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
    desc: "Every run counts, every wicket matters—own the game.", 
    img: "/Sports/Cricket_converted.avif", 
    height: "h-tall",
    link: "https://unstop.com/p/coep-zest26-cricket-college-of-engineering-coep-pune-1608250?lb=GzoB9Yag&utm_medium=Share&utm_source=WhatsApp&fbclid=PAZXh0bgNhZW0CMTEAc3J0YwZhcHBfaWQMMjU2MjgxMDQwNTU4AAGnldpSWdDOei0AQpL-ZmmOMnqCB9xCB9mgZd85WKAG44Hhr7DHU4_Gmn7nG5g_aem_rwS2JGW6idmfG6yqoX6IcQ" 
  },
  { 
    id: 2, 
    title: "FOOTBALL", 
    category: "Outdoor", 
    desc: "Every pass matters, every goal defines you.", 
    img: "/Sports/Football_converted.avif", 
    height: "h-med",
    link: "https://unstop.com/p/coep-zest26-football-college-of-engineering-coep-pune-1609189?lb=GzoB9Yag&utm_medium=Share&utm_source=WhatsApp&fbclid=PAZXh0bgNhZW0CMTEAc3J0YwZhcHBfaWQMMjU2MjgxMDQwNTU4AAGnwFpECSzT8zNw6xRuo87ZbVclwZwx4C5io73DvqjLvmk2nibx1Y-S-RZ8_j4_aem_zqGMCWhUteMPiKdvfnj1hA" 
  },
  { 
    id: 3, 
    title: "BASKETBALL", 
    category: "Outdoor", 
    desc: "Every pass counts, every shot can change the game.", 
    img: "/Sports/Basketball Basketball_converted.avif", 
    height: "h-tall",
    link: "https://unstop.com/p/coep-zest26-basketball-college-of-engineering-coep-pune-1609190?lb=GzoB9Yag&utm_medium=Share&utm_source=WhatsApp" 
  },
  { 
    id: 4, 
    title: "KABADDI", 
    category: "Outdoor", 
    desc: "Hold your breath, cross the line, and fight your way back.", 
    img: "/Sports/Kabaddi_converted.avif", 
    height: "h-med",
    link: "https://unstop.com/p/coep-zest25-kabaddi-college-of-engineering-coep-pune-1608275?lb=GzoB9Yag&utm_medium=Share&utm_source=WhatsApp&fbclid=PAZXh0bgNhZW0CMTEAc3J0YwZhcHBfaWQMMjU2MjgxMDQwNTU4AAGnTM4ZqCWKrkbvgrjLkP283WQwY2RYp_GZiCEC9yqxTc_jSLQOQpjg4Ilm-K8_aem_Pb_fEAIdSK5C2ImRlHC3tQ" 
  },

  // --- OUTDOOR ---
  { 
    id: 5, 
    title: "VOLLEYBALL", 
    category: "Outdoor", 
    desc: "Defend the court, dominate the net, take the win.", 
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
    desc: "Speed, stamina, and skill. ", 
    img: "/Sports/Handball_converted.avif", 
    height: "h-short",
    link: "https://unstop.com/p/coep-zest26-handball-college-of-engineering-coep-pune-1609875?utm_medium=Share&utm_source=WhatsAp" 
  },
  { 
    id: 8, 
    title: "HOCKEY", 
    category: "Outdoor", 
    desc: "The national pride. Field hockey tournament.", 
    img: "/Sports/Hockey_converted.avif", 
    height: "h-med",
    link: "https://unstop.com/p/coep-zest26-hockey-college-of-engineering-coep-pune-1609761?utm_medium=Share&utm_source=WhatsApp" 
  },
  { 
    id: 9, 
    title: "ATHLETICS", 
    category: "Outdoor", 
    desc: "Run faster, jump higher, throw farther—break your limits.", 
    img: "/Sports/Athletics_converted.avif", 
    height: "h-tall",
    link: "https://sites.google.com/view/zest26?usp=sharing" 
  },
  { 
    id: 10, 
    title: "ARCHERY", 
    category: "Outdoor", 
    desc: "Aim for the bullseye.", 
    img: "/Sports/Archery_converted.avif", 
    height: "h-med",
    link: "https://unstop.com/p/coep-zest26-archery-college-of-engineering-coep-pune-1610595?lb=GzoB9Yag&utm_medium=Share&utm_source=WhatsApp" 
  },
  { 
    id: 11, 
    title: "BOX CRICKET", 
    category: "Outdoor", 
    desc: "Fast overs, sharp shots, instant glory.", 
    img: "/Sports/Box-Cricket_converted.avif", 
    height: "h-short",
    link: "https://forms.gle/1T5NUL4E1u3AhMNN6" 
  },

  // --- INDOOR ---
  { 
    id: 12, 
    title: "BADMINTON", 
    category: "Indoor", 
    desc: "Smash your way to victory.", 
    img: "/Sports/Badminton_converted.avif", 
    height: "h-tall",
    link: "https://unstop.com/p/coep-zest26-badminton-college-of-engineering-coep-pune-1609764?utm_medium=Share&utm_source=WhatsApp" 
  },
  { 
    id: 13, 
    title: "TABLE TENNIS", 
    category: "Indoor", 
    desc: "Control the spin, command the table.", 
    img: "/Sports/Table Tennis_converted.avif", 
    height: "h-short",
    link: "https://unstop.com/p/coep-zest26-table-tennis-college-of-engineering-coep-pune-1609769?lb=GzoB9Yag&utm_medium=Share&utm_source=WhatsApp" 
  },
  { 
    id: 14, 
    title: "CHESS", 
    category: "Indoor", 
    desc: "Checkmate in style. Blitz, Rapid, and Classical formats.", 
    img: "/Sports/Chess_converted.avif", 
    height: "h-med",
    link: "https://sites.google.com/view/zest26carrom?usp=sharing" 
  },
  { 
    id: 15, 
    title: "CARROM", 
    category: "Indoor", 
    desc: "Every flick can turn the game.", 
    img: "/Sports/Carrom_converted.avif", 
    height: "h-short",
    link: "https://unstop.com/p/coep-zest26-carrom-college-of-engineering-coep-pune-1609864?utm_medium=Share&utm_source=WhatsApp" 
  },
  { 
    id: 16, 
    title: "FENCING", 
    category: "Indoor", 
    desc: "The art of swordplay. Epee, Sabre, and Foil.", 
    img: "/Sports/Fencing_converted.avif", 
    height: "h-tall",
    link: "https://unstop.com/p/coep-zest26-fencing-college-of-engineering-coep-pune-1610586?utm_medium=Share&utm_source=WhatsApp" 
  },
  { 
    id: 17, 
    title: "INDOOR ROWING", 
    category: "Indoor", 
    desc: "Power the stroke, control the pace, own the finish.", 
    img: "/Sports/Indoor rowing_converted.avif", 
    height: "h-med",
    link: "https://unstop.com/p/coep-zest26-indoor-rowing-college-of-engineering-coep-pune-1611126?lb=GzoB9Yag&utm_medium=Share&utm_source=WhatsApp" 
  },
  { 
    id: 18, 
    title: "COEP SHREE", 
    category: "Indoor", 
    desc: "Bodybuilding championship. Defining Strength.", 
    img: "/Sports/COEP Shree_converted.avif", 
    height: "h-tall",
    link: "https://unstop.com/p/coep-zest26-shree-college-of-engineering-coep-pune-1611140?lb=GzoB9Yag&utm_medium=Share&utm_source=WhatsApp" 
  },
  { 
    id: 19, 
    title: "SWIMMING", 
    category: "Outdoor", 
    desc: "Harmony of mind and body.", 
    img: "/Sports/swimming.avif", 
    height: "h-med",
    link: " https://unstop.com/o/8d5D1jK?utm_medium=Share&utm_source=WhatsApp" 
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
      <div className="zest-sports-masonry-grid">
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