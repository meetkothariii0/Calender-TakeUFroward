'use client'

import { useState, useEffect } from 'react'
import { X } from 'lucide-react'

const MONTH_NAMES = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

interface Event {
  date: number
  endDate?: number
  title: string
  color: string
  monthIndex: number
}

interface EventsListProps {
  monthIndex: number
  theme?: 'dark' | 'light'
  onDeleteEvent?: (date: number, endDate?: number) => void
}

export default function EventsList({ monthIndex, theme = 'dark', onDeleteEvent }: EventsListProps) {
  const [events, setEvents] = useState<Event[]>([])

  useEffect(() => {
    loadEvents()
  }, [monthIndex])

  const loadEvents = () => {
    const allEvents: Event[] = []
    const DAYS_IN_MONTH = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]

    for (let day = 1; day <= DAYS_IN_MONTH[monthIndex]; day++) {
      // Single day notes
      const singleKey = `notes-${monthIndex}-${day}`
      const singleColorKey = `color-${monthIndex}-${day}`
      const singleNotes = localStorage.getItem(singleKey)

      if (singleNotes && singleNotes.trim()) {
        const color = localStorage.getItem(singleColorKey) || 'cyan'
        allEvents.push({
          date: day,
          title: singleNotes,
          color,
          monthIndex
        })
      }

      // Range notes
      for (let endDay = day; endDay <= DAYS_IN_MONTH[monthIndex]; endDay++) {
        const rangeKey = `notes-${monthIndex}-${day}-${endDay}`
        const rangeColorKey = `color-${monthIndex}-${day}-${endDay}`
        const rangeNotes = localStorage.getItem(rangeKey)

        if (rangeNotes && rangeNotes.trim()) {
          const color = localStorage.getItem(rangeColorKey) || 'red'
          allEvents.push({
            date: day,
            endDate: endDay,
            title: rangeNotes,
            color,
            monthIndex
          })
        }
      }
    }

    setEvents(allEvents)
  }

  const handleDeleteEvent = (date: number, endDate?: number) => {
    const key = endDate ? `notes-${monthIndex}-${date}-${endDate}` : `notes-${monthIndex}-${date}`
    const colorKey = endDate ? `color-${monthIndex}-${date}-${endDate}` : `color-${monthIndex}-${date}`
    localStorage.removeItem(key)
    localStorage.removeItem(colorKey)
    onDeleteEvent?.(date, endDate)
    loadEvents()
  }

  const formatDateRange = (date: number, endDate?: number) => {
    if (endDate && endDate !== date) {
      return `${date}-${endDate} ${MONTH_NAMES[monthIndex].substring(0, 3)}`
    }
    return `${date} ${MONTH_NAMES[monthIndex].substring(0, 3)}`
  }

  // Get gradient and colors for event card
  const getEventStyling = (color: string) => {
    if (color === 'red') {
      return {
        gradient: 'linear-gradient(135deg, rgba(185,28,28,0.65), rgba(127,29,29,0.5))',
        border: 'rgba(252,165,165,0.2)',
        dateColor: '#fca5a5',
      }
    } else {
      // Teal/cyan events
      return {
        gradient: 'linear-gradient(135deg, rgba(14,116,144,0.65), rgba(6,78,59,0.5))',
        border: 'rgba(94,234,212,0.2)',
        dateColor: '#5eead4',
      }
    }
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
      {events.length === 0 ? (
        <p 
          style={{
            fontSize: '12px',
            color: 'rgba(255, 255, 255, 0.4)',
            textAlign: 'center',
            fontStyle: 'italic',
          }}
        >
          No events yet
        </p>
      ) : (
        <div 
          style={{ 
            display: 'flex', 
            flexDirection: 'column', 
            gap: '8px',
            maxHeight: '400px',
            overflowY: 'auto',
          }}
        >
          {events.map((event, idx) => {
            const styling = getEventStyling(event.color)
            return (
              <div
                key={idx}
                style={{
                  position: 'relative',
                  borderRadius: '12px',
                  padding: '12px',
                  background: styling.gradient,
                  border: `0.5px solid ${styling.border}`,
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLDivElement).style.opacity = '0.9'
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLDivElement).style.opacity = '1'
                }}
              >
                <div 
                  style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    justifyContent: 'space-between',
                    gap: '8px',
                  }}
                >
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div 
                      style={{
                        fontSize: '10px',
                        fontWeight: '700',
                        letterSpacing: '0.1em',
                        marginBottom: '6px',
                        color: styling.dateColor,
                        textTransform: 'uppercase',
                      }}
                    >
                      {formatDateRange(event.date, event.endDate)}
                    </div>
                    <p 
                      style={{
                        fontSize: '12px',
                        lineHeight: '1.4',
                        color: 'rgba(255, 255, 255, 0.9)',
                        wordBreak: 'break-word',
                      }}
                    >
                      {event.title}
                    </p>
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      handleDeleteEvent(event.date, event.endDate)
                    }}
                    style={{
                      flexShrink: 0,
                      padding: '4px',
                      borderRadius: '6px',
                      background: 'transparent',
                      border: 'none',
                      cursor: 'pointer',
                      color: styling.dateColor,
                      opacity: 0,
                      transition: 'opacity 0.2s',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLButtonElement).style.opacity = '1'
                      ;(e.currentTarget as HTMLButtonElement).style.background = 'rgba(255, 255, 255, 0.1)'
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLButtonElement).style.opacity = '0'
                      ;(e.currentTarget as HTMLButtonElement).style.background = 'transparent'
                    }}
                    title="Delete event"
                  >
                    <X size={16} />
                  </button>
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}

