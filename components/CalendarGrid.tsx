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
  theme?: 'dark' | 'light'
}

export default function CalendarGrid({ onOpenNotesModal, monthIndex, theme = 'dark' }: CalendarGridProps) {
  const [startDate, setStartDate] = useState<number | null>(null)
  const [endDate, setEndDate] = useState<number | null>(null)
  const [touchStart, setTouchStart] = useState<number | null>(null)
  const [touchEnd, setTouchEnd] = useState<number | null>(null)

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
      return localStorage.getItem(colorKey) || 'red'
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

  // Determine position in range (start, middle, or end)
  const getRangePosition = (day: number, range: {start: number, end: number} | null): 'start' | 'middle' | 'end' | null => {
    if (!range) return null
    if (range.start === range.end) return null // Single day
    if (day === range.start) return 'start'
    if (day === range.end) return 'end'
    return 'middle'
  }

  // Handle touch events for swipe detection
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX)
  }

  const handleTouchEnd = (e: React.TouchEvent) => {
    setTouchEnd(e.changedTouches[0].clientX)
  }

  return (
    <div style={{ width: '100%' }}>
      {/* Selection indicator with notes button */}
      {startDate && (
        <div 
          style={{
            marginBottom: '8px',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            flexWrap: 'wrap',
          }}
        >
          <span 
            style={{
              fontSize: '14px',
              fontWeight: '500',
              color: 'rgba(255, 255, 255, 0.8)',
            }}
          >
            {endDate 
              ? `${MONTH_NAMES[monthIndex]} ${startDate}–${endDate}` 
              : `${MONTH_NAMES[monthIndex]} ${startDate}`
            }
          </span>
          <button
            onClick={handleAddNotesClick}
            style={{
              padding: '8px 12px',
              borderRadius: '8px',
              background: 'rgba(255, 255, 255, 0.2)',
              border: '0.5px solid rgba(255, 255, 255, 0.3)',
              cursor: 'pointer',
              color: 'rgba(255, 255, 255, 0.9)',
              fontWeight: '600',
              fontSize: '13px',
              transition: 'all 0.2s',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
            }}
            onMouseEnter={(e) => {
              (e.target as HTMLButtonElement).style.background = 'rgba(255, 255, 255, 0.3)'
            }}
            onMouseLeave={(e) => {
              (e.target as HTMLButtonElement).style.background = 'rgba(255, 255, 255, 0.2)'
            }}
            title="Add notes"
          >
            <Plus size={14} />
            Add notes
          </button>
        </div>
      )}

      {/* Weekday headers */}
      <div 
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(7, 1fr)',
          gap: '8px',
          marginBottom: '12px',
        }}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        {DAYS_OF_WEEK.map((day) => (
          <div
            key={day}
            style={{
              fontSize: '11px',
              letterSpacing: '0.08em',
              color: 'rgba(255,255,255,0.38)',
              textTransform: 'uppercase',
              textAlign: 'center',
              fontWeight: '600',
              paddingBottom: '8px',
            }}
          >
            {day}
          </div>
        ))}
      </div>

      {/* Calendar grid */}
      <div 
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(7, 1fr)',
          gap: '8px',
        }}
      >
        {calendarDays.map((day, index) => {
          const isClickable = day !== null
          const range = day ? isPartOfRangeWithNotes(day) : null
          const rangePosition = getRangePosition(day, range)
          const hasEventNote = day ? (hasNotes(day) || range !== null) : false
          const eventColor = day ? getColorForDate(day) : 'cyan'
          const isToday = day === TODAY
          const inSelection = day ? isInRange(day) : false
          const isStartSelection = day ? isStartDate(day) : false
          const isEndSelection = day ? isEndDate(day) : false


          let cellBackground = 'transparent'
          let cellBorder = '0.5px solid transparent'
          let cellColor = 'rgba(255,255,255,0.65)'
          let cellBorderRadius = '10px'

          // Multi-day range styling
          if (hasEventNote && range && range.start !== range.end) {
            cellBackground = 'rgba(220, 60, 70, 0.72)'
            cellColor = 'white'
            cellBorder = '0.5px solid rgba(255,120,120,0.35)'
            
            if (rangePosition === 'start') {
              cellBorderRadius = '10px 4px 4px 10px'
            } else if (rangePosition === 'middle') {
              cellBorderRadius = '2px'
            } else if (rangePosition === 'end') {
              cellBorderRadius = '4px 10px 10px 4px'
            }
          }
          // Single event day styling
          else if (hasEventNote && !range) {
            cellBackground = 'rgba(14, 116, 144, 0.55)'
            cellColor = '#a5f3fc'
            cellBorder = '0.5px solid rgba(94, 234, 212, 0.3)'
          }
          // Today styling
          else if (isToday) {
            cellBorder = '1.5px solid rgba(255,255,255,0.3)'
          }

          return (
            <button
              key={index}
              onClick={() => day && handleDateClick(day)}
              disabled={!isClickable}
              style={{
                aspectRatio: '1',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '14px',
                fontWeight: '600',
                color: cellColor,
                background: cellBackground,
                border: cellBorder,
                borderRadius: cellBorderRadius,
                cursor: isClickable ? 'pointer' : 'default',
                opacity: isClickable ? 1 : 0,
                transition: 'all 0.15s',
                outline: 'none',
                position: 'relative',
              }}
              onMouseEnter={(e) => {
                if (isClickable && !hasEventNote) {
                  (e.target as HTMLButtonElement).style.background = 'rgba(255,255,255,0.08)'
                }
              }}
              onMouseLeave={(e) => {
                if (!hasEventNote) {
                  (e.target as HTMLButtonElement).style.background = cellBackground
                }
              }}
            >
              {day && (
                <>
                  <span 
                    onClick={(e) => {
                      if (hasEventNote) {
                        handleNoteClick(e, day)
                      }
                    }}
                    style={{
                      cursor: hasEventNote ? 'pointer' : 'default',
                      position: 'relative',
                      zIndex: 10,
                    }}
                  >
                    {day}
                  </span>
                </>
              )}
            </button>
          )
        })}
      </div>

      {/* Info text */}
      <div 
        style={{
          marginTop: '6px',
          fontSize: '12px',
          fontStyle: 'italic',
          color: 'rgba(255, 255, 255, 0.6)',
          textAlign: 'center',
        }}
      >
        {startDate ? 'Click the + icon to add notes' : 'Click dates to select a range'}
      </div>
    </div>
  )
}



