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
import SEO from '@/components/SEO';

// --- STYLES COMPONENT ---
const GlobalStyles = () => (
  <style>{`
   @font-face {
  font-family: 'Poppins';
  src: url('/fonts/Poppins/Poppins-Regular.woff2') format('woff2');
  font-weight: 400;
  font-style: normal;
  font-display: swap;
}

@font-face {
  font-family: 'Poppins';
  src: url('/fonts/Poppins/Poppins-SemiBold.woff2') format('woff2');
  font-weight: 600;
  font-style: normal;
  font-display: swap;
}

@font-face {
  font-family: 'Poppins';
  src: url('/fonts/Poppins/Poppins-Bold.woff2') format('woff2');
  font-weight: 700;
  font-style: normal;
  font-display: swap;
}


    :root {
      --primary-color: #D35400; 
      --secondary-color: #E67E22;
      --accent-color: #FF9F43; 
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
    .category-grid-container {
  width: 100%;
  max-width: 1400px;
  margin: 0 auto;   
  padding-top: 100px; /* adjust as needed */
}

    .category-grid {
      display: flex;
      flex-wrap: nowrap;   
      overflow-x: auto;
      justify-content: center;
      gap: 25px;
      padding: 2rem 1.5rem;
      -webkit-overflow-scrolling: touch;
    }

    @media (max-width: 768px) {
  .category-grid {
    display: grid;
    grid-template-columns: repeat(3, minmax(90px, 1fr));
    justify-items: center;
     place-content: center;   /* ⭐ THIS LINE */
    overflow: hidden;
  }
}


@media (max-width: 768px) {
  .tilt-card {
    width: 140px;
    height: 120px;
  }

  .card-icon {
    font-size: 1.5rem;
  }

  .card-text {
    font-size: 0.85rem;
  }
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
    .card-content {
  color: #FFFFFF;
  transform: translateZ(20px);
  position: relative;
  z-index: 1;

  display: flex;
  flex-direction: column;
  align-items: center;     /* 👈 horizontal center */
  text-align: center;      /* 👈 text center */
}
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

    @media (max-width: 768px) {
  .category-grid .tilt-card {
    width: 90px !important;
    height: 90px !important;
    flex-shrink: 1 !important;
  }

  .card-icon {
    font-size: 1.4rem;
  }

  .card-text {
    font-size: 0.6rem;
    letter-spacing: 0.5px;
  }
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

   

    .gallery-landing-header {
  display: grid;
  text-align: center;
  border-bottom: 1px solid var(--border-color);
  margin-bottom: 1rem;
  min-height: 15vh; /* optional, sets overall height */
  padding: 0; /* remove top/bottom padding since spacing is via grid rows */
   
}


  
.gallery-landing-header .container {
  
  display: flex;
  flex-direction: column;
  justify-content: center; /* vertically center content inside container */
  
}



@keyframes gradient-animation { 0% { background-position: 0% 50%; } 50% { background-position: 100% 50%; } 100% { background-position: 0% 50%; } }
    .title { font-size: clamp(2.5rem, 8vw, 4.5rem); font-weight: 700; letter-spacing: 3px; text-transform: uppercase; background: linear-gradient(90deg, var(--primary-color), #fff, var(--secondary-color)); background-size: 200% auto; color: transparent; background-clip: text; -webkit-background-clip: text; animation: gradient-animation 6s ease infinite; }
    .subtitle { font-size: clamp(1rem, 2.5vw, 1.2rem); max-width: 700px; margin: 1rem auto 0; color: #BDBDBD; line-height: 1.6; }
       .image-grid {
  display: grid;
  padding: 2rem;
  max-width: 1800px;
  margin: 0 auto;

  background-color: black;
}

    .image-item { position: relative; cursor: pointer; overflow: hidden; border-radius: 12px; box-shadow: 0 8px 25px rgba(0, 0, 0, 0.5); background-color: var(--card-bg); background-size: cover; background-position: center; }
    .image-overlay { position: absolute; inset: 0; background: linear-gradient(to top, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.4) 30%, transparent 100%); display: flex; flex-direction: column; justify-content: flex-end; padding: 20px; color: white; }
    .image-title { font-size: 1.2rem; font-weight: 600; text-shadow: 0 2px 4px rgba(0,0,0,0.7); }

    @media (max-width: 768px) {
      .title { font-size: clamp(2.5rem, 10vw, 3.5rem); }
      .image-grid { padding: 1rem; }
      
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
  "Sports": {
    icon: FaFutbol, images: [{ id: 'sp1', src: '/gallery/allSports/AGP00920_compressed.avif' },
    { id: 'sp2', src: '/gallery/allSports/AGP00999_compressed.avif', },
    { id: 'sp3', src: '/gallery/allSports/DSC07636_compressed.avif', },
    { id: 'sp4', src: '/gallery/allSports/DSC07680_compressed.avif', },
    { id: 'sp5', src: '/gallery/allSports/DSC07813_compressed.avif', },
    { id: 'sp6', src: '/gallery/allSports/DSC07864_compressed.avif', },
    { id: 'sp7', src: '/gallery/allSports/DSC08050_compressed.avif', },
    { id: 'sp8', src: '/gallery/allSports/DSC08117_compressed.avif', },
    { id: 'sp9', src: '/gallery/allSports/DSC08448_compressed.avif', },
    { id: 'sp10', src: '/gallery/allSports/DSC08539_compressed.avif', },
    { id: 'sp11', src: '/gallery/allSports/DSC08546_compressed.avif', },
    { id: 'sp12', src: '/gallery/allSports/DSC08609_compressed.avif', },
    { id: 'sp13', src: '/gallery/allSports/DSC08618_compressed.avif', },
    { id: 'sp14', src: '/gallery/allSports/DSC08635_compressed.avif', },
    { id: 'sp15', src: '/gallery/allSports/DSC09134_compressed.avif', },
    { id: 'sp16', src: '/gallery/allSports/IMG_5264_compressed.avif', },
    { id: 'sp17', src: '/gallery/allSports/IMG_5680_compressed.avif', },
    { id: 'sp18', src: '/gallery/allSports/IMG_5713_compressed.avif', },
    { id: 'sp19', src: '/gallery/allSports/IMG_6509_compressed.avif', },
    { id: 'sp20', src: '/gallery/allSports/IMG_20230211_102722_compressed.avif', },
    ]
  },

  "Cyclothon": {
    icon: FaBicycle, images: [{ id: 'cy1', src: '/gallery/cyclothon/IMG_20221231_032215_compressed.avif' },
    { id: 'cy2', src: '/gallery/cyclothon/IMG_20221231_053445_compressed.avif' },
    { id: 'cy3', src: '/gallery/cyclothon/IMG_20221231_054613_compressed.avif' },
    { id: 'cy4', src: '/gallery/cyclothon/IMG_20221231_062528_compressed.avif' },
    { id: 'cy5', src: '/gallery/cyclothon/IMG_20221231_063442_compressed.avif' },
    { id: 'cy6', src: '/gallery/cyclothon/IMG_20221231_063540_compressed.avif' },
    { id: 'cy7', src: '/gallery/cyclothon/IMG_20221231_070816_1_compressed.avif' },
    { id: 'cy8', src: '/gallery/cyclothon/1.avif' },
    { id: 'cy9', src: '/gallery/cyclothon/3.avif' },
    { id: 'cy10', src: '/gallery/cyclothon/4.avif' },
    { id: 'cy11', src: '/gallery/cyclothon/5.avif' },
    { id: 'cy12', src: '/gallery/cyclothon/6.avif' },
    { id: 'cy13', src: '/gallery/cyclothon/7.avif' },
    { id: 'cy14', src: '/gallery/cyclothon/8.avif' },
    { id: 'cy15', src: '/gallery/cyclothon/9.avif' },
    { id: 'cy16', src: '/gallery/cyclothon/10.avif' },
    { id: 'cy17', src: '/gallery/cyclothon/11.avif' },
    { id: 'cy18', src: '/gallery/cyclothon/12.avif' },
    { id: 'cy19', src: '/gallery/cyclothon/13.avif' },
    ]
  },
  "Sportify": {
    icon: FaMedal, images: [{ id: 'sf1', src: '/gallery/sportify/IMG_2063_compressed.avif' },
    { id: 'sf2', src: '/gallery/sportify/IMG_1106_compressed.avif' },
    { id: 'sf3', src: '/gallery/sportify/IMG_1117_compressed.avif' },
    { id: 'sf4', src: '/gallery/sportify/IMG_2074_compressed.avif' },
    { id: 'sf5', src: '/gallery/sportify/sportify-1.avif' },
    { id: 'sf6', src: '/gallery/sportify/sportify-2.avif' },
    { id: 'sf7', src: '/gallery/sportify/1.avif' },
    { id: 'sf8', src: '/gallery/sportify/2.avif' },
    { id: 'sf9', src: '/gallery/sportify/3.avif' },
    { id: 'sf10', src: '/gallery/sportify/4.avif' },
    { id: 'sf11', src: '/gallery/sportify/5.avif' },
    { id: 'sf12', src: '/gallery/sportify/6.avif' },
    { id: 'sf13', src: '/gallery/sportify/7.avif' },
    { id: 'sf14', src: '/gallery/sportify/8.avif' },
    { id: 'sf15', src: '/gallery/sportify/9.avif' },
    { id: 'sf16', src: '/gallery/sportify/10.avif' },
    { id: 'sf17', src: '/gallery/sportify/11.avif' },



    ]
  },


  "Marathon": {
    icon: FaRunning, images: [{ id: 'ma1', src: '/gallery/marathon/IMG_20230108_044304_compressed.avif', },
    { id: 'ma2', src: '/gallery/marathon/IMG_20230108_045406_compressed.avif', },
    { id: 'ma3', src: '/gallery/marathon/IMG_20230108_045431_compressed.avif', },
    { id: 'ma4', src: '/gallery/marathon/IMG_20230108_050031_compressed.avif', },
    { id: 'ma5', src: '/gallery/marathon/IMG_20230108_050215_compressed.avif', },
    { id: 'ma6', src: '/gallery/marathon/IMG_20230108_050604_compressed.avif', },
    { id: 'ma7', src: '/gallery/marathon/IMG_20230108_051655_compressed.avif', },
    { id: 'ma8', src: '/gallery/marathon/IMG_20230108_051819_compressed.avif', },
    { id: 'ma9', src: '/gallery/marathon/IMG_20230108_052214_compressed.avif', },
    { id: 'ma10', src: '/gallery/marathon/IMG_20230108_052446_compressed.avif', },
    { id: 'ma11', src: '/gallery/marathon/IMG_20230108_053604_compressed.avif', },
    { id: 'ma12', src: '/gallery/marathon/IMG_20230108_055254_compressed.avif', },
    { id: 'ma13', src: '/gallery/marathon/IMG_20230108_055410_compressed.avif', },]
  },

};
const allImages = Object.values(categories).flatMap(category => category.images);

// --- Animation Variants ---
const gridContainerVariants = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.05 } } };
const cardVariants = { hidden: { y: 20, opacity: 0 }, show: { y: 0, opacity: 1 } };

// --- MAIN APP COMPONENT & SUB-COMPONENTS ---

const Footer = () => (
  <footer>
    <div className='container'>
      <h1><span style={{ background: 'linear-gradient(to right, #F39C12, #E67E22)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Get In Touch</span></h1>
      <div className='social-links'>
        <a href='https://www.instagram.com/coepzest/' target="_blank" rel="noopener noreferrer"><Instagram size={30} /></a>
        <a href='https://www.facebook.com/people/Coep-Zest/61571312685575/' target="_blank" rel="noopener noreferrer"><Facebook size={30} /></a>
        <a href='https://www.linkedin.com/company/zest-coep/?originalSubdomain=in' target="_blank" rel="noopener noreferrer"><Linkedin size={30} /></a>
        <a href='https://x.com/zest_coep' target="_blank" rel="noopener noreferrer"><TwitterX size={30} /></a>
      </div>
      <p style={{ color: '#9CA3AF' }}>© {new Date().getFullYear()} ZEST'26. All rights reserved.</p>
      <p style={{ color: '#6B7280', fontSize: '0.875rem' }}>Made with ❤️ in Shivajinager, Pune, Maharashtra</p>
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
      <SEO title="Gallery" description="Explore the vibrant moments of COEP Zest 2026 in our gallery." />
      <GlobalStyles />
      <main className="main">

        <motion.div className="category-grid-container " initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.6 }}>
          <CategorySelector categories={categories} onCategoryClick={setSelectedCategory} selectedCategory={selectedCategory} />
        </motion.div>

        <div className="gallery-landing-header">

          <div className="container">

            <motion.h1
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="title"
            >
              GALLERY
            </motion.h1>
          </div>

        </div>



        <ImageGallery images={displayedImages} onImageClick={(index) => openModal(displayedImages, index)} />
      </main>
      <AnimatePresence>
        {modalState.isOpen && (
          <ModalLightbox image={modalState.images[modalState.index]} onClose={closeModal} onNext={showNextImage} onPrev={showPrevImage} />
        )}
      </AnimatePresence>

    </div>
  );
}

const CategorySelector = ({ categories, onCategoryClick, selectedCategory }) => (
  <motion.div className="category-grid " variants={gridContainerVariants} initial="hidden" animate="show">
    <motion.div variants={cardVariants}>
      <TiltCard onClick={() => onCategoryClick("All")} className={selectedCategory === "All" ? "active" : ""}>
        <div className="card-content "><FaTrophy className="card-icon" /><p className="card-text">All Events</p></div>
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
    const patterns = [{ col: 2, row: 2 }, { col: 1, row: 1 }, { col: 1, row: 2 }, { col: 1, row: 1 }, { col: 2, row: 1 }, { col: 1, row: 1 }, { col: 1, row: 2 }, { col: 2, row: 2 }, { col: 1, row: 1 }];
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