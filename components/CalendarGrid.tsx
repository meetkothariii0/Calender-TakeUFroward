'use client'

import { useState, useEffect } from 'react'
import { Plus } from 'lucide-react'

const DAYS_OF_WEEK = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN']
const TODAY = 8

// Days in each month for 2026 (non-leap year)
const DAYS_IN_MONTH = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
// First day index for each month in 2026 (0=Monday, 6=Sunday)
const FIRST_DAY_INDEX_2026 = [3, 6, 6, 2, 4, 0, 2, 5, 1, 3, 6, 1]
// Month names
const MONTH_NAMES = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

interface CalendarGridProps {
  onOpenNotesModal: (startDate: number, endDate: number | null) => void
  monthIndex: number
  seasonalColors?: {
    button: string
    text: string
    highlight: string
    accent: string
  }
  theme?: 'dark' | 'light'
}

export default function CalendarGrid({ onOpenNotesModal, monthIndex, seasonalColors, theme = 'dark' }: CalendarGridProps) {
  const [startDate, setStartDate] = useState<number | null>(null)
  const [endDate, setEndDate] = useState<number | null>(null)
  const [touchStart, setTouchStart] = useState<number | null>(null)
  const [touchEnd, setTouchEnd] = useState<number | null>(null)

  // Default seasonal colors if not provided
  const colors = seasonalColors || {
    button: 'bg-slate-500/80 hover:bg-slate-400 text-white',
    text: 'text-slate-700',
    highlight: 'bg-slate-500 text-white',
    accent: 'bg-slate-500',
  }

  // Reset selection when month changes
  useEffect(() => {
    setStartDate(null)
    setEndDate(null)
  }, [monthIndex])

  const totalDays = DAYS_IN_MONTH[monthIndex]
  const firstDayIndex = FIRST_DAY_INDEX_2026[monthIndex]

  // Build calendar array
  const calendarDays: (number | null)[] = []

  // Empty cells before first day
  for (let i = 0; i < firstDayIndex; i++) {
    calendarDays.push(null)
  }

  // Days of month
  for (let i = 1; i <= totalDays; i++) {
    calendarDays.push(i)
  }

  // Fill rest of grid
  while (calendarDays.length % 7 !== 0) {
    calendarDays.push(null)
  }

  const handleDateClick = (day: number) => {
    if (startDate === null) {
      setStartDate(day)
      setEndDate(null)
    } else if (endDate === null) {
      if (day >= startDate) {
        setEndDate(day)
      } else {
        setStartDate(day)
        setEndDate(null)
      }
    } else {
      setStartDate(day)
      setEndDate(null)
    }
  }

  const handleAddNotesClick = () => {
    if (startDate !== null) {
      onOpenNotesModal(startDate, endDate)
    }
  }

  const isInRange = (day: number) => {
    if (startDate === null || endDate === null) return false
    return day >= startDate && day <= endDate
  }

  const isStartDate = (day: number) => day === startDate
  const isEndDate = (day: number) => day === endDate
  
  const hasNotes = (day: number): boolean => {
    if (typeof window === 'undefined') return false
    const key = `notes-${monthIndex}-${day}`
    const notes = localStorage.getItem(key)
    return notes !== null && notes.trim() !== ''
  }

  // Handle touch events for swipe detection
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX)
  }

  const handleTouchEnd = (e: React.TouchEvent) => {
    setTouchEnd(e.changedTouches[0].clientX)
  }

  useEffect(() => {
    if (!touchStart || !touchEnd) return
    const distance = touchStart - touchEnd
    const isLeftSwipe = distance > 50
    const isRightSwipe = distance < -50

    if (isLeftSwipe) {
      // Swiped left - go to next month
      // Parent component (WallCalendar) should handle this
    } else if (isRightSwipe) {
      // Swiped right - go to previous month
      // Parent component (WallCalendar) should handle this
    }
  }, [touchStart, touchEnd])

  return (
    <div 
      className={`w-full bg-transparent backdrop-blur-sm p-xl ${theme === 'dark' ? 'border-t border-white/30' : 'border-t border-slate-300/50'}`}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* Selection indicator with notes button */}
      {startDate && (
        <div className="mb-lg flex items-center gap-md">
          <span className={`text-sm font-sans ${theme === 'dark' ? 'text-white' : colors.text}`}>
            {endDate 
              ? `${MONTH_NAMES[monthIndex]} ${startDate}–${endDate}` 
              : `${MONTH_NAMES[monthIndex]} ${startDate}`
            }
          </span>
          <button
            onClick={handleAddNotesClick}
            className={`p-md rounded-lg ${theme === 'dark' ? 'bg-white/80 text-slate-900 hover:bg-white' : `${colors.accent} text-white hover:opacity-90`} transition-all transform hover:scale-110 font-semibold`}
            title="Add notes"
            aria-label="Add notes for selected dates"
          >
            <Plus className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Weekday headers */}
      <div className="grid grid-cols-7 gap-xs mb-sm">
        {DAYS_OF_WEEK.map((day) => (
          <div
            key={day}
            className={`text-center text-xs font-semibold uppercase tracking-wider py-xs ${theme === 'dark' ? 'text-white' : 'text-slate-700'}`}
          >
            {day}
          </div>
        ))}
      </div>

      {/* Calendar grid */}
      <div className="grid grid-cols-7 gap-xs">
        {calendarDays.map((day, index) => {
          const isWeekend = index % 7 >= 5
          const isToday = day === TODAY
          const inRange = day ? isInRange(day) : false
          const isStart = day ? isStartDate(day) : false
          const isEnd = day ? isEndDate(day) : false
          const isClickable = day !== null

          return (
            <button
              key={index}
              onClick={() => day && handleDateClick(day)}
              disabled={!isClickable}
              className={`
                aspect-square flex items-center justify-center relative rounded text-sm font-medium
                transition-all duration-quick
                ${!isClickable ? 'cursor-default' : 'cursor-pointer'}
                ${day === null ? 'pointer-events-none' : ''}
                
                ${isStart || isEnd ? theme === 'dark' ? 'bg-white/80 text-slate-900 shadow-subtle' : `${colors.highlight} shadow-subtle` : ''}
                ${inRange && !isStart && !isEnd ? theme === 'dark' ? 'bg-white/40 text-white' : 'bg-slate-300 text-slate-900' : ''}
                
                ${isToday && !isStart && !isEnd ? `ring-2 ${theme === 'dark' ? 'ring-white' : colors.accent} ring-offset-0` : ''}
                ${isToday && (isStart || isEnd) ? theme === 'dark' ? 'ring-2 ring-slate-900' : 'ring-2 ring-slate-900' : ''}
                
                ${!inRange && !isStart && !isEnd && day
                  ? theme === 'dark' ? 'text-white hover:bg-white/30' : 'text-slate-900 hover:bg-slate-200 hover:bg-opacity-50'
                  : ''
                }
              `}
            >
              {day && (
                <>
                  <span className="relative z-10">{day}</span>
                  {hasNotes(day) && (
                    <div 
                      className={`absolute bottom-1.5 right-1.5 w-1.5 h-1.5 rounded-full ${theme === 'dark' ? 'bg-white' : 'bg-slate-500'}`}
                    />
                  )}
                </>
              )}
            </button>
          )
        })}
      </div>

      {/* Info text */}
      <div className={`mt-lg text-xs italic animate-fade-rise-delay ${theme === 'dark' ? 'text-white/70' : 'text-slate-600'}`}>
        {startDate ? 'Click the + icon to add notes' : 'Click dates to select a range'}
      </div>
    </div>
  )
}
