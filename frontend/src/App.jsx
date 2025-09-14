import React, { useState, useEffect, useRef } from 'react'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import gsap from 'gsap'
import Home from './pages/Home'
import Header from './components/Header'
import Footer from './components/Footer'
import Loader from './components/Loader'
import About from './pages/about'
import CoordinatorResults from './pages/coordinatorResults'

function AnimatedRoutes() {
  const [isLoading, setIsLoading] = useState(true)
  const loaderRef = useRef(null)
  const location = useLocation()

  useEffect(() => {
    setIsLoading(true) // show loader on every route change

    const timer = setTimeout(() => {
      const tl = gsap.timeline({
        onComplete: () => {
          setIsLoading(false)  // hide loader when done
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

      // Step 2: Exit right images
      tl.to(loaderRef.current.querySelectorAll(".right-img"), {
        x: "150%",
        opacity: 0,
        duration: 0.8,
        stagger: 0.3,
        ease: "power3.in"
      }, "<");

      // Step 3: Fade in blackout
      tl.to(loaderRef.current.querySelector(".blackout"), {
        opacity: 1,
        duration: 1.3,
        ease: "power2.inOut"
      }, 1.1);
    }, 2300);

    return () => clearTimeout(timer)
  }, [location.pathname])

  if (isLoading) {
    return <Loader ref={loaderRef} />
  }

  return (
    <div className='h-screen w-screen'>
      <main className='mt-0 min-h-screen w-full scroll-smooth'>
        <Routes location={location} key={location.pathname}>
          <Route 
            path="/" 
            element={
              <>
                <section id="home"><Home /></section>
                <section id="about"><About /></section>
              </>
            }
          />
          <Route path="/coordinatorResults" element={<CoordinatorResults />} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}

function App() {
  return (
    <BrowserRouter>
      <AnimatedRoutes />
    </BrowserRouter>
  )
}

export default App