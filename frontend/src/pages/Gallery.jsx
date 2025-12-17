import React, { useState, useRef, useEffect, useCallback } from 'react';
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useSpring,
  AnimatePresence,
  useAnimationControls,
} from "framer-motion";
import { 
  FaBicycle, 
  FaRunning,
  FaFutbol, 
  FaTimes,
  FaTrophy,
  FaMedal, // New Icon
  FaBolt,   // New Icon
} from "react-icons/fa";
import { Instagram, Facebook, Linkedin, X as TwitterX } from 'lucide-react';

// --- STYLES COMPONENT ---
const GlobalStyles = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700&display=swap');

    :root {
      --primary-color: #F39C12;
      --secondary-color: #E67E22;
      --accent-color: #00A8FF;
      --dark-bg: #0f0f10;
      --light-text: #E0E0E0;
      --dark-text: #1a1a1a;
      --card-bg: #202022;
      --border-color: rgba(255, 255, 255, 0.1);
    }

    * { box-sizing: border-box; margin: 0; padding: 0; }

    body {
      background-color: var(--dark-bg);
      background-image: radial-gradient(circle at top, #2a2a2e 0%, var(--dark-bg) 70%);
      color: var(--light-text);
      font-family: 'Poppins', sans-serif;
      min-height: 100vh;
      overflow-x: hidden;
    }

    .app { width: 100%; display: flex; flex-direction: column; min-height: 100vh; }
    main.main { flex-grow: 1; }
    .container { width: 100%; max-width: 1400px; margin: 0 auto; padding: 0 1.5rem; }
    .category-grid-container { width: 100%; max-width: 1400px; margin: 0 auto; }

    .category-grid {
      display: flex;
      flex-wrap: nowrap;
      overflow-x: auto;
      justify-content: center;
      gap: 25px;
      padding: 2rem 1.5rem;
      -webkit-overflow-scrolling: touch;
    }
    .category-grid::-webkit-scrollbar { height: 8px; }
    .category-grid::-webkit-scrollbar-track { background: #202022; border-radius: 4px; }
    .category-grid::-webkit-scrollbar-thumb { background: var(--primary-color); border-radius: 4px; }
    .category-grid::-webkit-scrollbar-thumb:hover { background: var(--secondary-color); }

    .tilt-card {
      position: relative;
      width: clamp(130px, 15vw, 160px);
      height: clamp(160px, 18vw, 190px);
      flex-shrink: 0;
      border-radius: 16px;
      background: linear-gradient(135deg, var(--primary-color), var(--secondary-color));
      cursor: pointer; border: 2px solid transparent;
      transition: border-color 0.3s ease;
    }
    
    .tilt-card::before {
      content: "";
      position: absolute;
      z-index: -1;
      inset: -3px;
      border-radius: 18px;
      background: radial-gradient(
        400px circle at var(--mouse-x) var(--mouse-y),
        var(--primary-color),
        transparent 80%
      );
      opacity: 0;
      transition: opacity 0.3s ease-in-out;
    }

    .tilt-card:hover::before {
      opacity: 1;
    }
    
    .tilt-card.active {
      box-shadow: 0 0 40px -5px var(--accent-color);
      border-color: var(--accent-color);
    }
    .tilt-card.active:hover::before {
      opacity: 0;
    }

    .tilt-card-inner {
      position: absolute; inset: 6px; display: grid;
      place-content: center; text-align: center;
      border-radius: 10px; background-color: var(--card-bg);
      transform: translateZ(40px); transform-style: preserve-3d;
      overflow: hidden;
    }
    
    .spotlight {
      position: absolute; top: 0; left: 0; width: 100%; height: 100%;
      border-radius: inherit; opacity: 0; transition: opacity 0.4s ease;
    }
    .tilt-card:hover .spotlight { opacity: 1; }
    .card-content { color: #FFFFFF; transform: translateZ(20px); position: relative; z-index: 1; }
    .card-icon {
      font-size: clamp(2rem, 5vw, 3rem); margin-bottom: 0.75rem; color: var(--primary-color);
      transition: color 0.3s ease, transform 0.3s ease;
    }
    .tilt-card:hover .card-icon, .tilt-card.active .card-icon {
      color: var(--accent-color); transform: scale(1.1) rotate(-5deg);
    }
    .card-text {
      font-size: clamp(0.8rem, 2vw, 1rem); font-weight: 600;
      text-transform: uppercase; letter-spacing: 1px;
      text-align: center; padding: 0 0.5rem; word-wrap: break-word;
    }
    
    .modal-overlay { position: fixed; top: 0; left: 0; width: 100%; height: 100%; background-color: rgba(0, 0, 0, 0.95); display: flex; justify-content: center; align-items: center; z-index: 1000; padding: 1rem; }
    .modal-content { position: relative; max-width: 90vw; max-height: 90vh; box-shadow: 0 10px 40px rgba(0, 0, 0, 0.5); display: flex; flex-direction: column; }
    .modal-image { display: block; max-width: 100%; max-height: calc(90vh - 70px); border-radius: 8px; object-fit: contain; border: 2px solid var(--border-color); }
    .modal-caption { text-align: center; padding: 1rem; font-size: 1.2rem; color: #FFFFFF; background-color: transparent; text-shadow: 0 1px 5px black; }
    .modal-button { position: fixed; cursor: pointer; color: white; background: rgba(0, 0, 0, 0.4); border: 1px solid rgba(255, 255, 255, 0.3); border-radius: 50%; width: 50px; height: 50px; display: flex; justify-content: center; align-items: center; font-size: 2rem; transition: all 0.2s ease; user-select: none; z-index: 1001; backdrop-filter: blur(5px); }
    .modal-button:hover { background: var(--primary-color); border-color: var(--primary-color); transform: scale(1.1); }
    .close-button { top: 20px; right: 20px; }
    .prev-button { left: 20px; top: 50%; transform: translateY(-50%); }
    .next-button { right: 20px; top: 50%; transform: translateY(-50%); }

    footer { background: linear-gradient(to bottom, transparent, rgba(0, 0, 0, 0.9)); padding: 4rem 0; margin-top: auto; width: 100%; border-top: 1px solid var(--border-color); }
    footer .container { max-width: 1200px; display: flex; flex-direction: column; align-items: center; }
    footer h1 { font-size: clamp(2.5rem, 5vw, 4rem); text-align: center; margin-bottom: 2rem; }
    footer .social-links { display: flex; justify-content: center; gap: 2rem; margin: 2rem 0; }
    footer .social-links a { color: white; padding: 1rem; border-radius: 50%; background: rgba(255, 255, 255, 0.1); transition: all 0.3s ease; }
    footer .social-links a:hover { background: var(--primary-color); transform: translateY(-5px); }
    footer p { text-align: center; max-width: 600px; margin: 0.5rem auto; }

    .gallery-landing-header { text-align: center; padding: 4rem 0; border-bottom: 1px solid var(--border-color); margin-bottom: 1rem; }
    @keyframes gradient-animation { 0% { background-position: 0% 50%; } 50% { background-position: 100% 50%; } 100% { background-position: 0% 50%; } }
    .title { font-size: clamp(2.5rem, 8vw, 4.5rem); font-weight: 700; letter-spacing: 3px; text-transform: uppercase; background: linear-gradient(90deg, var(--primary-color), #fff, var(--secondary-color)); background-size: 200% auto; color: transparent; background-clip: text; -webkit-background-clip: text; animation: gradient-animation 6s ease infinite; }
    .subtitle { font-size: clamp(1rem, 2.5vw, 1.2rem); max-width: 700px; margin: 1rem auto 0; color: #BDBDBD; line-height: 1.6; }
    .category-title { text-align: center; font-size: 3rem; color: var(--primary-color); margin: 2rem 0 3rem; text-shadow: 0 0 10px var(--primary-color); }
    .image-grid { display: grid; padding: 2rem; max-width: 1800px; margin: 0 auto; }
    .image-item { position: relative; cursor: pointer; overflow: hidden; border-radius: 12px; box-shadow: 0 8px 25px rgba(0, 0, 0, 0.5); background-color: var(--card-bg); background-size: cover; background-position: center; }
    .image-overlay { position: absolute; inset: 0; background: linear-gradient(to top, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.4) 30%, transparent 100%); display: flex; flex-direction: column; justify-content: flex-end; padding: 20px; color: white; }
    .image-title { font-size: 1.2rem; font-weight: 600; text-shadow: 0 2px 4px rgba(0,0,0,0.7); }

    @media (max-width: 768px) {
      .title { font-size: clamp(2.5rem, 10vw, 3.5rem); }
      .image-grid { padding: 1rem; }
      .category-title { font-size: 2.5rem; margin: 1rem 0 2rem; }
    }
    @media (max-width: 480px) {
      .container { padding: 0 1rem; }
      .image-grid { gap: 10px; padding: 0.5rem; }

      /* --- Add this code for better mobile responsiveness --- */
    @media (max-width: 640px) {
      .category-grid {
        justify-content: flex-start; /* Align cards to the start */
        gap: 15px; /* Reduce space between cards */
        padding: 1.5rem 1rem; /* Adjust horizontal padding */
        /* Hides the scrollbar for a cleaner look on mobile */
        scrollbar-width: none; /* For Firefox */
      }
      .category-grid::-webkit-scrollbar {
        display: none; /* For Chrome, Safari, and Opera */
      }

      .tilt-card {
        /* Make cards smaller on mobile */
        width: clamp(110px, 25vw, 130px);
        height: clamp(140px, 30vw, 160px);
      }

      .card-icon {
        font-size: clamp(1.8rem, 4vw, 2.5rem); /* Slightly smaller icon */
      }
    }
    }
  `}</style>
);

// --- DYNAMIC IMAGE DATA ---
const categories = {
    "Cyclothon": { icon: FaBicycle, images: [ { id: 'cy1', src: 'https://placehold.co/800x600/FF6B6B/white?text=Cyclothon+1', title: 'Morning Ride' }, { id: 'cy2', src: 'https://placehold.co/800x600/FF8787/white?text=Cyclothon+2', title: 'Team Event' }, { id: 'cy3', src: 'https://placehold.co/800x600/FF6B6B/white?text=Cyclothon+3', title: 'Race Start' }, { id: 'cy4', src: 'https://placehold.co/800x600/FF8787/white?text=Cyclothon+4', title: 'Winners' }, { id: 'cy5', src: 'https://placehold.co/800x600/FF6B6B/white?text=Cyclothon+5', title: 'Group Photo' }, ] },
    "Sports": { icon: FaFutbol, images: [ { id: 'sp1', src: 'https://placehold.co/800x600/4ECDC4/white?text=Sports+1', title: 'Cricket Match' }, { id: 'sp2', src: 'https://placehold.co/800x600/45B7AF/white?text=Sports+2', title: 'Football' }, { id: 'sp3', src: 'https://placehold.co/800x600/4ECDC4/white?text=Sports+3', title: 'Basketball' }, ] },
    "Marathon": { icon: FaRunning, images: [ { id: 'ma1', src: 'https://placehold.co/800x600/FFD93D/white?text=Marathon+1', title: 'Marathon Start' }, { id: 'ma2', src: 'https://placehold.co/800x600/FFC53D/white?text=Marathon+2', title: 'Mid Race' }, { id: 'ma3', src: 'https://placehold.co/800x600/FFD93D/white?text=Marathon+3', title: 'Finish Line' }, ] },
    "Sportify": { icon: FaMedal, images: [ { id: 'sf1', src: 'https://placehold.co/800x600/6C5CE7/white?text=Sportify+1', title: 'Indoor Games' }, { id: 'sf2', src: 'https://placehold.co/800x600/5F52D1/white?text=Sportify+2', title: 'Team Sports' }, ] },
    "Zest": { icon: FaBolt, images: [ { id: 'ze1', src: 'https://placehold.co/800x600/A8E6CF/white?text=Zest+1', title: 'Opening Ceremony' }, { id: 'ze2', src: 'https://placehold.co/800x600/8FD9B6/white?text=Zest+2', title: 'Main Events' }, { id: 'ze3', src: 'https://placehold.co/800x600/A8E6CF/white?text=Zest+3', title: 'Celebrations' }, ] }
};
const allImages = Object.values(categories).flatMap(category => category.images);

// --- Animation Variants ---
const gridContainerVariants = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.05 } } };
const cardVariants = { hidden: { y: 20, opacity: 0 }, show: { y: 0, opacity: 1 } };

// --- MAIN APP COMPONENT & SUB-COMPONENTS ---

const Footer = () => (
  <footer>
    <div className='container'>
      <h1><span style={{background: 'linear-gradient(to right, #F39C12, #E67E22)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent'}}>Get In Touch</span></h1>
      <div className='social-links'>
        <a href='https://www.instagram.com/coepzest/' target="_blank" rel="noopener noreferrer"><Instagram size={30} /></a>
        <a href='https://www.facebook.com/people/Coep-Zest/61571312685575/' target="_blank" rel="noopener noreferrer"><Facebook size={30} /></a>
        <a href='https://www.linkedin.com/company/zest-coep/?originalSubdomain=in' target="_blank" rel="noopener noreferrer"><Linkedin size={30} /></a>
        <a href='https://x.com/zest_coep' target="_blank" rel="noopener noreferrer"><TwitterX size={30} /></a>
      </div>
      <p style={{color: '#9CA3AF'}}>© {new Date().getFullYear()} ZEST'26. All rights reserved.</p>
      <p style={{color: '#6B7280', fontSize: '0.875rem'}}>Made with ❤️ in Shivajinager, Pune, Maharashtra</p>
    </div>
  </footer>
);

function GalleryPage() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [modalState, setModalState] = useState({ isOpen: false, images: [], index: 0 });
  const titleControls = useAnimationControls();
  const displayedImages = selectedCategory === "All" ? allImages : categories[selectedCategory]?.images || [];
  
  const openModal = (images, index) => setModalState({ isOpen: true, images, index });
  const closeModal = () => setModalState(prevState => ({ ...prevState, isOpen: false }));

  const showNextImage = useCallback((e) => {
    if (e) e.stopPropagation();
    setModalState(prev => ({ ...prev, index: (prev.index + 1) % prev.images.length }));
  }, []);
  const showPrevImage = useCallback((e) => {
    if (e) e.stopPropagation();
    setModalState(prev => ({ ...prev, index: (prev.index - 1 + prev.images.length) % prev.images.length }));
  }, []);

  useEffect(() => {
    titleControls.start({ opacity: 1, y: 0, transition: { duration: 0.4 } });
  }, [selectedCategory, titleControls]);
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!modalState.isOpen) return;
      if (e.key === 'ArrowRight') showNextImage(null);
      if (e.key === 'ArrowLeft') showPrevImage(null);
      if (e.key === 'Escape') closeModal();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [modalState.isOpen, showNextImage, showPrevImage]);

  return (
    <div className="app">
      <GlobalStyles />
      <main className="main">
        <div className="gallery-landing-header">
          <div className="container">
            <motion.h1 initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="title">
              ZEST FEST 26 GALLERY
            </motion.h1>
            <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }} className="subtitle">
              Capturing the energy, passion, and unforgettable moments of our annual sports extravaganza.
            </motion.p>
          </div>
        </div>
        <motion.div className="category-grid-container" initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.6 }}>
          <CategorySelector categories={categories} onCategoryClick={setSelectedCategory} selectedCategory={selectedCategory} />
        </motion.div>
        <motion.h2 className="category-title" initial={{ opacity: 0, y: -20 }} animate={titleControls}>
            {selectedCategory === "All" ? "All Events" : selectedCategory}
        </motion.h2>
        <ImageGallery images={displayedImages} onImageClick={(index) => openModal(displayedImages, index)} />
      </main>
      <AnimatePresence>
        {modalState.isOpen && (
          <ModalLightbox image={modalState.images[modalState.index]} onClose={closeModal} onNext={showNextImage} onPrev={showPrevImage} />
        )}
      </AnimatePresence>
      <Footer />
    </div>
  );
}

const CategorySelector = ({ categories, onCategoryClick, selectedCategory }) => (
  <motion.div className="category-grid" variants={gridContainerVariants} initial="hidden" animate="show">
    <motion.div variants={cardVariants}>
      <TiltCard onClick={() => onCategoryClick("All")} className={selectedCategory === "All" ? "active" : ""}>
        <div className="card-content"><FaTrophy className="card-icon" /><p className="card-text">All Events</p></div>
      </TiltCard>
    </motion.div>
    {Object.keys(categories).map(cat => (
      <motion.div key={cat} variants={cardVariants}>
        <TiltCard onClick={() => onCategoryClick(cat)} className={selectedCategory === cat ? "active" : ""}>
          <div className="card-content">{React.createElement(categories[cat].icon, { className: "card-icon" })}<p className="card-text">{cat}</p></div>
        </TiltCard>
      </motion.div>
    ))}
  </motion.div>
);

const TiltCard = ({ children, onClick, className = '' }) => {
    const ref = useRef(null);
    const x = useMotionValue(0), y = useMotionValue(0);
    const mouseX = useMotionValue(0), mouseY = useMotionValue(0);

    const xSpring = useSpring(x, { stiffness: 300, damping: 20 });
    const ySpring = useSpring(y, { stiffness: 300, damping: 20 });
    const transform = useMotionTemplate`perspective(1000px) rotateX(${xSpring}deg) rotateY(${ySpring}deg) scale(1.05)`;
    
    const handleMouseMove = (e) => {
        if (!ref.current) return;
        const rect = ref.current.getBoundingClientRect();
        
        const rX = (e.clientY - rect.top - rect.height / 2) / (rect.height / 2) * -14;
        const rY = (e.clientX - rect.left - rect.width / 2) / (rect.width / 2) * 14;
        x.set(rX); y.set(rY);
        
        const mouseXVal = e.clientX - rect.left;
        const mouseYVal = e.clientY - rect.top;
        mouseX.set(mouseXVal);
        mouseY.set(mouseYVal);
        ref.current.style.setProperty("--mouse-x", `${mouseXVal}px`);
        ref.current.style.setProperty("--mouse-y", `${mouseYVal}px`);
    };

    const handleMouseLeave = () => { x.set(0); y.set(0); };

    return (
        <motion.div ref={ref} onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave} onClick={onClick} style={{ transform, transformStyle: "preserve-3d" }} className={`tilt-card ${className}`}>
            <div className="tilt-card-inner">
                {children}
                <motion.div
                    className="spotlight"
                    style={{
                        background: useMotionTemplate`radial-gradient(circle at ${mouseX}px ${mouseY}px, rgba(255, 255, 255, 0.3) 0%, transparent 50%)`
                    }}
                />
            </div>
        </motion.div>
    );
};

const ImageGallery = ({ images, onImageClick }) => {
    const [columnCount, setColumnCount] = useState(6);
    useEffect(() => {
        const getColumnCount = () => {
            const width = window.innerWidth;
            if (width < 480) return 2; if (width < 768) return 3; if (width < 1200) return 4;
            return 6;
        };
        const handleResize = () => setColumnCount(getColumnCount());
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);
    const getSpans = (index) => {
        const patterns = [ { col: 2, row: 2 }, { col: 1, row: 1 }, { col: 1, row: 2 }, { col: 1, row: 1 }, { col: 2, row: 1 }, { col: 1, row: 1 }, { col: 1, row: 2 }, { col: 2, row: 2 }, { col: 1, row: 1 } ];
        let { col, row } = patterns[index % patterns.length];
        if (col > columnCount) col = columnCount;
        return { col, row };
    };
    return (
        <motion.div className="image-grid" variants={gridContainerVariants} initial="hidden" animate="show" style={{ gap: '15px', gridAutoFlow: 'dense', gridAutoRows: '200px', gridTemplateColumns: `repeat(${columnCount}, 1fr)` }}>
            <AnimatePresence>
                {images.map((img, index) => {
                    const { col, row } = getSpans(index);
                    return (
                        <motion.div key={img.id} className="image-item" onClick={() => onImageClick(index)} layout variants={{ hidden: { opacity: 0, scale: 0.8 }, show: { opacity: 1, scale: 1 }, exit: { opacity: 0, scale: 0.8 } }} transition={{ type: "spring", stiffness: 260, damping: 20 }}
                            style={{ gridColumn: `span ${col}`, gridRow: `span ${row}`, backgroundImage: `url(${img.src})` }}
                            initial="rest" whileHover="hover" animate="rest"
                        >
                            <motion.div className="image-overlay" variants={{ rest: { opacity: 0 }, hover: { opacity: 1 } }} transition={{ duration: 0.3 }} >
                                <motion.h3 className="image-title" variants={{ rest: { y: 20 }, hover: { y: 0 } }} transition={{ duration: 0.3, ease: "easeOut" }} >
                                    {img.title}
                                </motion.h3>
                            </motion.div>
                        </motion.div>
                    );
                })}
            </AnimatePresence>
        </motion.div>
    );
};

const ModalLightbox = ({ image, onClose, onNext, onPrev }) => (
  <motion.div className="modal-overlay" onClick={onClose} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
    <motion.div className="modal-content" onClick={(e) => e.stopPropagation()} initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.8, opacity: 0 }} transition={{ type: "spring", damping: 20, stiffness: 200 }}>
      <AnimatePresence mode="wait">
        <motion.img key={image.src} src={image.src} alt={image.title} className="modal-image" initial={{ opacity: 0.5, x: 50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0.5, x: -50 }} transition={{ duration: 0.2 }} />
      </AnimatePresence>
      <p className="modal-caption">{image.title}</p>
    </motion.div>
    <button onClick={onClose} className="modal-button close-button" aria-label="Close"><FaTimes /></button>
    <button onClick={onPrev} className="modal-button prev-button" aria-label="Previous image">&#10094;</button>
    <button onClick={onNext} className="modal-button next-button" aria-label="Next image">&#10095;</button>
  </motion.div>
);

export default GalleryPage;