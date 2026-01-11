import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MapPin, Calendar, Trophy, Users, Zap, Play, ArrowRight,ArrowLeft, MousePointer2, X } from 'lucide-react';
import './AboutUs.css';

gsap.registerPlugin(ScrollTrigger);

const about = () => {
  const componentRef = useRef(null);
  const sliderRef = useRef(null);
  const heroTextRef = useRef(null);
  
  // STATE FOR VIDEO MODAL
  const [activeVideo, setActiveVideo] = useState(null);

  // DATA FOR HIGHLIGHTS
  const highlights = [
    { title: "Zest'25 After Movie", videoId: "dlQJL3vGo9I" },
    { title: "Zest'24 After Movie", videoId: "6MoFsI-h3Mw" },
    { title: "Zest'23 After Movie", videoId: "OtJkPUMhHGE" },
  ];

  const isMobile = window.matchMedia('(max-width: 899px)').matches;

const handlePlay = (videoId) => {
  if (isMobile) {
    window.open(`https://www.youtube.com/watch?v=${videoId}`, '_blank');
  } else {
    setActiveVideo(videoId);
  }
};


  useEffect(() => {
    let ctx = gsap.context(() => {
      let mm = gsap.matchMedia();
      
      // 0. GLOBAL: Fade in
      gsap.to(componentRef.current, { opacity: 1, duration: 1 });

      // 1. HERO ANIMATIONS
      const tl = gsap.timeline();
      tl.from(".zest-about-breadcrumbs", { y: -30, opacity: 0, duration: 1, ease: "power3.out" })
        .from(".zest-about-hero-title span", {
          y: 150,
          skewY: 10,
          opacity: 0,
          duration: 1.2,
          stagger: 0.1,
          ease: "power4.out"
        }, "-=0.5")
        .from(".zest-about-hero-meta", { opacity: 0, y: 20, duration: 0.8 }, "-=0.5");

      // 2. INFO SECTIONS (Parallax & Reveal)
      gsap.utils.toArray(".zest-about-info-section").forEach((section) => {
        gsap.from(section.querySelector(".zest-about-info-text"), {
          scrollTrigger: { trigger: section, start: "top 80%" },
          y: 50, opacity: 0, duration: 1, ease: "power3.out"
        });

        gsap.to(section.querySelector("img"), {
          scrollTrigger: { trigger: section, start: "top bottom", end: "bottom top", scrub: true },
          yPercent: 20, scale: 1.05, ease: "none"
        });
      });

      // 3. STATS ANIMATION
      gsap.from(".zest-about-stat-box", {
        scrollTrigger: { trigger: ".zest-about-stats-container", start: "top 85%" },
        y: 50, opacity: 0, duration: 0.8, stagger: 0.2, ease: "back.out(1.7)"
      });

      gsap.utils.toArray(".zest-about-stat-number").forEach((el) => {
        gsap.from(el, {
          textContent: 0, duration: 2.5, ease: "power1.out", snap: { textContent: 1 },
          scrollTrigger: { trigger: el, start: "top 85%" }
        });
      });

      // 4. HIGHLIGHTS HORIZONTAL SCROLL
      mm.add("(min-width: 900px)", () => {
        const slider = sliderRef.current;
        if (!slider) return;

        const getScrollAmount = () => {
          return -(slider.scrollWidth - window.innerWidth);
        };

        gsap.to(slider, {
          x: getScrollAmount,
          ease: "none",
          scrollTrigger: {
            trigger: slider,
            pin: true,
            scrub: 1,
            anticipatePin: 1,
            end: () => `+=${slider.scrollWidth - window.innerWidth}`,
            invalidateOnRefresh: true,
          }
        });
      });

      mm.add("(max-width: 899px)", () => {
        // NO GSAP ON MOBILE (Native Swipe)
      });

    }, componentRef);
    return () => ctx.revert();
  }, []);

  return (
    <div className="zest-about-main-wrapper" ref={componentRef}>
      
      {/* SECTION 1: HERO */}
      <section className="zest-about-hero">
        
        {/* Background Video Wrapper */}
        <div className="zest-about-video-bg">
           <video
    className="zest-about-video-element"
    autoPlay
    muted
    loop
    playsInline
    preload="metadata"
  >
    <source src="/videos/Aftermovie.webm" type="video/webm" />
  </video>
          <div className="zest-about-gradient-overlay"></div>
        </div>

        {/* Hero Content Layer */}
        <div className="zest-about-hero-content">
          

          <h1 className="zest-about-hero-title" ref={heroTextRef}>
            <span className="zest-about-outline-text">IGNITE</span> <br />
            <span>THE</span> <span className="zest-about-text-orange zest-about-glow-text">FUTURE</span>
          </h1>
          
          <div className="zest-about-hero-meta">
            <div className="zest-about-meta-pill">
              <Calendar size={16} /> JAN 23-25, 2026
            </div>
            <div className="zest-about-meta-pill">
              <MapPin size={16} /> COEP TECH
            </div>
          </div>

          <div className="zest-about-scroll-indicator">
            <p>SCROLL TO EXPLORE</p>
            <div className="zest-about-scroll-line"></div>
          </div>
        </div>
      </section>

      {/* SECTION 2: MARQUEE */}
      <div className="zest-about-marquee">
        <div className="zest-about-marquee-content">
           ZEST '26 • UNLEASH THE SPIRIT • COEP TECHNOLOGICAL UNIVERSITY • INDIA'S 5th LARGEST COLLEGE SPORTS FESTIVAL • 
           ZEST '26 • UNLEASH THE SPIRIT • COEP TECHNOLOGICAL UNIVERSITY • INDIA'S 5th LARGEST COLLEGE SPORTS FESTIVAL •
        </div>
      </div>

      {/* SECTION 3: INFO GRID */}
      <div className="zest-about-content-body">
        
        {/* ROW 1: COEP */}
        <section className="zest-about-info-section">
          <div className="zest-about-info-text">
            <h4 className="zest-about-label">// THE LEGACY</h4>
            <h2 className="zest-about-heading">COEP Technological <br/><span className="zest-about-text-orange">University</span></h2>
            <p className="zest-about-desc">
              Standing tall as a monument to India's technical prowess since 1854, COEP Tech is the 
              <strong> third-oldest engineering institute in Asia</strong>. A hub of academic excellence 
              and innovation on the banks of the Mula River, it has been the alma mater of visionaries 
              like Bharat Ratna Sir M. Visvesvaraya. 
              <br/><br/>
              With a heritage spanning over <strong>170 years</strong>, the institute continues to 
              shape the future of engineering, fostering a culture where tradition meets cutting-edge technology.
            </p>
           
          </div>
          <div className="zest-about-info-img-wrapper">
            <img src="/aboutUs/coepCampus_compressed.avif" alt="COEP Main Building" />
            <div className="zest-about-img-overlay"></div>
          </div>
        </section>

        {/* ROW 2: ZEST */}
        <section className="zest-about-info-section reverse">
          <div className="zest-about-info-text">
            <h4 className="zest-about-label">// THE PHENOMENON</h4>
            <h2 className="zest-about-heading">ZEST '26: <br/>Unleash The <span className="zest-about-text-orange">Spirit</span></h2>
            <p className="zest-about-desc">
              Recognized as one of India's largest annual inter-collegiate sports festivals, 
              Zest is not merely a competition—it is a celebration of human potential. 
              Hosting over <strong>5,000+ athletes</strong> and <strong>50+ sporting events</strong>, 
              Zest transforms the campus into a high-octane arena where stamina meets strategy.
              <br/><br/>
              From the grueling Cyclothon to the precision of Chess, every event is a testament 
              to resilience. Zest '26 promises to be bigger, louder, and bolder, inviting 
              champions from across the nation to etch their names in history.
            </p>
          </div>
          <div className="zest-about-info-img-wrapper">
            <img src="/aboutUs/zestByNumbers.jpeg" alt="Zest Sports Action" />
            <div className="zest-about-img-overlay"></div>
          </div>
        </section>
      </div>

      {/* SECTION 4: IMPACT STATS */}
      <section className="zest-about-stats-container">
        
        <div className="zest-about-stat-box">
  <Users size={40} className="zest-about-stat-icon" />
  <h3 className="zest-about-stat-number">25000+</h3>
  <p>FOOTFALL</p>
</div>
        <div className="zest-about-stat-box">
          <Zap size={40} className="zest-about-stat-icon" />
          <h3 className="zest-about-stat-number">200+</h3>
          <p>COLLEGES</p>
        </div>
        <div className="zest-about-stat-box">
          <Trophy size={40} className="zest-about-stat-icon" />
          <h3 className="zest-about-stat-number">5000+</h3>
          <p>PARTICIPANTS</p>
        </div>
      </section>

      {/* SECTION 5: HIGHLIGHTS */}
      <section className="zest-about-highlights-wrapper" ref={sliderRef}>
        <div className="zest-about-highlights-intro">
          <h2 className="zest-about-big-text">PAST <br /> <span className="zest-about-text-orange">GLORY</span></h2>
          <div className="zest-about-swipe-hint">
            <ArrowLeft className="animate-bounce" /> DRAG TO EXPLORE
          </div>
        </div>

        {highlights.map((item, index) => (
          <div className="zest-about-highlight-card m-2" key={index}>
            <div className="zest-about-card-inner"  onClick={() => handlePlay(item.videoId)}>
              <img src={`https://img.youtube.com/vi/${item.videoId}/maxresdefault.jpg`} alt={item.title} />
              <div className="zest-about-card-content">
                <h3>{item.title}</h3>
                <div className="zest-about-play-btn"><Play fill="currentColor" /></div>
              </div>
            </div>
          </div>
        ))}

        <div className="zest-about-highlight-card zest-about-end-card">
           <h1 className="zest-about-final-msg">JOIN THE <br/> REVOLUTION</h1>
        </div>
        
        {/* EXTRA BLANK SPACE */}
        <div className="zest-about-highlight-spacer"></div>
      </section>

      {/* VIDEO MODAL */}
      {activeVideo && (
        <div className="zest-about-video-modal" onClick={() => setActiveVideo(null)}>
          <div className="zest-about-video-container" onClick={(e) => e.stopPropagation()}>
            <button className="zest-about-close-btn" onClick={() => setActiveVideo(null)}><X size={28} /></button>
            <iframe
              src={`https://www.youtube.com/embed/${activeVideo}?autoplay=1&mute=0&rel=0`}
              title="Highlight" frameBorder="0" allow="autoplay; encrypted-media" allowFullScreen
            ></iframe>
          </div>
        </div>
      )}
    </div>
  );
};

export default about;