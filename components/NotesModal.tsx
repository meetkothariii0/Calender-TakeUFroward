'use client'

import { useState, useEffect } from 'react'

const MONTH_NAMES = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

const COLOR_OPTIONS = [
  { name: 'Red', value: 'red', light: '#ef4444', bright: '#dc2626' },
  { name: 'Orange', value: 'orange', light: '#f97316', bright: '#ea580c' },
  { name: 'Blue', value: 'blue', light: '#3b82f6', bright: '#1d4ed8' },
  { name: 'Green', value: 'green', light: '#22c55e', bright: '#15803d' },
  { name: 'Purple', value: 'purple', light: '#a855f7', bright: '#7e22ce' },
  { name: 'Pink', value: 'pink', light: '#ec4899', bright: '#be185d' },
  { name: 'Yellow', value: 'yellow', light: '#eab308', bright: '#ca8a04' },
  { name: 'Cyan', value: 'cyan', light: '#06b6d4', bright: '#0891b2' },
]

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
  const [selectedColor, setSelectedColor] = useState('cyan')
  const [isSaved, setIsSaved] = useState(false)
  const [existingNotes, setExistingNotes] = useState<Array<{text: string, color: string}>>([])

  useEffect(() => {
    if (isOpen && startDate !== null) {
      // Load existing notes for this date
      const key = endDate ? `notes-${monthIndex}-${startDate}-${endDate}` : `notes-${monthIndex}-${startDate}`
      const saved = localStorage.getItem(key)
      
      if (saved) {
        try {
          const parsed = JSON.parse(saved)
          if (Array.isArray(parsed)) {
            setExistingNotes(parsed)
          } else {
            // Legacy format - convert to array
            const color = localStorage.getItem(endDate ? `color-${monthIndex}-${startDate}-${endDate}` : `color-${monthIndex}-${startDate}`) || 'cyan'
            setExistingNotes([{ text: saved, color }])
          }
        } catch {
          // Legacy format
          const color = localStorage.getItem(endDate ? `color-${monthIndex}-${startDate}-${endDate}` : `color-${monthIndex}-${startDate}`) || 'cyan'
          setExistingNotes([{ text: saved, color }])
        }
      } else {
        setExistingNotes([])
      }
      
      setNotes('')
      setSelectedColor('cyan')
      setIsSaved(false)
    }
  }, [isOpen, startDate, endDate, monthIndex])

  const handleSave = () => {
    if (startDate !== null && notes.trim()) {
      const key = endDate ? `notes-${monthIndex}-${startDate}-${endDate}` : `notes-${monthIndex}-${startDate}`
      const newNote = { text: notes, color: selectedColor }
      const updatedNotes = [...existingNotes, newNote]
      
      localStorage.setItem(key, JSON.stringify(updatedNotes))
      setExistingNotes(updatedNotes)
      setNotes('')
      setSelectedColor('cyan')
      setIsSaved(true)
      
      setTimeout(() => {
        setIsSaved(false)
      }, 500)
    }
  }

  const handleDeleteNote = (index: number) => {
    if (startDate !== null) {
      const key = endDate ? `notes-${monthIndex}-${startDate}-${endDate}` : `notes-${monthIndex}-${startDate}`
      const updatedNotes = existingNotes.filter((_, i) => i !== index)
      
      if (updatedNotes.length === 0) {
        localStorage.removeItem(key)
      } else {
        localStorage.setItem(key, JSON.stringify(updatedNotes))
      }
      
      setExistingNotes(updatedNotes)
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
          <div className="p-lg space-y-lg max-h-96 overflow-y-auto">
            {/* Existing Notes */}
            {existingNotes.length > 0 && (
              <div>
                <h4 className={`text-xs font-semibold mb-2 ${theme === 'dark' ? 'text-white/70' : 'text-slate-700'}`}>
                  Saved Notes ({existingNotes.length})
                </h4>
                <div className="space-y-2">
                  {existingNotes.map((noteItem, index) => (
                    <div
                      key={index}
                      className={`p-3 rounded-lg flex justify-between items-start gap-2 ${theme === 'dark' ? 'bg-white/10' : 'bg-slate-300/30'}`}
                      style={{
                        borderLeft: `4px solid ${theme === 'dark' ? '#fca5a5' : '#fca5a5'}`
                      }}
                    >
                      <div className="flex-1 text-xs" style={{color: theme === 'dark' ? 'rgba(255,255,255,0.8)' : 'rgba(0,0,0,0.8)'}}>
                        {noteItem.text}
                      </div>
                      <button
                        onClick={() => handleDeleteNote(index)}
                        className={`text-xs px-2 py-1 rounded transition-all ${theme === 'dark' ? 'bg-red-500/30 hover:bg-red-500/50 text-red-300' : 'bg-red-500/20 hover:bg-red-500/40 text-red-600'}`}
                      >
                        Delete
                      </button>
                    </div>
                  ))}
                </div>
                <div className={`my-3 h-px ${theme === 'dark' ? 'bg-white/10' : 'bg-slate-400/30'}`} />
              </div>
            )}

            {/* Add New Note */}
            <div>
              <h4 className={`text-xs font-semibold mb-2 ${theme === 'dark' ? 'text-white/70' : 'text-slate-700'}`}>
                Add New Note
              </h4>
              <textarea
                autoFocus
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Add your thoughts, reminders, or plans..."
                className={`
                  w-full h-24 p-md rounded-lg backdrop-blur-sm
                  text-sm font-sans resize-none
                  transition-all duration-quick
                  focus:outline-none focus:ring-2 focus:ring-offset-2
                  ${theme === 'dark' 
                    ? 'bg-white/20 border border-white/40 text-white placeholder:text-white/50 focus:ring-white focus:ring-offset-slate-900/20' 
                    : 'bg-slate-300/40 border border-slate-400/60 text-slate-900 placeholder:text-slate-600 focus:ring-slate-600 focus:ring-offset-garden-cream/20'
                  }
                `}
              />

              {/* Color Picker */}
              <div className="mt-3">
                <label className={`text-xs font-semibold mb-2 block ${theme === 'dark' ? 'text-white' : 'text-slate-700'}`}>
                  Select Color 🎨
                </label>
                <div className="grid grid-cols-4 gap-2">
                  {COLOR_OPTIONS.map((color) => (
                    <button
                      key={color.value}
                      onClick={() => setSelectedColor(color.value)}
                      className={`w-full aspect-square rounded-lg transition-all duration-quick ${
                        selectedColor === color.value ? 'ring-2 ring-offset-1 scale-110' : 'hover:scale-105'
                      } ${theme === 'dark' ? 'ring-white ring-offset-slate-900/20' : 'ring-white/80 ring-offset-slate-400/20'}`}
                      title={color.name}
                    >
                      <div 
                        className="w-full h-full rounded-lg shadow-lg transition-all duration-quick"
                        style={{
                          background: `linear-gradient(135deg, ${color.light} 0%, ${color.bright} 100%)`
                        }}
                      />
                    </button>
                  ))}
                </div>
              </div>
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
              disabled={!notes.trim()}
              className={`
                px-lg py-md text-sm font-semibold rounded-lg
                transition-all duration-quick drop-shadow-lg
                ${!notes.trim() ? 'opacity-50 cursor-not-allowed' : 'hover:scale-105'}
                ${theme === 'dark'
                  ? 'text-white bg-slate-700 hover:bg-slate-600'
                  : 'text-white bg-slate-500 hover:bg-slate-400'
                }
              `}
            >
              {isSaved ? '✓ Added' : 'Add Note'}
            </button>
          </div>
        </div>
      </div>
    </>
  )
}
