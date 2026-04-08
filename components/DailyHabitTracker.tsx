'use client'

import { useState, useEffect } from 'react'

interface HabitState {
  'Leetcode': boolean
  'Exercise': boolean
  'Read': boolean
  'Deep Work': boolean
}

const HABITS = ['Leetcode', 'Exercise', 'Read', 'Deep Work']

const HABIT_COLORS: { [key: string]: { accent: string; badgeBg: string } } = {
  'Leetcode': { accent: '#f97316', badgeBg: 'rgba(249,115,22,0.15)' },
  'Exercise': { accent: '#22d3ee', badgeBg: 'rgba(34,211,238,0.15)' },
  'Read': { accent: '#a78bfa', badgeBg: 'rgba(167,139,250,0.15)' },
  'Deep Work': { accent: '#34d399', badgeBg: 'rgba(52,211,153,0.15)' },
}

export default function DailyHabitTracker() {
  const [habits, setHabits] = useState<HabitState>({
    'Leetcode': false,
    'Exercise': false,
    'Read': false,
    'Deep Work': false,
  })
  
  const [completedCount, setCompletedCount] = useState(0)
  const [showCelebration, setShowCelebration] = useState(false)
  const [today, setToday] = useState('')

  // Initialize habits from localStorage
  useEffect(() => {
    const now = new Date()
    const dateStr = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`
    setToday(dateStr)

    const storageKey = `habits-${dateStr}`
    const stored = localStorage.getItem(storageKey)

    if (stored) {
      try {
        setHabits(JSON.parse(stored))
      } catch {
        localStorage.setItem(storageKey, JSON.stringify(habits))
      }
    } else {
      localStorage.setItem(storageKey, JSON.stringify(habits))
    }
  }, [])

  // Update completed count whenever habits change
  useEffect(() => {
    const count = Object.values(habits).filter(Boolean).length
    setCompletedCount(count)

    // Show celebration if all done
    if (count === 4) {
      setShowCelebration(true)
      setTimeout(() => setShowCelebration(false), 2000)
    }
  }, [habits])

  const toggleHabit = (habitName: string) => {
    const updated = { ...habits, [habitName]: !habits[habitName] }
    setHabits(updated)

    // Save to localStorage
    const now = new Date()
    const dateStr = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`
    localStorage.setItem(`habits-${dateStr}`, JSON.stringify(updated))
  }

  const getTodayDate = () => {
    const now = new Date()
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    return `${days[now.getDay()]}, ${now.getDate()} ${months[now.getMonth()]}`
  }

  const progressPercentage = (completedCount / 4) * 100

  return (
    <div
      style={{
        background: 'rgba(255, 255, 255, 0.05)',
        border: '0.5px solid rgba(255, 255, 255, 0.12)',
        borderRadius: '16px',
        backdropFilter: 'blur(14px)',
        WebkitBackdropFilter: 'blur(14px)',
        padding: '18px 16px',
      }}
    >
      {/* Header */}
      <h3 
        style={{
          fontSize: '13px',
          fontWeight: '600',
          letterSpacing: '0.1em',
          textTransform: 'uppercase',
          color: 'rgba(255, 255, 255, 0.4)',
          marginBottom: '4px',
        }}
      >
        Today's Habits
      </h3>
      <p
        style={{
          fontSize: '11px',
          color: 'rgba(255,255,255,0.25)',
          marginBottom: '16px',
        }}
      >
        {getTodayDate()}
      </p>

      {/* Habit Items */}
      <div style={{ marginBottom: '12px' }}>
        {HABITS.map((habitName, index) => {
          const isChecked = habits[habitName as keyof HabitState]
          const { accent, badgeBg } = HABIT_COLORS[habitName]

          return (
            <div
              key={habitName}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '10px 0',
                borderBottom: index < HABITS.length - 1 ? '0.5px solid rgba(255,255,255,0.07)' : 'none',
              }}
            >
              {/* Checkbox and Label */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <label
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    cursor: 'pointer',
                  }}
                >
                  <input
                    type="checkbox"
                    checked={isChecked}
                    onChange={() => toggleHabit(habitName)}
                    style={{ display: 'none' }}
                  />
                  {/* Custom Checkbox */}
                  <div
                    style={{
                      width: '18px',
                      height: '18px',
                      borderRadius: '5px',
                      background: isChecked ? accent : 'rgba(255,255,255,0.06)',
                      border: isChecked ? 'none' : '1.5px solid rgba(255,255,255,0.2)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      transition: 'transform 0.15s ease, background 0.15s ease',
                      transform: isChecked ? 'scale(1.15)' : 'scale(1)',
                    }}
                  >
                    {isChecked && (
                      <span
                        style={{
                          color: 'white',
                          fontSize: '12px',
                          fontWeight: 'bold',
                        }}
                      >
                        ✓
                      </span>
                    )}
                  </div>
                </label>

                {/* Habit Label */}
                <span
                  style={{
                    fontSize: '14px',
                    color: isChecked ? 'rgba(255,255,255,0.35)' : 'rgba(255,255,255,0.75)',
                    textDecoration: isChecked ? 'line-through' : 'none',
                    transition: 'color 0.15s ease, text-decoration 0.15s ease',
                  }}
                >
                  {habitName}
                </span>
              </div>

              {/* Done Badge */}
              {isChecked && (
                <div
                  style={{
                    fontSize: '10px',
                    fontWeight: '700',
                    letterSpacing: '0.06em',
                    padding: '3px 8px',
                    borderRadius: '4px',
                    background: badgeBg,
                    color: accent,
                  }}
                >
                  Done
                </div>
              )}
            </div>
          )
        })}
      </div>

      {/* Progress Section */}
      <div style={{ marginTop: '12px' }}>
        <div
          style={{
            fontSize: '11px',
            color: 'rgba(255,255,255,0.3)',
            marginBottom: '6px',
            minHeight: '16px',
          }}
        >
          {showCelebration ? (
            <span>🔥 All done!</span>
          ) : (
            <span>{completedCount} / 4 completed</span>
          )}
        </div>

        {/* Progress Bar */}
        <div
          style={{
            width: '100%',
            height: '4px',
            borderRadius: '2px',
            background: 'rgba(255,255,255,0.08)',
            overflow: 'hidden',
          }}
        >
          <div
            style={{
              height: '4px',
              borderRadius: '2px',
              background: 'linear-gradient(90deg, #f97316, #a78bfa)',
              width: `${progressPercentage}%`,
              transition: 'width 0.3s ease',
            }}
          />
        </div>
      </div>
    </div>
  )
}
