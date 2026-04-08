'use client'

import React, { useState, useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { Plus } from 'lucide-react'
import CalendarGrid from './CalendarGrid'
import NotesModal from './NotesModal'
import EventsList from './EventsList'
import DailyHabitLogger from './DailyHabitLogger'

const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
]

export default function Calendar() {
  const [currentMonth, setCurrentMonth] = useState(3) // April
  const [isAnimating, setIsAnimating] = useState(false)
  const [isNotesModalOpen, setIsNotesModalOpen] = useState(false)
  const [notesStartDate, setNotesStartDate] = useState<number | null>(null)
  const [notesEndDate, setNotesEndDate] = useState<number | null>(null)
  const [theme, setTheme] = useState<'dark' | 'light'>('dark')
  const [eventsRefresh, setEventsRefresh] = useState(0)
  const [mounted, setMounted] = useState(false)
  const [selectedStartDate, setSelectedStartDate] = useState<number | null>(null)
  const [selectedEndDate, setSelectedEndDate] = useState<number | null>(null)
  
  const calendarContainerRef = useRef<HTMLDivElement>(null)
  const eventsRef = useRef<HTMLDivElement>(null)
  const habitsRef = useRef<HTMLDivElement>(null)

  // Initialize theme and month from localStorage
  useEffect(() => {
    const savedTheme = localStorage.getItem('calendar-theme') as 'dark' | 'light' | null
    if (savedTheme) {
      setTheme(savedTheme)
    }
    
    const savedMonth = localStorage.getItem('calendar-month')
    if (savedMonth) {
      setCurrentMonth(parseInt(savedMonth, 10))
    }
    
    setMounted(true)
  }, [])

  // Save month to localStorage whenever it changes
  useEffect(() => {
    if (mounted) {
      localStorage.setItem('calendar-month', currentMonth.toString())
      // Reset selection when month changes
      setSelectedStartDate(null)
      setSelectedEndDate(null)
    }
  }, [currentMonth, mounted])

  // Animate containers when month changes
  useEffect(() => {
    if (isAnimating && calendarContainerRef.current) {
      // Animate out
      gsap.to([calendarContainerRef.current, eventsRef.current, habitsRef.current], {
        opacity: 0,
        y: -10,
        duration: 0.25,
        ease: 'power2.in'
      })
    } else if (!isAnimating && calendarContainerRef.current) {
      // Animate in with fade-in effect
      gsap.fromTo([calendarContainerRef.current, eventsRef.current, habitsRef.current], 
        {
          opacity: 0,
          y: 10,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.4,
          ease: 'power2.out'
        }
      )
    }
  }, [isAnimating])

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

  const handleSelectionChange = (startDate: number | null, endDate: number | null) => {
    setSelectedStartDate(startDate)
    setSelectedEndDate(endDate)
  }

  const handleCloseNotesModal = () => {
    setIsNotesModalOpen(false)
    // Refresh events when modal closes - notes were saved
    setEventsRefresh(prev => prev + 1)
  }

  const handleSaveNotes = (notes: string) => {
    // Immediately refresh events list
    setEventsRefresh(prev => prev + 1)
  }

  const handleNextMonth = () => {
    if (isAnimating) return
    setIsAnimating(true)
    setTimeout(() => {
      setCurrentMonth((prev) => (prev === 11 ? 0 : prev + 1))
      setIsAnimating(false)
    }, 500)
  }

  const handlePrevMonth = () => {
    if (isAnimating) return
    setIsAnimating(true)
    setTimeout(() => {
      setCurrentMonth((prev) => (prev === 0 ? 11 : prev - 1))
      setIsAnimating(false)
    }, 500)
  }

  return (
    <div 
      className="relative w-full h-screen overflow-hidden"
      style={{
        background: theme === 'dark' 
          ? 'linear-gradient(135deg, #0d0b1e 0%, #1a103a 40%, #0b1a2e 70%, #0e1f1a 100%)'
          : '#ffffff',
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
        className="relative z-20 w-full h-full flex flex-col px-2 md:px-3"
        style={{
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {/* Theme Toggle - Top Right */}
        <div className="flex justify-end mb-2">
          {/* Theme Toggle Button */}
          <button
            onClick={toggleTheme}
            style={{
              borderRadius: '20px',
              padding: '6px 14px',
              background: theme === 'dark' ? 'rgba(255, 255, 255, 0.12)' : 'rgba(0, 0, 0, 0.08)',
              border: theme === 'dark' ? '0.5px solid rgba(255, 255, 255, 0.2)' : '0.5px solid rgba(0, 0, 0, 0.15)',
              backdropFilter: 'blur(8px)',
              WebkitBackdropFilter: 'blur(8px)',
              fontSize: '13px',
              color: theme === 'dark' ? 'rgba(255, 255, 255, 0.9)' : 'rgba(0, 0, 0, 0.8)',
              cursor: 'pointer',
              transition: 'all 0.2s',
              fontWeight: '500',
            }}
            onMouseEnter={(e) => {
              (e.target as HTMLButtonElement).style.background = theme === 'dark' ? 'rgba(255, 255, 255, 0.18)' : 'rgba(0, 0, 0, 0.12)'
            }}
            onMouseLeave={(e) => {
              (e.target as HTMLButtonElement).style.background = theme === 'dark' ? 'rgba(255, 255, 255, 0.12)' : 'rgba(0, 0, 0, 0.08)'
            }}
            title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
          >
            {theme === 'dark' ? '☀️ Light' : '🌙 Dark'}
          </button>
        </div>

        {/* Main Content Grid - Calendar + Sidebar */}
        <div 
          className="flex gap-2 w-full flex-1 max-w-full"
          style={{
            display: 'grid',
            gridTemplateColumns: 'minmax(0, 1fr) minmax(250px, 300px)',
            gridTemplateRows: 'auto',
            alignItems: 'stretch',
            height: '100%',
            overflow: 'hidden',
            gap: '4px',
          }}
        >
          {/* Left Column - Calendar */}
          <div
            className="overflow-y-auto relative"
            style={{
              position: 'relative',
              zIndex: 2,
              background: theme === 'dark' ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.02)',
              border: theme === 'dark' ? '0.5px solid rgba(255, 255, 255, 0.12)' : '0.5px solid rgba(0, 0, 0, 0.08)',
              borderRadius: '16px',
              backdropFilter: 'blur(14px)',
              WebkitBackdropFilter: 'blur(14px)',
              padding: '60px 12px 8px 12px',
              display: 'flex',
              flexDirection: 'column',
              height: '100%',
              overflowY: 'auto',
            }}
          >
            {/* Add Notes Section - Top Left */}
            {selectedStartDate && (
              <div 
                style={{
                  position: 'absolute',
                  top: '16px',
                  left: '12px',
                  zIndex: 10,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  flexWrap: 'wrap',
                }}
              >
                <span 
                  style={{
                    fontSize: '15px',
                    fontWeight: '500',
                    color: theme === 'dark' ? 'rgba(255, 255, 255, 0.8)' : 'rgba(0, 0, 0, 0.7)',
                  }}
                >
                  {selectedEndDate 
                    ? `${MONTHS[currentMonth]} ${selectedStartDate}–${selectedEndDate}` 
                    : `${MONTHS[currentMonth]} ${selectedStartDate}`
                  }
                </span>
                <button
                  onClick={() => handleOpenNotesModal(selectedStartDate, selectedEndDate)}
                  style={{
                    padding: '8px 14px',
                    borderRadius: '6px',
                    background: theme === 'dark' ? 'rgba(255, 255, 255, 0.2)' : 'rgba(0, 0, 0, 0.08)',
                    border: theme === 'dark' ? '0.5px solid rgba(255, 255, 255, 0.3)' : '0.5px solid rgba(0, 0, 0, 0.15)',
                    cursor: 'pointer',
                    color: theme === 'dark' ? 'rgba(255, 255, 255, 0.9)' : 'rgba(0, 0, 0, 0.75)',
                    fontWeight: '600',
                    fontSize: '13px',
                    transition: 'all 0.2s',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                  }}
                  onMouseEnter={(e) => {
                    (e.target as HTMLButtonElement).style.background = theme === 'dark' ? 'rgba(255, 255, 255, 0.3)' : 'rgba(0, 0, 0, 0.12)'
                  }}
                  onMouseLeave={(e) => {
                    (e.target as HTMLButtonElement).style.background = theme === 'dark' ? 'rgba(255, 255, 255, 0.2)' : 'rgba(0, 0, 0, 0.08)'
                  }}
                  title="Add notes"
                >
                  <Plus size={14} />
                  Add notes
                </button>
              </div>
            )}

            {/* Month Navigation - Top Center of Calendar */}
            <div 
              className="flex items-center justify-center gap-3 mb-4"
              style={{
                position: 'absolute',
                top: '16px',
                left: '50%',
                transform: 'translateX(-50%)',
                zIndex: 10,
              }}
            >
              {/* Previous Month Button */}
              <button
                onClick={handlePrevMonth}
                disabled={isAnimating}
                className="flex-shrink-0"
                style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '50%',
                  background: theme === 'dark' ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.08)',
                  border: theme === 'dark' ? '0.5px solid rgba(255, 255, 255, 0.18)' : '0.5px solid rgba(0, 0, 0, 0.15)',
                  backdropFilter: 'blur(6px)',
                  WebkitBackdropFilter: 'blur(6px)',
                  cursor: isAnimating ? 'not-allowed' : 'pointer',
                  opacity: isAnimating ? 0.5 : 1,
                  transition: 'background 0.2s',
                  color: theme === 'dark' ? 'rgba(255, 255, 255, 0.9)' : 'rgba(0, 0, 0, 0.7)',
                  fontSize: '18px',
                  fontWeight: 'bold',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
                onMouseEnter={(e) => {
                  if (!isAnimating) (e.target as HTMLButtonElement).style.background = theme === 'dark' ? 'rgba(255, 255, 255, 0.16)' : 'rgba(0, 0, 0, 0.15)'
                }}
                onMouseLeave={(e) => {
                  (e.target as HTMLButtonElement).style.background = theme === 'dark' ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.08)'
                }}
                title="Previous month"
              >
                ←
              </button>

              {/* Month Label */}
              <h2 
                style={{
                  fontSize: '15px',
                  fontWeight: '600',
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  color: theme === 'dark' ? 'rgba(255, 255, 255, 0.95)' : 'rgba(0, 0, 0, 0.9)',
                  minWidth: '140px',
                  textAlign: 'center',
                }}
              >
                {MONTHS[currentMonth]}
              </h2>

              {/* Next Month Button */}
              <button
                onClick={handleNextMonth}
                disabled={isAnimating}
                className="flex-shrink-0"
                style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '50%',
                  background: theme === 'dark' ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.08)',
                  border: theme === 'dark' ? '0.5px solid rgba(255, 255, 255, 0.18)' : '0.5px solid rgba(0, 0, 0, 0.15)',
                  backdropFilter: 'blur(6px)',
                  WebkitBackdropFilter: 'blur(6px)',
                  cursor: isAnimating ? 'not-allowed' : 'pointer',
                  opacity: isAnimating ? 0.5 : 1,
                  transition: 'background 0.2s',
                  color: theme === 'dark' ? 'rgba(255, 255, 255, 0.9)' : 'rgba(0, 0, 0, 0.7)',
                  fontSize: '18px',
                  fontWeight: 'bold',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
                onMouseEnter={(e) => {
                  if (!isAnimating) (e.target as HTMLButtonElement).style.background = theme === 'dark' ? 'rgba(255, 255, 255, 0.16)' : 'rgba(0, 0, 0, 0.15)'
                }}
                onMouseLeave={(e) => {
                  (e.target as HTMLButtonElement).style.background = theme === 'dark' ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.08)'
                }}
                title="Next month"
              >
                →
              </button>
            </div>

            {/* Calendar Grid */}
            <div ref={calendarContainerRef} style={{ marginTop: '0' }}>
              <CalendarGrid 
                onOpenNotesModal={handleOpenNotesModal}
                monthIndex={currentMonth}
                theme={theme}
                onSelectionChange={handleSelectionChange}
              />
            </div>
          </div>

          {/* Right Column - Sidebar (Events + Stats) */}
          <div 
            className="flex flex-col gap-3"
            style={{
              position: 'relative',
              zIndex: 2,
              height: '100%',
              overflow: 'hidden',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            {/* Events Panel */}
            <div
              ref={eventsRef}
              style={{
                background: theme === 'dark' ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.02)',
                border: theme === 'dark' ? '0.5px solid rgba(255, 255, 255, 0.12)' : '0.5px solid rgba(0, 0, 0, 0.08)',
                borderRadius: '16px',
                backdropFilter: 'blur(14px)',
                WebkitBackdropFilter: 'blur(14px)',
                padding: '12px',
                maxHeight: '280px',
                overflowY: 'auto',
              }}
            >
              <h3 
                style={{
                  fontSize: '15px',
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  color: theme === 'dark' ? 'rgba(255, 255, 255, 0.6)' : '#000000',
                  marginBottom: '8px',
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

            {/* Daily Habit Logger Panel */}
            <div ref={habitsRef}>
              <DailyHabitLogger theme={theme} />
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
