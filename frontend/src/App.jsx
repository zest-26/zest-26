import React, { useState, useEffect, useRef } from 'react'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import gsap from 'gsap'
import Header from './components/Header'
import Footer from './components/Footer'
import Loader from './components/Loader'

const Home = React.lazy(() => import('./pages/Home'));
const About = React.lazy(() => import('./pages/about'));
const CoordinatorResults = React.lazy(() => import('./pages/coordinatorResults'));
const ContactUs = React.lazy(() => import('./pages/contactUs'));
const Gallery = React.lazy(() => import('./pages/Gallery'));
const CoreTeam = React.lazy(() => import('./pages/coreTeam'));
const Sports = React.lazy(() => import('./pages/Sports'));
const Accomodations = React.lazy(() => import('./pages/Accomodations'));
const Sponsers = React.lazy(() => import('./pages/Sponsers'));
const Cyclothon = React.lazy(() => import('./pages/cyclothon'));
const CycloCertificate = React.lazy(() => import('./pages/cycloCertificate'));
const Volresults = React.lazy(() => import('./pages/volResults'));
const Scores = React.lazy(() => import('./pages/Scores'));


function AnimatedRoutes() {
  const location = useLocation()

  // Initialize isLoading to true if we're on home page and haven't loaded yet
  const [hasLoadedOnce, setHasLoadedOnce] = useState(false)
  const [isLoading, setIsLoading] = useState(
    location.pathname === "/" && !hasLoadedOnce
  )

  const loaderRef = useRef(null)
  const footerRef = useRef(null)

  useEffect(() => {
    // Show loader ONLY for home page AND only on first visit
    if (location.pathname !== "/" || hasLoadedOnce) {
      setIsLoading(false)
      return
    }

    // isLoading is already true from initialization, just run the animation timer
    const timer = setTimeout(() => {
      const tl = gsap.timeline({
        onComplete: () => {
          setIsLoading(false)
          setHasLoadedOnce(true)
        },
      })

      tl.to(loaderRef.current.querySelectorAll(".left-img"), {
        x: "-150%",
        opacity: 0,
        duration: 0.8,
        stagger: 0.3,
        ease: "power3.in",
      })

      tl.to(
        loaderRef.current.querySelectorAll(".right-img"),
        {
          x: "150%",
          opacity: 0,
          duration: 0.8,
          stagger: 0.3,
          ease: "power3.in",
        },
        "<"
      )

      tl.to(
        loaderRef.current.querySelector(".blackout"),
        {
          opacity: 1,
          duration: 1.3,
          ease: "power2.inOut",
        },
        1.1
      )
    }, 1300)

    return () => clearTimeout(timer)
  }, [location.pathname, hasLoadedOnce])


  if (isLoading) {
    return <Loader ref={loaderRef} />
  }

  return (
    <div className="w-screen h-screen">

      {/* HEADER — hidden on Home & Loader */}
      {!isLoading && location.pathname !== "/" && location.pathname !== "/Scores" && location.pathname !== "/scores" && <Header />}

      <main className="w-full min-h-screen mt-0 scroll-smooth">
        <React.Suspense fallback={<Loader />}>
          <Routes location={location} key={location.pathname}>
            <Route
              path="/"
              element={
                <section id="home">
                  <Home />
                </section>
              }
            />

            <Route path="/coordinatorResults" element={<CoordinatorResults />} />
            <Route path="/VolunteerResults" element={<Volresults />} />
            <Route path="/about" element={<About />} />
            <Route path="/contactUs" element={<ContactUs />} />
            <Route path="/Gallery" element={<Gallery />} />
            <Route path="/coreTeam" element={<CoreTeam />} />
            <Route path="/Sports" element={<Sports />} />
            <Route path="/Accomodations" element={<Accomodations />} />
            <Route path="/Sponsers" element={<Sponsers />} />
            <Route path="/cyclothon" element={<Cyclothon />} />
            <Route path="/cycloCertificate" element={<CycloCertificate />} />
            <Route path="/Scores" element={<Scores />} />
          </Routes>
        </React.Suspense>
      </main>
      {/* FOOTER */}
      {!isLoading && location.pathname !== "/" && location.pathname !== "/Scores" && location.pathname !== "/Gallery" && <Footer />}

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