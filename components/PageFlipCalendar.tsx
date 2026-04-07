'use client'

import React, { useState, useEffect } from 'react'
import SpiralBinding from './SpiralBinding'
import HeroBackground from './HeroBackground'
import CalendarGrid from './CalendarGrid'
import NotesModal from './NotesModal'

const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
]

export default function PageFlipCalendar() {
  const [currentMonthIndex, setCurrentMonthIndex] = useState(3) // April
  const [isFlipping, setIsFlipping] = useState(false)
  const [flipDirection, setFlipDirection] = useState<'next' | 'prev'>('next')
  const [isNotesModalOpen, setIsNotesModalOpen] = useState(false)
  const [notesStartDate, setNotesStartDate] = useState<number | null>(null)
  const [notesEndDate, setNotesEndDate] = useState<number | null>(null)

  const handleOpenNotesModal = (startDate: number, endDate: number | null) => {
    setNotesStartDate(startDate)
    setNotesEndDate(endDate)
    setIsNotesModalOpen(true)
  }

  const handleCloseNotesModal = () => {
    setIsNotesModalOpen(false)
  }

  const handleSaveNotes = (notes: string) => {
    // Notes are automatically saved in localStorage via NotesModal
  }

  const handlePrevMonth = () => {
    setFlipDirection('prev')
    setIsFlipping(true)
    setTimeout(() => {
      setCurrentMonthIndex((prev) => (prev === 0 ? 11 : prev - 1))
      setIsFlipping(false)
    }, 600)
  }

  const handleNextMonth = () => {
    setFlipDirection('next')
    setIsFlipping(true)
    setTimeout(() => {
      setCurrentMonthIndex((prev) => (prev === 11 ? 0 : prev + 1))
      setIsFlipping(false)
    }, 600)
  }

  return (
    <div className="w-full max-w-2xl mx-auto">
      {/* Top binding */}
      <SpiralBinding />

      {/* Month Navigation */}
      <div className="flex items-center justify-between px-xl py-lg bg-garden-cream border-b border-garden-mint">
        <button
          onClick={handlePrevMonth}
          disabled={isFlipping}
          className="px-lg py-xs bg-garden-green-bright text-garden-cream rounded hover:opacity-80 disabled:opacity-50 transition-opacity font-sans text-sm"
        >
          ← Prev
        </button>
        <h2 className="text-2xl font-serif text-garden-text">{MONTHS[currentMonthIndex]}</h2>
        <button
          onClick={handleNextMonth}
          disabled={isFlipping}
          className="px-lg py-xs bg-garden-green-bright text-garden-cream rounded hover:opacity-80 disabled:opacity-50 transition-opacity font-sans text-sm"
        >
          Next →
        </button>
      </div>

      {/* Hero section */}
      <HeroBackground />

      {/* Page Flip Container */}
      <div 
        className="page-flip-container"
        style={{ 
          perspective: '1200px',
          overflow: 'hidden'
        }}
      >
        <div
          style={{
            transformStyle: 'preserve-3d' as any,
            transform: isFlipping 
              ? flipDirection === 'next' 
                ? 'rotateY(-90deg) translateZ(50px)'
                : 'rotateY(90deg) translateZ(50px)'
              : 'rotateY(0deg)',
            transformOrigin: 'center',
            transition: isFlipping ? 'transform 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55)' : 'none',
            boxShadow: isFlipping 
              ? flipDirection === 'next'
                ? '-20px 10px 40px rgba(0, 0, 0, 0.4)'
                : '20px 10px 40px rgba(0, 0, 0, 0.4)'
              : 'none',
          }}
        >
          {/* Calendar grid */}
          <div style={{ backfaceVisibility: 'hidden' } as any}>
            <CalendarGrid 
              onOpenNotesModal={handleOpenNotesModal}
              monthIndex={currentMonthIndex}
            />
          </div>
        </div>
      </div>

      {/* Notes modal */}
      <NotesModal
        isOpen={isNotesModalOpen}
        onClose={handleCloseNotesModal}
        startDate={notesStartDate}
        endDate={notesEndDate}
        onSave={handleSaveNotes}
        monthIndex={currentMonthIndex}
      />
    </div>
  )
}
