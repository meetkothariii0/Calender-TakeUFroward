'use client'

import React, { useState, useEffect, useRef } from 'react'
import CalendarGrid from './CalendarGrid'
import NotesModal from './NotesModal'
import RainEffect from './RainEffect'
import SnowEffect from './SnowEffect'
import SunEffect from './SunEffect'
import AutumnEffect from './AutumnEffect'

const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
]

export default function RealPageFlipCalendar() {
  const [currentMonth, setCurrentMonth] = useState(3) // April
  const [isFlipping, setIsFlipping] = useState(false)
  const [flipDirection, setFlipDirection] = useState<'next' | 'prev'>('next')
  const [isNotesModalOpen, setIsNotesModalOpen] = useState(false)
  const [notesStartDate, setNotesStartDate] = useState<number | null>(null)
  const [notesEndDate, setNotesEndDate] = useState<number | null>(null)
  const [theme, setTheme] = useState<'dark' | 'light'>('dark')
  const videoRef = useRef<HTMLVideoElement>(null)

  // Initialize theme from localStorage
  useEffect(() => {
    const savedTheme = localStorage.getItem('calendar-theme') as 'dark' | 'light' | null
    if (savedTheme) {
      setTheme(savedTheme)
    }
  }, [])

  // Save theme preference
  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark'
    setTheme(newTheme)
    localStorage.setItem('calendar-theme', newTheme)
  }

  // Get seasonal filter based on month
  const getSeasonalFilter = (month: number): string => {
    // 0=Jan, 1=Feb, 2=Mar, 3=Apr, 4=May, 5=Jun, 6=Jul, 7=Aug, 8=Sep, 9=Oct, 10=Nov, 11=Dec
    if (month === 0) {
      // January: Mix of yellow and green grassland with cool tones, snowy vibes
      return 'hue-rotate(-10deg) saturate(1.1) brightness(1.0) contrast(1.05)'
    } else if (month === 1) {
      // February: Yellowish grassland with light vibes
      return 'hue-rotate(30deg) saturate(1.2) brightness(1.08) contrast(1.0)'
    } else if (month === 11) {
      // December: Fully snowy, white/blue tones
      return 'hue-rotate(-35deg) saturate(1.4) brightness(1.15) contrast(1.15) invert(0.08)'
    } else if (month === 2) {
      // Spring (February-March): Fresh, light, warm emerging vibes
      return 'hue-rotate(15deg) saturate(1.15) brightness(1.05) contrast(1.0)'
    } else if (month >= 3 && month <= 5) {
      // Summer (April-June): Vibrant, bright, yellow-green boost
      return 'hue-rotate(20deg) saturate(1.35) brightness(1.12) contrast(1.1)'
    } else if (month >= 6 && month <= 8) {
      // Monsoon/Rainy (July-September): Cool, muted, darker, humid vibes
      return 'hue-rotate(-15deg) saturate(0.75) brightness(0.88) contrast(0.95)'
    } else {
      // Autumn (October-November): Golden, warm, saturated vibes
      return 'hue-rotate(25deg) saturate(1.25) brightness(0.98) contrast(1.05)'
    }
  }

  // Get consistent light-dark grey colors for all months
  const getSeasonalColors = () => {
    return {
      button: 'bg-slate-500/90 hover:bg-slate-400 text-white',
      text: 'text-slate-700',
      highlight: 'bg-slate-500 text-white',
      accent: 'bg-slate-500',
    }
  }

  const seasonalColors = getSeasonalColors()

  const handleOpenNotesModal = (startDate: number, endDate: number | null) => {
    setNotesStartDate(startDate)
    setNotesEndDate(endDate)
    setIsNotesModalOpen(true)
  }

  const handleCloseNotesModal = () => {
    setIsNotesModalOpen(false)
  }

  const handleSaveNotes = (notes: string) => {
    // Notes are automatically saved in localStorage
  }

  // Handle video loop with fade effect
  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    let animationFrameId: number
    let isLooping = false
    const fadeDuration = 500 // ms

    const updateVideoOpacity = () => {
      if (!video.paused && !isLooping) {
        const timeRemaining = video.duration - video.currentTime
        const opacity = Math.min(1, Math.max(0, timeRemaining * 1000 / fadeDuration))
        video.style.opacity = String(opacity)

        if (timeRemaining < fadeDuration / 1000) {
          if (timeRemaining < 0.1) {
            isLooping = true
            video.style.opacity = '0'
            setTimeout(() => {
              video.currentTime = 0
              video.play()
              video.style.opacity = '1'
              isLooping = false
            }, 100)
            return
          }
        }
      }
      animationFrameId = requestAnimationFrame(updateVideoOpacity)
    }

    video.onended = () => {
      isLooping = true
      video.style.opacity = '0'
      setTimeout(() => {
        video.currentTime = 0
        video.play()
        video.style.opacity = '1'
        isLooping = false
      }, 100)
    }

    video.onplay = () => {
      animationFrameId = requestAnimationFrame(updateVideoOpacity)
    }

    if (!video.paused) {
      animationFrameId = requestAnimationFrame(updateVideoOpacity)
    }

    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId)
      }
    }
  }, [])

  const handleNextMonth = () => {
    if (isFlipping) return
    setFlipDirection('next')
    setIsFlipping(true)
    setTimeout(() => {
      setCurrentMonth((prev) => (prev === 11 ? 0 : prev + 1))
      setIsFlipping(false)
    }, 600)
  }

  const handlePrevMonth = () => {
    if (isFlipping) return
    setFlipDirection('prev')
    setIsFlipping(true)
    setTimeout(() => {
      setCurrentMonth((prev) => (prev === 0 ? 11 : prev - 1))
      setIsFlipping(false)
    }, 600)
  }

  return (
    <div className="relative w-full min-h-screen overflow-hidden">
      {/* Full-screen video background */}
      <video
        ref={videoRef}
        src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260328_083109_283f3553-e28f-428b-a723-d639c617eb2b.mp4"
        autoPlay
        muted
        loop={false}
        playsInline
        className="absolute inset-0 w-full h-full object-cover opacity-100"
        style={{
          filter: getSeasonalFilter(currentMonth),
          transition: 'filter 0.8s ease-in-out'
        }}
      />

      {/* Dark overlay - adjusts based on theme */}
      <div className={`absolute inset-0 ${theme === 'dark' ? 'bg-black/80' : 'bg-black/30'}`} />

      {/* Snow effect for winter months */}
      <SnowEffect isActive={currentMonth === 0 || currentMonth === 11} />

      {/* Sun effect for summer months */}
      <SunEffect isActive={currentMonth === 3 || currentMonth === 4 || currentMonth === 5} theme={theme} />

      {/* Autumn leaves for autumn months */}
      <AutumnEffect isActive={currentMonth === 8 || currentMonth === 9 || currentMonth === 10} />

      {/* Rain effect for monsoon months */}
      <RainEffect isActive={currentMonth === 6 || currentMonth === 7 || currentMonth === 8} />

      {/* Content container with glass blur effect */}
      <div className="relative z-10 w-full min-h-screen flex flex-col items-center justify-center p-lg gap-xl">
        
        {/* Theme toggle button */}
        <button
          onClick={toggleTheme}
          className={`absolute top-lg right-lg px-lg py-md rounded-full font-semibold text-sm transition-all shadow-lg ${theme === 'dark' ? 'bg-white/80 hover:bg-white text-slate-900' : 'bg-slate-500/80 hover:bg-slate-400 text-white'}`}
          title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
        >
          {theme === 'dark' ? '☀️ Light' : '🌙 Dark'}
        </button>

        {/* Month Navigation */}
        <div className={`flex items-center justify-between gap-xl backdrop-blur-lg ${theme === 'dark' ? 'bg-slate-900/15' : 'bg-garden-cream/15'} px-xl py-lg rounded-full shadow-xl w-full max-w-2xl`}>
          <button
            onClick={handlePrevMonth}
            disabled={isFlipping}
            className={`px-xl py-md rounded-full hover:opacity-90 disabled:opacity-50 transition-all font-sans text-lg font-semibold ${theme === 'dark' ? 'bg-white/80 hover:bg-white text-slate-900' : `${seasonalColors.button}`}`}
          >
            ←
          </button>
          <h2 className={`text-4xl font-serif flex-1 text-center drop-shadow-lg ${theme === 'dark' ? 'text-white' : 'text-white'}`}>{MONTHS[currentMonth]}</h2>
          <button
            onClick={handleNextMonth}
            disabled={isFlipping}
            className={`px-xl py-md rounded-full hover:opacity-90 disabled:opacity-50 transition-all font-sans text-lg font-semibold ${theme === 'dark' ? 'bg-white/80 hover:bg-white text-slate-900' : `${seasonalColors.button}`}`}
          >
            →
          </button>
        </div>

        {/* Calendar with glass blur effect */}
        <div
          className={`rounded-2xl shadow-2xl overflow-hidden ${isFlipping ? `flip-${flipDirection}` : ''} border-0`}
          style={{
            transformStyle: 'preserve-3d' as any,
            transform: isFlipping
              ? flipDirection === 'next'
                ? 'rotateY(-90deg) translateZ(50px)'
                : 'rotateY(90deg) translateZ(50px)'
              : 'rotateY(0deg)',
            transformOrigin: 'center',
            transition: isFlipping ? 'transform 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55)' : 'none',
            width: '900px',
            maxWidth: '95vw',
            background: 'rgba(255, 255, 255, 0.05)',
            backdropFilter: 'blur(4px)',
            border: '1px solid rgba(255, 255, 255, 0.3)',
            boxShadow: `
              inset -1px -1px 3px rgba(255, 255, 255, 0.4),
              inset 1px 1px 3px rgba(0, 0, 0, 0.2),
              0 8px 32px 0 rgba(31, 38, 135, 0.37),
              0 0 20px rgba(255, 255, 255, 0.2)
            `
          }}
        >
          <CalendarGrid 
            onOpenNotesModal={handleOpenNotesModal}
            monthIndex={currentMonth}
            seasonalColors={seasonalColors}
            theme={theme}
          />
        </div>
      </div>

      {/* Notes modal */}
      <NotesModal
        isOpen={isNotesModalOpen}
        onClose={handleCloseNotesModal}
        startDate={notesStartDate}
        endDate={notesEndDate}
        onSave={handleSaveNotes}
        monthIndex={currentMonth}
        theme={theme}
      />
    </div>
  )
}
