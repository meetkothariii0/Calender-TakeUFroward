'use client'

import React, { useEffect, useState } from 'react'

interface Leaf {
  id: number
  left: number
  duration: number
  delay: number
  size: number
  rotation: number
  color: 'red' | 'orange' | 'brown' | 'yellow'
}

export default function AutumnEffect({ isActive }: { isActive: boolean }) {
  const [leaves, setLeaves] = useState<Leaf[]>([])

  const leafColors = {
    red: 'rgba(200, 50, 50, 0.8)',
    orange: 'rgba(255, 140, 0, 0.8)',
    brown: 'rgba(139, 69, 19, 0.8)',
    yellow: 'rgba(255, 200, 0, 0.8)',
  }

  useEffect(() => {
    if (!isActive) {
      setLeaves([])
      return
    }

    // Generate random leaves
    const leafArray: Leaf[] = Array.from({ length: 60 }, (_, i) => {
      const colors: Array<'red' | 'orange' | 'brown' | 'yellow'> = ['red', 'orange', 'brown', 'yellow']
      return {
        id: i,
        left: Math.random() * 100,
        duration: 6 + Math.random() * 8, // 6-14s
        delay: Math.random() * 3,
        size: 15 + Math.random() * 25, // 15-40px
        rotation: Math.random() * 360,
        color: colors[Math.floor(Math.random() * colors.length)],
      }
    })

    setLeaves(leafArray)
  }, [isActive])

  if (!isActive || leaves.length === 0) return null

  return (
    <>
      <style>{`
        @keyframes leafFall {
          to {
            transform: translateY(100vh) translateX(200px) rotateZ(720deg);
            opacity: 0;
          }
        }
        
        @keyframes leafSway {
          0%, 100% {
            transform: translateX(0px);
          }
          50% {
            transform: translateX(150px);
          }
        }
        
        .leaf {
          position: fixed;
          top: -40px;
          pointer-events: none;
          animation: leafFall linear forwards, leafSway 3s ease-in-out infinite;
          z-index: 5;
          clip-path: polygon(50% 0%, 100% 38%, 82% 100%, 50% 85%, 18% 100%, 0% 38%);
        }
      `}</style>

      {leaves.map((leaf) => (
        <div
          key={leaf.id}
          className="leaf"
          style={{
            left: `${leaf.left}%`,
            width: `${leaf.size}px`,
            height: `${leaf.size}px`,
            background: leafColors[leaf.color],
            animationDuration: `${leaf.duration}s, 3s`,
            animationDelay: `${leaf.delay}s, ${leaf.delay * 0.5}s`,
            filter: 'drop-shadow(0 0 3px rgba(0, 0, 0, 0.3))',
          }}
        />
      ))}
    </>
  )
}
