import { Outlet } from 'react-router-dom'
import AngelsHeader from './header'
import React, { useState, useEffect } from 'react'
import AngelsFooter from './footer'

function VAngelsLayout() {
  const [showHeader, setShowHeader] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY
      if (currentScrollY > lastScrollY) {
        // Scrolling down
        setShowHeader(false)
      } else {
        // Scrolling up
        setShowHeader(true)
      }
      setLastScrollY(currentScrollY)
    }

    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [lastScrollY])

  return (
    <div className="flex flex-col overflow-hidden">
      {/* Header with fade effect */}
      <div
        className={`transition-opacity duration-[1s,25s] ${
          showHeader ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
      >
        {
           (!location.pathname.includes('/age-verification')) ?
          <AngelsHeader />
        : null
        }
      </div>
      <main className="flex flex-col w-full">
        <Outlet />
      </main>
      <div className="mt-auto">
          <AngelsFooter />
      </div>
    </div>
  )
}

export default VAngelsLayout
