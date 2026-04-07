'use client'

import { useState, useEffect } from 'react'

const MONTH_NAMES = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

interface NotesModalProps {
  isOpen: boolean
  onClose: () => void
  startDate: number | null
  endDate: number | null
  onSave: (notes: string) => void
  monthIndex?: number
  theme?: 'dark' | 'light'
}

export default function NotesModal({
  isOpen,
  onClose,
  startDate,
  endDate,
  onSave,
  monthIndex = 3,
  theme = 'dark',
}: NotesModalProps) {
  const [notes, setNotes] = useState('')
  const [isSaved, setIsSaved] = useState(false)

  useEffect(() => {
    if (isOpen && startDate !== null) {
      // Load existing notes
      const key = endDate ? `notes-${monthIndex}-${startDate}-${endDate}` : `notes-${monthIndex}-${startDate}`
      const saved = localStorage.getItem(key)
      setNotes(saved || '')
      setIsSaved(false)
    }
  }, [isOpen, startDate, endDate, monthIndex])

  const handleSave = () => {
    if (startDate !== null) {
      const key = endDate ? `notes-${monthIndex}-${startDate}-${endDate}` : `notes-${monthIndex}-${startDate}`
      localStorage.setItem(key, notes)
      onSave(notes)
      setIsSaved(true)
      setTimeout(() => {
        onClose()
        setIsSaved(false)
      }, 500)
    }
  }

  if (!isOpen) return null

  const displayText = endDate ? `${MONTH_NAMES[monthIndex]} ${startDate}–${endDate}` : `${MONTH_NAMES[monthIndex]} ${startDate}`

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 backdrop-blur-md z-40 transition-opacity duration-quick ${theme === 'dark' ? 'bg-black/40' : 'bg-black/20'}`}
        onClick={onClose}
      />

      {/* Modal */}
      <div className="fixed inset-0 flex items-center justify-center z-50 p-lg pointer-events-none">
        <div
          className={`backdrop-blur-lg rounded-card shadow-subtle max-w-md w-full pointer-events-auto animate-fade-rise ${theme === 'dark' ? 'bg-slate-900/60 border border-white/40' : 'bg-garden-cream/25 border border-garden-cream/40'}`}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className={`border-b p-lg ${theme === 'dark' ? 'border-white/30' : 'border-garden-cream/30'}`}>
            <h3 className={`text-lg font-serif font-light drop-shadow ${theme === 'dark' ? 'text-white' : 'text-white'}`}>
              Add Notes
            </h3>
            <p className={`text-sm mt-xs drop-shadow ${theme === 'dark' ? 'text-white/80' : 'text-white/80'}`}>
              {displayText}
            </p>
          </div>

          {/* Body */}
          <div className="p-lg">
            <textarea
              autoFocus
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Add your thoughts, reminders, or plans..."
              className={`
                w-full h-40 p-md rounded-lg backdrop-blur-sm
                text-sm font-sans resize-none
                transition-all duration-quick
                focus:outline-none focus:ring-2 focus:ring-offset-2
                ${theme === 'dark' 
                  ? 'bg-white/20 border border-white/40 text-white placeholder:text-white/50 focus:ring-white focus:ring-offset-slate-900/20' 
                  : 'bg-slate-300/40 border border-slate-400/60 text-slate-900 placeholder:text-slate-600 focus:ring-slate-600 focus:ring-offset-garden-cream/20'
                }
              `}
            />
          </div>

          {/* Footer */}
          <div className={`border-t p-lg flex gap-md justify-end ${theme === 'dark' ? 'border-white/20' : 'border-slate-400/40'}`}>
            <button
              onClick={onClose}
              className={`
                px-lg py-md text-sm font-medium rounded-lg
                transition-all duration-quick
                ${theme === 'dark'
                  ? 'text-white/70 hover:text-white hover:bg-white/10'
                  : 'text-slate-700 hover:text-slate-900 hover:bg-slate-300/30'
                }
              `}
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              disabled={isSaved}
              className={`
                px-lg py-md text-sm font-medium font-semibold rounded-lg
                transition-all duration-quick drop-shadow-lg
                ${isSaved ? 'opacity-80' : 'hover:scale-105'}
                ${theme === 'dark'
                  ? 'text-white bg-slate-700 hover:bg-slate-600'
                  : 'text-white bg-slate-500 hover:bg-slate-400'
                }
              `}
            >
              {isSaved ? '✓ Saved' : 'Save Notes'}
            </button>
          </div>
        </div>
      </div>
    </>
  )
}
