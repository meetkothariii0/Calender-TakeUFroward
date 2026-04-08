'use client'

import React, { useState, useEffect } from 'react'
import CalendarGrid from './CalendarGrid'
import NotesModal from './NotesModal'
import EventsList from './EventsList'
import MiniStats from './MiniStats'

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
  const [eventsRefresh, setEventsRefresh] = useState(0)

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

  const handleOpenNotesModal = (startDate: number, endDate: number | null) => {
    setNotesStartDate(startDate)
    setNotesEndDate(endDate)
    setIsNotesModalOpen(true)
  }

  const handleCloseNotesModal = () => {
    setIsNotesModalOpen(false)
  }

  const handleSaveNotes = (notes: string) => {
    setEventsRefresh(prev => prev + 1)
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
    <div 
      className="relative w-full min-h-screen overflow-hidden"
      style={{
        background: 'linear-gradient(135deg, #0d0b1e 0%, #1a103a 40%, #0b1a2e 70%, #0e1f1a 100%)',
      }}
    >
      {/* Decorative Orbs */}
      {/* Orb 1: Purple, top-left */}
      <div
        className="absolute pointer-events-none"
        style={{
          width: '260px',
          height: '260px',
          background: '#5b21b6',
          borderRadius: '50%',
          filter: 'blur(60px)',
          opacity: 0.35,
          top: '-80px',
          left: '-80px',
          zIndex: 1,
        }}
      />
      {/* Orb 2: Teal, bottom-right */}
      <div
        className="absolute pointer-events-none"
        style={{
          width: '200px',
          height: '200px',
          background: '#0e7490',
          borderRadius: '50%',
          filter: 'blur(60px)',
          opacity: 0.35,
          bottom: '-60px',
          right: '-60px',
          zIndex: 1,
        }}
      />
      {/* Orb 3: Violet, center */}
      <div
        className="absolute pointer-events-none"
        style={{
          width: '140px',
          height: '140px',
          background: '#7c3aed',
          borderRadius: '50%',
          filter: 'blur(60px)',
          opacity: 0.35,
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          zIndex: 1,
        }}
      />

      {/* Main Content - Grid Layout */}
      <div 
        className="relative z-20 w-full h-screen flex flex-col"
        style={{
          display: 'grid',
          gridTemplateRows: 'auto 1fr',
          gridTemplateColumns: '1fr',
          gap: '24px',
          padding: '48px',
        }}
      >
        {/* Top Bar - Month Navigation & Theme Toggle */}
        <div 
          className="flex items-center justify-between"
          style={{
            gridColumn: '1 / -1',
          }}
        >
          {/* Month Navigation - Left side */}
          <div className="flex items-center gap-4">
            {/* Previous Month Button */}
            <button
              onClick={handlePrevMonth}
              disabled={isFlipping}
              className="flex-shrink-0"
              style={{
                width: '34px',
                height: '34px',
                borderRadius: '50%',
                background: 'rgba(255, 255, 255, 0.08)',
                border: '0.5px solid rgba(255, 255, 255, 0.18)',
                backdropFilter: 'blur(6px)',
                WebkitBackdropFilter: 'blur(6px)',
                cursor: isFlipping ? 'not-allowed' : 'pointer',
                opacity: isFlipping ? 0.5 : 1,
                transition: 'background 0.2s',
                color: 'rgba(255, 255, 255, 0.9)',
                fontSize: '18px',
                fontWeight: 'bold',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
              onMouseEnter={(e) => {
                if (!isFlipping) (e.target as HTMLButtonElement).style.background = 'rgba(255, 255, 255, 0.16)'
              }}
              onMouseLeave={(e) => {
                (e.target as HTMLButtonElement).style.background = 'rgba(255, 255, 255, 0.08)'
              }}
              title="Previous month"
            >
              ←
            </button>

            {/* Month Label */}
            <h2 
              style={{
                fontSize: '28px',
                fontWeight: '600',
                color: 'rgba(255, 255, 255, 0.95)',
                minWidth: '140px',
                textAlign: 'center',
              }}
            >
              {MONTHS[currentMonth]}
            </h2>

            {/* Next Month Button */}
            <button
              onClick={handleNextMonth}
              disabled={isFlipping}
              className="flex-shrink-0"
              style={{
                width: '34px',
                height: '34px',
                borderRadius: '50%',
                background: 'rgba(255, 255, 255, 0.08)',
                border: '0.5px solid rgba(255, 255, 255, 0.18)',
                backdropFilter: 'blur(6px)',
                WebkitBackdropFilter: 'blur(6px)',
                cursor: isFlipping ? 'not-allowed' : 'pointer',
                opacity: isFlipping ? 0.5 : 1,
                transition: 'background 0.2s',
                color: 'rgba(255, 255, 255, 0.9)',
                fontSize: '18px',
                fontWeight: 'bold',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
              onMouseEnter={(e) => {
                if (!isFlipping) (e.target as HTMLButtonElement).style.background = 'rgba(255, 255, 255, 0.16)'
              }}
              onMouseLeave={(e) => {
                (e.target as HTMLButtonElement).style.background = 'rgba(255, 255, 255, 0.08)'
              }}
              title="Next month"
            >
              →
            </button>
          </div>

          {/* Theme Toggle - Right side */}
          <button
            onClick={toggleTheme}
            style={{
              borderRadius: '20px',
              padding: '6px 14px',
              background: 'rgba(255, 255, 255, 0.12)',
              border: '0.5px solid rgba(255, 255, 255, 0.2)',
              backdropFilter: 'blur(8px)',
              WebkitBackdropFilter: 'blur(8px)',
              fontSize: '13px',
              color: 'rgba(255, 255, 255, 0.9)',
              cursor: 'pointer',
              transition: 'all 0.2s',
              fontWeight: '500',
            }}
            onMouseEnter={(e) => {
              (e.target as HTMLButtonElement).style.background = 'rgba(255, 255, 255, 0.18)'
            }}
            onMouseLeave={(e) => {
              (e.target as HTMLButtonElement).style.background = 'rgba(255, 255, 255, 0.12)'
            }}
            title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
          >
            {theme === 'dark' ? '☀️ Light' : '🌙 Dark'}
          </button>
        </div>

        {/* Main Content Grid - Calendar + Sidebar */}
        <div 
          className="flex gap-6 w-full h-full overflow-hidden"
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 280px',
            alignItems: 'start',
          }}
        >
          {/* Left Column - Calendar */}
          <div
            className="overflow-hidden"
            style={{
              position: 'relative',
              zIndex: 2,
              background: 'rgba(255, 255, 255, 0.05)',
              border: '0.5px solid rgba(255, 255, 255, 0.12)',
              borderRadius: '16px',
              backdropFilter: 'blur(14px)',
              WebkitBackdropFilter: 'blur(14px)',
              padding: '48px',
              transform: isFlipping
                ? flipDirection === 'next'
                  ? 'rotateY(-90deg) translateZ(50px)'
                  : 'rotateY(90deg) translateZ(50px)'
                : 'rotateY(0deg)',
              transformOrigin: 'center',
              transition: isFlipping ? 'transform 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55)' : 'none',
              transformStyle: 'preserve-3d' as any,
            }}
          >
            <CalendarGrid 
              onOpenNotesModal={handleOpenNotesModal}
              monthIndex={currentMonth}
              theme={theme}
            />
          </div>

          {/* Right Column - Sidebar (Events + Stats) */}
          <div 
            className="flex flex-col gap-4 h-full overflow-y-auto"
            style={{
              position: 'relative',
              zIndex: 2,
            }}
          >
            {/* Events Panel */}
            <div
              style={{
                background: 'rgba(255, 255, 255, 0.05)',
                border: '0.5px solid rgba(255, 255, 255, 0.12)',
                borderRadius: '16px',
                backdropFilter: 'blur(14px)',
                WebkitBackdropFilter: 'blur(14px)',
                padding: '16px',
                flex: '1',
                minHeight: '0',
                overflow: 'y-auto',
              }}
            >
              <h3 
                style={{
                  fontSize: '13px',
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  color: 'rgba(255, 255, 255, 0.6)',
                  marginBottom: '12px',
                  fontWeight: '600',
                }}
              >
                Events
              </h3>
              <EventsList 
                key={eventsRefresh}
                monthIndex={currentMonth}
                theme={theme}
                onDeleteEvent={() => setEventsRefresh(prev => prev + 1)}
              />
            </div>

            {/* Mini Stats Panel */}
            <div
              style={{
                background: 'rgba(255, 255, 255, 0.05)',
                border: '0.5px solid rgba(255, 255, 255, 0.12)',
                borderRadius: '16px',
                backdropFilter: 'blur(14px)',
                WebkitBackdropFilter: 'blur(14px)',
                padding: '16px',
                flex: '0 0 auto',
              }}
            >
              <MiniStats monthIndex={currentMonth} theme={theme} />
            </div>
          </div>
        </div>
      </div>

      {/* Notes Modal */}
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

