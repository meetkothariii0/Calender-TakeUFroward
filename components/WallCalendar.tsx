'use client'

import React, { useState } from 'react'
import SpiralBinding from './SpiralBinding'
import HeroBackground from './HeroBackground'
import CalendarGrid from './CalendarGrid'
import NotesModal from './NotesModal'

const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
]

export default function WallCalendar() {
  const [currentMonthIndex, setCurrentMonthIndex] = useState(3) // April
  const [isFlipping, setIsFlipping] = useState(false)
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
    // This handler is just for any additional logic
  }

  const handlePrevMonth = () => {
    setIsFlipping(true)
    setTimeout(() => {
      setCurrentMonthIndex((prev) => (prev === 0 ? 11 : prev - 1))
      setIsFlipping(false)
    }, 400)
  }

  const handleNextMonth = () => {
    setIsFlipping(true)
    setTimeout(() => {
      setCurrentMonthIndex((prev) => (prev === 11 ? 0 : prev + 1))
      setIsFlipping(false)
    }, 400)
  }

  return (
    <div className="w-full max-w-2xl bg-garden-cream rounded-card shadow-subtle overflow-hidden flex flex-col">
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

      {/* Calendar grid */}
      <div className={isFlipping ? 'animate-flip-page' : ''}>
        <CalendarGrid 
          onOpenNotesModal={handleOpenNotesModal}
          monthIndex={currentMonthIndex}
        />
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
