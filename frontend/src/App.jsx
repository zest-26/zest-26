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
    const sessionLoaded = sessionStorage.getItem('loaderShown')

    if (sessionLoaded) {
      setIsLoading(false)
    } else {
      const timer = setTimeout(() => {
        // Animate fade out of loader
        gsap.to(loaderRef.current, {
          opacity: 0,
          duration: 1, // 1 second fade
          ease: 'power2.out',
          onComplete: () => {
            setIsLoading(false)
            sessionStorage.setItem('loaderShown', 'true')
          }
        })
      }, 3300) // match your loader duration

      return () => clearTimeout(timer)
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
