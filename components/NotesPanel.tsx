'use client'

import { useState, useEffect, type ChangeEvent } from 'react'

export default function NotesPanel() {
  const [notes, setNotes] = useState('')

  useEffect(() => {
    // Load from localStorage
    const saved = localStorage.getItem('calendar-notes')
    if (saved) setNotes(saved)
  }, [])

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value
    setNotes(value)
    localStorage.setItem('calendar-notes', value)
  }

  return (
    <div className="w-full bg-garden-mint-light/30 border-t border-garden-mint p-xl flex flex-col gap-md">
      <div>
        <label className="text-xs font-semibold text-garden-text-muted uppercase tracking-wider">
          Notes
        </label>
        <p className="text-xs text-garden-text-muted mt-xs opacity-70">
          Add notes for this month
        </p>
      </div>

      <textarea
        value={notes}
        onChange={handleChange}
        placeholder="Type your notes here..."
        className="
          w-full h-32 p-lg rounded-button bg-garden-cream border border-garden-mint
          text-sm text-garden-text placeholder:text-garden-text-muted placeholder:opacity-50
          focus:outline-none focus:ring-2 focus:ring-garden-green-bright focus:ring-offset-2
          focus:ring-offset-garden-mint-light/30
          font-sans resize-none
          transition-all duration-quick
        "
      />

      <div className="text-xs text-garden-text-muted italic opacity-70">
        Auto-saves to your device
      </div>
    </div>
  )
}
