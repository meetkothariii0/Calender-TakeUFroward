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

const COLOR_MAPPINGS: { [key: string]: string } = {
  'red': 'rgba(220, 60, 70, 0.5)',
  'orange': 'rgba(249, 115, 22, 0.5)',
  'blue': 'rgba(59, 130, 246, 0.5)',
  'green': 'rgba(34, 197, 94, 0.5)',
  'purple': 'rgba(168, 85, 247, 0.5)',
  'pink': 'rgba(236, 72, 153, 0.5)',
  'yellow': 'rgba(234, 179, 8, 0.5)',
  'cyan': 'rgba(6, 182, 212, 0.5)',
}

const COLOR_DOT_MAPPINGS: { [key: string]: string } = {
  'red': '#dc2626',
  'orange': '#ea580c',
  'blue': '#1d4ed8',
  'green': '#15803d',
  'purple': '#7e22ce',
  'pink': '#be185d',
  'yellow': '#ca8a04',
  'cyan': '#0891b2',
}

export default function CalendarGrid({ onOpenNotesModal, monthIndex, theme = 'dark' }: CalendarGridProps) {
  const [startDate, setStartDate] = useState<number | null>(null)
  const [endDate, setEndDate] = useState<number | null>(null)
  const [touchStart, setTouchStart] = useState<number | null>(null)
  const [touchEnd, setTouchEnd] = useState<number | null>(null)
  const [previewColor, setPreviewColor] = useState<string>('cyan')

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
      setPreviewColor('cyan')
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
      setPreviewColor('cyan')
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
              color: theme === 'dark' ? 'rgba(255, 255, 255, 0.8)' : 'rgba(0, 0, 0, 0.7)',
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
              color: theme === 'dark' ? 'rgba(255,255,255,0.38)' : 'rgba(0, 0, 0, 0.45)',
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
          gap: '0px',
        }}
      >
        {calendarDays.map((day, index) => {
          const isClickable = day !== null
          const range = day ? isPartOfRangeWithNotes(day) : null
          const rangePosition = getRangePosition(day, range)
          const hasEventNote = day ? (hasNotes(day) || range !== null) : false
          const eventColor = hasEventNote ? (day ? getColorForDate(day) : 'cyan') : previewColor
          const isToday = day === TODAY
          const inSelection = day ? isInRange(day) : false
          const isStartSelection = day ? isStartDate(day) : false
          const isEndSelection = day ? isEndDate(day) : false
          const isSelectedDay = day === startDate || day === endDate


          let cellBackground = 'transparent'
          let cellBorder = '0.5px solid transparent'
          let cellColor = theme === 'dark' ? 'rgba(255,255,255,0.65)' : 'rgba(0,0,0,0.65)'
          let cellBorderRadius = '10px'

          // Grey selection block while selecting - show grey for selected dates AND dates in between
          if (!hasEventNote && startDate !== null && ((isSelectedDay) || (startDate && endDate && inSelection))) {
            cellBackground = theme === 'dark' ? 'rgba(128, 128, 128, 0.5)' : 'rgba(128, 128, 128, 0.4)'
            cellBorder = theme === 'dark' ? '1px solid rgba(80, 80, 80, 0.8)' : '1px solid rgba(100, 100, 100, 0.7)'
            cellColor = theme === 'dark' ? 'rgba(255,255,255,0.85)' : 'rgba(0,0,0,0.85)'
          }
          // Today styling
          else if (isToday) {
            cellBorder = theme === 'dark' ? '1.5px solid rgba(255,255,255,0.3)' : '1.5px solid rgba(0,0,0,0.3)'
          } else {
            // Default grid border for all cells
            cellBorder = theme === 'dark' ? '1px solid rgba(255,255,255,0.1)' : '1px solid rgba(0,0,0,0.2)'
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
                if (isClickable && !hasEventNote && startDate === null) {
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

                  {/* Indicator dot for dates with notes */}
                  {hasEventNote && (
                    <div
                      style={{
                        position: 'absolute',
                        width: '10px',
                        height: '10px',
                        borderRadius: '50%',
                        backgroundColor: COLOR_DOT_MAPPINGS[eventColor] || COLOR_DOT_MAPPINGS['cyan'],
                        bottom: '2px',
                        right: '2px',
                        zIndex: 11,
                      }}
                    />
                  )}
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
          color: theme === 'dark' ? 'rgba(255, 255, 255, 0.6)' : 'rgba(0, 0, 0, 0.45)',
          textAlign: 'center',
        }}
      >
        {startDate ? 'Click the + icon to add notes' : 'Click dates to select a range'}
      </div>
    </div>
  )
}



