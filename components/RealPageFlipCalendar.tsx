'use client'

import React, { useState, useEffect, useRef } from 'react'
import CalendarGrid from './CalendarGrid'
import NotesModal from './NotesModal'
import HeroBackground from './HeroBackground'

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
      {/* Hero Background with video and navigation */}
      <HeroBackground />

      {/* Calendar Overlay */}
      <div className="absolute inset-0 z-20 w-full min-h-screen flex flex-col items-center justify-center p-sm sm:p-md md:p-lg gap-md sm:gap-lg md:gap-xl">
        
        {/* Theme toggle button */}
        <button
          onClick={toggleTheme}
          className={`absolute top-sm right-sm sm:top-lg sm:right-lg px-md sm:px-lg py-xs sm:py-md rounded-full font-semibold text-xs sm:text-sm transition-all shadow-lg ${theme === 'dark' ? 'bg-white/80 hover:bg-white text-slate-900' : 'bg-slate-500/80 hover:bg-slate-400 text-white'}`}
          title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
        >
          {theme === 'dark' ? '☀️ Light' : '🌙 Dark'}
        </button>

        {/* Month Navigation */}
        <div className={`flex items-center justify-between gap-4 backdrop-blur-lg ${theme === 'dark' ? 'bg-slate-900/15' : 'bg-garden-cream/15'} px-6 py-3 rounded-full shadow-xl w-96`}>
          <button
            onClick={handlePrevMonth}
            disabled={isFlipping}
            className={`px-4 py-2 rounded-full hover:opacity-90 disabled:opacity-50 transition-all font-sans text-lg font-semibold ${theme === 'dark' ? 'bg-white/80 hover:bg-white text-slate-900' : `${seasonalColors.button}`}`}
          >
            ←
          </button>
          <h2 className={`text-3xl font-serif flex-1 text-center drop-shadow-lg min-w-max ${theme === 'dark' ? 'text-white' : 'text-white'}`}>{MONTHS[currentMonth]}</h2>
          <button
            onClick={handleNextMonth}
            disabled={isFlipping}
            className={`px-4 py-2 rounded-full hover:opacity-90 disabled:opacity-50 transition-all font-sans text-lg font-semibold ${theme === 'dark' ? 'bg-white/80 hover:bg-white text-slate-900' : `${seasonalColors.button}`}`}
          >
            →
          </button>
        </div>

        {/* Calendar with glass blur effect */}
        <div
          className={`rounded-2xl shadow-2xl overflow-hidden ${isFlipping ? `flip-${flipDirection}` : ''} border-0 w-96`}
          style={{
            transformStyle: 'preserve-3d' as any,
            transform: isFlipping
              ? flipDirection === 'next'
                ? 'rotateY(-90deg) translateZ(50px)'
                : 'rotateY(90deg) translateZ(50px)'
              : 'rotateY(0deg)',
            transformOrigin: 'center',
            transition: isFlipping ? 'transform 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55)' : 'none',
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
