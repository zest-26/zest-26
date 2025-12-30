import React, { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUpRight, Trophy, Zap, Activity, Target, Flame } from 'lucide-react';
import './Sports.css';

gsap.registerPlugin(ScrollTrigger);

const sportsData = [
  { id: 1, title: "CYCLOTHON", category: "Flagship", desc: "Pedal through the heart of Pune.", img: "https://images.unsplash.com/photo-1517649763962-0c623066013b?auto=format&fit=crop&q=80&w=800", height: "h-tall" },
  { id: 2, title: "CRICKET", category: "Outdoor", desc: "The gentleman's game, reimagined.", img: "https://images.unsplash.com/photo-1531415074968-036ba1b575da?auto=format&fit=crop&q=80&w=800", height: "h-short" },
  { id: 3, title: "MARATHON", category: "Flagship", desc: "Test your endurance limits.", img: "https://images.unsplash.com/photo-1552674605-469523fbaf4d?auto=format&fit=crop&q=80&w=800", height: "h-med" },
  { id: 4, title: "BADMINTON", category: "Indoor", desc: "Smash your way to victory.", img: "https://images.unsplash.com/photo-1626224583764-84786c713044?auto=format&fit=crop&q=80&w=800", height: "h-tall" },
  { id: 5, title: "FOOTBALL", category: "Outdoor", desc: "Passion, grit, and glory.", img: "https://images.unsplash.com/photo-1579952363873-27f3bde9be51?auto=format&fit=crop&q=80&w=800", height: "h-med" },
  { id: 6, title: "CHESS", category: "Indoor", desc: "Checkmate in style.", img: "https://images.unsplash.com/photo-1580541832626-d297a73aa934?auto=format&fit=crop&q=80&w=800", height: "h-short" },
  { id: 7, title: "KABADDI", category: "Outdoor", desc: "The soil of strength.", img: "https://images.unsplash.com/photo-1615303923985-78484e030b76?auto=format&fit=crop&q=80&w=800", height: "h-tall" },
  { id: 8, title: "SPORTIFY", category: "Fun", desc: "Fun meets fitness.", img: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&q=80&w=800", height: "h-med" },
];

const categories = ["All", "Flagship", "Outdoor", "Indoor"];

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
    
    const rotateX = ((y - centerY) / centerY) * -10; // Max 10deg rotation
    const rotateY = ((x - centerX) / centerX) * 10;

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
                  {/* Breadcrumbs moved INSIDE content to prevent overlap */}
          <div className="zest-about-breadcrumbs">
            <span className="zest-about-home-link">HOME</span>
            <span className="zest-about-slash">/</span>
            <span className="zest-about-current-page">Sports</span>
          </div>
        <div className="zest-sports-pill">
          <Flame size={14} className="icon-pulse" /> THE ARENA
        </div>
        
        <h1 className="zest-sports-main-title">
          BATTLE <span className="zest-sports-text-stroke">GROUNDS</span>
        </h1>
        
        <p className="zest-sports-subtitle">
          Where champions are forged. Choose your battlefield.
        </p>

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
                <div className="zest-content-top">
                  <div className="zest-sports-category">{item.category}</div>
                  <h3 className="zest-sports-card-title">{item.title}</h3>
                </div>
                
                <div className="zest-content-hidden">
                  <p>{item.desc}</p>
                  <button className="zest-explore-btn">
                    EXPLORE <ArrowUpRight size={18} />
                  </button>
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
        <button className="zest-sports-cta-btn">DOWNLOAD RULEBOOK</button>
      </section>

    </div>
  );
};

export default Sports;