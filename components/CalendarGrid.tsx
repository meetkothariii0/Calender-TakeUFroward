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

  // Get all date ranges with notes
  const getDateRangesWithNotes = (): Array<{startDate: number, endDate: number}> => {
    if (typeof window === 'undefined') return []
    const ranges: Array<{startDate: number, endDate: number}> = []
    
    for (let i = 1; i <= DAYS_IN_MONTH[monthIndex]; i++) {
      for (let j = i; j <= DAYS_IN_MONTH[monthIndex]; j++) {
        const rangeKey = `notes-${monthIndex}-${i}-${j}`
        if (localStorage.getItem(rangeKey)) {
          ranges.push({ startDate: i, endDate: j })
        }
      }
    }
    return ranges
  }

  // Check if a date is part of a range with notes
  const isPartOfRangeWithNotes = (day: number): {start: number, end: number} | null => {
    const ranges = getDateRangesWithNotes()
    for (const range of ranges) {
      if (day >= range.startDate && day <= range.endDate) {
        return { start: range.startDate, end: range.endDate }
      }
    }
    return null
  }

  // Get color for a date
  const getColorForDate = (day: number): string => {
    if (typeof window === 'undefined') return 'cyan'
    const range = isPartOfRangeWithNotes(day)
    if (range) {
      const colorKey = `color-${monthIndex}-${range.start}-${range.end}`
      return localStorage.getItem(colorKey) || 'cyan'
    } else if (hasNotes(day)) {
      const colorKey = `color-${monthIndex}-${day}`
      return localStorage.getItem(colorKey) || 'cyan'
    }
    return 'cyan'
  }

  // Handle note icon click
  const handleNoteClick = (e: React.MouseEvent, day: number) => {
    e.stopPropagation()
    const range = isPartOfRangeWithNotes(day)
    if (range) {
      onOpenNotesModal(range.start, range.end)
    } else if (hasNotes(day)) {
      onOpenNotesModal(day, null)
    }
  }

  // Get gradient colors based on color name
  const getGradientStyle = (colorName: string): string => {
    const colorMap: {[key: string]: {light: string, bright: string}} = {
      'red': { light: '#ef4444', bright: '#dc2626' },
      'orange': { light: '#f97316', bright: '#ea580c' },
      'blue': { light: '#3b82f6', bright: '#1d4ed8' },
      'green': { light: '#22c55e', bright: '#15803d' },
      'purple': { light: '#a855f7', bright: '#7e22ce' },
      'pink': { light: '#ec4899', bright: '#be185d' },
      'yellow': { light: '#eab308', bright: '#ca8a04' },
      'cyan': { light: '#06b6d4', bright: '#0891b2' },
    }
    const color = colorMap[colorName] || colorMap['cyan']
    return `linear-gradient(to right, ${color.light} 0%, ${color.bright} 100%)`
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
      className={`w-full bg-transparent p-sm sm:p-md md:p-lg lg:p-xl`}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* Selection indicator with notes button */}
      {startDate && (
        <div className="mb-md sm:mb-lg flex items-center gap-md flex-wrap">
          <span className={`text-xs sm:text-sm font-sans whitespace-nowrap ${theme === 'dark' ? 'text-white' : colors.text}`}>
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
      <div className="grid grid-cols-7 gap-3 mb-3">
        {DAYS_OF_WEEK.map((day) => (
          <div
            key={day}
            className={`h-20 w-20 flex items-center justify-center text-xs sm:text-sm font-semibold uppercase tracking-wider ${theme === 'dark' ? 'text-white' : 'text-slate-700'}`}
          >
            <span className="relative z-10">{day}</span>
          </div>
        ))}
      </div>

      {/* Calendar grid */}
      <div className="grid grid-cols-7 gap-3">
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
                h-20 w-20 flex items-center justify-center relative rounded text-sm font-bold
                transition-all duration-quick bg-transparent border-0 outline-none
                ${!isClickable ? 'cursor-default' : 'cursor-pointer'}
                ${day === null ? 'pointer-events-none' : ''}
                ${!inRange && !isStart && !isEnd && day && !isPartOfRangeWithNotes(day)
                  ? theme === 'dark' ? 'text-gray-100 hover:bg-white/5' : 'text-black hover:bg-slate-200 hover:bg-opacity-20'
                  : ''
                }
                }
              `}
            >
              {day && (
                <>
                  {/* Colored gradient square only for dates with notes - excluding TODAY */}
                  {(hasNotes(day) || isPartOfRangeWithNotes(day)) && day !== TODAY && (
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                      {/* Filled square background with rounded corners */}
                      <div 
                        className="absolute rounded-lg"
                        style={{
                          width: '100%',
                          height: '100%',
                          backgroundImage: getGradientStyle(getColorForDate(day)),
                          opacity: 0.85,
                          borderRadius: '0.5rem'
                        }}
                      />
                    </div>
                  )}

                  {/* Day number - lighter color for dark background */}
                  <span className={`relative z-10 font-bold ${(hasNotes(day) || isPartOfRangeWithNotes(day)) ? theme === 'dark' ? 'text-white drop-shadow-lg' : 'text-white drop-shadow-lg' : theme === 'dark' ? 'text-gray-100' : 'text-black'}`}>
                    {day}
                  </span>
                  {(hasNotes(day) || isPartOfRangeWithNotes(day)) && (
                    <div
                      onClick={(e) => handleNoteClick(e, day)}
                      className="absolute inset-0 z-20 rounded cursor-pointer opacity-0 hover:bg-white/10 transition-colors duration-quick"
                      title="View notes"
                      role="button"
                    />
                  )}
                </>
              )}
            </button>
          )
        })}
      </div>

      {/* Info text */}
      <div className={`mt-md sm:mt-lg text-xs sm:text-sm italic animate-fade-rise-delay ${theme === 'dark' ? 'text-white/90' : 'text-slate-800'}`}>
        {startDate ? 'Click the + icon to add notes' : 'Click dates to select a range'}
      </div>
    </div>
  )
}






