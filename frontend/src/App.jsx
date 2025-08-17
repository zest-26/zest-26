import React, { useState, useEffect, useRef } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import gsap from 'gsap'
import Home from './pages/Home'
import Header from './components/Header'
import Footer from './components/Footer'
import Loader from './components/Loader'

function App() {
  const [isLoading, setIsLoading] = useState(true)
  const loaderRef = useRef(null)

  useEffect(() => {
    const sessionLoaded = sessionStorage.getItem("loaderShown");

    if (sessionLoaded) {
      setIsLoading(false);
    } else {
      const timer = setTimeout(() => {
        const tl = gsap.timeline({
          onComplete: () => {
            setIsLoading(false);
            sessionStorage.setItem("loaderShown", "true");
          }
        });

        
// Step 1: Exit left images
tl.to(loaderRef.current.querySelectorAll(".left-img"), {
  x: "-150%",
  opacity: 0,
  duration: 0.8,
  stagger: 0.3,
  ease: "power3.in"
});

// Step 2: Exit right images (in sync with left)
tl.to(loaderRef.current.querySelectorAll(".right-img"), {
  x: "150%",
  opacity: 0,
  duration: 0.8,
  stagger: 0.3,
  ease: "power3.in"
}, "<"); // start at same time as left images

// Step 3: Fade in blackout after 2 images (≈1.1s delay)
tl.to(loaderRef.current.querySelector(".blackout"), {
  opacity: 1,
  duration: 1.3,
  ease: "power2.inOut"
}, 1.1); // <-- exact start time in timeline
      }, 2300); // match loader animations

      return () => clearTimeout(timer);
    }
  }, [])

  if (isLoading) {
    return <Loader ref={loaderRef} />
  }

  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  )
}

export default App