'use client'

import { useState, useEffect } from 'react'
import { X } from 'lucide-react'

const MONTH_NAMES = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

const COLOR_MAP: {[key: string]: {light: string, bg: string, text: string}} = {
  'red': { light: '#ef4444', bg: 'bg-red-500/20', text: 'text-red-400' },
  'orange': { light: '#f97316', bg: 'bg-orange-500/20', text: 'text-orange-400' },
  'blue': { light: '#3b82f6', bg: 'bg-blue-500/20', text: 'text-blue-400' },
  'green': { light: '#22c55e', bg: 'bg-green-500/20', text: 'text-green-400' },
  'purple': { light: '#a855f7', bg: 'bg-purple-500/20', text: 'text-purple-400' },
  'pink': { light: '#ec4899', bg: 'bg-pink-500/20', text: 'text-pink-400' },
  'yellow': { light: '#eab308', bg: 'bg-yellow-500/20', text: 'text-yellow-400' },
  'cyan': { light: '#06b6d4', bg: 'bg-cyan-500/20', text: 'text-cyan-400' },
}

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
          const color = localStorage.getItem(rangeColorKey) || 'cyan'
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

  return (
    <div className={`flex flex-col gap-3 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
      <div className="sticky top-0">
        <h3 className="text-sm font-semibold uppercase tracking-wider opacity-60">Events</h3>
      </div>
      
      {events.length === 0 ? (
        <p className={`text-sm ${theme === 'dark' ? 'text-white/40' : 'text-gray-500'}`}>
          No events yet. Click dates to add.
        </p>
      ) : (
        <div className="space-y-2 overflow-y-auto max-h-96 pr-2">
          {events.map((event, idx) => {
            const colorConfig = COLOR_MAP[event.color] || COLOR_MAP['cyan']
            return (
              <div
                key={idx}
                className={`group relative rounded-lg p-3 backdrop-blur-sm border border-white/20 transition-all hover:border-white/40 ${colorConfig.bg}`}
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1 min-w-0">
                    <div className={`text-xs font-semibold uppercase tracking-wider mb-1 ${colorConfig.text}`}>
                      {formatDateRange(event.date, event.endDate)}
                    </div>
                    <p className={`text-sm leading-snug break-words ${theme === 'dark' ? 'text-white/90' : 'text-gray-900/90'}`}>
                      {event.title}
                    </p>
                  </div>
                  <button
                    onClick={() => handleDeleteEvent(event.date, event.endDate)}
                    className={`opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0 p-1 rounded hover:bg-white/10 ${colorConfig.text}`}
                    title="Delete event"
                  >
                    <X className="w-4 h-4" />
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
