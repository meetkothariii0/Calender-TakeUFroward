'use client'

import { useState, useEffect } from 'react'
import { Plus, X, Edit2 } from 'lucide-react'

interface Habit {
  id: string
  name: string
  completed: boolean
  color: string
}

const HABIT_COLORS = ['#f97316', '#22d3ee', '#a78bfa', '#34d399', '#fbbf24', '#f472b6', '#38bdf8', '#10b981']

const COLOR_TO_BG: { [key: string]: string } = {
  '#f97316': 'rgba(249,115,22,0.15)',
  '#22d3ee': 'rgba(34,211,238,0.15)',
  '#a78bfa': 'rgba(167,139,250,0.15)',
  '#34d399': 'rgba(52,211,153,0.15)',
  '#fbbf24': 'rgba(251,191,36,0.15)',
  '#f472b6': 'rgba(244,114,182,0.15)',
  '#38bdf8': 'rgba(56,189,248,0.15)',
  '#10b981': 'rgba(16,185,129,0.15)',
}

interface DailyHabitLoggerProps {
  theme?: 'dark' | 'light'
}

export default function DailyHabitLogger({ theme = 'dark' }: DailyHabitLoggerProps) {
  const [habits, setHabits] = useState<Habit[]>([])
  const [newHabitName, setNewHabitName] = useState('')
  const [editingId, setEditingId] = useState<string | null>(null)
  const [editingName, setEditingName] = useState('')
  const [showAddForm, setShowAddForm] = useState(false)
  const [today, setToday] = useState('')

  // Initialize habits from localStorage
  useEffect(() => {
    const now = new Date()
    const dateStr = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`
    setToday(dateStr)

    const storageKey = `habits-logger-${dateStr}`
    const stored = localStorage.getItem(storageKey)

    if (stored) {
      try {
        setHabits(JSON.parse(stored))
      } catch {
        setHabits([])
      }
    }
  }, [])

  // Save habits to localStorage
  const saveHabits = (updatedHabits: Habit[]) => {
    const now = new Date()
    const dateStr = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`
    localStorage.setItem(`habits-logger-${dateStr}`, JSON.stringify(updatedHabits))
  }

  const addHabit = () => {
    if (newHabitName.trim()) {
      const newHabit: Habit = {
        id: Date.now().toString(),
        name: newHabitName.trim(),
        completed: false,
        color: HABIT_COLORS[habits.length % HABIT_COLORS.length],
      }
      const updated = [...habits, newHabit]
      setHabits(updated)
      saveHabits(updated)
      setNewHabitName('')
      setShowAddForm(false)
    }
  }

  const toggleHabit = (id: string) => {
    const updated = habits.map(h => 
      h.id === id ? { ...h, completed: !h.completed } : h
    )
    setHabits(updated)
    saveHabits(updated)
  }

  const deleteHabit = (id: string) => {
    const updated = habits.filter(h => h.id !== id)
    setHabits(updated)
    saveHabits(updated)
  }

  const startEdit = (id: string, name: string) => {
    setEditingId(id)
    setEditingName(name)
  }

  const saveEdit = (id: string) => {
    if (editingName.trim()) {
      const updated = habits.map(h =>
        h.id === id ? { ...h, name: editingName.trim() } : h
      )
      setHabits(updated)
      saveHabits(updated)
      setEditingId(null)
      setEditingName('')
    }
  }

  const completedCount = habits.filter(h => h.completed).length
  const progressPercentage = habits.length > 0 ? (completedCount / habits.length) * 100 : 0

  const getTodayDate = () => {
    const now = new Date()
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    return `${days[now.getDay()]}, ${now.getDate()} ${months[now.getMonth()]}`
  }

  return (
    <div
      style={{
        background: theme === 'dark' ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.02)',
        border: theme === 'dark' ? '0.5px solid rgba(255, 255, 255, 0.12)' : '0.5px solid rgba(0, 0, 0, 0.08)',
        borderRadius: '16px',
        backdropFilter: 'blur(14px)',
        WebkitBackdropFilter: 'blur(14px)',
        padding: '16px',
      }}
    >
      {/* Header */}
      <div style={{ marginBottom: '14px' }}>
        <h3 
          style={{
            fontSize: '15px',
            fontWeight: '600',
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            color: theme === 'dark' ? 'rgba(255, 255, 255, 0.4)' : '#000000',
            marginBottom: '4px',
          }}
        >
          Daily Habits
        </h3>
        <p
          style={{
            fontSize: '11px',
            color: theme === 'dark' ? 'rgba(255,255,255,0.25)' : 'rgba(0, 0, 0, 0.3)',
          }}
        >
          {getTodayDate()}
        </p>
      </div>

      {/* Habit List */}
      <div style={{ marginBottom: '12px', maxHeight: '280px', overflowY: 'auto' }}>
        {habits.length === 0 ? (
          <p
            style={{
              fontSize: '14px',
              color: theme === 'dark' ? 'rgba(255,255,255,0.35)' : 'rgba(0, 0, 0, 0.35)',
              textAlign: 'center',
              padding: '20px 0',
            }}
          >
            No habits yet. Add one to get started!
          </p>
        ) : (
          habits.map((habit, index) => (
            <div
              key={habit.id}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '10px 0',
                borderBottom: index < habits.length - 1 ? (theme === 'dark' ? '0.5px solid rgba(255,255,255,0.07)' : '0.5px solid rgba(0, 0, 0, 0.05)') : 'none',
                gap: '8px',
              }}
            >
              {/* Left: Checkbox + Label */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flex: 1 }}>
                <label style={{ display: 'flex', cursor: 'pointer' }}>
                  <input
                    type="checkbox"
                    checked={habit.completed}
                    onChange={() => toggleHabit(habit.id)}
                    style={{ display: 'none' }}
                  />
                  <div
                    style={{
                      width: '16px',
                      height: '16px',
                      borderRadius: '4px',
                      background: habit.completed ? habit.color : 'rgba(255,255,255,0.06)',
                      border: habit.completed ? 'none' : '1.5px solid rgba(255,255,255,0.2)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      transition: 'transform 0.15s ease, background 0.15s ease',
                      transform: habit.completed ? 'scale(1.1)' : 'scale(1)',
                      flexShrink: 0,
                    }}
                  >
                    {habit.completed && (
                      <span style={{ color: 'white', fontSize: '11px', fontWeight: 'bold' }}>✓</span>
                    )}
                  </div>
                </label>

                {/* Habit Name or Edit Input */}
                {editingId === habit.id ? (
                  <input
                    type="text"
                    value={editingName}
                    onChange={(e) => setEditingName(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') saveEdit(habit.id)
                      if (e.key === 'Escape') setEditingId(null)
                    }}
                    autoFocus
                    style={{
                      flex: 1,
                      fontSize: '14px',
                      padding: '4px 6px',
                      borderRadius: '4px',
                      background: theme === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(0, 0, 0, 0.05)',
                      border: theme === 'dark' ? '1px solid rgba(255,255,255,0.2)' : '1px solid rgba(0, 0, 0, 0.1)',
                      color: theme === 'dark' ? 'rgba(255,255,255,0.9)' : 'rgba(0, 0, 0, 0.8)',
                      outline: 'none',
                    }}
                  />
                ) : (
                  <span
                    style={{
                      fontSize: '14px',
                      color: habit.completed ? (theme === 'dark' ? 'rgba(255,255,255,0.35)' : 'rgba(0, 0, 0, 0.35)') : (theme === 'dark' ? 'rgba(255,255,255,0.75)' : 'rgba(0, 0, 0, 0.75)'),
                      textDecoration: habit.completed ? 'line-through' : 'none',
                      transition: 'all 0.15s ease',
                    }}
                  >
                    {habit.name}
                  </span>
                )}
              </div>

              {/* Right: Edit & Delete Buttons */}
              <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
                {editingId === habit.id ? (
                  <>
                    <button
                      onClick={() => saveEdit(habit.id)}
                      style={{
                        background: habit.color,
                        color: 'white',
                        border: 'none',
                        borderRadius: '4px',
                        padding: '4px 8px',
                        fontSize: '11px',
                        fontWeight: '600',
                        cursor: 'pointer',
                        transition: 'opacity 0.2s',
                      }}
                      onMouseEnter={(e) => (e.currentTarget.style.opacity = '0.8')}
                      onMouseLeave={(e) => (e.currentTarget.style.opacity = '1')}
                    >
                      Save
                    </button>
                    <button
                      onClick={() => setEditingId(null)}
                      style={{
                        background: 'rgba(255,255,255,0.1)',
                        color: 'rgba(255,255,255,0.6)',
                        border: '1px solid rgba(255,255,255,0.2)',
                        borderRadius: '4px',
                        padding: '4px 8px',
                        fontSize: '11px',
                        cursor: 'pointer',
                        transition: 'all 0.2s',
                      }}
                      onMouseEnter={(e) => (e.currentTarget.style.background = 'rgba(255,255,255,0.15)')}
                      onMouseLeave={(e) => (e.currentTarget.style.background = 'rgba(255,255,255,0.1)')}
                    >
                      Cancel
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      onClick={() => startEdit(habit.id, habit.name)}
                      style={{
                        background: 'transparent',
                        border: 'none',
                        cursor: 'pointer',
                        color: 'rgba(255,255,255,0.4)',
                        padding: '4px',
                        display: 'flex',
                        alignItems: 'center',
                        transition: 'color 0.2s',
                      }}
                      onMouseEnter={(e) => (e.currentTarget.style.color = 'rgba(255,255,255,0.7)')}
                      onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(255,255,255,0.4)')}
                      title="Edit habit"
                    >
                      <Edit2 size={14} />
                    </button>
                    <button
                      onClick={() => deleteHabit(habit.id)}
                      style={{
                        background: 'transparent',
                        border: 'none',
                        cursor: 'pointer',
                        color: 'rgba(255,255,255,0.4)',
                        padding: '4px',
                        display: 'flex',
                        alignItems: 'center',
                        transition: 'color 0.2s',
                      }}
                      onMouseEnter={(e) => (e.currentTarget.style.color = '#ef4444')}
                      onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(255,255,255,0.4)')}
                      title="Delete habit"
                    >
                      <X size={14} />
                    </button>
                  </>
                )}
              </div>
            </div>
          ))
        )}
      </div>

      {/* Add Habit Form */}
      {showAddForm ? (
        <div style={{ display: 'flex', gap: '4px', marginBottom: '12px', flexWrap: 'wrap' }}>
          <input
            type="text"
            value={newHabitName}
            onChange={(e) => setNewHabitName(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') addHabit()
              if (e.key === 'Escape') setShowAddForm(false)
            }}
            placeholder="Habit name..."
            autoFocus
            style={{
              flex: 1,
              minWidth: '120px',
              fontSize: '12px',
              padding: '5px 6px',
              borderRadius: '5px',
              background: theme === 'dark' ? 'rgba(255,255,255,0.08)' : 'rgba(0, 0, 0, 0.05)',
              border: theme === 'dark' ? '0.5px solid rgba(255,255,255,0.15)' : '0.5px solid rgba(0, 0, 0, 0.1)',
              color: theme === 'dark' ? 'rgba(255,255,255,0.9)' : 'rgba(0, 0, 0, 0.8)',
              outline: 'none',
            }}
          />
          <button
            onClick={addHabit}
            style={{
              padding: '5px 10px',
              background: 'linear-gradient(135deg, #f97316, #a78bfa)',
              border: 'none',
              borderRadius: '5px',
              color: 'white',
              fontWeight: '600',
              fontSize: '11px',
              cursor: 'pointer',
              transition: 'opacity 0.2s',
              whiteSpace: 'nowrap',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.opacity = '0.8')}
            onMouseLeave={(e) => (e.currentTarget.style.opacity = '1')}
          >
            Add
          </button>
          <button
            onClick={() => setShowAddForm(false)}
            style={{
              padding: '5px 10px',
              background: theme === 'dark' ? 'rgba(255,255,255,0.08)' : 'rgba(0, 0, 0, 0.05)',
              border: theme === 'dark' ? '0.5px solid rgba(255,255,255,0.15)' : '0.5px solid rgba(0, 0, 0, 0.1)',
              borderRadius: '5px',
              color: theme === 'dark' ? 'rgba(255,255,255,0.6)' : 'rgba(0, 0, 0, 0.55)',
              fontSize: '11px',
              cursor: 'pointer',
              transition: 'all 0.2s',
              whiteSpace: 'nowrap',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'rgba(255,255,255,0.12)'
              e.currentTarget.style.color = 'rgba(255,255,255,0.8)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'rgba(255,255,255,0.08)'
              e.currentTarget.style.color = 'rgba(255,255,255,0.6)'
            }}
          >
            Cancel
          </button>
        </div>
      ) : null}

      {/* Add Button */}
      {!showAddForm && (
        <button
          onClick={() => setShowAddForm(true)}
          style={{
            width: '100%',
            padding: '8px',
            background: theme === 'dark' ? 'rgba(255,255,255,0.08)' : 'rgba(0, 0, 0, 0.05)',
            border: theme === 'dark' ? '0.5px solid rgba(255,255,255,0.15)' : '0.5px solid rgba(0, 0, 0, 0.1)',
            borderRadius: '6px',
            color: theme === 'dark' ? 'rgba(255,255,255,0.7)' : 'rgba(0, 0, 0, 0.6)',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '6px',
            fontSize: '12px',
            fontWeight: '600',
            transition: 'all 0.2s',
            marginBottom: '12px',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = theme === 'dark' ? 'rgba(255,255,255,0.12)' : 'rgba(0, 0, 0, 0.08)'
            e.currentTarget.style.color = theme === 'dark' ? 'rgba(255,255,255,0.9)' : 'rgba(0, 0, 0, 0.8)'
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = theme === 'dark' ? 'rgba(255,255,255,0.08)' : 'rgba(0, 0, 0, 0.05)'
            e.currentTarget.style.color = theme === 'dark' ? 'rgba(255,255,255,0.7)' : 'rgba(0, 0, 0, 0.6)'
          }}
        >
          <Plus size={14} />
          Add Habit
        </button>
      )}

      {/* Progress Bar */}
      {habits.length > 0 && (
        <div style={{ marginTop: '12px', paddingTop: '12px', borderTop: theme === 'dark' ? '0.5px solid rgba(255,255,255,0.07)' : '0.5px solid rgba(0, 0, 0, 0.05)' }}>
          <div
            style={{
              fontSize: '10px',
              color: theme === 'dark' ? 'rgba(255,255,255,0.3)' : 'rgba(0, 0, 0, 0.35)',
              marginBottom: '6px',
            }}
          >
            {completedCount === habits.length ? (
              <span>🔥 All done!</span>
            ) : (
              <span>{completedCount} / {habits.length} completed</span>
            )}
          </div>
          <div
            style={{
              width: '100%',
              height: '4px',
              borderRadius: '2px',
              background: theme === 'dark' ? 'rgba(255,255,255,0.08)' : 'rgba(0, 0, 0, 0.05)',
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
      )}
    </div>
  )
}
