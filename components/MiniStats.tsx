'use client'

import { useState, useEffect } from 'react'

interface MiniStatsProps {
  monthIndex: number
  theme?: 'dark' | 'light'
}

export default function MiniStats({ monthIndex, theme = 'dark' }: MiniStatsProps) {
  const [stats, setStats] = useState({
    totalEvents: 0,
    thisWeek: 0,
    thisMonth: 0,
  })

  useEffect(() => {
    // Get all events from localStorage
    const allEventsStr = localStorage.getItem('calendarEvents')
    const allEvents = allEventsStr ? JSON.parse(allEventsStr) : {}

    // Calculate stats for current month
    let totalEvents = 0
    let thisWeekEvents = 0
    let thisMonthEvents = 0

    const today = new Date()
    const currentMonth = today.getMonth()
    const currentYear = today.getFullYear()
    const weekStart = new Date(today)
    weekStart.setDate(today.getDate() - today.getDay())

    Object.entries(allEvents).forEach(([dateStr, events]: [string, any]) => {
      const eventCount = Array.isArray(events) ? events.length : 0
      if (eventCount === 0) return

      const [year, month, day] = dateStr.split('-').map(Number)
      
      // Total events
      totalEvents += eventCount

      // This month
      if (year === currentYear && month === currentMonth) {
        thisMonthEvents += eventCount
      }

      // This week
      const eventDate = new Date(year, month, day)
      if (eventDate >= weekStart && eventDate <= today) {
        thisWeekEvents += eventCount
      }
    })

    setStats({
      totalEvents,
      thisWeek: thisWeekEvents,
      thisMonth: thisMonthEvents,
    })
  }, [monthIndex])

  const statRows = [
    { label: 'Total events', value: stats.totalEvents },
    { label: 'This week', value: stats.thisWeek },
    { label: 'This month', value: stats.thisMonth },
  ]

  return (
    <div>
      <h3 
        style={{
          fontSize: '11px',
          letterSpacing: '0.1em',
          textTransform: 'uppercase',
          color: 'rgba(255, 255, 255, 0.6)',
          marginBottom: '12px',
          fontWeight: '600',
        }}
      >
        Stats
      </h3>

      <div className="space-y-0">
        {statRows.map((row, index) => (
          <div
            key={row.label}
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              paddingBottom: '12px',
              borderBottom: index < statRows.length - 1 ? '0.5px solid rgba(255, 255, 255, 0.07)' : 'none',
            }}
          >
            <span
              style={{
                fontSize: '10px',
                color: 'rgba(255, 255, 255, 0.5)',
              }}
            >
              {row.label}
            </span>
            <span
              style={{
                fontSize: '11px',
                fontWeight: '600',
                color: 'rgba(255, 255, 255, 0.9)',
              }}
            >
              {row.value}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

