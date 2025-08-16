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

        // Step 1: Fade in blackout
        tl.to(loaderRef.current.querySelector(".blackout"), {
          opacity: 1,
          duration: 1.5,
          ease: "power2.inOut"
        });

        // Step 2: Exit left images
        tl.to(
          loaderRef.current.querySelectorAll(".left-img"),
          {
            x: "-150%",
            opacity: 0,
            duration: 1.5,
            stagger: 0.3,
            ease: "power3.in"
          },
          "<" // sync with blackout
        );

        // Step 3: Exit right images
        tl.to(
          loaderRef.current.querySelectorAll(".right-img"),
          {
            x: "150%",
            opacity: 0,
            duration: 1.5,
            stagger: 0.3,
            ease: "power3.in"
          },
          "<" // sync with blackout
        );
      }, 3300); // match loader animations

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